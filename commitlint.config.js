export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新增功能
        "fix", // 修复 bug
        "docs", // 文档变更
        "style", // 代码格式（不影响代码运行的变动）
        "refactor", // 重构（既不是新增功能，也不是修复 bug 的代码变动）
        "perf", // 性能优化
        "test", // 增加测试
        "chore", // 构建过程或辅助工具的变动
        "revert", // 回滚
        "build", // 打包
        "ci", // CI 配置
      ],
    ],
    "type-case": [2, "always", "lower-case"], // 类型必须小写
    "type-empty": [2, "never"], // 类型不能为空
    "scope-case": [2, "always", "lower-case"], // 作用域必须小写
    "subject-empty": [2, "never"], // 描述不能为空
    "subject-full-stop": [2, "never", "."], //  描述不能以句号结尾
    "header-max-length": [2, "always", 100], // 整个 header 最大长度为 100 个字符
  },
};
