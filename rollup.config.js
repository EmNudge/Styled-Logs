import minify from 'rollup-plugin-babel-minify';
import cleanup from 'rollup-plugin-cleanup';
import typescript from '@rollup/plugin-typescript';

export default [
	{
		input: 'src/index.ts',
		output: {
			file: 'build/StyledLogs.min.js',
			format: 'esm'
		},
		plugins: [typescript({ lib: ['es2020', 'dom'], target: 'es2019' }), cleanup(), minify()]
	}
];
