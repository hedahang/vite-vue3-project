import Notification from "@/components/Notification/Notification.vue";
import { describe, it, expect } from "@jest/globals";
import { mount } from "@vue/test-utils";

describe("Notification 组件测试", () => {
  it("应该正确渲染", () => {
    const wrapper = mount(Notification, {
      props: {
        visible: true, // ✅ 必须设置为 true
      },
    });
    // exists 判断组件是否存在
    expect(wrapper.exists()).toBe(true);
  });

  it("渲染标题title", () => {
    const title = "this is a title";
    const wrapper = mount(Notification, {
      props: {
        title,
        visible: true, // ✅ 必须设置为 true
      },
    });
    // get 获取组件中的元素
    expect(wrapper.get(".custom-notification__title").text()).toContain(title);
  });

  it("信息message渲染", () => {
    const message = "this is a message";
    const wrapper = mount(Notification, {
      props: {
        message,
        visible: true, // ✅ 必须设置为 true
      },
    });
    // ✅ 修正类名：content -> message
    expect(wrapper.get(".custom-notification__message").text()).toContain(
      message
    );
  });

  it("位置渲染", () => {
    const position = "bottom-right";
    const wrapper = mount(Notification, {
      props: {
        position,
        visible: true, // ✅ 必须设置为 true
      },
    });
    // ✅ 移除不存在的类名检查，直接检查样式
    const element = wrapper.find(".custom-notification").element as HTMLElement;
    expect(element.style.bottom).toBe("20px"); // 默认 offset 是 20
    expect(element.style.right).toBe("20px");
  });

  it("位置偏移", () => {
    const offset = 50;
    const wrapper = mount(Notification, {
      props: {
        offset,
        visible: true, // ✅ 必须设置为 true
      },
    });
    // ✅ 移除不存在的 verticalProperty 检查
    const element = wrapper.find(".custom-notification").element as HTMLElement;
    // 默认 position 是 "top-right"，所以应该是 top 和 right
    expect(element.style.top).toBe(`${offset}px`);
    expect(element.style.right).toBe(`${offset}px`);
  });
  it("测试不同位置", () => {
    const positions = [
      { position: "top-right", expected: { top: "20px", right: "20px" } },
      { position: "top-left", expected: { top: "20px", left: "20px" } },
      { position: "bottom-right", expected: { bottom: "20px", right: "20px" } },
      { position: "bottom-left", expected: { bottom: "20px", left: "20px" } },
    ];

    positions.forEach(({ position, expected }) => {
      const wrapper = mount(Notification, {
        props: { position, visible: true },
      });
      const element = wrapper.find(".custom-notification")
        .element as HTMLElement;
      Object.entries(expected).forEach(([prop, value]) => {
        expect(element.style[prop as keyof CSSStyleDeclaration]).toBe(value);
      });
    });
  });
});
