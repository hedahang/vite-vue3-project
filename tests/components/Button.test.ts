import { describe, it, expect } from "@jest/globals";
import { mount } from "@vue/test-utils";
import Button from "@/components/Button/Button.vue";

describe("Button 组件测试", () => {
  it("按钮能够显示文本", () => {
    const content = "按钮文本";
    const wrapper = mount(Button, {
      slots: {
        default: content,
      },
    });
    expect(wrapper.text()).toBe(content);
  });
  it("通过size属性控制大小", () => {
    const size = "small";
    const wrapper = mount(Button, {
      props: {
        size,
      },
    });
    // size内部通过class控制
    expect(wrapper.classes()).toContain("custom-button--small");
  });
});
