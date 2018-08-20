const sha1Hash = require('./algo/sha1');

Hashes = {
  /**
   * @property {String} version
   * @readonly
   */
  VERSION: '1.0.6',
  SHA1: sha1Hash
}

module.exports = Hashes
