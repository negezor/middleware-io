const { engines } = require('./package.json');

module.exports = {
	presets: [
		['@babel/env', {
			targets: {
				// Strip `>=`
				node: engines.node.substring(2)
			},
			useBuiltIns: 'usage',
			modules: process.env.BABEL_ENV === 'test'
				? 'cjs'
				: false
		}]
	],
	comments: false
};
