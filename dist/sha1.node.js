/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function utf8Encode(str) {
  var x, y, output = '',
    i = -1,
    l;

  if (str && str.length) {
    l = str.length;
    while ((i += 1) < l) {
      /* Decode utf-16 surrogate pairs */
      x = str.charCodeAt(i);
      y = i + 1 < l ? str.charCodeAt(i + 1) : 0;
      if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
        x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
        i += 1;
      }
      /* Encode output as utf-8 */
      if (x <= 0x7F) {
        output += String.fromCharCode(x);
      } else if (x <= 0x7FF) {
        output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
          0x80 | (x & 0x3F));
      } else if (x <= 0xFFFF) {
        output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
          0x80 | ((x >>> 6) & 0x3F),
          0x80 | (x & 0x3F));
      } else if (x <= 0x1FFFFF) {
        output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
          0x80 | ((x >>> 12) & 0x3F),
          0x80 | ((x >>> 6) & 0x3F),
          0x80 | (x & 0x3F));
      }
    }
  }
  return output;
}

function utf8Decode(str) {
  var i, ac, c1, c2, c3, arr = [],
    l;
  i = ac = c1 = c2 = c3 = 0;

  if (str && str.length) {
    l = str.length;
    str += '';

    while (i < l) {
      c1 = str.charCodeAt(i);
      ac += 1;
      if (c1 < 128) {
        arr[ac] = String.fromCharCode(c1);
        i += 1;
      } else if (c1 > 191 && c1 < 224) {
        c2 = str.charCodeAt(i + 1);
        arr[ac] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = str.charCodeAt(i + 1);
        c3 = str.charCodeAt(i + 2);
        arr[ac] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
  }
  return arr.join('');
}

/**
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */

function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF),
    msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/**
 * Bitwise rotate a 32-bit number to the left.
 */

function bit_rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}

/**
 * Convert a raw string to a hex string
 */

function rstr2hex(input, hexcase) {
  var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef',
    output = '',
    x, i = 0,
    l = input.length;
  for (; i < l; i += 1) {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
  }
  return output;
}

/**
 * Encode a string as utf-16
 */

function str2rstr_utf16le(input) {
  var i, l = input.length,
    output = '';
  for (i = 0; i < l; i += 1) {
    output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
  }
  return output;
}

function str2rstr_utf16be(input) {
  var i, l = input.length,
    output = '';
  for (i = 0; i < l; i += 1) {
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
  }
  return output;
}

/**
 * Convert an array of big-endian words to a string
 */

function binb2rstr(input) {
  var i, l = input.length * 32,
    output = '';
  for (i = 0; i < l; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
  }
  return output;
}

/**
 * Convert an array of little-endian words to a string
 */

function binl2rstr(input) {
  var i, l = input.length * 32,
    output = '';
  for (i = 0; i < l; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
  }
  return output;
}

/**
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */

function rstr2binl(input) {
  var i, l = input.length * 8,
    output = Array(input.length >> 2),
    lo = output.length;
  for (i = 0; i < lo; i += 1) {
    output[i] = 0;
  }
  for (i = 0; i < l; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
  }
  return output;
}

/**
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */

function rstr2binb(input) {
  var i, l = input.length * 8,
    output = Array(input.length >> 2),
    lo = output.length;
  for (i = 0; i < lo; i += 1) {
    output[i] = 0;
  }
  for (i = 0; i < l; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  }
  return output;
}

/**
 * Convert a raw string to an arbitrary string encoding
 */

