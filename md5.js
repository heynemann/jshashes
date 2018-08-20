const md5Hash = require('./algo/md5');

Hashes = {
  /**
   * @property {String} version
   * @readonly
   */
  VERSION: '1.0.6',
  MD5: md5Hash
}

module.exports = Hashes
