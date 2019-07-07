import minify from "rollup-plugin-babel-minify";
import cleanup from "rollup-plugin-cleanup";

const buildFolder = "build";

export default [
  {
    input: "src/index.js",
    output: {
      file: `${buildFolder}/StyledLogs.js`,
      format: "cjs"
    }
  },
  {
    input: "src/index.js",
    output: {
      file: `${buildFolder}/StyledLogs.min.js`,
      format: "cjs"
    },
    plugins: [cleanup(), minify()]
  }
];
