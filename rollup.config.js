import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const minifiedName = (name) => name.replace(/\.(\w+)\.js/, ".min.$1.js");

export default [
    {
        input: "src/index.tsx",
        output: {
            name: "Zoomable",
            file: pkg.browser.replace(".min", ""),
            format: "umd",
        },
        plugins: [resolve(), commonjs(), typescript()],
    },
    {
        input: "src/index.tsx",
        output: {
            name: "Zoomable",
            file: pkg.browser,
            format: "umd",
        },
        plugins: [resolve(), commonjs(), typescript(), terser()],
    },
    {
        input: "src/index.tsx",
        external: ["preact"],
        plugins: [typescript()],
        output: [
            { file: pkg.main, format: "cjs" },
            { file: pkg.module, format: "es" },
        ],
    },
    {
        input: "src/index.tsx",
        external: ["preact"],
        plugins: [typescript(), terser()],
        output: [
            { file: minifiedName(pkg.main), format: "cjs" },
            { file: minifiedName(pkg.module), format: "es" },
        ],
    },
];
