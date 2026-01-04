import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";

export default [
  // 基础 JavaScript 推荐规则
  js.configs.recommended,

  // Vue 推荐配置（flat config 格式）
  // ...vue.configs["flat/strongly-recommended"],
  ...vue.configs["flat/recommended"],

  // 全局变量配置
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // 全局忽略文件
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "dist-ssr/**",
      "*.local",
      ".vscode/**",
      ".idea/**",
      "coverage/**",
    ],
  },

  // Vue 文件配置
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      vue,
      "@typescript-eslint": typescript,
      import: importPlugin,
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // 类型声明文件配置
  {
    files: ["**/*.d.ts", "vite-env.d.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // 配置文件（vite.config.ts 等）- 必须在 TypeScript 配置之前
  {
    files: ["**/*.config.ts", "vite.config.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.node.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      import: importPlugin,
    },
    rules: {
      "no-unused-vars": "off", // 禁用 JavaScript 规则，使用 TypeScript 规则
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // TypeScript 文件配置（仅匹配 src 目录，排除配置文件和类型声明文件）
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.app.json",
      },
    },
    plugins: {
      vue,
      "@typescript-eslint": typescript,
      import: importPlugin,
    },
    rules: {
      "no-unused-vars": "off", // 禁用 JavaScript 规则，使用 TypeScript 规则
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  // JavaScript 文件配置
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // 禁用与 Prettier 冲突的 ESLint 规则（必须放在最后）
  prettier,
];
