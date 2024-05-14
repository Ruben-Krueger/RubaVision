module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'standard',
		'plugin:react/recommended',
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['src/*'],
			parserOptions: {
				sourceType: 'module'
			}
		}
	],
	parser: '@typescript-eslint/parser',
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'import/prefer-default-export': ['warn', { target: 'any' }],
		'space-before-function-paren': 'off',
		semi: [2, 'always'],
		indent: [
			'error',
			'tab',
			{ SwitchCase: 1, VariableDeclarator: { let: 2, const: 3 } }
		],
		'no-tabs': 'off',
		'multiline-ternary': ['off']
	},
	ignorePatterns: ['build/*', 'node_modules/*']
};
