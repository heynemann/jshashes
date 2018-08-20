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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @member Hashes
 * @class MD5
 * @constructor
 * @param {Object} [config]
 *
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * See <http://pajhome.org.uk/crypt/md5> for more infHashes.
 */

const tools = __webpack_require__(0)

// private methods

/**
 * Calculate the MD5 of a raw string
 */

function rstr(s, utf8) {
  s = (utf8) ? tools.utf8Encode(s) : s;
  return tools.binl2rstr(binl(tools.rstr2binl(s), s.length * 8));
}

/**
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */

function rstr_hmac(key, data, utf8) {
  var bkey, ipad, opad, hash, i;

  key = (utf8) ? tools.utf8Encode(key) : key;
  data = (utf8) ? tools.utf8Encode(data) : data;
  bkey = tools.rstr2binl(key);
  if (bkey.length > 16) {
    bkey = binl(bkey, key.length * 8);
  }

  ipad = Array(16), opad = Array(16);
  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }
  hash = binl(ipad.concat(tools.rstr2binl(data)), 512 + data.length * 8);
  return tools.binl2rstr(binl(opad.concat(hash), 512 + 128));
}

/**
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */

function binl(x, len) {
  var i, olda, oldb, oldc, oldd,
    a = 1732584193,
    b = -271733879,
    c = -1732584194,
    d = 271733878;

  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = tools.safe_add(a, olda);
    b = tools.safe_add(b, oldb);
    c = tools.safe_add(c, oldc);
    d = tools.safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/**
 * These functions implement the four basic operations the algorithm uses.
 */

function md5_cmn(q, a, b, x, s, t) {
  return tools.safe_add(tools.bit_rol(tools.safe_add(tools.safe_add(a, q), tools.safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

class MD5 {
  constructor(options) {
    /**
     * Private config properties. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     * See {@link Hashes.MD5#method-setUpperCase} and {@link Hashes.SHA1#method-setUpperCase}
     */
    this.hexcase = (options && typeof options.uppercase === 'boolean') ? options.uppercase : false; // hexadecimal output case format. false - lowercase; true - uppercase
    this.b64pad = (options && typeof options.pad === 'string') ? options.pad : '='; // base-64 pad character. Defaults to '=' for strict RFC compliance
    this.utf8 = (options && typeof options.utf8 === 'boolean') ? options.utf8 : true; // enable/disable utf8 encoding
  }

  // privileged (public) methods
  hex(s) {
    return tools.rstr2hex(rstr(s, this.utf8), this.hexcase);
  }

  b64(s) {
    return rstr2b64(rstr(s, this.utf8), this.b64pad);
  }

  any(s, e) {
    return rstr2any(rstr(s, this.utf8, this.utf8), e);
  }

  raw(s) {
    return rstr(s, this.utf8);
  }

  hex_hmac(k, d) {
    return tools.rstr2hex(rstr_hmac(k, d, this.utf8), this.hexcase);
  }

  b64_hmac(k, d) {
    return rstr2b64(rstr_hmac(k, d, this.utf8), this.b64pad);
  }

  any_hmac(k, d, e) {
    return rstr2any(rstr_hmac(k, d, this.utf8), e);
  }

  /**
   * Perform a simple self-test to see if the VM is working
   * @return {String} Hexadecimal hash sample
   */
  vm_test() {
    return hex('abc').toLowerCase() === '900150983cd24fb0d6963f7d28e17f72';
  }

  /**
   * Enable/disable uppercase hexadecimal returned string
   * @param {Boolean}
   * @return {Object} this
   */
  setUpperCase(a) {
    if (typeof a === 'boolean') {
      this.hexcase = a;
    }
    return this;
  }

  /**
   * Defines a base64 pad string
   * @param {String} Pad
   * @return {Object} this
   */
  setPad(a) {
    this.b64pad = a || this.b64pad;
    return this;
  }

  /**
   * Defines a base64 pad string
   * @param {Boolean}
   * @return {Object} [this]
   */
  setUTF8(a) {
    if (typeof a === 'boolean') {
      this.utf8 = a;
    }
    return this;
  }
}

module.exports = MD5


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const md5Hash = __webpack_require__(1);

Hashes = {
  /**
   * @property {String} version
   * @readonly
   */
  VERSION: '1.0.6',
  MD5: md5Hash
}

module.exports = Hashes


/***/ })
/******/ ]);
//# sourceMappingURL=md5.js.map