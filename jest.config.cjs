/** @type {import('jest').Config} */
module.exports = {
  // 测试环境
  testEnvironment: "jsdom",

  // 预设配置
  preset: "ts-jest",

  // 模块文件扩展名
  moduleFileExtensions: ["vue", "js", "jsx", "ts", "tsx", "json"],

  // 转换配置
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },

  // 模块名称映射（路径别名）
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  // 测试文件匹配模式
  testMatch: ["**/tests/**/*.test.[jt]s?(x)", "**/__tests__/**/*.[jt]s?(x)"],

  // 测试文件忽略
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  // 收集覆盖率
  collectCoverage: false,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx,vue}",
    "!src/**/*.d.ts",
    "!src/main.ts",
    "!src/**/types.ts",
    "!src/mock/**",
  ],

  // 覆盖率报告目录
  coverageDirectory: "coverage",

  // 覆盖率报告格式
  coverageReporters: ["text", "lcov", "html"],

  // 设置文件
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],

  // 转换忽略模式
  transformIgnorePatterns: [
    "node_modules/(?!(.*\\.mjs$|@vue|vue-router|pinia))",
  ],
};
