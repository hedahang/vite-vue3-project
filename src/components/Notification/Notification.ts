import { createApp, h, ref, nextTick, type App } from "vue";

import NotificationComponent from "./Notification.vue";

// 类型定义
export interface NotificationOptions {
  title?: string;
  message?: string;
  type?: "success" | "warning" | "error" | "info";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  offset?: number;
  duration?: number; // 0 表示不自动关闭
  showClose?: boolean;
  onClose?: () => void;
}

export interface NotificationInstance {
  close: () => void;
}

// Notification 函数类型定义
interface NotificationFunction {
  (options?: NotificationOptions): NotificationInstance;
  success: (
    options?: Omit<NotificationOptions, "type">
  ) => NotificationInstance;
  warning: (
    options?: Omit<NotificationOptions, "type">
  ) => NotificationInstance;
  error: (options?: Omit<NotificationOptions, "type">) => NotificationInstance;
  info: (options?: Omit<NotificationOptions, "type">) => NotificationInstance;
}

// 通知实例管理
interface NotificationItem {
  id: string;
  app: App;
  container: HTMLElement;
  position: string;
  offset: number;
  height: number; // 通知的实际高度
  close: () => void;
  updatePosition: (newVerticalOffset: number) => void; // 更新通知位置的方法
  updateHeight: (newHeight: number) => void; // 更新高度的方法
}

const notifications: NotificationItem[] = [];
let notificationIdCounter = 0;

// 计算堆叠后的 offset（使用实际高度）
function calculateStackedOffset(
  baseOffset: number,
  position: string,
  excludeId?: string // 排除的通知 ID（用于计算时排除当前通知）
): number {
  const spacing = 16; // 通知之间的间距

  // 获取同一位置的所有通知（排除指定的通知）
  const samePositionNotifications = notifications.filter(
    (n) => n.position === position && n.id !== excludeId
  );

  // 累加所有通知的实际高度和间距
  let totalHeight = 0;
  for (const notification of samePositionNotifications) {
    totalHeight += notification.height + spacing;
  }

  return baseOffset + totalHeight;
}

// 估算通知高度（用于初始位置计算）
function estimateNotificationHeight(): number {
  // 默认估算值，实际高度会在挂载后获取
  return 80;
}

// 关闭通知
function closeNotification(id: string) {
  const index = notifications.findIndex((n) => n.id === id);
  if (index === -1) return;

  const notification = notifications[index];
  if (!notification) return;

  const { app, container, position, offset } = notification;

  // 卸载 Vue 应用
  app.unmount();
  // 移除 DOM
  if (container.parentNode) {
    container.parentNode.removeChild(container);
  }

  // 从数组中移除
  notifications.splice(index, 1);

  // 更新同一位置的其他通知位置，让它们向上移动
  const samePositionNotifications = notifications.filter(
    (n) => n.position === position
  );

  // 重新计算每个通知的垂直偏移（使用实际高度）
  samePositionNotifications.forEach((n, idx) => {
    // 累加前面所有通知的高度
    let totalHeight = 0;
    for (let i = 0; i < idx; i++) {
      const prevNotification = samePositionNotifications[i];
      if (prevNotification) {
        totalHeight += prevNotification.height + 16;
      }
    }
    const newVerticalOffset = offset + totalHeight;
    n.updatePosition(newVerticalOffset);
  });
}

