module.exports = ({ env }) => ({
	plugins: {
		'postcss-import': {},
		'postcss-preset-env': {
			stage: 0,
			features: {
				'custom-properties': true,
			},
		},
		'postcss-nested': {},
		autoprefixer: {},
		// Minify styles on production using cssano.
		cssnano:
			env === 'production'
				? {
						preset: ['default', { discardComments: { removeAll: true } }],
				  }
				: false,
	},
});
