module.exports = {
	"extends": [ "plugin:@wordpress/eslint-plugin/esnext" ],
	"parserOptions": {
		"ecmaVersion": 2017
	},
	"globals": {
		"document": true,
		"module": true,
		"process": true,
		"require": true,
		"window": true,
	}
}
