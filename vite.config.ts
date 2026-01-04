import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: "src/mock", // mock 文件存放目录
        enable: env.VITE_USE_MOCK === "true", // 根据环境变量控制
        watchFiles: true, // 监听文件变化
      }),
    ],
  };
});