// 主函数：创建通知
function createNotification(
  options: NotificationOptions = {}
): NotificationInstance {
  const {
    title = "",
    message = "",
    type: _type, // 保留以备将来使用
    position = "top-right",
    offset = 20,
    duration = 4500,
    showClose = true,
    onClose,
  } = options;

  // 生成唯一 ID
  const id = `notification-${++notificationIdCounter}`;

  // 创建 DOM 容器
  const container = document.createElement("div");
  document.body.appendChild(container);

  // 计算堆叠位置（先使用估算高度）
  const estimatedHeight = estimateNotificationHeight();
  // 计算初始位置（排除当前通知，因为还没添加到数组）
  const initialVerticalOffset = calculateStackedOffset(offset, position, id);
  // 水平方向使用原始 offset
  const horizontalOffset = offset;

  // 用于保存更新位置函数的变量
  let updatePositionFn: ((newVerticalOffset: number) => void) | null = null;
  let updateHeightFn: ((newHeight: number) => void) | null = null;

  // 创建 Vue 应用实例
  const app = createApp({
    setup() {
      const visible = ref(true);
      // 使用响应式的 verticalOffset，以便动态更新位置
      const verticalOffset = ref(initialVerticalOffset);

      const handleClose = () => {
        visible.value = false;
        // 延迟移除，等待动画完成
        setTimeout(() => {
          closeNotification(id);
          onClose?.();
        }, 300);
      };

      // 更新位置的方法
      const updatePosition = (newVerticalOffset: number) => {
        verticalOffset.value = newVerticalOffset;
      };

      // 更新高度的方法（用于外部更新高度后重新计算位置）
      const updateHeight = (_newHeight: number) => {
        // 高度更新由外部处理，这里只是占位
      };

      // 保存更新位置和高度的方法，供外部调用
      updatePositionFn = updatePosition;
      updateHeightFn = updateHeight;

      return () =>
        h(NotificationComponent, {
          title,
          message,
          position,
          offset: horizontalOffset, // 水平方向偏移
          verticalOffset: verticalOffset.value, // 垂直方向偏移（用于堆叠）
          showClose,
          visible: visible.value,
          "onUpdate:visible": (val: boolean) => {
            visible.value = val;
            if (!val) {
              handleClose();
            }
          },
        });
    },
  });

  // 挂载应用
  app.mount(container);

  // 获取更新位置的方法（在挂载后，setup 函数已执行，updatePositionFn 已被赋值）
  const updatePosition = updatePositionFn!;
  const updateHeight = updateHeightFn!;

  // 保存实例（先使用估算高度）
  const notificationItem: NotificationItem = {
    id,
    app,
    container,
    position,
    offset,
    height: estimatedHeight, // 初始使用估算高度
    updatePosition,
    updateHeight,
    close: () => {
      closeNotification(id);
      onClose?.();
    },
  };

  notifications.push(notificationItem);

  // 在下一个 tick 获取实际高度
  nextTick(() => {
    // 获取通知元素的实际高度
    const notificationElement = container.querySelector(
      ".custom-notification"
    ) as HTMLElement;

    if (notificationElement) {
      const actualHeight =
        notificationElement.offsetHeight ||
        notificationElement.getBoundingClientRect().height;

      // 如果实际高度与估算值不同，更新高度并调整后续通知位置
      if (Math.abs(actualHeight - estimatedHeight) > 1) {
        notificationItem.height = actualHeight;

        // 更新同一位置后续通知的位置（重新计算每个通知的位置）
        const allSamePositionNotifications = notifications.filter(
          (n) => n.position === position
        );

        allSamePositionNotifications.forEach((n, idx) => {
          if (n.id !== id) {
            // 计算新位置：累加前面所有通知的高度
            let totalHeight = 0;
            for (let i = 0; i < idx; i++) {
              const prevNotification = allSamePositionNotifications[i];
              if (prevNotification) {
                totalHeight += prevNotification.height + 16;
              }
            }
            const newVerticalOffset = offset + totalHeight;
            n.updatePosition(newVerticalOffset);
          }
        });
      } else {
        // 高度接近估算值，直接更新
        notificationItem.height = actualHeight;
      }
    }
  });

  // 自动关闭
  if (duration > 0) {
    setTimeout(() => {
      notificationItem.close();
    }, duration);
  }

  // 返回关闭方法
  return {
    close: notificationItem.close,
  };
}

// 创建 Notification 对象
const Notification = createNotification as NotificationFunction;

// 快捷方法
Notification.success = (options?: Omit<NotificationOptions, "type">) => {
  return createNotification({ ...options, type: "success" });
};

Notification.warning = (options?: Omit<NotificationOptions, "type">) => {
  return createNotification({ ...options, type: "warning" });
};

Notification.error = (options?: Omit<NotificationOptions, "type">) => {
  return createNotification({ ...options, type: "error" });
};

Notification.info = (options?: Omit<NotificationOptions, "type">) => {
  return createNotification({ ...options, type: "info" });
};

export default Notification;
