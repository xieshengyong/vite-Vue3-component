import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dts from "vite-plugin-dts";
import postcsspxtoviewport from "postcss-px-to-viewport";

// 参考1
// 1、https://segmentfault.com/a/1190000043739133
// 2、https://juejin.cn/post/7257144279050403896

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["swiper-container", "swiper-slide"].includes(tag),
        },
      },
    }),
    dts(),
  ],
  build: {
    minify: !false,
    // outDir: "card-animation-comp", // 输出文件名称
    lib: {
      entry: path.resolve(__dirname, "packages/index.ts"), // 指定组件编译入口文件
      name: "senyou-comp-demo",
      fileName: "senyou-comp-demo",
      formats: ["es"],
    }, // 库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    }, // rollup打包配置
  },
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: "px", // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          exclude: [],
          landscape: false, // 是否处理横屏情况
        }),
      ],
    },
  },
});
