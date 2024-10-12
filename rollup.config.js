import dts from 'rollup-plugin-dts'
import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve';

const input = 'src/index.ts'

const external = ['js-base64']

const tsConfig = {
	respectExternal: false,
	exclude: ["test-src/**/*.ts"],
}

const jsConfig ={
	input,
	output: [
		{
			file: 'dist/lib/index.js',
			format: 'esm'
		},
	],
	external,
	plugins: [
		alias(),
		resolve(),
		typescript(tsConfig),
		esbuild(),
	]
}

// const jsConfigMini = Object.assign({},jsConfig);
// jsConfigMini.output[0].file = 'dist/lib/index.min.js';
// jsConfigMini.plugins.push(terser())

const dtsConfig = {
	input,
	output: {
		file: 'dist/lib/index.d.ts',
		format: 'esm'
	},
	external,
	plugins: [
		dts(tsConfig)
	],
}


const rv = [];

switch (process.env.build) {
	case 'dts':
		rv.push(dtsConfig);
		break
	case 'js':
		rv.push(jsConfig);
		// rv.push(jsConfig,jsConfigMini);
		break
	default:
		rv.push(dtsConfig,jsConfig)
		// rv.push(dtsConfig,jsConfig,jsConfigMini)
}
export default rv;