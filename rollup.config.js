import minify from "rollup-plugin-babel-minify";
import cleanup from "rollup-plugin-cleanup";

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/StyledLogs.js",
      format: "cjs"
    }
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/StyledLogs.min.js",
      format: "cjs"
    },
    plugins: [cleanup(), minify()]
  }
];
