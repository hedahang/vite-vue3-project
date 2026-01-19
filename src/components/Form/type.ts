import type { Rules, Values } from "async-validator";
import type { InjectionKey } from "vue";

export type FormData = {
  model: Record<string, unknown>;
  rules?: Rules;
  addFormItem?: (item: FormItem) => void; // 添加注册函数
};
export type FormItem = {
  validate: () => Promise<Values>;
};
export type ValidateCallback = (isValid: boolean) => void;

export type FormType = {
  validate: (callback: ValidateCallback) => void;
};
export const key: InjectionKey<FormData> = Symbol("form-data");

export type FormItemContext = {
  onFieldChange?: () => void; // 字段变化时触发验证
};

export const formItemKey: InjectionKey<FormItemContext> = Symbol("form-item");
