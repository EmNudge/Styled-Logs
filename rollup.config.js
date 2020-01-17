import minify from 'rollup-plugin-babel-minify';
import cleanup from 'rollup-plugin-cleanup';
import typescript from '@rollup/plugin-typescript';

const buildFolder = 'build';

export default [
	{
		input: 'src/index.ts',
		output: {
			file: `${buildFolder}/StyledLogs.min.js`,
			format: 'esm'
		},
		plugins: [typescript({ lib: ['es2019', 'dom'], target: 'es5' }), cleanup(), minify()]
	}
];
