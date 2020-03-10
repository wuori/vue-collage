module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "20d6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2350":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2f21":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("79e5");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4f50":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);", ""]);

// module
exports.push([module.i, ".vc-slideshow{position:absolute;width:100%;top:0;height:100%;margin:0;padding:0;font-family:Roboto,sans-serif;background:#000}.vc-slideshow .vc-slideshow-h1{text-align:center;width:100%;color:#ff7513;font-size:1.5em}.vc-slideshow .vc-slideshow-h1,.vc-slideshow .vc-slideshow-spinner-wrapper{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.vc-slideshow .vc-slideshow-spinner-wrapper{vertical-align:middle}.vc-slideshow .vc-slideshow-loading-text{font-size:1.5em;color:#ff7513;display:inline-block;margin-left:20px;vertical-align:middle}.vc-slideshow .vc-slideshow-spinner-icon{margin:0 5px;width:1.5em;height:1.5em;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;border:2px solid transparent;border-top-color:#ff7513;border-left-color:#ff7513;border-radius:50%;vertical-align:middle;-webkit-animation:nprogress-spinner .4s linear infinite;animation:nprogress-spinner .4s linear infinite}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(1turn)}}@keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}", ""]);

// exports


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "55dd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var aFunction = __webpack_require__("d8e8");
var toObject = __webpack_require__("4bf8");
var fails = __webpack_require__("79e5");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__("2f21")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5df3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("02f4")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("01f9")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8f05":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("d35e");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("55807efe", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b383":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("4f50");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("7505b44c", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "b9f3":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".vc-slideshow .vc-slideshow-slide-inner{height:100%;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;overflow:hidden;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active{height:100%;width:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-img-animated-wrapper{left:0;top:0;overflow:hidden;position:absolute;width:100%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-img-animated-wrapper img.vc-slideshow-img{width:100%;height:100%;padding:0;-o-object-fit:cover;object-fit:cover;position:absolute;left:0;top:0;-webkit-transition-duration:.5s;transition-duration:.5s;-webkit-transition-property:all;transition-property:all}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple .vc-slideshow-left-column,.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple .vc-slideshow-right-column{overflow:hidden;position:relative}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper{height:calc(50% - .2em);width:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:last-child{top:calc(50% + .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-1 .vc-slideshow-right-column{width:50%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-1 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper{left:.4em}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-1 .vc-slideshow-left-column{width:50%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-1 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{width:100%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-2{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-2 .vc-slideshow-left-column,.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-2 .vc-slideshow-right-column{width:50%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-2 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{width:100%;height:100%;left:.4em}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-3{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-3 .vc-slideshow-right-column{width:30%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-3 .vc-slideshow-left-column{width:70%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-3 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{width:100%;height:100%;left:.4em}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-4 .vc-slideshow-right-column{width:30%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-4 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper{left:.4em}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-4 .vc-slideshow-left-column{width:70%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-4 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{width:100%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-5 .vc-slideshow-right-column{width:66.66667%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-5 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper{width:calc(50% - .4em);height:100%;left:.4em}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-5 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:last-child{left:calc(50% + .4em);top:0}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-5 .vc-slideshow-left-column{width:33.333333%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-triple.vc-slideshow-is-triple-5 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{width:100%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-double .vc-slideshow-img-animated-wrapper{width:50%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-double .vc-slideshow-img-animated-wrapper:last-child{left:calc(50% + .4em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-double.vc-slideshow-is-double-2 .vc-slideshow-img-animated-wrapper{width:30%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-double.vc-slideshow-is-double-2 .vc-slideshow-img-animated-wrapper:last-child{width:70%;left:calc(30% + .4em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-double.vc-slideshow-is-double-3 .vc-slideshow-img-animated-wrapper{width:30%;left:calc(70% + .4em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-double.vc-slideshow-is-double-3 .vc-slideshow-img-animated-wrapper:last-child{width:70%;left:0}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-single img.vc-slideshow-img{-o-object-fit:contain;object-fit:contain}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-single img.vc-slideshow-img.vc-slideshow-is-horizontal{-o-object-fit:cover;object-fit:cover}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four .vc-slideshow-left-column,.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four .vc-slideshow-right-column{width:50%;height:100%;overflow:hidden;position:relative}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-1 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper,.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-1 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper{height:calc(50% - .2em);width:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-1 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper:last-child,.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-1 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:last-child{top:calc(50% + .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-1 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{width:calc(100% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-1 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper{left:.2em}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-2 .vc-slideshow-left-column{width:70%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-2 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{width:calc(100% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-2 .vc-slideshow-right-column{width:30%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-2 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper{left:.2em}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-2 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:first-child{height:calc(33.33333% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-2 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(2){height:calc(33.33333% - .2em);top:calc(33.33333% + .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-2 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(3){height:calc(33.33333% - .2em);top:calc(66.66667% + .4em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-3{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-3 .vc-slideshow-left-column{width:70%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-3 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{left:.2em;width:calc(100% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-3 .vc-slideshow-right-column{width:30%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-3 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper{width:calc(100% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-3 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:first-child{height:calc(33.33333% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-3 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(2){height:calc(33.33333% - .2em);top:calc(33.33333% + .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-3 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(3){height:calc(33.33333% - .2em);top:calc(66.66667% + .4em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-4 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{width:calc(100% - .2em);height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-4 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper{left:.2em}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-4 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:first-child{height:calc(50% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-4 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(2){height:50%;top:calc(50% + .2em);width:calc(50% - .4em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-4 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(3){height:50%;top:calc(50% + .2em);width:50%;left:calc(50% + .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-5{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-5 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{left:.2em;width:100%;height:100%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-5 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:first-child{height:calc(50% - .2em);width:calc(100% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-5 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(2){height:50%;top:calc(50% + .2em);width:calc(50% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-four.vc-slideshow-is-four-5 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(3){height:50%;top:calc(50% + .2em);width:calc(50% - .4em);left:calc(50% + .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five .vc-slideshow-center-column,.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five .vc-slideshow-left-column,.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five .vc-slideshow-right-column{overflow:hidden;position:relative}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-1 .vc-slideshow-center-column,.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-1 .vc-slideshow-left-column,.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-1 .vc-slideshow-right-column{height:100%;width:33.33333%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-1 .vc-slideshow-center-column .ivc-slideshow-mg-animated-wrapper{width:calc(100% - .4em);left:.2em}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-1 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{height:calc(50% - .2em);width:calc(100% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-1 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper:nth-child(2){top:calc(50% + .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-1 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper{left:.2em;height:calc(50% - .2em);width:calc(100% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-1 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(2){top:calc(50% + .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-3 .vc-slideshow-left-column,.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-3 .vc-slideshow-right-column{height:100%;width:50%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-3 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{height:100%;width:calc(100% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-3 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper{left:.2em;height:calc(50% - .2em);width:calc(100% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-3 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:first-child{height:calc(50% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-3 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(2){top:calc(50% + .2em);height:calc(25% - .2em);width:calc(50% - .4em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-3 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(3){top:calc(50% + .2em);left:calc(50% + .2em);width:50%;height:calc(50% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-3 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(4){top:calc(75% + .4em);height:calc(25% - .2em);width:calc(50% - .4em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-2{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-2 .vc-slideshow-left-column,.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-2 .vc-slideshow-right-column{height:100%;width:50%}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-2 .vc-slideshow-left-column .vc-slideshow-img-animated-wrapper{height:100%;left:.2em;width:calc(100% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-2 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper{height:calc(50% - .2em);width:calc(100% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-2 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:first-child{height:calc(50% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-2 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(2){top:calc(50% + .2em);height:calc(25% - .2em);width:calc(50% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-2 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(3){top:calc(50% + .2em);left:calc(50% + .2em);width:calc(50% - .4em);height:calc(50% - .2em)}.vc-slideshow .vc-slideshow-slide.vc-slideshow-active .vc-slideshow-is-five.vc-slideshow-is-five-2 .vc-slideshow-right-column .vc-slideshow-img-animated-wrapper:nth-child(4){top:calc(75% + .4em);height:calc(25% - .2em);width:calc(50% - .2em)}", ""]);

