import { describe, it, expect } from "@jest/globals";
import { mount } from "@vue/test-utils";
import HelloWorld from "../../src/components/HelloWorld.vue";

describe("HelloWorld 组件测试", () => {
  it("应该正确渲染 props", () => {
    const msg = "Hello Jest!";
    const wrapper = mount(HelloWorld, {
      props: { msg },
    });

    expect(wrapper.text()).toContain(msg);
  });

  it("应该正确显示计数按钮", () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: "Test" },
    });

    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain("count is 0");
  });

  it("点击按钮应该增加计数", async () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: "Test" },
    });

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(button.text()).toContain("count is 1");
  });

  it("应该包含链接", () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: "Test" },
    });

    const links = wrapper.findAll("a");
    expect(links.length).toBeGreaterThan(0);
  });
});
