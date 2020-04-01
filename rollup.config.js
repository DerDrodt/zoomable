import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescriptPlugin from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const typescript = () =>
    typescriptPlugin({
        tsconfig: false,
        //declaration: false,
        //sourceMap: false,
        //outDir: undefined,
        /* Basic Options */
        target:
            "ES2017" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */,
        module:
            "ESNext" /* Specify module code generation: 'none', commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
        // "lib": [],                             /* Specify library files to be included in the compilation:  */
        allowJs: true /* Allow javascript files to be compiled. */,
        // "checkJs": true,                       /* Report errors in .js files. */
        jsx:
            "react" /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */,
        jsxFactory: "h",
        //declaration: true /* Generates corresponding '.d.ts' file. */,
        //sourceMap: true /* Generates corresponding '.map' file. */,
        // "outFile": "./",                       /* Concatenate and emit output to single file. */
        //outDir: "./dist" /* Redirect output structure to the directory. */,
        // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
        // "removeComments": true,                /* Do not emit comments to output. */
        // "noEmit": true,                        /* Do not emit outputs. */
        // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
        downlevelIteration: true /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */,
        // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */
        /* Strict Type-Checking Options */
        strict: true /* Enable all strict type-checking options. */,
        noImplicitAny: true /* Raise error on expressions and declarations with an implied 'any' type. */,
        strictNullChecks: true /* Enable strict null checks. */,
        noImplicitThis: true /* Raise error on 'this' expressions with an implied 'any' type. */,
        // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
        /* Additional Checks */
        noUnusedLocals: true /* Report errors on unused locals. */,
        noUnusedParameters: true /* Report errors on unused parameters. */,
        noImplicitReturns: true /* Report error when not all code paths in function return a value. */,
        noFallthroughCasesInSwitch: true /* Report errors for fallthrough cases in switch statement. */,
        /* Module Resolution Options */
        moduleResolution:
            "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
        // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
        // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
        // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
        // "typeRoots": [],                       /* List of folders to include type definitions from. */
        // "types": [],                           /* Type declaration files to be included in compilation. */
        // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
        // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
        /* Source Map Options */
        // "sourceRoot": "./",                    /* Specify the location where debugger should locate TypeScript files instead of source locations. */
        // "mapRoot": "./",                       /* Specify the location where debugger should locate map files instead of generated locations. */
        // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
        // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */
        /* Experimental Options */
        // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
        // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
        esModuleInterop: true,
    });

const UMDName = "PreactZoom";

export default [
    {
        input: "src/zoomable.tsx",
        output: {
            name: UMDName,
            file: pkg.browser.replace(".min", ""),
            format: "umd",
        },
        plugins: [resolve(), commonjs(), typescript()],
    },
    {
        input: "src/zoomable.tsx",
        output: {
            name: UMDName,
            file: pkg.browser,
            format: "umd",
        },
        plugins: [resolve(), commonjs(), typescript(), terser()],
    },
    {
        input: "src/zoomable.tsx",
        plugins: [typescript(), terser()],
        external: ["preact"],
        output: {
            file: "dist/zoomable.min.js",
            format: "es",
        },
    },
];
