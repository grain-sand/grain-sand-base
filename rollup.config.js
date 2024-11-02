import dts from 'rollup-plugin-dts'
import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy'

const input = 'src/index.ts'

const external = ['js-base64']

const tsConfig = {
	respectExternal: false,
	exclude: ["test-src/**/*.ts"],
}

const output = (suffix) => ({
	file: `dist/lib/index.${suffix}`,
	format: 'esm'
});

const jsConfig = (suffix, external, plugins = []) => ({
	input, external,
	output: output(suffix),
	plugins: [
		alias(),
		resolve(),
		typescript(tsConfig),
		esbuild(),
		terser(),
		...plugins
	],
	sourceMap: false
})

export default [
	jsConfig('js', external),
	jsConfig('web.js', []),
	{
		input, external,
		output: output('d.ts'),
		plugins: [
			dts(tsConfig),
			copy({
				targets: [
					{src: 'README.md', dest: 'dist'}
				]
			})
		]
	}
]

