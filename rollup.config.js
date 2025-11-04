import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'index.ts',  // 多个入口文件
    output: [
        {
            format: 'umd',             // 输出格式
            file: `dist/bundle.global.js`,  // 输出文件
            name: 'meta2d-vue',  // 全局变量名称
            sourcemap: true,  // 生成源映射
            globals: {
                vue:'Vue',
                '@meta2d/core':'meta2d.js'
            },
        }, {
            format: 'cjs',
            file: `dist/bundle.js`,
            sourcemap: true,
        },
        {
            format: 'esm',
            file: `dist/bundle.mjs`,
            sourcemap: true,
        },
    ],
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
            // 👇 忽略类型错误
            check: false,
        }),
        resolve(), // 处理模块解析
        babel({
            babelrc: true,
            babelHelpers: 'bundled',
        }),
    ],
    external:['@meta2d/core','vue']
};
