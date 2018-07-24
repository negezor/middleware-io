// eslint-disable-next-line import/no-extraneous-dependencies
const babelJest = require('babel-jest');

const babelConfig = require('./babel.config');

module.exports = babelJest.createTransformer(babelConfig);
