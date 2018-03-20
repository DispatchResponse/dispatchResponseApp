/**
 * src/components/__tests__/assetsTransformer.js
 *
 * Source:
 * https://github.com/facebook/jest/issues/2663
 * and
 * https://facebook.github.io/jest/docs/webpack.html#content
 *
 */

const path = require('path')

module.exports = {
  process (src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';'
  }
}
