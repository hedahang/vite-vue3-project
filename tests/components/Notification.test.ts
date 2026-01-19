import Notification from "@/components/Notification/Notification.vue";
import { describe, it, expect } from "@jest/globals";
import { mount } from "@vue/test-utils";

describe("Notification 组件测试", () => {
  it("应该正确渲染", () => {
    const wrapper = mount(Notification);
    // wrapper.exists() 判断组件是否存在
    expect(wrapper.exists()).toBe(true);
  });

  it("渲染标题title", () => {
    const title = "this is a title";
    const wrapper = mount(Notification, {
      props: {
        title,
      },
    });
    expect(wrapper.get(".custom-notification__title").text()).toContain(title);
  });

  it("信息message渲染", () => {
    const message = "this is a message";
    const wrapper = mount(Notification, {
      props: {
        message,
      },
    });
    expect(wrapper.get(".custom-notification__content").text()).toContain(
      message
    );
  });

  it("位置渲染", () => {
    const position = "bottom-right";
    const wrapper = mount(Notification, {
      props: {
        position,
      },
    });
    // 判断位置是否正确
    expect(wrapper.find(".custom-notification").classes()).toContain("right");
    expect(wrapper.vm.verticalProperty).toBe("bottom");
    expect(wrapper.find(".custom-notification").element.style.bottom).toBe(
      "0px"
    );
  });

  it("位置偏移", () => {
    const verticalOffset = 50;
    const wrapper = mount(Notification, {
      props: {
        verticalOffset,
      },
    });
    expect(wrapper.vm.verticalProperty).toBe("top");
    expect(wrapper.find(".custom-notification").element.style.top).toBe(
      `${verticalOffset}px`
    );
  });
});
