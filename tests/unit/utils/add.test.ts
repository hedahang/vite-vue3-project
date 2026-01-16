import { describe, it, expect } from "@jest/globals";
import { add } from "../../../src/plugins/add";

describe("add 函数测试", () => {
  it("应该正确相加两个正数", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("应该正确处理负数", () => {
    expect(add(-1, -2)).toBe(-3);
  });

  it("应该正确处理正数和负数", () => {
    expect(add(5, -3)).toBe(2);
  });

  it("应该正确处理零", () => {
    expect(add(0, 0)).toBe(0);
    expect(add(5, 0)).toBe(5);
    expect(add(0, 5)).toBe(5);
  });

  it("应该正确处理小数", () => {
    expect(add(1.5, 2.5)).toBe(4);
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });
});
