import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";
import vue from "rollup-plugin-vue";
import scss from "rollup-plugin-scss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";

const name = "elementUI";

const createBaseConfig = () => {
  return {
    input: "src/index.js",
    output: {
      globals: {
        vue: "Vue",
        "element-ui": "ELEMENT",
      },
    },
    plugins: [
      vue(),
      resolve({
        extensions: [".js", ".vue"],
      }),
      commonjs(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
      peerDepsExternal(),
      json(),
      scss(),
    ],
    external: ["vue", "element-ui"],
  };
};

function mergeConfig(baseConfig, configB) {
  const config = Object.assign({}, baseConfig);
  // plugin
  if (configB.plugins) {
    baseConfig.plugins.push(...configB.plugins);
  }

  // output
  config.output = Object.assign({}, baseConfig.output, configB.output);

  return config;
}

function createFileName(formatName) {
  return `dist/element-ui.${formatName}.js`;
}

// es-bundle
const esBundleConfig = {
  plugins: [
    replace({
      __DEV__: `(process.env.NODE_ENV !== 'production')`,
      preventAssignment: true,
    }),
  ],
  output: {
    file: createFileName("esm-bundler"),
    format: "es",
  },
};

// es-browser
const esBrowserConfig = {
  plugins: [
    replace({
      __DEV__: true,
      preventAssignment: true,
    }),
  ],
  output: {
    file: createFileName("esm-browser"),
    format: "es",
  },
};

// es-browser.prod
const esBrowserProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
      preventAssignment: true,
    }),
  ],
  output: {
    file: createFileName("esm-browser.prod"),
    format: "es",
  },
};

//cjs
const cjsConfig = {
  plugins: [
    replace({
      __DEV__: true,
      preventAssignment: true,
    }),
  ],
  output: {
    file: createFileName("cjs"),
    format: "cjs",
    exports: "named",
  },
};

// cjs.prod
const cjsProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
      preventAssignment: true,
    }),
  ],
  output: {
    file: createFileName("cjs.prod"),
    format: "cjs",
    exports: "named",
  },
};
// global
const globalConfig = {
  plugins: [
    replace({
      __DEV__: true,
      "process.env.NODE_ENV": true,
      preventAssignment: true,
    }),
  ],
  output: {
    file: createFileName("global"),
    format: "iife",
    name,
    exports: "named",
  },
};
// global.prod
const globalProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
      preventAssignment: true,
    }),
  ],
  output: {
    file: createFileName("global.prod"),
    format: "iife",
    name,
    exports: "named",
  },
};

const formatConfigs = [
  esBundleConfig,
  esBrowserConfig,
  esBrowserProdConfig,
  cjsConfig,
  cjsProdConfig,
  globalConfig,
  globalProdConfig,
];

function createPackageConfigs() {
  return formatConfigs.map(formatConfig => {
    return mergeConfig(createBaseConfig(), formatConfig);
  });
}

export default createPackageConfigs();