function rstr2any(input, encoding) {
  var divisor = encoding.length,
    remainders = Array(),
    i, q, x, ld, quotient, dividend, output, full_length;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  dividend = Array(Math.ceil(input.length / 2));
  ld = dividend.length;
  for (i = 0; i < ld; i += 1) {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /**
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. We stop when the dividend is zerHashes.
   * All remainders are stored for later use.
   */
  while (dividend.length > 0) {
    quotient = Array();
    x = 0;
    for (i = 0; i < dividend.length; i += 1) {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if (quotient.length > 0 || q > 0) {
        quotient[quotient.length] = q;
      }
    }
    remainders[remainders.length] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  output = '';
  for (i = remainders.length - 1; i >= 0; i--) {
    output += encoding.charAt(remainders[i]);
  }

  /* Append leading zero equivalents */
  full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
  for (i = output.length; i < full_length; i += 1) {
    output = encoding[0] + output;
  }
  return output;
}

/**
 * Convert a raw string to a base-64 string
 */

function rstr2b64(input, b64pad) {
  var tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    output = '',
    len = input.length,
    i, j, triplet;
  b64pad = b64pad || '=';
  for (i = 0; i < len; i += 3) {
    triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
    for (j = 0; j < 4; j += 1) {
      if (i * 8 + j * 6 > input.length * 8) {
        output += b64pad;
      } else {
        output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
      }
    }
  }
  return output;
}

module.exports = {
  utf8Encode,
  utf8Decode,
  safe_add,
  bit_rol,
  rstr2hex,
  str2rstr_utf16be,
  str2rstr_utf16le,
  binb2rstr,
  binl2rstr,
  rstr2binb,
  rstr2binl,
  rstr2any,
  rstr2b64,
}


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @member Hashes
 * @class Hashes.SHA1
 * @param {Object} [config]
 * @constructor
 *
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

const tools = __webpack_require__(0)

// private methods

/**
 * Calculate the SHA-512 of a raw string
 */

function rstr(s, utf8) {
  s = (utf8) ? tools.utf8Encode(s) : s;
  return tools.binb2rstr(binb(tools.rstr2binb(s), s.length * 8));
}

/**
 * Calculate the HMAC-SHA1 of a key and some data (raw strings)
 */

function rstr_hmac(key, data, utf8) {
  var bkey, ipad, opad, i, hash;
  key = (utf8) ? tools.utf8Encode(key) : key;
  data = (utf8) ? tools.utf8Encode(data) : data;
  bkey = tools.rstr2binb(key);

  if (bkey.length > 16) {
    bkey = binb(bkey, key.length * 8);
  }
  ipad = Array(16), opad = Array(16);
  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }
  hash = binb(ipad.concat(tools.rstr2binb(data)), 512 + data.length * 8);
  return tools.binb2rstr(binb(opad.concat(hash), 512 + 160));
}

/**
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */

function binb(x, len) {
  var i, j, t, olda, oldb, oldc, oldd, olde,
    w = Array(80),
    a = 1732584193,
    b = -271733879,
    c = -1732584194,
    d = 271733878,
    e = -1009589776;

  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    olde = e;

    for (j = 0; j < 80; j += 1) {
      if (j < 16) {
        w[j] = x[i + j];
      } else {
        w[j] = tools.bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
      }
      t = tools.safe_add(tools.safe_add(tools.bit_rol(a, 5), sha1_ft(j, b, c, d)),
        tools.safe_add(tools.safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = tools.bit_rol(b, 30);
      b = a;
      a = t;
    }

    a = tools.safe_add(a, olda);
    b = tools.safe_add(b, oldb);
    c = tools.safe_add(c, oldc);
    d = tools.safe_add(d, oldd);
    e = tools.safe_add(e, olde);
  }
  return Array(a, b, c, d, e);
}

/**
 * Perform the appropriate triplet combination function for the current
 * iteration
 */

function sha1_ft(t, b, c, d) {
  if (t < 20) {
    return (b & c) | ((~b) & d);
  }
  if (t < 40) {
    return b ^ c ^ d;
  }
  if (t < 60) {
    return (b & c) | (b & d) | (c & d);
  }
  return b ^ c ^ d;
}

/**
 * Determine the appropriate additive constant for the current iteration
 */

function sha1_kt(t) {
  return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
    (t < 60) ? -1894007588 : -899497514;
}


class SHA1 {
  constructor (options) {
    /**
     * Private config properties. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     * See {@link Hashes.MD5#method-setUpperCase} and {@link Hashes.SHA1#method-setUpperCase}
     */
    this.hexcase = (options && typeof options.uppercase === 'boolean') ? options.uppercase : false // hexadecimal output case format. false - lowercase; true - uppercase
    this.b64pad = (options && typeof options.pad === 'string') ? options.pad : '=' // base-64 pad character. Defaults to '=' for strict RFC compliance
    this.utf8 = (options && typeof options.utf8 === 'boolean') ? options.utf8 : true // enable/disable utf8 encoding
  }

  // public methods
  hex(s) {
    return tools.rstr2hex(rstr(s, this.utf8), this.hexcase);
  }

  b64(s) {
    return rstr2b64(rstr(s, this.utf8), b64pad);
  }

  any(s, e) {
    return rstr2any(rstr(s, this.utf8), e);
  }

  raw(s) {
    return rstr(s, utf8);
  }

  hex_hmac(k, d) {
    return tools.rstr2hex(rstr_hmac(k, d, this.utf8));
  }

  b64_hmac(k, d) {
    return rstr2b64(rstr_hmac(k, d, this.utf8), b64pad);
  }

  any_hmac(k, d, e) {
    return rstr2any(rstr_hmac(k, d, this.utf8), e);
  }

  /**
   * Perform a simple self-test to see if the VM is working
   * @return {String} Hexadecimal hash sample
   * @public
   */
  vm_test() {
    return hex('abc').toLowerCase() === '900150983cd24fb0d6963f7d28e17f72';
  }

  /**
   * @description Enable/disable uppercase hexadecimal returned string
   * @param {boolean}
   * @return {Object} this
   * @public
   */
  setUpperCase(a) {
    if (typeof a === 'boolean') {
      this.hexcase = a;
    }
    return this;
  }

  /**
   * @description Defines a base64 pad string
   * @param {string} Pad
   * @return {Object} this
   * @public
   */
  setPad(a) {
    b64pad = a || b64pad;
    return this;
  }

  /**
   * @description Defines a base64 pad string
   * @param {boolean}
   * @return {Object} this
   * @public
   */
  setUTF8(a) {
    if (typeof a === 'boolean') {
      this.utf8 = a;
    }
    return this;
  }
}

module.exports = SHA1


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const sha1Hash = __webpack_require__(2);

Hashes = {
  /**
   * @property {String} version
   * @readonly
   */
  VERSION: '1.0.6',
  SHA1: sha1Hash
}

module.exports = Hashes


/***/ })
/******/ ]);
//# sourceMappingURL=sha1.node.js.map