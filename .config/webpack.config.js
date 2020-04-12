/**
 * .config/webpack.config.prod.js :
 * This file defines the production build configuration
 */
const { helpers, plugins, presets } = require( '@humanmade/webpack-helpers' );
const { filePath } = helpers;

const isDev = process.env.NODE_ENV === 'development';

const baseFilename = isDev ? '[name]' : '[name].[contenthash]';

const presetsConfig = isDev ? presets.development : presets.production;

const config = presetsConfig( {
	entry: {
		index: filePath( 'src/js/index.js' ),
		main: filePath( 'src/css/index.css' ),
	},
	output: {
		path: filePath( 'dist/assets' ),
		filename: `${baseFilename}.js`,
	},
} );

// Generate a final configuration object, overriding the property
// we want to change.
module.exports = {
	...config,
	plugins: [
		...config.plugins,
		plugins.miniCssExtract( {
			filename: `${baseFilename}.css`,
			chunkFilename: '[id].css',
		} ),
	],
};

// // Overwrite the specific property we want to change.
// module.exports.plugins = [
// 	plugins.miniCssExtract( {
// 		filename: '[name].[contenthash].css',
// 		chunkFilename: '[id].css',
// 	} ),
// ];
