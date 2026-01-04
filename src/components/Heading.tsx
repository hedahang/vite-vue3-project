import { defineComponent, h } from "vue";

interface 极客时间课程 {
  课程名字: string;
  价格: number[];
  受众: string;
  讲师头像?: string | boolean;
  获取口令(): string;
}
// type 课程属性列表 = keyof 极客时间课程;

let vueCourse: 极客时间课程 = {
  课程名字: "玩转Vue 3全家桶",
  价格: [59, 129],
  受众: "前端小老弟",
  讲师头像: false,
  获取口令() {
    return "dasheng88";
  },
};

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name];
}

export default defineComponent({
  name: "Heading",
  props: {
    level: {
      type: Number,
      default: 1,
    },
  },
  // setup(props, { slots }) {
  //   return () =>
  //     h(
  //       `h${props.level}`, // 标签名
  //       { class: "heading" }, // prop 或 attribute,
  //       slots.default?.() // 子节点
  //     );
  // },
  setup(props, { slots }) {
    const tag = `h${props.level}`;
    return () =>
      h(tag, {}, slots.default?.() + getProperty(vueCourse, "课程名字"));
  },
});