// exports


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d35e":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".vc-slideshow .vc-slideshow-slide-left-enter,.vc-slideshow .vc-slideshow-slide-right-leave-active{left:-100%!important}.vc-slideshow .vc-slideshow-slide-left-leave-active,.vc-slideshow .vc-slideshow-slide-right-enter{left:100%!important}.vc-slideshow .vc-slideshow-slide-bottom-leave-active,.vc-slideshow .vc-slideshow-slide-top-enter{top:-100%!important}.vc-slideshow .vc-slideshow-slide-bottom-enter,.vc-slideshow .vc-slideshow-slide-top-leave-active{top:100%!important}", ""]);

// exports


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e4c66-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=4e322df8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vc-slideshow",style:({height: _vm.height})},[_c('transition',{attrs:{"name":"fade"}},[(_vm.noImages  && !_vm.isLoading && _vm.showNoImagesMsg)?_vm._t("empty",[_c('div',{staticClass:"vc-slideshow-h1"},[_vm._v("\n                "+_vm._s(_vm.noImagesMsg)+"\n            ")])]):_vm._e()],2),(_vm.showLoadingMsg && _vm.isLoading)?_vm._t("loader",[_c('loading-spinner',{attrs:{"delay":1500,"loader":_vm.isLoading,"text":_vm.loadingMsg}})]):_vm._e(),_c('div',{class:['vc-slideshow-slide', 'vc-slideshow-active']},[_c(_vm.slideTemplate(_vm.slide.length),{tag:"component",attrs:{"animationDuration":_vm.animationDuration,"status":_vm.status,"images":_vm.slide}})],1)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=4e322df8&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.iterator.js
var es6_string_iterator = __webpack_require__("5df3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e4c66-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/slides/SimpleSlide.vue?vue&type=template&id=92229f92&
var SimpleSlidevue_type_template_id_92229f92_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['vc-slideshow-slide-inner', _vm.slideClass]},_vm._l((_vm.images),function(img,idx){return _c('div',{key:idx,staticClass:"vc-slideshow-img-animated-wrapper"},[_c('slide-animation',{attrs:{"animationDuration":_vm.animationDuration}},[(_vm.showImages)?_c('img',{class:['vc-slideshow-img',{'vc-slideshow-is-vertical': img.isVertical, 'vc-slideshow-is-horizontal': img.isHorizontal}],attrs:{"src":img.image}}):_vm._e()])],1)}),0)}
var SimpleSlidevue_type_template_id_92229f92_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/slides/SimpleSlide.vue?vue&type=template&id=92229f92&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.sort.js
var es6_array_sort = __webpack_require__("55dd");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e4c66-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SlideAnimation.vue?vue&type=template&id=6035ef56&
var SlideAnimationvue_type_template_id_6035ef56_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"functional":"","css":false},on:{"enter":_vm.enterEl,"leave":_vm.leaveEl,"before-enter":_vm.beforeEnterEl}},[_vm._t("default")],2)}
var SlideAnimationvue_type_template_id_6035ef56_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SlideAnimation.vue?vue&type=template&id=6035ef56&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SlideAnimation.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
var animations = [];
/* harmony default export */ var SlideAnimationvue_type_script_lang_js_ = ({
  name: 'SlideAnimation',
  props: ['animationDuration'],
  created: function created() {
    animations = [{
      name: 'left',
      isTaken: false
    }, {
      name: 'right',
      isTaken: false
    }, {
      name: 'top',
      isTaken: false
    }, {
      name: 'bottom',
      isTaken: false
    }];
  },
  methods: {
    getRandomElement: function getRandomElement(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    getAnimation: function getAnimation(el) {
      var freeAnimations = animations.filter(function (item) {
        return !item.isTaken;
      });
      var animation = freeAnimations.length > 0 ? this.getRandomElement(freeAnimations) : this.getRandomElement(animations); //                console.log('freeAnimations', freeAnimations);

      animation.isTaken = true;
      el.classList.add("vc-slideshow-slide-".concat(animation.name, "-enter"));
      el.setAttribute('data-animation', animation.name); //                console.log('animation', animation.name);

      return animation.name;
    },
    beforeEnterEl: function beforeEnterEl(el) {
      this.getAnimation(el);
    },
    enterEl: function enterEl(el, done) {
      setTimeout(function () {
        var animationName = el.getAttribute('data-animation'); //                   console.log('enterEl', animationName);

        el.classList.remove("vc-slideshow-slide-".concat(animationName, "-enter"));
        done();
      }, 100);
    },
    leaveEl: function leaveEl(el, done) {
      //exit animation
      var animationName = el.getAttribute('data-animation'); //console.log('leave', animationName);

      el.classList.add("vc-slideshow-slide-".concat(animationName, "-leave-active"));
      setTimeout(function () {
        //                   console.log('done');
        done();
      }, this.animationDuration);
    }
  }
});
// CONCATENATED MODULE: ./src/components/SlideAnimation.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SlideAnimationvue_type_script_lang_js_ = (SlideAnimationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/SlideAnimation.vue





/* normalize component */

var component = normalizeComponent(
  components_SlideAnimationvue_type_script_lang_js_,
  SlideAnimationvue_type_template_id_6035ef56_render,
  SlideAnimationvue_type_template_id_6035ef56_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SlideAnimation = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/slides/SimpleSlide.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SimpleSlidevue_type_script_lang_js_ = ({
  //a slide with one or two images
  name: 'SimpleSlide',
  props: ['images', 'slidesInterval', 'status', 'animationDuration'],
  components: {
    SlideAnimation: SlideAnimation
  },
  created: function created() {
    var _this = this;

    setTimeout(function () {
      _this.showImages = true;
    }, 10);
  },
  computed: {
    horizontalImages: function horizontalImages() {
      return this.images.filter(function (item) {
        return item.isHorizontal;
      });
    },
    verticalImages: function verticalImages() {
      return this.images.filter(function (item) {
        return item.isVertical;
      });
    },
    slideClass: function slideClass() {
      switch (this.images.length) {
        case 1:
          return 'vc-slideshow-is-single';
        //vertical image is always goes first (in order to contain maximum 50%, usually 30%, of the screen width)

        case 2:
          if (this.verticalImages.length > 0) {
            this.setFirstVertical(this.images);
            return "vc-slideshow-is-double vc-slideshow-is-double-".concat(this.getRandomInt(1, 3));
          } else {
            //use 50|50 template if there are no vertical images
            return "vc-slideshow-is-double vc-slideshow-is-double-1";
          }

      }
    }
  },
  watch: {},
  data: function data() {
    return {
      showImages: false
    };
  },
  methods: {
    replaceVerticalsInPositions: function replaceVerticalsInPositions(neededIdxs) {
      var _this2 = this;

      if (!neededIdxs || neededIdxs.length == 0 || this.horizontalImages.length == 0) return;
      neededIdxs.forEach(function (idx) {
        if (_this2.images[idx] && _this2.images[idx].isVertical) {
          //find indexes of horizontal images
          var horizontalIdxs = _this2.horizontalImages.map(function (item) {
            return _this2.images.indexOf(item);
          }); //remove indexes which already are in appropriate places


          horizontalIdxs = horizontalIdxs.filter(function (el) {
            return !neededIdxs.includes(el);
          }); //                        console.log('horizontalIdxs', horizontalIdxs);
          //swap any horizontal image with founded vertical

          var horizontalIdx = horizontalIdxs[0];

          if (horizontalIdx != null) {
            var _ref = [_this2.images[horizontalIdx], _this2.images[idx]];
            _this2.images[idx] = _ref[0];
            _this2.images[horizontalIdx] = _ref[1];
          } //                        console.log('swap', horizontalIdxs[0], '->', idx);

        }
      });
    },
    setFirstVertical: function setFirstVertical(slide) {
      slide.sort(function (x, y) {
        return x.isVertical ? -1 : y.isVertical ? 1 : 0;
      });
    },
    setFirstHorizontal: function setFirstHorizontal(slide) {
      slide.sort(function (x, y) {
        return x.isHorizontal ? -1 : y.isHorizontal ? 1 : 0;
      });
    },
    getRandomInt: function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
});
// CONCATENATED MODULE: ./src/components/slides/SimpleSlide.vue?vue&type=script&lang=js&
 /* harmony default export */ var slides_SimpleSlidevue_type_script_lang_js_ = (SimpleSlidevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/slides/SimpleSlide.vue





/* normalize component */

var SimpleSlide_component = normalizeComponent(
  slides_SimpleSlidevue_type_script_lang_js_,
  SimpleSlidevue_type_template_id_92229f92_render,
  SimpleSlidevue_type_template_id_92229f92_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SimpleSlide = (SimpleSlide_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e4c66-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/slides/TripleSlide.vue?vue&type=template&id=2eae08d8&
var TripleSlidevue_type_template_id_2eae08d8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['vc-slideshow-slide-inner', 'vc-slideshow-is-triple', _vm.slideClass]},[_c('div',{staticClass:"vc-slideshow-left-column"},_vm._l((_vm.leftColumn),function(img,idx){return _c('div',{key:idx,staticClass:"vc-slideshow-img-animated-wrapper"},[_c('slide-animation',{attrs:{"animationDuration":_vm.animationDuration}},[(_vm.showImages)?_c('img',{staticClass:"vc-slideshow-img",attrs:{"src":img.image}}):_vm._e()])],1)}),0),_c('div',{staticClass:"vc-slideshow-right-column"},_vm._l((_vm.rightColumn),function(img,idx){return _c('div',{key:idx,staticClass:"vc-slideshow-img-animated-wrapper"},[_c('slide-animation',{attrs:{"animationDuration":_vm.animationDuration}},[(_vm.showImages)?_c('img',{staticClass:"vc-slideshow-img",attrs:{"src":img.image}}):_vm._e()])],1)}),0)])}
var TripleSlidevue_type_template_id_2eae08d8_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/slides/TripleSlide.vue?vue&type=template&id=2eae08d8&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/slides/TripleSlide.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var TripleSlidevue_type_script_lang_js_ = ({
  name: 'TripleSlide',
  mixins: [SimpleSlide],
  computed: {
    slideClass: function slideClass() {
      //for three vertical images in the row
      if (this.verticalImages.length == 3) {
        return "vc-slideshow-is-triple-5";
      } // if a slide has the only one vertical img - use templates that doesn't use 3/4 of a slide width for it


      if (this.verticalImages.length == 1) {
        this.setFirstVertical(this.images);
        return "vc-slideshow-is-triple-".concat(this.getRandomInt(1, 2));
      }

      var rndType = this.getRandomInt(1, 4); // use horizontal image for the 3/4 of a slide width

      if (rndType >= 3) this.setFirstHorizontal(this.images);
      return "vc-slideshow-is-triple-".concat(rndType);
    },
    leftColumn: function leftColumn() {
      return this.images.slice(0, 1);
    },
    rightColumn: function rightColumn() {
      return this.images.slice(1);
    }
  }
});
// CONCATENATED MODULE: ./src/components/slides/TripleSlide.vue?vue&type=script&lang=js&
 /* harmony default export */ var slides_TripleSlidevue_type_script_lang_js_ = (TripleSlidevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/slides/TripleSlide.vue





/* normalize component */

var TripleSlide_component = normalizeComponent(
  slides_TripleSlidevue_type_script_lang_js_,
  TripleSlidevue_type_template_id_2eae08d8_render,
  TripleSlidevue_type_template_id_2eae08d8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TripleSlide = (TripleSlide_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e4c66-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/slides/FourImagesSlide.vue?vue&type=template&id=acdcd1a4&
var FourImagesSlidevue_type_template_id_acdcd1a4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['vc-slideshow-slide-inner', 'vc-slideshow-is-four', ("vc-slideshow-is-four-" + _vm.slideClass)]},[_c('div',{staticClass:"vc-slideshow-left-column"},_vm._l((_vm.leftColumn),function(img,idx){return _c('div',{key:idx,staticClass:"vc-slideshow-img-animated-wrapper"},[_c('slide-animation',{attrs:{"animationDuration":_vm.animationDuration}},[(_vm.showImages)?_c('img',{staticClass:"vc-slideshow-img",attrs:{"src":img.image}}):_vm._e()])],1)}),0),_c('div',{staticClass:"vc-slideshow-right-column"},_vm._l((_vm.rightColumn),function(img,idx){return _c('div',{key:idx,staticClass:"vc-slideshow-img-animated-wrapper"},[_c('slide-animation',{attrs:{"animationDuration":_vm.animationDuration}},[(_vm.showImages)?_c('img',{staticClass:"vc-slideshow-img",attrs:{"src":img.image}}):_vm._e()])],1)}),0)])}
var FourImagesSlidevue_type_template_id_acdcd1a4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/slides/FourImagesSlide.vue?vue&type=template&id=acdcd1a4&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/slides/FourImagesSlide.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var FourImagesSlidevue_type_script_lang_js_ = ({
  name: 'FourImagesSlide',
  mixins: [SimpleSlide],
  computed: {
    slideClass: function slideClass() {
      if (this.verticalImages.length > 0) {
        this.setFirstVertical(this.images);
        this.replaceVerticalsInPositions([1]);
        return "".concat(this.getRandomInt(4, 5));
      }

      return "".concat(this.getRandomInt(1, 5));
    },
    leftColumn: function leftColumn() {
      return this.slideClass == 1 ? this.images.slice(0, 2) : this.images.slice(0, 1);
    },
    rightColumn: function rightColumn() {
      return this.slideClass == 1 ? this.images.slice(2) : this.images.slice(1);
    }
  }
});
// CONCATENATED MODULE: ./src/components/slides/FourImagesSlide.vue?vue&type=script&lang=js&
 /* harmony default export */ var slides_FourImagesSlidevue_type_script_lang_js_ = (FourImagesSlidevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/slides/FourImagesSlide.vue





/* normalize component */

var FourImagesSlide_component = normalizeComponent(
  slides_FourImagesSlidevue_type_script_lang_js_,
  FourImagesSlidevue_type_template_id_acdcd1a4_render,
  FourImagesSlidevue_type_template_id_acdcd1a4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FourImagesSlide = (FourImagesSlide_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e4c66-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/slides/FiveImagesSlide.vue?vue&type=template&id=8ff2ecd4&
var FiveImagesSlidevue_type_template_id_8ff2ecd4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['vc-slideshow-slide-inner', 'vc-slideshow-is-five', ("vc-slideshow-is-five-" + _vm.slideClass)]},[_c('div',{staticClass:"vc-slideshow-left-column"},_vm._l((_vm.leftColumn),function(img,idx){return _c('div',{key:idx,staticClass:"vc-slideshow-img-animated-wrapper"},[_c('slide-animation',{attrs:{"animationDuration":_vm.animationDuration}},[(_vm.showImages)?_c('img',{staticClass:"vc-slideshow-img",attrs:{"src":img.image,"data-idx":img.idx}}):_vm._e()])],1)}),0),(_vm.centerImg)?_c('div',{staticClass:"vc-slideshow-center-column"},[_c('div',{staticClass:"vc-slideshow-img-animated-wrapper"},[_c('slide-animation',{attrs:{"animationDuration":_vm.animationDuration}},[(_vm.showImages)?_c('img',{staticClass:"vc-slideshow-img",attrs:{"src":_vm.centerImg.image,"data-idx":_vm.centerImg.idx}}):_vm._e()])],1)]):_vm._e(),_c('div',{staticClass:"vc-slideshow-right-column"},_vm._l((_vm.rightColumn),function(img,idx){return _c('div',{key:idx,staticClass:"vc-slideshow-img-animated-wrapper"},[_c('slide-animation',{attrs:{"animationDuration":_vm.animationDuration}},[(_vm.showImages)?_c('img',{staticClass:"vc-slideshow-img",attrs:{"src":img.image,"data-idx":img.idx}}):_vm._e()])],1)}),0)])}
var FiveImagesSlidevue_type_template_id_8ff2ecd4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/slides/FiveImagesSlide.vue?vue&type=template&id=8ff2ecd4&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find-index.js
var es6_array_find_index = __webpack_require__("20d6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/slides/FiveImagesSlide.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var FiveImagesSlidevue_type_script_lang_js_ = ({
  name: 'FiveImagesSlide',
  mixins: [SimpleSlide],
  computed: {
    slideClass: function slideClass() {
      var rndInt = this.getRandomInt(1, 3); //the best template for the case when there is only one vertical image
      //do not use other templates if there are only a few horizontal images

      if (this.verticalImages.length == 1 || this.horizontalImages.length < 3) {
        rndInt = 1;
      } //do not use template 1 if there are no vertical images


      if (this.verticalImages.length == 0) rndInt = this.getRandomInt(2, 3);

      if (rndInt == 1) {
        this.swapMiddleImageWithVertical();
      } else {
        this.replaceVerticalsInPositions([1, 2, 4]);
      }

      return "".concat(rndInt);
    },
    leftColumn: function leftColumn() {
      return this.slideClass == 1 ? this.images.slice(0, 2) : this.images.slice(0, 1);
    },
    centerImg: function centerImg() {
      return this.slideClass == 1 && this.images[2] != null ? this.images[2] : null;
    },
    rightColumn: function rightColumn() {
      return this.slideClass == 1 ? this.images.slice(3) : this.images.slice(1);
    }
  },
  methods: {
    swapMiddleImageWithVertical: function swapMiddleImageWithVertical() {
      var verticalImageIdx = this.images.findIndex(function (img) {
        return img.isVertical;
      });

      if (verticalImageIdx >= 0 && this.images[2] != null) {
        var _ref = [this.images[verticalImageIdx], this.images[2]];
        this.images[2] = _ref[0];
        this.images[verticalImageIdx] = _ref[1];
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/slides/FiveImagesSlide.vue?vue&type=script&lang=js&
 /* harmony default export */ var slides_FiveImagesSlidevue_type_script_lang_js_ = (FiveImagesSlidevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/slides/FiveImagesSlide.vue





/* normalize component */

var FiveImagesSlide_component = normalizeComponent(
  slides_FiveImagesSlidevue_type_script_lang_js_,
  FiveImagesSlidevue_type_template_id_8ff2ecd4_render,
  FiveImagesSlidevue_type_template_id_8ff2ecd4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FiveImagesSlide = (FiveImagesSlide_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"386e4c66-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LoadingSpinner.vue?vue&type=template&id=539aacf2&
var LoadingSpinnervue_type_template_id_539aacf2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showLoader),expression:"showLoader"}],staticClass:"vc-slideshow-spinner-wrapper"},[_c('div',{staticClass:"vc-slideshow-spinner-icon"}),(_vm.text)?_c('div',{staticClass:"vc-slideshow-loading-text"},[_vm._v(_vm._s(_vm.text))]):_vm._e()])}
var LoadingSpinnervue_type_template_id_539aacf2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/LoadingSpinner.vue?vue&type=template&id=539aacf2&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LoadingSpinner.vue?vue&type=script&lang=js&
//
//
//
//
//
//
/* harmony default export */ var LoadingSpinnervue_type_script_lang_js_ = ({
  props: ['text', 'delay', 'loader'],
  computed: {
    isLoading: function isLoading() {
      return this.loader;
    }
  },
  watch: {
    isLoading: {
      immediate: true,
      handler: function handler(newVal) {
        var _this = this;

        if (newVal && this.delay) {
          this.delayTimeout = setTimeout(function () {
            _this.showLoader = true;
          }, this.delay);
        } else if (!newVal && this.delay) {
          clearTimeout(this.delayTimeout);
          this.showLoader = false;
        } else {
          this.showLoader = true;
        }
      }
    }
  },
  data: function data() {
    return {
      delayTimeout: null,
      showLoader: !this.delay || !this.loader
    };
  }
});
// CONCATENATED MODULE: ./src/components/LoadingSpinner.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_LoadingSpinnervue_type_script_lang_js_ = (LoadingSpinnervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/LoadingSpinner.vue





/* normalize component */

var LoadingSpinner_component = normalizeComponent(
  components_LoadingSpinnervue_type_script_lang_js_,
  LoadingSpinnervue_type_template_id_539aacf2_render,
  LoadingSpinnervue_type_template_id_539aacf2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var LoadingSpinner = (LoadingSpinner_component.exports);
// EXTERNAL MODULE: ./src/assets/main.scss
var main = __webpack_require__("b383");

// EXTERNAL MODULE: ./src/assets/slides.scss
var slides = __webpack_require__("fe49");

// EXTERNAL MODULE: ./src/assets/animation.scss
var animation = __webpack_require__("8f05");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: 'VueCollage',
  components: {
    SimpleSlide: SimpleSlide,
    TripleSlide: TripleSlide,
    FourImagesSlide: FourImagesSlide,
    LoadingSpinner: LoadingSpinner,
    FiveImagesSlide: FiveImagesSlide
  },
  props: {
    images: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      default: '600px'
    },
    collageSizeMin: {
      type: Number,
      default: 1,
      validator: function validator(value) {
        return value >= 1 && value <= 5;
      }
    },
    collageSizeMax: {
      type: Number,
      default: 5,
      validator: function validator(value) {
        return value >= 1 && value <= 5;
      }
    },
    noImagesMsg: {
      type: String,
      default: 'No Images'
    },
    showNoImagesMsg: {
      type: Boolean,
      default: true
    },
    showLoadingMsg: {
      type: Boolean,
      default: true
    },
    loadingMsg: {
      type: String,
      default: 'Loading...'
    }
  },
  data: function data() {
    return {
      slide: {},
      isLoading: false,
      status: 0,
      //  0 = idle, 1 = running, 2 = paused, 3 = resumed
      animationDuration: 500
    };
  },
  computed: {
    noImages: function noImages() {
      return !this.images || this.images.length <= 0;
    }
  },
  created: function created() {
    var _this = this;

    if (this.noImages) return;
    this.isLoading = true;
    this.loadImages(this.images).then(function (values) {
      _this.createCollage(values.filter(function (item) {
        return !item.is_error;
      }));
    }).catch(function () {//console.log(er);
    }).finally(function () {
      _this.isLoading = false;
    });
  },
  methods: {
    slideTemplate: function slideTemplate(count) {
      switch (count) {
        case 3:
          return 'TripleSlide';

        case 4:
          return 'FourImagesSlide';

        case 5:
          return 'FiveImagesSlide';

        default:
          return 'SimpleSlide';
      }
    },
    loadImage: function loadImage(src) {
      return new Promise(function (resolve) {
        var img = new Image();

        img.onload = function () {
          var isHorizontal = this.width >= this.height;
          resolve({
            image: src,
            isHorizontal: isHorizontal,
            isVertical: !isHorizontal
          });
        };

        img.onerror = function () {
          resolve({
            image: src,
            is_error: true
          });
        };

        img.src = src;
      });
    },
    loadImages: function loadImages(images) {
      var _this2 = this;

      var promises = [];
      images.forEach(function (item) {
        promises.push(_this2.loadImage(item.image));
      });
      return Promise.all(promises);
    },
    createCollage: function createCollage(images) {
      var index = 0;
      var size = this.collageSizeMin;
      size = this.collageSizeMax > this.images.length ? this.images.length : this.collageSizeMax;
      var slide = images.slice(index, size + index);
      this.slide = slide;
    }
  }
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/App.vue





/* normalize component */

var App_component = normalizeComponent(
  src_Appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (App_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (App);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "fe49":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("b9f3");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("2a75d72c", content, true, {"sourceMap":false,"shadowMode":false});

/***/ })

/******/ })["default"];
//# sourceMappingURL=VueCollage.common.js.map