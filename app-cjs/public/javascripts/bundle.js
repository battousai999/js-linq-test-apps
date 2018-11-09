(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("regenerator-runtime/runtime");

require("core-js/fn/regexp/escape");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"core-js/fn/regexp/escape":2,"core-js/shim":325,"regenerator-runtime/runtime":326}],2:[function(require,module,exports){
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;

},{"../../modules/_core":23,"../../modules/core.regexp.escape":128}],3:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],4:[function(require,module,exports){
var cof = require('./_cof');
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

},{"./_cof":18}],5:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_hide":42,"./_wks":126}],6:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],7:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":51}],8:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"./_to-absolute-index":111,"./_to-length":115,"./_to-object":116}],9:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-absolute-index":111,"./_to-length":115,"./_to-object":116}],10:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":39}],11:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
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

},{"./_to-absolute-index":111,"./_to-iobject":114,"./_to-length":115}],12:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
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

},{"./_array-species-create":15,"./_ctx":25,"./_iobject":47,"./_to-length":115,"./_to-object":116}],13:[function(require,module,exports){
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var toLength = require('./_to-length');

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

},{"./_a-function":3,"./_iobject":47,"./_to-length":115,"./_to-object":116}],14:[function(require,module,exports){
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

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

},{"./_is-array":49,"./_is-object":51,"./_wks":126}],15:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":14}],16:[function(require,module,exports){
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":3,"./_invoke":46,"./_is-object":51}],17:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":18,"./_wks":126}],18:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],19:[function(require,module,exports){
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_an-instance":6,"./_ctx":25,"./_descriptors":29,"./_for-of":39,"./_iter-define":55,"./_iter-step":57,"./_meta":65,"./_object-create":70,"./_object-dp":71,"./_redefine-all":90,"./_set-species":97,"./_validate-collection":123}],20:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof');
var from = require('./_array-from-iterable');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"./_array-from-iterable":10,"./_classof":17}],21:[function(require,module,exports){
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_an-instance":6,"./_an-object":7,"./_array-methods":12,"./_for-of":39,"./_has":41,"./_is-object":51,"./_meta":65,"./_redefine-all":90,"./_validate-collection":123}],22:[function(require,module,exports){
'use strict';
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_an-instance":6,"./_export":33,"./_fails":35,"./_for-of":39,"./_global":40,"./_inherit-if-required":45,"./_is-object":51,"./_iter-detect":56,"./_meta":65,"./_redefine":91,"./_redefine-all":90,"./_set-to-string-tag":98}],23:[function(require,module,exports){
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],24:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":71,"./_property-desc":89}],25:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
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

},{"./_a-function":3}],26:[function(require,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = require('./_fails');
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

},{"./_fails":35}],27:[function(require,module,exports){
'use strict';
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"./_an-object":7,"./_to-primitive":117}],28:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],29:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":35}],30:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":40,"./_is-object":51}],31:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],32:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":77,"./_object-keys":80,"./_object-pie":81}],33:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
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

},{"./_core":23,"./_ctx":25,"./_global":40,"./_hide":42,"./_redefine":91}],34:[function(require,module,exports){
var MATCH = require('./_wks')('match');
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

},{"./_wks":126}],35:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],36:[function(require,module,exports){
'use strict';
var hide = require('./_hide');
var redefine = require('./_redefine');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./_defined":28,"./_fails":35,"./_hide":42,"./_redefine":91,"./_wks":126}],37:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":7}],38:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_ctx":25,"./_is-array":49,"./_is-object":51,"./_to-length":115,"./_wks":126}],39:[function(require,module,exports){
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_an-object":7,"./_ctx":25,"./_is-array-iter":48,"./_iter-call":53,"./_to-length":115,"./core.get-iterator-method":127}],40:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],41:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],42:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":29,"./_object-dp":71,"./_property-desc":89}],43:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":40}],44:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":29,"./_dom-create":30,"./_fails":35}],45:[function(require,module,exports){
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":51,"./_set-proto":96}],46:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],47:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":18}],48:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":58,"./_wks":126}],49:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":18}],50:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":51}],51:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],52:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_cof":18,"./_is-object":51,"./_wks":126}],53:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":7}],54:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":42,"./_object-create":70,"./_property-desc":89,"./_set-to-string-tag":98,"./_wks":126}],55:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
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

},{"./_export":33,"./_hide":42,"./_iter-create":54,"./_iterators":58,"./_library":59,"./_object-gpo":78,"./_redefine":91,"./_set-to-string-tag":98,"./_wks":126}],56:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":126}],57:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],58:[function(require,module,exports){
module.exports = {};

},{}],59:[function(require,module,exports){
module.exports = false;

},{}],60:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],61:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var sign = require('./_math-sign');
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"./_math-sign":64}],62:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],63:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

},{}],64:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],65:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":35,"./_has":41,"./_is-object":51,"./_object-dp":71,"./_uid":121}],66:[function(require,module,exports){
var Map = require('./es6.map');
var $export = require('./_export');
var shared = require('./_shared')('metadata');
var store = shared.store || (shared.store = new (require('./es6.weak-map'))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

},{"./_export":33,"./_shared":100,"./es6.map":158,"./es6.weak-map":264}],67:[function(require,module,exports){
var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_cof":18,"./_global":40,"./_task":110}],68:[function(require,module,exports){
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":3}],69:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":35,"./_iobject":47,"./_object-gops":77,"./_object-keys":80,"./_object-pie":81,"./_to-object":116}],70:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
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

},{"./_an-object":7,"./_dom-create":30,"./_enum-bug-keys":31,"./_html":43,"./_object-dps":72,"./_shared-key":99}],71:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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

},{"./_an-object":7,"./_descriptors":29,"./_ie8-dom-define":44,"./_to-primitive":117}],72:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":7,"./_descriptors":29,"./_object-dp":71,"./_object-keys":80}],73:[function(require,module,exports){
'use strict';
// Forced replacement prototype accessors methods
module.exports = require('./_library') || !require('./_fails')(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete require('./_global')[K];
});

},{"./_fails":35,"./_global":40,"./_library":59}],74:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":29,"./_has":41,"./_ie8-dom-define":44,"./_object-pie":81,"./_property-desc":89,"./_to-iobject":114,"./_to-primitive":117}],75:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":76,"./_to-iobject":114}],76:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":31,"./_object-keys-internal":79}],77:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],78:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":41,"./_shared-key":99,"./_to-object":116}],79:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

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

},{"./_array-includes":11,"./_has":41,"./_shared-key":99,"./_to-iobject":114}],80:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":31,"./_object-keys-internal":79}],81:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],82:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":23,"./_export":33,"./_fails":35}],83:[function(require,module,exports){
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

},{"./_object-keys":80,"./_object-pie":81,"./_to-iobject":114}],84:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_an-object":7,"./_global":40,"./_object-gopn":76,"./_object-gops":77}],85:[function(require,module,exports){
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":40,"./_string-trim":108,"./_string-ws":109}],86:[function(require,module,exports){
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":40,"./_string-trim":108,"./_string-ws":109}],87:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],88:[function(require,module,exports){
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":7,"./_is-object":51,"./_new-promise-capability":68}],89:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],90:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":91}],91:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
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

},{"./_core":23,"./_global":40,"./_has":41,"./_hide":42,"./_uid":121}],92:[function(require,module,exports){
module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};

},{}],93:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],94:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');
var aFunction = require('./_a-function');
var ctx = require('./_ctx');
var forOf = require('./_for-of');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"./_a-function":3,"./_ctx":25,"./_export":33,"./_for-of":39}],95:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"./_export":33}],96:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
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

},{"./_an-object":7,"./_ctx":25,"./_is-object":51,"./_object-gopd":74}],97:[function(require,module,exports){
'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_descriptors":29,"./_global":40,"./_object-dp":71,"./_wks":126}],98:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":41,"./_object-dp":71,"./_wks":126}],99:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":100,"./_uid":121}],100:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":23,"./_global":40,"./_library":59}],101:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":3,"./_an-object":7,"./_wks":126}],102:[function(require,module,exports){
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":35}],103:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
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

},{"./_defined":28,"./_to-integer":113}],104:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_defined":28,"./_is-regexp":52}],105:[function(require,module,exports){
var $export = require('./_export');
var fails = require('./_fails');
var defined = require('./_defined');
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"./_defined":28,"./_export":33,"./_fails":35}],106:[function(require,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_defined":28,"./_string-repeat":107,"./_to-length":115}],107:[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_defined":28,"./_to-integer":113}],108:[function(require,module,exports){
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
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

},{"./_defined":28,"./_export":33,"./_fails":35,"./_string-ws":109}],109:[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],110:[function(require,module,exports){
var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_cof":18,"./_ctx":25,"./_dom-create":30,"./_global":40,"./_html":43,"./_invoke":46}],111:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":113}],112:[function(require,module,exports){
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":113,"./_to-length":115}],113:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],114:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":28,"./_iobject":47}],115:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":113}],116:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":28}],117:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
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

},{"./_is-object":51}],118:[function(require,module,exports){
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_an-instance":6,"./_array-copy-within":8,"./_array-fill":9,"./_array-includes":11,"./_array-methods":12,"./_classof":17,"./_ctx":25,"./_descriptors":29,"./_export":33,"./_fails":35,"./_global":40,"./_has":41,"./_hide":42,"./_is-array-iter":48,"./_is-object":51,"./_iter-detect":56,"./_iterators":58,"./_library":59,"./_object-create":70,"./_object-dp":71,"./_object-gopd":74,"./_object-gopn":76,"./_object-gpo":78,"./_property-desc":89,"./_redefine-all":90,"./_set-species":97,"./_species-constructor":101,"./_to-absolute-index":111,"./_to-index":112,"./_to-integer":113,"./_to-length":115,"./_to-object":116,"./_to-primitive":117,"./_typed":120,"./_typed-buffer":119,"./_uid":121,"./_wks":126,"./core.get-iterator-method":127,"./es6.array.iterator":139}],119:[function(require,module,exports){
'use strict';
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_an-instance":6,"./_array-fill":9,"./_descriptors":29,"./_fails":35,"./_global":40,"./_hide":42,"./_library":59,"./_object-dp":71,"./_object-gopn":76,"./_redefine-all":90,"./_set-to-string-tag":98,"./_to-index":112,"./_to-integer":113,"./_to-length":115,"./_typed":120}],120:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":40,"./_hide":42,"./_uid":121}],121:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],122:[function(require,module,exports){
var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":40}],123:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":51}],124:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":23,"./_global":40,"./_library":59,"./_object-dp":71,"./_wks-ext":125}],125:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":126}],126:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":40,"./_shared":100,"./_uid":121}],127:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":17,"./_core":23,"./_iterators":58,"./_wks":126}],128:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export');
var $re = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });

},{"./_export":33,"./_replacer":92}],129:[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

require('./_add-to-unscopables')('copyWithin');

},{"./_add-to-unscopables":5,"./_array-copy-within":8,"./_export":33}],130:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $every = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":12,"./_export":33,"./_strict-method":102}],131:[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_add-to-unscopables":5,"./_array-fill":9,"./_export":33}],132:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":12,"./_export":33,"./_strict-method":102}],133:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_add-to-unscopables":5,"./_array-methods":12,"./_export":33}],134:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_add-to-unscopables":5,"./_array-methods":12,"./_export":33}],135:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $forEach = require('./_array-methods')(0);
var STRICT = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":12,"./_export":33,"./_strict-method":102}],136:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":24,"./_ctx":25,"./_export":33,"./_is-array-iter":48,"./_iter-call":53,"./_iter-detect":56,"./_to-length":115,"./_to-object":116,"./core.get-iterator-method":127}],137:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $indexOf = require('./_array-includes')(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

},{"./_array-includes":11,"./_export":33,"./_strict-method":102}],138:[function(require,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', { isArray: require('./_is-array') });

},{"./_export":33,"./_is-array":49}],139:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
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

},{"./_add-to-unscopables":5,"./_iter-define":55,"./_iter-step":57,"./_iterators":58,"./_to-iobject":114}],140:[function(require,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

},{"./_export":33,"./_iobject":47,"./_strict-method":102,"./_to-iobject":114}],141:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});

},{"./_export":33,"./_strict-method":102,"./_to-integer":113,"./_to-iobject":114,"./_to-length":115}],142:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $map = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":12,"./_export":33,"./_strict-method":102}],143:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"./_create-property":24,"./_export":33,"./_fails":35}],144:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

},{"./_array-reduce":13,"./_export":33,"./_strict-method":102}],145:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

},{"./_array-reduce":13,"./_export":33,"./_strict-method":102}],146:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var html = require('./_html');
var cof = require('./_cof');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

},{"./_cof":18,"./_export":33,"./_fails":35,"./_html":43,"./_to-absolute-index":111,"./_to-length":115}],147:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $some = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":12,"./_export":33,"./_strict-method":102}],148:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_a-function":3,"./_export":33,"./_fails":35,"./_strict-method":102,"./_to-object":116}],149:[function(require,module,exports){
require('./_set-species')('Array');

},{"./_set-species":97}],150:[function(require,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });

},{"./_export":33}],151:[function(require,module,exports){
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export');
var toISOString = require('./_date-to-iso-string');

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

},{"./_date-to-iso-string":26,"./_export":33}],152:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"./_export":33,"./_fails":35,"./_to-object":116,"./_to-primitive":117}],153:[function(require,module,exports){
var TO_PRIMITIVE = require('./_wks')('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));

},{"./_date-to-primitive":27,"./_hide":42,"./_wks":126}],154:[function(require,module,exports){
var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  require('./_redefine')(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

},{"./_redefine":91}],155:[function(require,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', { bind: require('./_bind') });

},{"./_bind":16,"./_export":33}],156:[function(require,module,exports){
'use strict';
var isObject = require('./_is-object');
var getPrototypeOf = require('./_object-gpo');
var HAS_INSTANCE = require('./_wks')('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"./_is-object":51,"./_object-dp":71,"./_object-gpo":78,"./_wks":126}],157:[function(require,module,exports){
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_descriptors":29,"./_object-dp":71}],158:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection":22,"./_collection-strong":19,"./_validate-collection":123}],159:[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export');
var log1p = require('./_math-log1p');
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"./_export":33,"./_math-log1p":62}],160:[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"./_export":33}],161:[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"./_export":33}],162:[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export');
var sign = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"./_export":33,"./_math-sign":64}],163:[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":33}],164:[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export');
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"./_export":33}],165:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');
var $expm1 = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"./_export":33,"./_math-expm1":60}],166:[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export = require('./_export');

$export($export.S, 'Math', { fround: require('./_math-fround') });

},{"./_export":33,"./_math-fround":61}],167:[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export');
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"./_export":33}],168:[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export');
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"./_export":33,"./_fails":35}],169:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":33}],170:[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', { log1p: require('./_math-log1p') });

},{"./_export":33,"./_math-log1p":62}],171:[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"./_export":33}],172:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":33,"./_math-sign":64}],173:[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"./_export":33,"./_fails":35,"./_math-expm1":60}],174:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"./_export":33,"./_math-expm1":60}],175:[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"./_export":33}],176:[function(require,module,exports){
'use strict';
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
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
  for (var keys = require('./_descriptors') ? gOPN(Base) : (
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
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_cof":18,"./_descriptors":29,"./_fails":35,"./_global":40,"./_has":41,"./_inherit-if-required":45,"./_object-create":70,"./_object-dp":71,"./_object-gopd":74,"./_object-gopn":76,"./_redefine":91,"./_string-trim":108,"./_to-primitive":117}],177:[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":33}],178:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"./_export":33,"./_global":40}],179:[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":33,"./_is-integer":50}],180:[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"./_export":33}],181:[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export = require('./_export');
var isInteger = require('./_is-integer');
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"./_export":33,"./_is-integer":50}],182:[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":33}],183:[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"./_export":33}],184:[function(require,module,exports){
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"./_export":33,"./_parse-float":85}],185:[function(require,module,exports){
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":33,"./_parse-int":86}],186:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toInteger = require('./_to-integer');
var aNumberValue = require('./_a-number-value');
var repeat = require('./_string-repeat');
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

},{"./_a-number-value":4,"./_export":33,"./_fails":35,"./_string-repeat":107,"./_to-integer":113}],187:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $fails = require('./_fails');
var aNumberValue = require('./_a-number-value');
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

},{"./_a-number-value":4,"./_export":33,"./_fails":35}],188:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":33,"./_object-assign":69}],189:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":33,"./_object-create":70}],190:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperties: require('./_object-dps') });

},{"./_descriptors":29,"./_export":33,"./_object-dps":72}],191:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":29,"./_export":33,"./_object-dp":71}],192:[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":51,"./_meta":65,"./_object-sap":82}],193:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_object-gopd":74,"./_object-sap":82,"./_to-iobject":114}],194:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function () {
  return require('./_object-gopn-ext').f;
});

},{"./_object-gopn-ext":75,"./_object-sap":82}],195:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_object-gpo":78,"./_object-sap":82,"./_to-object":116}],196:[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":51,"./_object-sap":82}],197:[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"./_is-object":51,"./_object-sap":82}],198:[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"./_is-object":51,"./_object-sap":82}],199:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

},{"./_export":33,"./_same-value":93}],200:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":80,"./_object-sap":82,"./_to-object":116}],201:[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"./_is-object":51,"./_meta":65,"./_object-sap":82}],202:[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"./_is-object":51,"./_meta":65,"./_object-sap":82}],203:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });

},{"./_export":33,"./_set-proto":96}],204:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":17,"./_redefine":91,"./_wks":126}],205:[function(require,module,exports){
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

},{"./_export":33,"./_parse-float":85}],206:[function(require,module,exports){
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

},{"./_export":33,"./_parse-int":86}],207:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_a-function":3,"./_an-instance":6,"./_classof":17,"./_core":23,"./_ctx":25,"./_export":33,"./_for-of":39,"./_global":40,"./_is-object":51,"./_iter-detect":56,"./_library":59,"./_microtask":67,"./_new-promise-capability":68,"./_perform":87,"./_promise-resolve":88,"./_redefine-all":90,"./_set-species":97,"./_set-to-string-tag":98,"./_species-constructor":101,"./_task":110,"./_user-agent":122,"./_wks":126}],208:[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_a-function":3,"./_an-object":7,"./_export":33,"./_fails":35,"./_global":40}],209:[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = require('./_export');
var create = require('./_object-create');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var fails = require('./_fails');
var bind = require('./_bind');
var rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"./_a-function":3,"./_an-object":7,"./_bind":16,"./_export":33,"./_fails":35,"./_global":40,"./_is-object":51,"./_object-create":70}],210:[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = require('./_object-dp');
var $export = require('./_export');
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_an-object":7,"./_export":33,"./_fails":35,"./_object-dp":71,"./_to-primitive":117}],211:[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = require('./_export');
var gOPD = require('./_object-gopd').f;
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"./_an-object":7,"./_export":33,"./_object-gopd":74}],212:[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

},{"./_an-object":7,"./_export":33,"./_iter-create":54}],213:[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = require('./_object-gopd');
var $export = require('./_export');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"./_an-object":7,"./_export":33,"./_object-gopd":74}],214:[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = require('./_export');
var getProto = require('./_object-gpo');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"./_an-object":7,"./_export":33,"./_object-gpo":78}],215:[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var isObject = require('./_is-object');
var anObject = require('./_an-object');

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"./_an-object":7,"./_export":33,"./_has":41,"./_is-object":51,"./_object-gopd":74,"./_object-gpo":78}],216:[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"./_export":33}],217:[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"./_an-object":7,"./_export":33}],218:[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });

},{"./_export":33,"./_own-keys":84}],219:[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_an-object":7,"./_export":33}],220:[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = require('./_export');
var setProto = require('./_set-proto');

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":33,"./_set-proto":96}],221:[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = require('./_object-dp');
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var isObject = require('./_is-object');

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"./_an-object":7,"./_export":33,"./_has":41,"./_is-object":51,"./_object-dp":71,"./_object-gopd":74,"./_object-gpo":78,"./_property-desc":89}],222:[function(require,module,exports){
var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_descriptors":29,"./_fails":35,"./_flags":37,"./_global":40,"./_inherit-if-required":45,"./_is-regexp":52,"./_object-dp":71,"./_object-gopn":76,"./_redefine":91,"./_set-species":97,"./_wks":126}],223:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":29,"./_flags":37,"./_object-dp":71}],224:[function(require,module,exports){
// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

},{"./_fix-re-wks":36}],225:[function(require,module,exports){
// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

},{"./_fix-re-wks":36}],226:[function(require,module,exports){
// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

},{"./_fix-re-wks":36}],227:[function(require,module,exports){
// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = require('./_is-regexp');
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

},{"./_fix-re-wks":36,"./_is-regexp":52}],228:[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./_an-object":7,"./_descriptors":29,"./_fails":35,"./_flags":37,"./_redefine":91,"./es6.regexp.flags":223}],229:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection":22,"./_collection-strong":19,"./_validate-collection":123}],230:[function(require,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"./_string-html":105}],231:[function(require,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"./_string-html":105}],232:[function(require,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"./_string-html":105}],233:[function(require,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"./_string-html":105}],234:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $at = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"./_export":33,"./_string-at":103}],235:[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":33,"./_fails-is-regexp":34,"./_string-context":104,"./_to-length":115}],236:[function(require,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"./_string-html":105}],237:[function(require,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"./_string-html":105}],238:[function(require,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"./_string-html":105}],239:[function(require,module,exports){
var $export = require('./_export');
var toAbsoluteIndex = require('./_to-absolute-index');
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"./_export":33,"./_to-absolute-index":111}],240:[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":33,"./_fails-is-regexp":34,"./_string-context":104}],241:[function(require,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"./_string-html":105}],242:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
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

},{"./_iter-define":55,"./_string-at":103}],243:[function(require,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"./_string-html":105}],244:[function(require,module,exports){
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"./_export":33,"./_to-iobject":114,"./_to-length":115}],245:[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":33,"./_string-repeat":107}],246:[function(require,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"./_string-html":105}],247:[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":33,"./_fails-is-regexp":34,"./_string-context":104,"./_to-length":115}],248:[function(require,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"./_string-html":105}],249:[function(require,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"./_string-html":105}],250:[function(require,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"./_string-html":105}],251:[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

},{"./_string-trim":108}],252:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":7,"./_descriptors":29,"./_enum-keys":32,"./_export":33,"./_fails":35,"./_global":40,"./_has":41,"./_hide":42,"./_is-array":49,"./_is-object":51,"./_library":59,"./_meta":65,"./_object-create":70,"./_object-dp":71,"./_object-gopd":74,"./_object-gopn":76,"./_object-gopn-ext":75,"./_object-gops":77,"./_object-keys":80,"./_object-pie":81,"./_property-desc":89,"./_redefine":91,"./_set-to-string-tag":98,"./_shared":100,"./_to-iobject":114,"./_to-primitive":117,"./_uid":121,"./_wks":126,"./_wks-define":124,"./_wks-ext":125}],253:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $typed = require('./_typed');
var buffer = require('./_typed-buffer');
var anObject = require('./_an-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var isObject = require('./_is-object');
var ArrayBuffer = require('./_global').ArrayBuffer;
var speciesConstructor = require('./_species-constructor');
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);

},{"./_an-object":7,"./_export":33,"./_fails":35,"./_global":40,"./_is-object":51,"./_set-species":97,"./_species-constructor":101,"./_to-absolute-index":111,"./_to-length":115,"./_typed":120,"./_typed-buffer":119}],254:[function(require,module,exports){
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});

},{"./_export":33,"./_typed":120,"./_typed-buffer":119}],255:[function(require,module,exports){
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],256:[function(require,module,exports){
require('./_typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],257:[function(require,module,exports){
require('./_typed-array')('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],258:[function(require,module,exports){
require('./_typed-array')('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],259:[function(require,module,exports){
require('./_typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],260:[function(require,module,exports){
require('./_typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],261:[function(require,module,exports){
require('./_typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],262:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":118}],263:[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"./_typed-array":118}],264:[function(require,module,exports){
'use strict';
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var fails = require('./_fails');
var validate = require('./_validate-collection');
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"./_array-methods":12,"./_collection":22,"./_collection-weak":21,"./_fails":35,"./_is-object":51,"./_meta":65,"./_object-assign":69,"./_redefine":91,"./_validate-collection":123}],265:[function(require,module,exports){
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
require('./_collection')(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"./_collection":22,"./_collection-weak":21,"./_validate-collection":123}],266:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_a-function":3,"./_add-to-unscopables":5,"./_array-species-create":15,"./_export":33,"./_flatten-into-array":38,"./_to-length":115,"./_to-object":116}],267:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

require('./_add-to-unscopables')('flatten');

},{"./_add-to-unscopables":5,"./_array-species-create":15,"./_export":33,"./_flatten-into-array":38,"./_to-integer":113,"./_to-length":115,"./_to-object":116}],268:[function(require,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_add-to-unscopables":5,"./_array-includes":11,"./_export":33}],269:[function(require,module,exports){
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = require('./_export');
var microtask = require('./_microtask')();
var process = require('./_global').process;
var isNode = require('./_cof')(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

},{"./_cof":18,"./_export":33,"./_global":40,"./_microtask":67}],270:[function(require,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export');
var cof = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});

},{"./_cof":18,"./_export":33}],271:[function(require,module,exports){
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.G, { global: require('./_global') });

},{"./_export":33,"./_global":40}],272:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
require('./_set-collection-from')('Map');

},{"./_set-collection-from":94}],273:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
require('./_set-collection-of')('Map');

},{"./_set-collection-of":95}],274:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Map', { toJSON: require('./_collection-to-json')('Map') });

},{"./_collection-to-json":20,"./_export":33}],275:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

},{"./_export":33}],276:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

},{"./_export":33}],277:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

},{"./_export":33}],278:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var scale = require('./_math-scale');
var fround = require('./_math-fround');

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

},{"./_export":33,"./_math-fround":61,"./_math-scale":63}],279:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

},{"./_export":33}],280:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

},{"./_export":33}],281:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

},{"./_export":33}],282:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

},{"./_export":33}],283:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

},{"./_export":33}],284:[function(require,module,exports){
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { scale: require('./_math-scale') });

},{"./_export":33,"./_math-scale":63}],285:[function(require,module,exports){
// http://jfbastien.github.io/papers/Math.signbit.html
var $export = require('./_export');

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });

},{"./_export":33}],286:[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

},{"./_export":33}],287:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"./_a-function":3,"./_descriptors":29,"./_export":33,"./_object-dp":71,"./_object-forced-pam":73,"./_to-object":116}],288:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"./_a-function":3,"./_descriptors":29,"./_export":33,"./_object-dp":71,"./_object-forced-pam":73,"./_to-object":116}],289:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":33,"./_object-to-array":83}],290:[function(require,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_create-property":24,"./_export":33,"./_object-gopd":74,"./_own-keys":84,"./_to-iobject":114}],291:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_descriptors":29,"./_export":33,"./_object-forced-pam":73,"./_object-gopd":74,"./_object-gpo":78,"./_to-object":116,"./_to-primitive":117}],292:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_descriptors":29,"./_export":33,"./_object-forced-pam":73,"./_object-gopd":74,"./_object-gpo":78,"./_to-object":116,"./_to-primitive":117}],293:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":33,"./_object-to-array":83}],294:[function(require,module,exports){
'use strict';
// https://github.com/zenparsing/es-observable
var $export = require('./_export');
var global = require('./_global');
var core = require('./_core');
var microtask = require('./_microtask')();
var OBSERVABLE = require('./_wks')('observable');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var anInstance = require('./_an-instance');
var redefineAll = require('./_redefine-all');
var hide = require('./_hide');
var forOf = require('./_for-of');
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

require('./_set-species')('Observable');

},{"./_a-function":3,"./_an-instance":6,"./_an-object":7,"./_core":23,"./_export":33,"./_for-of":39,"./_global":40,"./_hide":42,"./_microtask":67,"./_redefine-all":90,"./_set-species":97,"./_wks":126}],295:[function(require,module,exports){
// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_core":23,"./_export":33,"./_global":40,"./_promise-resolve":88,"./_species-constructor":101}],296:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":33,"./_new-promise-capability":68,"./_perform":87}],297:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });

},{"./_an-object":7,"./_metadata":66}],298:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });

},{"./_an-object":7,"./_metadata":66}],299:[function(require,module,exports){
var Set = require('./es6.set');
var from = require('./_array-from-iterable');
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./_an-object":7,"./_array-from-iterable":10,"./_metadata":66,"./_object-gpo":78,"./es6.set":229}],300:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_an-object":7,"./_metadata":66,"./_object-gpo":78}],301:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./_an-object":7,"./_metadata":66}],302:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_an-object":7,"./_metadata":66}],303:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_an-object":7,"./_metadata":66,"./_object-gpo":78}],304:[function(require,module,exports){
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_an-object":7,"./_metadata":66}],305:[function(require,module,exports){
var $metadata = require('./_metadata');
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });

},{"./_a-function":3,"./_an-object":7,"./_metadata":66}],306:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
require('./_set-collection-from')('Set');

},{"./_set-collection-from":94}],307:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
require('./_set-collection-of')('Set');

},{"./_set-collection-of":95}],308:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });

},{"./_collection-to-json":20,"./_export":33}],309:[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export');
var $at = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});

},{"./_export":33,"./_string-at":103}],310:[function(require,module,exports){
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export = require('./_export');
var defined = require('./_defined');
var toLength = require('./_to-length');
var isRegExp = require('./_is-regexp');
var getFlags = require('./_flags');
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

},{"./_defined":28,"./_export":33,"./_flags":37,"./_is-regexp":52,"./_iter-create":54,"./_to-length":115}],311:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"./_export":33,"./_string-pad":106,"./_user-agent":122}],312:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"./_export":33,"./_string-pad":106,"./_user-agent":122}],313:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

},{"./_string-trim":108}],314:[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

},{"./_string-trim":108}],315:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":124}],316:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":124}],317:[function(require,module,exports){
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.S, 'System', { global: require('./_global') });

},{"./_export":33,"./_global":40}],318:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
require('./_set-collection-from')('WeakMap');

},{"./_set-collection-from":94}],319:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
require('./_set-collection-of')('WeakMap');

},{"./_set-collection-of":95}],320:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
require('./_set-collection-from')('WeakSet');

},{"./_set-collection-from":94}],321:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
require('./_set-collection-of')('WeakSet');

},{"./_set-collection-of":95}],322:[function(require,module,exports){
var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
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

},{"./_global":40,"./_hide":42,"./_iterators":58,"./_object-keys":80,"./_redefine":91,"./_wks":126,"./es6.array.iterator":139}],323:[function(require,module,exports){
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":33,"./_task":110}],324:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_export":33,"./_global":40,"./_user-agent":122}],325:[function(require,module,exports){
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.array.flat-map');
require('./modules/es7.array.flatten');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.map.of');
require('./modules/es7.set.of');
require('./modules/es7.weak-map.of');
require('./modules/es7.weak-set.of');
require('./modules/es7.map.from');
require('./modules/es7.set.from');
require('./modules/es7.weak-map.from');
require('./modules/es7.weak-set.from');
require('./modules/es7.global');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.clamp');
require('./modules/es7.math.deg-per-rad');
require('./modules/es7.math.degrees');
require('./modules/es7.math.fscale');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.rad-per-deg');
require('./modules/es7.math.radians');
require('./modules/es7.math.scale');
require('./modules/es7.math.umulh');
require('./modules/es7.math.signbit');
require('./modules/es7.promise.finally');
require('./modules/es7.promise.try');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');

},{"./modules/_core":23,"./modules/es6.array.copy-within":129,"./modules/es6.array.every":130,"./modules/es6.array.fill":131,"./modules/es6.array.filter":132,"./modules/es6.array.find":134,"./modules/es6.array.find-index":133,"./modules/es6.array.for-each":135,"./modules/es6.array.from":136,"./modules/es6.array.index-of":137,"./modules/es6.array.is-array":138,"./modules/es6.array.iterator":139,"./modules/es6.array.join":140,"./modules/es6.array.last-index-of":141,"./modules/es6.array.map":142,"./modules/es6.array.of":143,"./modules/es6.array.reduce":145,"./modules/es6.array.reduce-right":144,"./modules/es6.array.slice":146,"./modules/es6.array.some":147,"./modules/es6.array.sort":148,"./modules/es6.array.species":149,"./modules/es6.date.now":150,"./modules/es6.date.to-iso-string":151,"./modules/es6.date.to-json":152,"./modules/es6.date.to-primitive":153,"./modules/es6.date.to-string":154,"./modules/es6.function.bind":155,"./modules/es6.function.has-instance":156,"./modules/es6.function.name":157,"./modules/es6.map":158,"./modules/es6.math.acosh":159,"./modules/es6.math.asinh":160,"./modules/es6.math.atanh":161,"./modules/es6.math.cbrt":162,"./modules/es6.math.clz32":163,"./modules/es6.math.cosh":164,"./modules/es6.math.expm1":165,"./modules/es6.math.fround":166,"./modules/es6.math.hypot":167,"./modules/es6.math.imul":168,"./modules/es6.math.log10":169,"./modules/es6.math.log1p":170,"./modules/es6.math.log2":171,"./modules/es6.math.sign":172,"./modules/es6.math.sinh":173,"./modules/es6.math.tanh":174,"./modules/es6.math.trunc":175,"./modules/es6.number.constructor":176,"./modules/es6.number.epsilon":177,"./modules/es6.number.is-finite":178,"./modules/es6.number.is-integer":179,"./modules/es6.number.is-nan":180,"./modules/es6.number.is-safe-integer":181,"./modules/es6.number.max-safe-integer":182,"./modules/es6.number.min-safe-integer":183,"./modules/es6.number.parse-float":184,"./modules/es6.number.parse-int":185,"./modules/es6.number.to-fixed":186,"./modules/es6.number.to-precision":187,"./modules/es6.object.assign":188,"./modules/es6.object.create":189,"./modules/es6.object.define-properties":190,"./modules/es6.object.define-property":191,"./modules/es6.object.freeze":192,"./modules/es6.object.get-own-property-descriptor":193,"./modules/es6.object.get-own-property-names":194,"./modules/es6.object.get-prototype-of":195,"./modules/es6.object.is":199,"./modules/es6.object.is-extensible":196,"./modules/es6.object.is-frozen":197,"./modules/es6.object.is-sealed":198,"./modules/es6.object.keys":200,"./modules/es6.object.prevent-extensions":201,"./modules/es6.object.seal":202,"./modules/es6.object.set-prototype-of":203,"./modules/es6.object.to-string":204,"./modules/es6.parse-float":205,"./modules/es6.parse-int":206,"./modules/es6.promise":207,"./modules/es6.reflect.apply":208,"./modules/es6.reflect.construct":209,"./modules/es6.reflect.define-property":210,"./modules/es6.reflect.delete-property":211,"./modules/es6.reflect.enumerate":212,"./modules/es6.reflect.get":215,"./modules/es6.reflect.get-own-property-descriptor":213,"./modules/es6.reflect.get-prototype-of":214,"./modules/es6.reflect.has":216,"./modules/es6.reflect.is-extensible":217,"./modules/es6.reflect.own-keys":218,"./modules/es6.reflect.prevent-extensions":219,"./modules/es6.reflect.set":221,"./modules/es6.reflect.set-prototype-of":220,"./modules/es6.regexp.constructor":222,"./modules/es6.regexp.flags":223,"./modules/es6.regexp.match":224,"./modules/es6.regexp.replace":225,"./modules/es6.regexp.search":226,"./modules/es6.regexp.split":227,"./modules/es6.regexp.to-string":228,"./modules/es6.set":229,"./modules/es6.string.anchor":230,"./modules/es6.string.big":231,"./modules/es6.string.blink":232,"./modules/es6.string.bold":233,"./modules/es6.string.code-point-at":234,"./modules/es6.string.ends-with":235,"./modules/es6.string.fixed":236,"./modules/es6.string.fontcolor":237,"./modules/es6.string.fontsize":238,"./modules/es6.string.from-code-point":239,"./modules/es6.string.includes":240,"./modules/es6.string.italics":241,"./modules/es6.string.iterator":242,"./modules/es6.string.link":243,"./modules/es6.string.raw":244,"./modules/es6.string.repeat":245,"./modules/es6.string.small":246,"./modules/es6.string.starts-with":247,"./modules/es6.string.strike":248,"./modules/es6.string.sub":249,"./modules/es6.string.sup":250,"./modules/es6.string.trim":251,"./modules/es6.symbol":252,"./modules/es6.typed.array-buffer":253,"./modules/es6.typed.data-view":254,"./modules/es6.typed.float32-array":255,"./modules/es6.typed.float64-array":256,"./modules/es6.typed.int16-array":257,"./modules/es6.typed.int32-array":258,"./modules/es6.typed.int8-array":259,"./modules/es6.typed.uint16-array":260,"./modules/es6.typed.uint32-array":261,"./modules/es6.typed.uint8-array":262,"./modules/es6.typed.uint8-clamped-array":263,"./modules/es6.weak-map":264,"./modules/es6.weak-set":265,"./modules/es7.array.flat-map":266,"./modules/es7.array.flatten":267,"./modules/es7.array.includes":268,"./modules/es7.asap":269,"./modules/es7.error.is-error":270,"./modules/es7.global":271,"./modules/es7.map.from":272,"./modules/es7.map.of":273,"./modules/es7.map.to-json":274,"./modules/es7.math.clamp":275,"./modules/es7.math.deg-per-rad":276,"./modules/es7.math.degrees":277,"./modules/es7.math.fscale":278,"./modules/es7.math.iaddh":279,"./modules/es7.math.imulh":280,"./modules/es7.math.isubh":281,"./modules/es7.math.rad-per-deg":282,"./modules/es7.math.radians":283,"./modules/es7.math.scale":284,"./modules/es7.math.signbit":285,"./modules/es7.math.umulh":286,"./modules/es7.object.define-getter":287,"./modules/es7.object.define-setter":288,"./modules/es7.object.entries":289,"./modules/es7.object.get-own-property-descriptors":290,"./modules/es7.object.lookup-getter":291,"./modules/es7.object.lookup-setter":292,"./modules/es7.object.values":293,"./modules/es7.observable":294,"./modules/es7.promise.finally":295,"./modules/es7.promise.try":296,"./modules/es7.reflect.define-metadata":297,"./modules/es7.reflect.delete-metadata":298,"./modules/es7.reflect.get-metadata":300,"./modules/es7.reflect.get-metadata-keys":299,"./modules/es7.reflect.get-own-metadata":302,"./modules/es7.reflect.get-own-metadata-keys":301,"./modules/es7.reflect.has-metadata":303,"./modules/es7.reflect.has-own-metadata":304,"./modules/es7.reflect.metadata":305,"./modules/es7.set.from":306,"./modules/es7.set.of":307,"./modules/es7.set.to-json":308,"./modules/es7.string.at":309,"./modules/es7.string.match-all":310,"./modules/es7.string.pad-end":311,"./modules/es7.string.pad-start":312,"./modules/es7.string.trim-left":313,"./modules/es7.string.trim-right":314,"./modules/es7.symbol.async-iterator":315,"./modules/es7.symbol.observable":316,"./modules/es7.system.global":317,"./modules/es7.weak-map.from":318,"./modules/es7.weak-map.of":319,"./modules/es7.weak-set.from":320,"./modules/es7.weak-set.of":321,"./modules/web.dom.iterable":322,"./modules/web.immediate":323,"./modules/web.timers":324}],326:[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],327:[function(require,module,exports){
require('babel-polyfill');
var Linq = require('js-linq').Linq;

var data = {
  characters: [
    { name: 'Ryker', level: 11, class: 'fighter', race: 'human' },
    { name: 'Drizzt', level: 13, class: 'fighter', race: 'dwarf' },
    { name: 'Tsukune', level: 9, class: 'rogue', race: 'human' },
    { name: 'Cloud', level: 11, class: 'sorcerer', race: 'elf' },
    { name: 'Bash', level: 12, class: 'cleric', race: 'human' }
  ]
};

var selectedCharacters = Linq.from(data.characters) 
  .where(function (x) { return x.race === 'human'; })
  .orderBy(function (x) { return x.level; })
  .select(function (x) { return x.name; })
  .toArray();

var element = document.getElementById('names');

element.innerText = selectedCharacters.join(', ');

},{"babel-polyfill":1,"js-linq":328}],328:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    $linq Version 2.0.0 (by Kurtis Jones @ https://github.com/battousai999/js-linq)
*/

var LinqInternal = function () {
    function LinqInternal() {
        _classCallCheck(this, LinqInternal);
    }

    _createClass(LinqInternal, null, [{
        key: 'convertToString',
        value: function convertToString(value) {
            return value == null ? null : value.toString();
        }
    }, {
        key: 'convertToNumber',
        value: function convertToNumber(value) {
            return Linq.isNumber(value) ? value : NaN;
        }
    }, {
        key: 'isConstructorCompatibleSource',
        value: function isConstructorCompatibleSource(source) {
            return Linq.isIterable(source) || Linq.isGenerator(source) || Linq.isFunction(source) || Linq.isLinq(source);
        }
    }, {
        key: 'isStringNullOrEmpty',
        value: function isStringNullOrEmpty(str) {
            return str == null || str === '';
        }
    }, {
        key: 'isTypedArray',
        value: function isTypedArray(x) {
            return ArrayBuffer.isView(x) && !(x instanceof DataView);
        }
    }, {
        key: 'isIndexedCollection',
        value: function isIndexedCollection(x) {
            return Array.isArray(x) || Linq.isString(x) || LinqInternal.isTypedArray(x);
        }
    }, {
        key: 'isCollectionHavingLength',
        value: function isCollectionHavingLength(x) {
            return LinqInternal.isIndexedCollection(x);
        }
    }, {
        key: 'isCollectionHavingSize',
        value: function isCollectionHavingSize(x) {
            return x instanceof Set || x instanceof Map;
        }
    }, {
        key: 'isCollectionHavingExplicitCardinality',
        value: function isCollectionHavingExplicitCardinality(x) {
            return LinqInternal.isCollectionHavingLength(x) || LinqInternal.isCollectionHavingSize(x);
        }
    }, {
        key: 'getExplicitCardinality',
        value: function getExplicitCardinality(x) {
            if (LinqInternal.isCollectionHavingLength(x)) return x.length;

            if (LinqInternal.isCollectionHavingSize(x)) return x.size;

            return null;
        }
    }, {
        key: 'isEmptyIterable',
        value: function isEmptyIterable(iterable) {
            if (LinqInternal.isCollectionHavingExplicitCardinality(iterable)) return LinqInternal.getExplicitCardinality(iterable) === 0;

            var iterator = LinqInternal.getIterator(iterable);
            var state = iterator.next();

            return state.done;
        }
    }, {
        key: 'validateRequiredFunction',
        value: function validateRequiredFunction(func, message) {
            if (func == null || !Linq.isFunction(func)) throw new Error(message);
        }
    }, {
        key: 'validateOptionalFunction',
        value: function validateOptionalFunction(func, message) {
            if (func != null && !Linq.isFunction(func)) throw new Error(message);
        }
    }, {
        key: 'getIterator',
        value: function getIterator(iterable) {
            if (!Linq.isIterable(iterable)) return new Error('Value is not an iterable.');

            return iterable[Symbol.iterator]();
        }
    }, {
        key: 'firstBasedOperator',
        value: function firstBasedOperator(iterable, predicate, defaultValue, throwIfNotFound) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = iterable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    if (predicate == null || predicate(item)) return item;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (throwIfNotFound) throw new Error('No first element was found in the collection.');else return defaultValue;
        }
    }, {
        key: 'singleBasedOperator',
        value: function singleBasedOperator(iterable, predicate, defaultValueFunc, throwIfNotFound) {
            var isFound = false;
            var foundItem = void 0;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = iterable[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    if (predicate == null || predicate(item)) {
                        if (isFound) {
                            if (predicate == null) throw new Error('There was more than one element in the collection.');else throw new Error('More than one element in the collection satisfied the predicate');
                        }

                        foundItem = item;
                        isFound = true;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (isFound) return foundItem;

            if (throwIfNotFound) {
                if (predicate == null) throw new Error('There were no elements in the collection.');else throw new Error('No single element in the collection satisfied the predicate.');
            }

            return defaultValueFunc();
        }
    }, {
        key: 'lastBasedOperator',
        value: function lastBasedOperator(iterable, predicate, defaultValue, throwIfNotFound) {
            if (LinqInternal.isIndexedCollection(iterable) && LinqInternal.isCollectionHavingExplicitCardinality(iterable)) {
                var length = LinqInternal.getExplicitCardinality(iterable);

                for (var i = length - 1; i >= 0; i--) {
                    var item = iterable[i];

                    if (predicate == null || predicate(item)) return item;
                }
            } else {
                var foundElement = void 0;
                var isFound = false;

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = iterable[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _item = _step3.value;

                        if (predicate == null || predicate(_item)) {
                            foundElement = _item;
                            isFound = true;
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                if (isFound) return foundElement;
            }

            if (throwIfNotFound) throw new Error('No last element was found in the collection.');else return defaultValue;
        }
    }, {
        key: 'elementAtBasedOperator',
        value: function elementAtBasedOperator(index, iterableFunc, outOfBoundsFunc) {
            if (!LinqInternal.isValidNumber(index, function (x) {
                return x >= 0;
            })) return outOfBoundsFunc();

            var iterable = iterableFunc();

            if (LinqInternal.isCollectionHavingExplicitCardinality(iterable) && index >= LinqInternal.getExplicitCardinality(iterable)) return outOfBoundsFunc();

            if (LinqInternal.isIndexedCollection(iterable)) return iterable[index];

            var counter = 0;

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = iterable[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var item = _step4.value;

                    if (counter === index) return item;

                    counter += 1;
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return outOfBoundsFunc();
        }
    }, {
        key: 'normalizeComparerOrDefault',
        value: function normalizeComparerOrDefault(comparer) {
            return comparer == null ? Linq.strictComparer : Linq.normalizeComparer(comparer);
        }
    }, {
        key: 'ensureLinq',
        value: function ensureLinq(collection) {
            return Linq.isLinq(collection) ? collection : new Linq(collection);
        }
    }, {
        key: 'createDeferredSort',
        value: function createDeferredSort(keySelector, comparer, isReverse) {
            var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            return {
                keySelector: keySelector,
                comparer: comparer,
                isReverse: isReverse,
                parent: parent
            };
        }
    }, {
        key: 'performDeferredSort',
        value: function performDeferredSort(buffer, deferredSort) {
            var sortChain = LinqInternal.buildSortChain(deferredSort);

            var compare = function compare(x, y, info) {
                var value = void 0;

                if (info.isReverse) value = info.comparer(info.keySelector(y), info.keySelector(x));else value = info.comparer(info.keySelector(x), info.keySelector(y));

                if (value === 0) {
                    if (info.next == null) return 0;

                    return compare(x, y, info.next);
                } else return value;
            };

            buffer.sort(function (x, y) {
                return compare(x, y, sortChain);
            });
        }
    }, {
        key: 'buildSortChain',
        value: function buildSortChain(deferredSort) {
            var helper = function helper(ds, child) {
                var chainItem = {
                    keySelector: ds.keySelector,
                    comparer: ds.comparer,
                    isReverse: ds.isReverse,
                    next: child
                };

                if (ds.parent == null) return chainItem;

                return helper(ds.parent, chainItem);
            };

            return helper(deferredSort, null);
        }
    }, {
        key: 'orderByBasedOperator',
        value: function orderByBasedOperator(originalLinq, keySelector, comparer, isReverse) {
            LinqInternal.validateRequiredFunction(keySelector);
            LinqInternal.validateOptionalFunction(comparer);

            if (comparer == null) comparer = Linq.generalComparer;

            var linq = new Linq(originalLinq);

            linq[deferredSortSymbol] = LinqInternal.createDeferredSort(keySelector, comparer, isReverse);

            return linq;
        }
    }, {
        key: 'thenByBasedOperator',
        value: function thenByBasedOperator(originalLinq, keySelector, comparer, isReverse) {
            LinqInternal.validateRequiredFunction(keySelector);
            LinqInternal.validateOptionalFunction(comparer);

            var parentDeferredSort = originalLinq[deferredSortSymbol];

            if (parentDeferredSort == null) throw new Error((isReverse ? 'ThenByDescending' : 'ThenBy') + ' can only be called following OrderBy, OrderByDescending, ThenBy, or ThenByDescending.');

            if (comparer == null) comparer = Linq.generalComparer;

            var linq = new Linq(originalLinq);

            linq[deferredSortSymbol] = LinqInternal.createDeferredSort(keySelector, comparer, isReverse, parentDeferredSort);

            return linq;
        }
    }, {
        key: 'getExtremeValue',
        value: function getExtremeValue(linq, compareSelector, isMoreExtremeFunc, resultSelector) {
            var aggregationFunc = function aggregationFunc(extremeItem, x) {
                var extremeValue = compareSelector(extremeItem);
                var tempValue = compareSelector(x);

                return isMoreExtremeFunc(tempValue, extremeValue) ? x : extremeItem;
            };

            return linq.aggregate(null, aggregationFunc, resultSelector);
        }
    }, {
        key: 'isValidNumber',
        value: function isValidNumber(value, furtherPredicate) {
            if (value == null || isNaN(value)) return false;

            if (furtherPredicate != null) return furtherPredicate(value);

            return true;
        }
    }, {
        key: 'minComparer',
        value: function minComparer(x, y) {
            return x < y;
        }
    }, {
        key: 'maxComparer',
        value: function maxComparer(x, y) {
            return x > y;
        }
    }]);

    return LinqInternal;
}();

// Unfortunately, there's no Set class with custom equality comparison.  So instead, using a simple
// version of a Set that is not as efficient as a native Set (with custom equality comparison) 
// would be.  Also, this only implements the operations that we need, including adding to the 
// Set, removing from the Set, and checking for membership.


var SimpleSet = exports.SimpleSet = function () {
    function SimpleSet(equalityComparer) {
        _classCallCheck(this, SimpleSet);

        this.set = new Set();
        this.comparer = equalityComparer;
        this.usesComparer = equalityComparer != null;
        this.containsOnlyPrimitives = true;
    }

    _createClass(SimpleSet, [{
        key: 'add',
        value: function add(item) {
            if (this.containsOnlyPrimitives && !Linq.isPrimitive(item)) this.containsOnlyPrimitives = false;

            if (this.usesComparer) {
                if (!this.has(item)) this.set.add(item);
            } else if (this.containsOnlyPrimitives || !this.has(item)) this.set.add(item);
        }
    }, {
        key: 'remove',
        value: function remove(item) {
            if (!this.usesComparer && this.containsOnlyPrimitives) return this.set.delete(item);

            var normalizedComparer = this.usesComparer ? this.comparer : Linq.strictComparer;

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.set.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var value = _step5.value;

                    if (normalizedComparer(item, value)) {
                        this.set.delete(value);

                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'has',
        value: function has(item) {
            if (!this.usesComparer && this.containsOnlyPrimitives) return this.set.has(item);

            var normalizedComparer = this.usesComparer ? this.comparer : Linq.strictComparer;

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.set.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var value = _step6.value;

                    if (normalizedComparer(item, value)) return true;
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            return false;
        }
    }], [{
        key: 'initialize',
        value: function initialize(iterable, equalityComparer) {
            var set = new SimpleSet(equalityComparer);

            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = iterable[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var item = _step7.value;

                    set.add(item);
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            return set;
        }
    }]);

    return SimpleSet;
}();

// Used in the Linq.isGenerator() function to test for being a generator.


var GeneratorFunction = /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}).constructor;

var deferredSortSymbol = Symbol('Provides private-like access for a deferredSort property.');

var Grouping = exports.Grouping = function Grouping(key, values) {
    _classCallCheck(this, Grouping);

    this.key = key;
    this.values = values == null ? [] : Array.from(values);
};

var Linq = exports.Linq = function () {
    /**
     * A type that can be passed the the Linq constructor.
     * @typedef {iterable|generator|Linq|function} LinqCompatible
     */

    /**
     * A function that can act as a projection function (i.e., projects a value into some other value).
     * @callback projection
     * @param {*} value - The value to be projected
     * @returns {*} - The projected value.
     */

    /**
     * A function that can act as a projection function (i.e., projects a value into some other value),
     * but also passes in the positional, zero-based index of the element.
     * @callback indexedProjection
     * @param {*} value - The value to be projected
     * @param {number} [index] - The zero-based index of the value
     * @returns {*} - The projected value.
     */

    /**
     * A function that projects a value to a numeric value.
     * @callback numericProjection
     * @param {*} value - The value to be projected
     * @returns {number} - The projected numeric value.
     */

    /**
     * A function that projects two values into a third value.
     * @callback biSourceProjection
     * @param {*} firstValue - The first of the values to involve in the projection
     * @param {*} secondValue - The second of the values to involve in the projection
     * @returns {*} - The projected value.
     */

    /**
     * A function that projects a value into a LinqCompatible value
     * @callback collectionProjection
     * @param {*} value - The value to be projected
     * @returns {LinqCompatible} - The projected set of values
     */

    /**
     * A function that can act as a predicate function (i.e., projects a value to a boolean value).
     * @callback predicate
     * @param {*} value - The value to test
     * @returns {boolean}
     */

    /**
     * A function that acts upon a value.
     * @callback action
     * @param {*} value - The value upon which to act
     */

    /**
     * A comparer is a function that takes two values and returns 0 if they are considered the "same" (by
     * the comparer), -1 if they are considered "in order", and 1 if they are considered "out-of-order".
     * @callback comparer
     * @param {*} value1 - The first value to compare
     * @param {*} value2 - The second value to compare
     * @returns {number} - The value (-1/0/1) that represents the ordering of the two values.
     */

    /**
     * An equality comparer is a function that takes two values and returns a boolean value indicating 
     * whether the two values are considered the "same" (by the equality comparer).
     * @callback equalityComparer
     * @param {*} value1 - The first value to compare
     * @param {*} value2 - The second value to compare
     * @returns {boolean} - The value indicating whether the two values are the same.
     */

    /**
     * A function that aggregates two values into a single value.
     * @callback aggregator
     * @param {*} acc - The seed or previously-accumulated value
     * @param {*} value - The new value to aggregate
     * @returns {*} - The new, accumulated value.
     */

    /**
     * A function that returns a value given no input.  In function programming terms (i.e., if assuming a 
     * pure function), this could be called a "constant" function.
     * @callback constantFunction
     * @returns {*} - The returned value.
     */

    /**
     * Creates a new linq object.  If `source` is a function, then it is expected to return an iterable, a generator
     * or another function that returns either an iterable or a generator.
     * 
     * The iterables that can be passed in `source` are those defined by the "iterable protocol" (see
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable).
     * 
     * @constructor
     * @param {LinqCompatible} source - The source from which this linq object enumerates values
     * @throws If `source` is not an iterable, a generator, or a function.
     */
    function Linq(source) {
        _classCallCheck(this, Linq);

        if (source == null) source = [];

        if (LinqInternal.isConstructorCompatibleSource(source)) this.source = source;else throw new Error('The \'source\' is neither an iterable, a generator, nor a function that returns such.');
    }

    // Helper functions


    _createClass(Linq, [{
        key: 'aggregate',


        // Linq operators

        /**
         * Returns the aggregate value of performing the `operation` function on each of the values of
         * 'this' collection, starting with a value equal to `seed` (or to the value of the first element
         * of 'this' collection, if `seed` is null).  The final value is either directly returned (if no
         * `resultSelector` function is given) or the final value is first passed to the `resultSelector`
         * function and the return value from that function is returned.
         * 
         * @param {*} seed - The initial value of the aggregation 
         * @param {aggregator} operation - The function to use to aggregate the values of 'this' collection
         * @param {projection} [resultSelector] - The function that projects the final value to the returned result
         * @returns {*} - The aggregate value.
         */
        value: function aggregate(seed, operation, resultSelector) {
            LinqInternal.validateRequiredFunction(operation, "Invalid operation.");
            LinqInternal.validateOptionalFunction(resultSelector, "Invalid result selector.");

            var iterator = LinqInternal.getIterator(this.toIterable());
            var currentValue = null;
            var result = null;

            var getNext = function getNext() {
                var state = iterator.next();

                currentValue = state.value;

                return !state.done;
            };

            if (getNext()) result = seed == null ? currentValue : operation(seed, currentValue);else if (seed == null) throw new Error("Cannot evaluate aggregation of an empty collection with no seed.");else return resultSelector == null ? seed : resultSelector(seed);

            while (getNext()) {
                result = operation(result, currentValue);
            }

            return resultSelector == null ? result : resultSelector(result);
        }

        /**
         * Returns a boolean value indicating whether all of the elements of the collection satisfy the 
         * predicate.  Returns 'true' if the collection is empty.
         * 
         * @param {predicate} predicate - The predicate applied to the collection
         * @returns {boolean} - A value indicating whether all of the elements satisfied the predicate.
         */

    }, {
        key: 'all',
        value: function all(predicate) {
            LinqInternal.validateRequiredFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = iterable[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var item = _step8.value;

                    if (!predicate(item)) return false;
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            return true;
        }

        /**
         * Returns a boolean value indicating whether any of the elements of the collection satisfy the 
         * predicate.  Returns 'false' if the collection is empty.
         * 
         * @param {predicate} [predicate] - The predicate applied to the collection
         * @returns {boolean} - A value indicating whether any of the elements satisfied the predicate. 
         */

    }, {
        key: 'any',
        value: function any(predicate) {
            LinqInternal.validateOptionalFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            if (predicate == null) return !LinqInternal.isEmptyIterable(iterable);

            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = iterable[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var item = _step9.value;

                    if (predicate(item)) return true;
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }

            return false;
        }

        /**
         * Returns a collection containing the same elements as the 'this' collection but also including
         * the `value` element appended to the end.
         * 
         * @param {*} value - The value to append to the 'this' collection
         * @returs {Linq}
         */

    }, {
        key: 'append',
        value: function append(value) {
            var _marked = /*#__PURE__*/regeneratorRuntime.mark(appendGenerator);

            var iterable = this.toIterable();

            function appendGenerator() {
                var _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, item;

                return regeneratorRuntime.wrap(function appendGenerator$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _iteratorNormalCompletion10 = true;
                                _didIteratorError10 = false;
                                _iteratorError10 = undefined;
                                _context2.prev = 3;
                                _iterator10 = iterable[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
                                    _context2.next = 12;
                                    break;
                                }

                                item = _step10.value;
                                _context2.next = 9;
                                return item;

                            case 9:
                                _iteratorNormalCompletion10 = true;
                                _context2.next = 5;
                                break;

                            case 12:
                                _context2.next = 18;
                                break;

                            case 14:
                                _context2.prev = 14;
                                _context2.t0 = _context2['catch'](3);
                                _didIteratorError10 = true;
                                _iteratorError10 = _context2.t0;

                            case 18:
                                _context2.prev = 18;
                                _context2.prev = 19;

                                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                    _iterator10.return();
                                }

                            case 21:
                                _context2.prev = 21;

                                if (!_didIteratorError10) {
                                    _context2.next = 24;
                                    break;
                                }

                                throw _iteratorError10;

                            case 24:
                                return _context2.finish(21);

                            case 25:
                                return _context2.finish(18);

                            case 26:
                                _context2.next = 28;
                                return value;

                            case 28:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _marked, this, [[3, 14, 18, 26], [19,, 21, 25]]);
            }

            return new Linq(appendGenerator);
        }

        /**
         * Returns the average value of all of the elements (or projection of the elements, if there is
         * a selector), excluding null values.  If any of the elements (or projection of the elements) are
         * NaN (i.e., not a number), then an exception will be thrown.
         * 
         * @param {projection} [selector] - A projection function that returns the value to be averaged
         * @returns {number} - The average value calculated from the collection.
         */

    }, {
        key: 'average',
        value: function average(selector) {
            LinqInternal.validateOptionalFunction(selector, 'Invalid selector.');

            var iterable = this.toIterable();
            var result = 0;
            var counter = 1;

            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                for (var _iterator11 = iterable[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var item = _step11.value;

                    var value = selector == null ? item : selector(item);

                    if (value == null) continue;

                    if (isNaN(value)) throw new Error('Encountered an element that is not a number.');

                    result += (value - result) / counter;
                    counter += 1;
                }
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
                        _iterator11.return();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }

            return result;
        }

        /**
         * Returns an collection with the elements of 'this' collection grouped into separate 
         * arrays (i.e., "buckets") of the 'size' given.  If the 'result selector' is given
         * the the buckets will contain the values projected from the elements by the result
         * selector.  The given 'size' must be greater than zero.
         * 
         * @param {number} size - The size of buckets into which to group the elements
         * @param {projection} [resultSelector] - The projection function to use to project the result values
         * @returns {Linq}
         */

    }, {
        key: 'batch',
        value: function batch(size, resultSelector) {
            var _marked2 = /*#__PURE__*/regeneratorRuntime.mark(batchGenerator);

            LinqInternal.validateOptionalFunction(resultSelector, 'Invalid result selector.');

            if (!LinqInternal.isValidNumber(size, function (x) {
                return x > 0;
            })) throw new Error('Invalid size.');

            var iterable = this.toIterable();

            function batchGenerator() {
                var bucket, index, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, item;

                return regeneratorRuntime.wrap(function batchGenerator$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                bucket = null;
                                index = 0;
                                _iteratorNormalCompletion12 = true;
                                _didIteratorError12 = false;
                                _iteratorError12 = undefined;
                                _context3.prev = 5;
                                _iterator12 = iterable[Symbol.iterator]();

                            case 7:
                                if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
                                    _context3.next = 20;
                                    break;
                                }

                                item = _step12.value;

                                if (bucket == null) bucket = [];

                                bucket[index] = resultSelector == null ? item : resultSelector(item);
                                index += 1;

                                if (!(index == size)) {
                                    _context3.next = 17;
                                    break;
                                }

                                _context3.next = 15;
                                return bucket;

                            case 15:

                                bucket = null;
                                index = 0;

                            case 17:
                                _iteratorNormalCompletion12 = true;
                                _context3.next = 7;
                                break;

                            case 20:
                                _context3.next = 26;
                                break;

                            case 22:
                                _context3.prev = 22;
                                _context3.t0 = _context3['catch'](5);
                                _didIteratorError12 = true;
                                _iteratorError12 = _context3.t0;

                            case 26:
                                _context3.prev = 26;
                                _context3.prev = 27;

                                if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                    _iterator12.return();
                                }

                            case 29:
                                _context3.prev = 29;

                                if (!_didIteratorError12) {
                                    _context3.next = 32;
                                    break;
                                }

                                throw _iteratorError12;

                            case 32:
                                return _context3.finish(29);

                            case 33:
                                return _context3.finish(26);

                            case 34:
                                if (!(bucket != null && index > 0)) {
                                    _context3.next = 37;
                                    break;
                                }

                                _context3.next = 37;
                                return bucket;

                            case 37:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _marked2, this, [[5, 22, 26, 34], [27,, 29, 33]]);
            }

            return new Linq(batchGenerator);
        }

        /**
         * Returns a collection containing all of the elements of 'this' collection followed by 
         * all of the elements of the 'second' collection.
         * 
         * @param {LinqCompatible} [second] - The collection of items to append to 'this' collection
         * @returns {Linq} - The concatenation of the collection with a second collection.
         */

    }, {
        key: 'concat',
        value: function concat(second) {
            var _marked3 = /*#__PURE__*/regeneratorRuntime.mark(concatGenerator);

            if (second == null) return new Linq(this);

            var secondLinq = LinqInternal.ensureLinq(second);

            var firstIterable = this.toIterable();
            var secondIterable = secondLinq.toIterable();

            function concatGenerator() {
                var _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, item, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, _item2;

                return regeneratorRuntime.wrap(function concatGenerator$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _iteratorNormalCompletion13 = true;
                                _didIteratorError13 = false;
                                _iteratorError13 = undefined;
                                _context4.prev = 3;
                                _iterator13 = firstIterable[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done) {
                                    _context4.next = 12;
                                    break;
                                }

                                item = _step13.value;
                                _context4.next = 9;
                                return item;

                            case 9:
                                _iteratorNormalCompletion13 = true;
                                _context4.next = 5;
                                break;

                            case 12:
                                _context4.next = 18;
                                break;

                            case 14:
                                _context4.prev = 14;
                                _context4.t0 = _context4['catch'](3);
                                _didIteratorError13 = true;
                                _iteratorError13 = _context4.t0;

                            case 18:
                                _context4.prev = 18;
                                _context4.prev = 19;

                                if (!_iteratorNormalCompletion13 && _iterator13.return) {
                                    _iterator13.return();
                                }

                            case 21:
                                _context4.prev = 21;

                                if (!_didIteratorError13) {
                                    _context4.next = 24;
                                    break;
                                }

                                throw _iteratorError13;

                            case 24:
                                return _context4.finish(21);

                            case 25:
                                return _context4.finish(18);

                            case 26:
                                _iteratorNormalCompletion14 = true;
                                _didIteratorError14 = false;
                                _iteratorError14 = undefined;
                                _context4.prev = 29;
                                _iterator14 = secondIterable[Symbol.iterator]();

                            case 31:
                                if (_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done) {
                                    _context4.next = 38;
                                    break;
                                }

                                _item2 = _step14.value;
                                _context4.next = 35;
                                return _item2;

                            case 35:
                                _iteratorNormalCompletion14 = true;
                                _context4.next = 31;
                                break;

                            case 38:
                                _context4.next = 44;
                                break;

                            case 40:
                                _context4.prev = 40;
                                _context4.t1 = _context4['catch'](29);
                                _didIteratorError14 = true;
                                _iteratorError14 = _context4.t1;

                            case 44:
                                _context4.prev = 44;
                                _context4.prev = 45;

                                if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                    _iterator14.return();
                                }

                            case 47:
                                _context4.prev = 47;

                                if (!_didIteratorError14) {
                                    _context4.next = 50;
                                    break;
                                }

                                throw _iteratorError14;

                            case 50:
                                return _context4.finish(47);

                            case 51:
                                return _context4.finish(44);

                            case 52:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _marked3, this, [[3, 14, 18, 26], [19,, 21, 25], [29, 40, 44, 52], [45,, 47, 51]]);
            }

            return new Linq(concatGenerator);
        }

        /**
         * Returns a boolean value indicating whether 'this' collection contains the given `item`.  The
         * `comparer` function can be used to specify how the `item` is compared to the elements of 'this' 
         * collection.  If `comparer` is not given, the "===" operator is used to compare elements.
         * 
         * @param {*} item - The item to search for in 'this' collection
         * @param {comparer|equalityComparer} [comparer] - The function to use to compare elements
         * @returns {boolean}
         */

    }, {
        key: 'contains',
        value: function contains(item, comparer) {
            LinqInternal.validateOptionalFunction(comparer, 'Invalid comparer.');

            var normalizedComparer = LinqInternal.normalizeComparerOrDefault(comparer);
            var iterable = this.toIterable();

            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
                for (var _iterator15 = iterable[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                    var iItem = _step15.value;

                    if (normalizedComparer(item, iItem)) return true;
                }
            } catch (err) {
                _didIteratorError15 = true;
                _iteratorError15 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
                        _iterator15.return();
                    }
                } finally {
                    if (_didIteratorError15) {
                        throw _iteratorError15;
                    }
                }
            }

            return false;
        }

        /**
         * Returns the number of items in 'this' collection (if no `predicate` is given) or the number of
         * items in 'this' collection that satisfy the `predicate`.
         * 
         * @param {predicate} [predicate] - The predicate used to count elements
         * @returns {number}
         */

    }, {
        key: 'count',
        value: function count(predicate) {
            LinqInternal.validateOptionalFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            if (predicate == null && LinqInternal.isCollectionHavingExplicitCardinality(iterable)) return LinqInternal.getExplicitCardinality(iterable);

            var counter = 0;

            var _iteratorNormalCompletion16 = true;
            var _didIteratorError16 = false;
            var _iteratorError16 = undefined;

            try {
                for (var _iterator16 = iterable[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                    var item = _step16.value;

                    if (predicate == null || predicate(item)) counter += 1;
                }
            } catch (err) {
                _didIteratorError16 = true;
                _iteratorError16 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion16 && _iterator16.return) {
                        _iterator16.return();
                    }
                } finally {
                    if (_didIteratorError16) {
                        throw _iteratorError16;
                    }
                }
            }

            return counter;
        }

        /**
         * Returns either 'this' collection, if 'this' collection is empty, or a collection containing
         * only the `defaultValue` as an element.  In other words, this function always returns a collection 
         * containing at least one element.
         * 
         * @param {*} defaultValue 
         * @returns {Linq}
         */

    }, {
        key: 'defaultIfEmpty',
        value: function defaultIfEmpty(defaultValue) {
            var iterable = this.toIterable();

            if (LinqInternal.isEmptyIterable(iterable)) return new Linq([defaultValue]);else return new Linq(this);
        }

        /**
         * Returns a collection of all of the distinct elements of 'this' collection, using `comparer` (if it
         * is given) to determine whether two elements are equal.  If `comparer` is not given, the "===" operator
         * is used to compare elements.
         * 
         * @param {comparer|equalityComparer} [comparer] - The function used to compare elements
         * @returns {Linq} 
         */

    }, {
        key: 'distinct',
        value: function distinct(comparer) {
            return this.distinctBy(Linq.identity, comparer);
        }

        /**
         * Returns a collection of all of the elements that are considered distinct relative to the key value returned
         * by the `keySelector` projection, using `comparer` (if it is given) to determine whether to keys are equal.
         * If `comparer` is not given, the "===" operator is used to compare keys.
         * 
         * @param {projection} keySelector - The projection function used to return keys for the elements
         * @param {comparer|equalityComparer} [comparer] - The function used to compare keys
         * @returns {Linq} 
         */

    }, {
        key: 'distinctBy',
        value: function distinctBy(keySelector, comparer) {
            LinqInternal.validateRequiredFunction(keySelector, 'Invalid key selector.');
            LinqInternal.validateOptionalFunction(comparer, 'Invalid comparer.');

            // So sad--ES6's Set class does not allow for custom equality comparison, so have to use
            // groupBy instead of Set, which would perform more quickly.
            return this.groupBy(keySelector, null, comparer).select(function (x) {
                return x.values[0];
            });
        }

        /**
         * Returns the element of 'this' collection located at the ordinal position given by `index` (a zero-based 
         * index).  If that position is either less than zero or greater than or equal to the size of 'this' 
         * collection, then an error will be thrown.
         * 
         * @param {number} index - The zero-based index of the element to return
         * @returns {*}
         */

    }, {
        key: 'elementAt',
        value: function elementAt(index) {
            var _this = this;

            return LinqInternal.elementAtBasedOperator(index, function () {
                return _this.toIterable();
            }, function () {
                throw new Error('Invalid index.');
            });
        }

        /**
         * Returns either the element of 'this' collection located at the ordinal position given by `index` (a
         * zero-based index), if the `index` is contained within the bounds of 'this' collection, or the `defaultValue`,
         * if the `index` is not contained within the bounds of 'this' collection.
         * 
         * @param {number} index - The zero-based index of the element to return
         * @param {*} defaultValue - The value to return if the `index` is outside the bounds of 'this' collection
         * @returns {*}
         */

    }, {
        key: 'elementAtOrDefault',
        value: function elementAtOrDefault(index, defaultValue) {
            var _this2 = this;

            return LinqInternal.elementAtBasedOperator(index, function () {
                return _this2.toIterable();
            }, function () {
                return defaultValue;
            });
        }

        /**
         * Returns 'this' collection "zipped-up" with the `second` collection such that each value of the
         * returned collection is the value projected from the corresponding element from each of 'this'
         * collection and the `second` collection.  If the size of 'this' collection and the `second` 
         * collection are not equal, then an exception will be thrown.
         * 
         * @param {LinqCompatible} second - The collection to zip with 'this' collection 
         * @param {projection} [resultSelector] - The function to use to project the result values
         * @returns {Linq}
         */

    }, {
        key: 'equiZip',
        value: function equiZip(second, resultSelector) {
            var _marked4 = /*#__PURE__*/regeneratorRuntime.mark(equizipGenerator);

            LinqInternal.validateOptionalFunction(resultSelector, 'Invalid result selector.');

            if (resultSelector == null) resultSelector = Linq.tuple;

            var secondLinq = LinqInternal.ensureLinq(second);
            var firstIterable = this.toIterable();
            var secondIterable = secondLinq.toIterable();

            if (LinqInternal.isCollectionHavingExplicitCardinality(firstIterable) && LinqInternal.isCollectionHavingExplicitCardinality(secondIterable) && LinqInternal.getExplicitCardinality(firstIterable) !== LinqInternal.getExplicitCardinality(secondIterable)) {
                throw new Error('The two collections being equi-zipped are not of equal lengths.');
            }

            function equizipGenerator() {
                var firstIterator, secondIterator, firstState, secondState;
                return regeneratorRuntime.wrap(function equizipGenerator$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                firstIterator = LinqInternal.getIterator(firstIterable);
                                secondIterator = LinqInternal.getIterator(secondIterable);
                                firstState = firstIterator.next();
                                secondState = secondIterator.next();

                            case 4:
                                if (firstState.done) {
                                    _context5.next = 13;
                                    break;
                                }

                                if (!secondState.done) {
                                    _context5.next = 7;
                                    break;
                                }

                                throw new Error('Second collection is too short.');

                            case 7:
                                _context5.next = 9;
                                return resultSelector(firstState.value, secondState.value);

                            case 9:

                                firstState = firstIterator.next();
                                secondState = secondIterator.next();
                                _context5.next = 4;
                                break;

                            case 13:
                                if (secondState.done) {
                                    _context5.next = 15;
                                    break;
                                }

                                throw new Error('First collection is too short.');

                            case 15:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _marked4, this);
            }

            return new Linq(equizipGenerator);
        }

        /**
         * Returns elements in 'this' collection that do not also exist in the `second` collection, using `comparer`
         * (if it is given) to determine whether two items are equal.  Also, the returned elements will not include
         * duplicates from 'this' collection. If `comparer` is not given, the "===" operator is used to compare elements.
         * 
         * @param {LinqCompatible} second - The collection to use to exlude elements
         * @param {comparer|equalityComparer} [comparer] - The function used to compare elements 
         */

    }, {
        key: 'except',
        value: function except(second, comparer) {
            var _marked5 = /*#__PURE__*/regeneratorRuntime.mark(exceptGenerator);

            LinqInternal.validateOptionalFunction(comparer, 'Invalid comparer.');

            var normalizedComparer = comparer == null ? null : Linq.normalizeComparer(comparer);
            var secondLinq = LinqInternal.ensureLinq(second);

            var firstIterable = this.toIterable();
            var secondIterable = secondLinq.toIterable();

            var disqualifiedSet = SimpleSet.initialize(secondIterable, normalizedComparer);

            function exceptGenerator() {
                var _iteratorNormalCompletion17, _didIteratorError17, _iteratorError17, _iterator17, _step17, item, isDisqualified;

                return regeneratorRuntime.wrap(function exceptGenerator$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _iteratorNormalCompletion17 = true;
                                _didIteratorError17 = false;
                                _iteratorError17 = undefined;
                                _context6.prev = 3;
                                _iterator17 = firstIterable[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done) {
                                    _context6.next = 15;
                                    break;
                                }

                                item = _step17.value;
                                isDisqualified = disqualifiedSet.has(item);

                                if (isDisqualified) {
                                    _context6.next = 12;
                                    break;
                                }

                                disqualifiedSet.add(item);
                                _context6.next = 12;
                                return item;

                            case 12:
                                _iteratorNormalCompletion17 = true;
                                _context6.next = 5;
                                break;

                            case 15:
                                _context6.next = 21;
                                break;

                            case 17:
                                _context6.prev = 17;
                                _context6.t0 = _context6['catch'](3);
                                _didIteratorError17 = true;
                                _iteratorError17 = _context6.t0;

                            case 21:
                                _context6.prev = 21;
                                _context6.prev = 22;

                                if (!_iteratorNormalCompletion17 && _iterator17.return) {
                                    _iterator17.return();
                                }

                            case 24:
                                _context6.prev = 24;

                                if (!_didIteratorError17) {
                                    _context6.next = 27;
                                    break;
                                }

                                throw _iteratorError17;

                            case 27:
                                return _context6.finish(24);

                            case 28:
                                return _context6.finish(21);

                            case 29:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _marked5, this, [[3, 17, 21, 29], [22,, 24, 28]]);
            }

            return new Linq(exceptGenerator);
        }

        /**
         * Returns either the first element of 'this' collection (if 'predicate' is not given) or the 
         * first element of 'this' collection that satisfies the 'predicate' (if 'predicate' is given).
         * If there is no "first" element to return (either because 'this' collection is empty or no element 
         * satisfies the 'predicate'), an error is thrown.
         * 
         * @param {predicate} [predicate] - The predicate function used to determine the element to return
         * @returns {*}
         */

    }, {
        key: 'first',
        value: function first(predicate) {
            LinqInternal.validateOptionalFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            return LinqInternal.firstBasedOperator(iterable, predicate, null, true);
        }

        /**
         * Returns either the first element of 'this' collection (if `predicate` is not given) or the
         * first element of 'this' collection that satisfies the `predicate` (if `predicate` is given).
         * If there is no "first" element to return (either because 'this' collection is empty or no element
         * satisfies the `predicate`), the `defaultValue` is returned.
         * 
         * @param {predicate} [predicate] - The predicate function used to determine the element to return 
         * @param {*} [defaultValue] - The value to return if no "first" element is found
         * @returns {*}
         */

    }, {
        key: 'firstOrDefault',
        value: function firstOrDefault(predicate, defaultValue) {
            LinqInternal.validateOptionalFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            return LinqInternal.firstBasedOperator(iterable, predicate, defaultValue, false);
        }

        /**
         * Executes the given `action` on each element of 'this' collection.
         * @param {action} action - The function that is executed for each element 
         */

    }, {
        key: 'foreach',
        value: function foreach(action) {
            LinqInternal.validateRequiredFunction(action, 'Invalid action.');

            var iterable = this.toIterable();
            var counter = 0;

            var _iteratorNormalCompletion18 = true;
            var _didIteratorError18 = false;
            var _iteratorError18 = undefined;

            try {
                for (var _iterator18 = iterable[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                    var item = _step18.value;

                    action(item, counter);

                    counter += 1;
                }
            } catch (err) {
                _didIteratorError18 = true;
                _iteratorError18 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion18 && _iterator18.return) {
                        _iterator18.return();
                    }
                } finally {
                    if (_didIteratorError18) {
                        throw _iteratorError18;
                    }
                }
            }
        }

        /**
         * Return a collection of groupings (i.e., objects with a property called 'key' that
         * contains the grouping key and a property called 'values' that contains an array
         * of elements that are grouped under the grouping key).  The array of elements grouped
         * under the grouping key will be elements of 'this' collection (if no `elementSelector` 
         * is given) or projected elements given by `elementSelector`.  The grouping key for 
         * each element in 'this' collection is given by the `keySelector` function.  If a
         * `keyComparer` function is given, it will be used to determine equality among the
         * grouping keys (if `comparer` is not given, it the "===" operator will be used).
         * 
         * @param {projection} keySelector - The function that returns the grouping key for an element 
         * @param {projection} [elementSelector] - The function that projects elements to be returned 
         * @param {comparer|equalityComparer} [keyComparer] - The function used to compare grouping keys
         * @returns {Linq} - A Linq object representing a collection of `Grouping` objects.
         */

    }, {
        key: 'groupBy',
        value: function groupBy(keySelector, elementSelector, keyComparer) {
            LinqInternal.validateRequiredFunction(keySelector, 'Invalid key selector.');
            LinqInternal.validateOptionalFunction(elementSelector, 'Invalid element selector.');
            LinqInternal.validateOptionalFunction(keyComparer, 'Invalid key comparer.');

            var normalizedKeyComparer = LinqInternal.normalizeComparerOrDefault(keyComparer);

            var iterable = this.toIterable();
            var groupings = [];
            var groupingsLinq = new Linq(groupings);

            var _iteratorNormalCompletion19 = true;
            var _didIteratorError19 = false;
            var _iteratorError19 = undefined;

            try {
                var _loop = function _loop() {
                    var item = _step19.value;

                    var key = keySelector(item);
                    var element = elementSelector == null ? item : elementSelector(item);

                    var foundGroup = groupingsLinq.firstOrDefault(function (x) {
                        return normalizedKeyComparer(x.key, key);
                    }, null);

                    if (foundGroup == null) groupings.push(new Grouping(key, [element]));else foundGroup.values.push(element);
                };

                for (var _iterator19 = iterable[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError19 = true;
                _iteratorError19 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion19 && _iterator19.return) {
                        _iterator19.return();
                    }
                } finally {
                    if (_didIteratorError19) {
                        throw _iteratorError19;
                    }
                }
            }

            return groupingsLinq;
        }

        /**
         * Returns a "left outer" join of 'this' collection (the "outer" collection) and the `inner`
         * collection, using the `outerKeySelector` and `innerKeySelector` to project the keys from 
         * each collection, and using the `keyComparer` function (if it is given) to compare the
         * projected keys.  If the `keyComparer` is not given, the "===" operator will be used to 
         * compare the projected keys.  The `resultSelector` function is used to convert the joined 
         * results into the results that are returned by the groupJoin function.  The `resultSelector` 
         * takes as parameters the outer object (of the join) and an array of the joined inner objects 
         * (this array will be an empty array if there were no inner elements associated with the outer
         * element).
         * 
         * @param {LinqCompatible} inner - The collection that is "left-outer" joined with 'this' collection
         * @param {projection} outerKeySelector - The function that projects the key for the outer elements (in 'this' collection)
         * @param {projection} innerKeySelector - The function that projects the key for the inner elements
         * @param {biSourceProjection} resultSelector - The function that converts the joined results into the results returned
         * @param {comparer|equalityComparer} [keyComparer] - The function used to compare the projected keys
         * @returns {Linq}
         */

    }, {
        key: 'groupJoin',
        value: function groupJoin(inner, outerKeySelector, innerKeySelector, resultSelector, keyComparer) {
            if (inner == null) throw new Error('Invalid inner collection.');

            LinqInternal.validateRequiredFunction(outerKeySelector, 'Invalid outer key selector.');
            LinqInternal.validateRequiredFunction(innerKeySelector, 'Invalid inner key selector.');
            LinqInternal.validateRequiredFunction(resultSelector, 'Invalid result selector.');
            LinqInternal.validateOptionalFunction(keyComparer, 'Invalid key comparer.');

            var normalizedKeyComparer = LinqInternal.normalizeComparerOrDefault(keyComparer);
            var innerLinq = LinqInternal.ensureLinq(inner);
            var iterable = this.toIterable();
            var groupings = innerLinq.groupBy(innerKeySelector, null, keyComparer);
            var results = [];

            var _iteratorNormalCompletion20 = true;
            var _didIteratorError20 = false;
            var _iteratorError20 = undefined;

            try {
                var _loop2 = function _loop2() {
                    var item = _step20.value;

                    var outerKey = outerKeySelector(item);

                    var groupValues = groupings.firstOrDefault(function (x) {
                        return normalizedKeyComparer(x.key, outerKey);
                    });

                    results.push(resultSelector(item, groupValues == null ? [] : groupValues.values));
                };

                for (var _iterator20 = iterable[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                    _loop2();
                }
            } catch (err) {
                _didIteratorError20 = true;
                _iteratorError20 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion20 && _iterator20.return) {
                        _iterator20.return();
                    }
                } finally {
                    if (_didIteratorError20) {
                        throw _iteratorError20;
                    }
                }
            }

            return new Linq(results);
        }

        /**
         * Returns a collection of objects with the "key" property of each object equal to either the zero-based
         * index of the element in 'this' collection (if `startIndex` is not given) or the index, starting at
         * `startIndex`, of the element in 'this' collection, and with the "value" property of the object equal to
         * the element in 'this' collection.
         * 
         * @param {number} [startIndex] - The starting index for the results (defaults to `0`)
         */

    }, {
        key: 'index',
        value: function index(startIndex) {
            if (startIndex == null) startIndex = 0;

            if (isNaN(startIndex)) throw new Error('Invalid startIndex.');

            return this.select(function (x, i) {
                return { key: startIndex + i, value: x };
            });
        }

        /**
         * Returns the index of the first element that satisfies the `predicate`.  Returns the value "-1" if
         * none of the elements satisfy the `predicate`.
         * 
         * @param {predicate} predicate - The function used to determine which index to return
         * @returns {number}
         */

    }, {
        key: 'indexOf',
        value: function indexOf(predicate) {
            LinqInternal.validateRequiredFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();
            var counter = 0;

            var _iteratorNormalCompletion21 = true;
            var _didIteratorError21 = false;
            var _iteratorError21 = undefined;

            try {
                for (var _iterator21 = iterable[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                    var item = _step21.value;

                    if (predicate(item)) return counter;

                    counter += 1;
                }
            } catch (err) {
                _didIteratorError21 = true;
                _iteratorError21 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion21 && _iterator21.return) {
                        _iterator21.return();
                    }
                } finally {
                    if (_didIteratorError21) {
                        throw _iteratorError21;
                    }
                }
            }

            return -1;
        }

        /**
         * Returns the index of the first element to be equal to the given `element`.  If the optional `comparer` 
         * function is given, then the `comparer` function is used to determine equality between the elements 
         * of 'this' collection and the given `element`.
         * 
         * @param {*} element - The element to find within the collection
         * @param {comparer|equalityComparer} [comparer] = The function used to compare the elements of the collection
         * @returns {number}
         */

    }, {
        key: 'indexOfElement',
        value: function indexOfElement(element, comparer) {
            LinqInternal.validateOptionalFunction(comparer, 'Invalid comparer.');

            var normalizedComparer = LinqInternal.normalizeComparerOrDefault(comparer);
            var iterable = this.toIterable();
            var counter = 0;

            var _iteratorNormalCompletion22 = true;
            var _didIteratorError22 = false;
            var _iteratorError22 = undefined;

            try {
                for (var _iterator22 = iterable[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                    var item = _step22.value;

                    if (normalizedComparer(element, item)) return counter;

                    counter += 1;
                }
            } catch (err) {
                _didIteratorError22 = true;
                _iteratorError22 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion22 && _iterator22.return) {
                        _iterator22.return();
                    }
                } finally {
                    if (_didIteratorError22) {
                        throw _iteratorError22;
                    }
                }
            }

            return -1;
        }

        /**
         * Returns the intersection of elements in 'this' collection and the `second` collection, using the
         * `comparer` function to determine whether two different elements are equal.  If the `comparer` 
         * function is not given, then the "===" operator will be used to compare elements.
         * 
         * @param {LinqCompatible} second - The collection of elements to test for intersection
         * @param {comparer|equalityComparer} [comparer] - The function used to compare elements
         * @returns {Linq}
         */

    }, {
        key: 'intersect',
        value: function intersect(second, comparer) {
            var _marked6 = /*#__PURE__*/regeneratorRuntime.mark(intersectGenerator);

            LinqInternal.validateOptionalFunction(comparer, 'Invalid comparer.');

            var secondLinq = LinqInternal.ensureLinq(second);
            var normalizedComparer = comparer == null ? null : Linq.normalizeComparer(comparer);

            var firstIterable = this.toIterable();
            var secondIterable = secondLinq.toIterable();

            var includedSet = SimpleSet.initialize(secondIterable, normalizedComparer);

            function intersectGenerator() {
                var _iteratorNormalCompletion23, _didIteratorError23, _iteratorError23, _iterator23, _step23, item, wasRemoved;

                return regeneratorRuntime.wrap(function intersectGenerator$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _iteratorNormalCompletion23 = true;
                                _didIteratorError23 = false;
                                _iteratorError23 = undefined;
                                _context7.prev = 3;
                                _iterator23 = firstIterable[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done) {
                                    _context7.next = 14;
                                    break;
                                }

                                item = _step23.value;
                                wasRemoved = includedSet.remove(item);

                                if (!wasRemoved) {
                                    _context7.next = 11;
                                    break;
                                }

                                _context7.next = 11;
                                return item;

                            case 11:
                                _iteratorNormalCompletion23 = true;
                                _context7.next = 5;
                                break;

                            case 14:
                                _context7.next = 20;
                                break;

                            case 16:
                                _context7.prev = 16;
                                _context7.t0 = _context7['catch'](3);
                                _didIteratorError23 = true;
                                _iteratorError23 = _context7.t0;

                            case 20:
                                _context7.prev = 20;
                                _context7.prev = 21;

                                if (!_iteratorNormalCompletion23 && _iterator23.return) {
                                    _iterator23.return();
                                }

                            case 23:
                                _context7.prev = 23;

                                if (!_didIteratorError23) {
                                    _context7.next = 26;
                                    break;
                                }

                                throw _iteratorError23;

                            case 26:
                                return _context7.finish(23);

                            case 27:
                                return _context7.finish(20);

                            case 28:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _marked6, this, [[3, 16, 20, 28], [21,, 23, 27]]);
            }

            return new Linq(intersectGenerator);
        }

        /**
         * Returns an "inner" join of 'this' collection (the "outer" collection) and the `inner`
         * collection, using the `outerKeySelector` and `innerKeySelector` functions to project the
         * keys from each collection, and using the `keyComparer` function (if it is given) to compare
         * the projected keys.  If the `keyComparer` is not given, the "===" operator will be used to 
         * compare the projected keys.  The `resultSelector` function is used to convert the joined
         * results into the results that are returned by the join function.  The `resultSelector` 
         * function takes as parameters the outer object and the inner object of the join.
         * 
         * @param {LinqCompatible} inner - The collection that is "inner" joined with 'this' collection
         * @param {projection} outerKeySelector - The function that projects the key for the outer elements (in 'this' collection)
         * @param {projection} innerKeySelector - The function that projects the key for the inner elements
         * @param {biSourceProjection} resultSelector - The function that converts the joined results into results returned
         * @param {comparer|equalityComparer} [keyComparer] - The function used to compare the projected keys
         */

    }, {
        key: 'join',
        value: function join(inner, outerKeySelector, innerKeySelector, resultSelector, keyComparer) {
            var _marked7 = /*#__PURE__*/regeneratorRuntime.mark(joinGenerator);

            if (inner == null) throw new Error('Invalid inner collection.');

            LinqInternal.validateRequiredFunction(outerKeySelector, 'Invalid outer key selector.');
            LinqInternal.validateRequiredFunction(innerKeySelector, 'Invalid inner key selector.');
            LinqInternal.validateRequiredFunction(resultSelector, 'Invalid result selector.');
            LinqInternal.validateOptionalFunction(keyComparer, 'Invalid key comparer.');

            var innerLinq = LinqInternal.ensureLinq(inner);
            var normalizedComparer = LinqInternal.normalizeComparerOrDefault(keyComparer);
            var innerGroupings = innerLinq.groupBy(innerKeySelector, null, normalizedComparer);
            var outerIterable = this.toIterable();

            function joinGenerator() {
                var _this3 = this;

                var _iteratorNormalCompletion24, _didIteratorError24, _iteratorError24, _loop3, _iterator24, _step24;

                return regeneratorRuntime.wrap(function joinGenerator$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _iteratorNormalCompletion24 = true;
                                _didIteratorError24 = false;
                                _iteratorError24 = undefined;
                                _context9.prev = 3;
                                _loop3 = /*#__PURE__*/regeneratorRuntime.mark(function _loop3() {
                                    var item, outerKey, groupValues, _iteratorNormalCompletion25, _didIteratorError25, _iteratorError25, _iterator25, _step25, groupItem;

                                    return regeneratorRuntime.wrap(function _loop3$(_context8) {
                                        while (1) {
                                            switch (_context8.prev = _context8.next) {
                                                case 0:
                                                    item = _step24.value;
                                                    outerKey = outerKeySelector(item);
                                                    groupValues = innerGroupings.firstOrDefault(function (x) {
                                                        return normalizedComparer(x.key, outerKey);
                                                    });

                                                    if (!(groupValues != null && groupValues.values.length > 0)) {
                                                        _context8.next = 30;
                                                        break;
                                                    }

                                                    _iteratorNormalCompletion25 = true;
                                                    _didIteratorError25 = false;
                                                    _iteratorError25 = undefined;
                                                    _context8.prev = 7;
                                                    _iterator25 = groupValues.values[Symbol.iterator]();

                                                case 9:
                                                    if (_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done) {
                                                        _context8.next = 16;
                                                        break;
                                                    }

                                                    groupItem = _step25.value;
                                                    _context8.next = 13;
                                                    return resultSelector(item, groupItem);

                                                case 13:
                                                    _iteratorNormalCompletion25 = true;
                                                    _context8.next = 9;
                                                    break;

                                                case 16:
                                                    _context8.next = 22;
                                                    break;

                                                case 18:
                                                    _context8.prev = 18;
                                                    _context8.t0 = _context8['catch'](7);
                                                    _didIteratorError25 = true;
                                                    _iteratorError25 = _context8.t0;

                                                case 22:
                                                    _context8.prev = 22;
                                                    _context8.prev = 23;

                                                    if (!_iteratorNormalCompletion25 && _iterator25.return) {
                                                        _iterator25.return();
                                                    }

                                                case 25:
                                                    _context8.prev = 25;

                                                    if (!_didIteratorError25) {
                                                        _context8.next = 28;
                                                        break;
                                                    }

                                                    throw _iteratorError25;

                                                case 28:
                                                    return _context8.finish(25);

                                                case 29:
                                                    return _context8.finish(22);

                                                case 30:
                                                case 'end':
                                                    return _context8.stop();
                                            }
                                        }
                                    }, _loop3, _this3, [[7, 18, 22, 30], [23,, 25, 29]]);
                                });
                                _iterator24 = outerIterable[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done) {
                                    _context9.next = 11;
                                    break;
                                }

                                return _context9.delegateYield(_loop3(), 't0', 8);

                            case 8:
                                _iteratorNormalCompletion24 = true;
                                _context9.next = 6;
                                break;

                            case 11:
                                _context9.next = 17;
                                break;

                            case 13:
                                _context9.prev = 13;
                                _context9.t1 = _context9['catch'](3);
                                _didIteratorError24 = true;
                                _iteratorError24 = _context9.t1;

                            case 17:
                                _context9.prev = 17;
                                _context9.prev = 18;

                                if (!_iteratorNormalCompletion24 && _iterator24.return) {
                                    _iterator24.return();
                                }

                            case 20:
                                _context9.prev = 20;

                                if (!_didIteratorError24) {
                                    _context9.next = 23;
                                    break;
                                }

                                throw _iteratorError24;

                            case 23:
                                return _context9.finish(20);

                            case 24:
                                return _context9.finish(17);

                            case 25:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _marked7, this, [[3, 13, 17, 25], [18,, 20, 24]]);
            }

            return new Linq(joinGenerator);
        }

        /**
         * Returns either the last element of 'this' collection (if `predicate` is not given) or the
         * last element of 'this' collection that satisfies the `predicate` (if `predicate` is given).
         * If there is no "last" element to return (either because 'this' collection is empty or no element
         * satisfies the `predicate`), an error is thrown.
         * 
         * @param {predicate} [predicate] - The function used to determine the element to return
         * @returns {*}
         */

    }, {
        key: 'last',
        value: function last(predicate) {
            LinqInternal.validateOptionalFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            return LinqInternal.lastBasedOperator(iterable, predicate, null, true);
        }

        /**
         * Returns the index of the last element that satisfies the `predicate`.  Returns the value "-1" if
         * none of the elements satisfy the `predicate`.
         * 
         * @param {predicate} predicate - The function used to determine which index to return
         * @returns {number}
         */

    }, {
        key: 'lastIndexOf',
        value: function lastIndexOf(predicate) {
            LinqInternal.validateRequiredFunction(predicate, 'Invalid predicate.');

            var element = this.index().where(function (x) {
                return predicate(x.value);
            }).reverse().firstOrDefault();

            return element == null ? -1 : element.key;
        }

        /**
         * Returns the index of the last element to be equal to the given `item`.  If the optional `comparer` 
         * function is given, then the `comparer` function is used to determine equality between the elements 
         * of 'this' collection and the given 'item'.
         * 
         * @param {*} item - The item to find within 'this' collection
         * @param {comparer|equalityComparer} [comparer] - The function used to compare the elements of 'this' collection with the given `item`
         * @returns {*} 
         */

    }, {
        key: 'lastIndexOfElement',
        value: function lastIndexOfElement(item, comparer) {
            LinqInternal.validateOptionalFunction(comparer, 'Invalid comparer.');

            var normalizedComparer = LinqInternal.normalizeComparerOrDefault(comparer);

            return this.lastIndexOf(function (x) {
                return normalizedComparer(x, item);
            });
        }

        /**
         * Returns either the last element of 'this' collection (if 'predicate' is not given) or the
         * last element of 'this' collection that satisfies the 'predicate' (if 'predicate is given).
         * If there is no "last" element to return (either because 'this' collection is empty or no element
         * satisfies the 'predicate'), the 'defaultValue' is returned.
         * 
         * @param {predicate} [predicate] - The predicate function used to determine the element to return 
         * @param {*} [defaultValue] - The value to return if no "last" element is found
         * @returns {*} 
         */

    }, {
        key: 'lastOrDefault',
        value: function lastOrDefault(predicate, defaultValue) {
            LinqInternal.validateOptionalFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            return LinqInternal.lastBasedOperator(iterable, predicate, defaultValue, false);
        }

        /**
         * Returns either the minimum element (if `selector` is not given) or the minimum element projected by 
         * the `selector` function in 'this' collection.  If 'this' collection is empty, an error is thrown.
         * 
         * @param {projection} [selector] - The function that projects the value to use to determine a minimum
         * @returns {*} 
         */

    }, {
        key: 'min',
        value: function min(selector) {
            LinqInternal.validateOptionalFunction(selector, 'Invalid selector.');

            var iterable = this.toIterable();

            if (LinqInternal.isEmptyIterable(iterable)) throw new Error('No minimum element.');

            if (selector == null) selector = Linq.identity;

            return LinqInternal.getExtremeValue(this, selector, LinqInternal.minComparer, selector);
        }

        /**
         * Returns the "minimum" element of 'this' collection, determined by the value projected by 
         * the `selector` function.  If 'this' collection is empty, an error is thrown.
         * 
         * @param {projection} selector - The function that projects the value to use to determine a minimum
         * @returns {*}
         */

    }, {
        key: 'minBy',
        value: function minBy(selector) {
            LinqInternal.validateRequiredFunction(selector, 'Invalid selector.');

            var iterable = this.toIterable();

            if (LinqInternal.isEmptyIterable(iterable)) throw new Error('No minimum element.');

            return LinqInternal.getExtremeValue(this, selector, LinqInternal.minComparer, Linq.identity);
        }

        /**
         * Returns either the maximum element (if `selector` is not given) or the maximum element projected by 
         * the `selector` function in 'this' collection.  If 'this' collection is empty, an error is thrown.
         * 
         * @param {projection} [selector] - The function that projects the value to use to determine the maximum
         * @returns {*} 
         */

    }, {
        key: 'max',
        value: function max(selector) {
            LinqInternal.validateOptionalFunction(selector, 'Invalid selector.');

            var iterable = this.toIterable();

            if (LinqInternal.isEmptyIterable(iterable)) throw new Error('No maximum element.');

            if (selector == null) selector = Linq.identity;

            return LinqInternal.getExtremeValue(this, selector, LinqInternal.maxComparer, selector);
        }

        /**
         * Returns the "maximum" element of 'this' collection, determined by the value projected by 
         * the `selector` function.  If 'this' collection is empty, an error is thrown.
         * 
         * @param {projection} selector - The function that projects the value to use to determine the maximum
         * @returns {*} 
         */

    }, {
        key: 'maxBy',
        value: function maxBy(selector) {
            LinqInternal.validateRequiredFunction(selector, 'Invalid selector.');

            var iterable = this.toIterable();

            if (LinqInternal.isEmptyIterable(iterable)) throw new Error('No maximum element.');

            return LinqInternal.getExtremeValue(this, selector, LinqInternal.maxComparer, Linq.identity);
        }

        /**
         * Returns the elements of 'this' collection sorted in ascending order of the projected value
         * given by the `keySelector` function, using the `comparer` function to compare the projected
         * values.  If the `comparer` function is not given, a comparer that uses the natural ordering 
         * of the values will be used to compare the projected values.  Note that subsequent, immediate 
         * calls to either thenBy or thenByDescending will provide subsequent "levels" of sorting (that 
         * is, sorting when two elements are determined to be equal by this orderBy call).
         * 
         * @param {projection} keySelector - The function that projects the value used to sort the elements
         * @param {comparer} [comparer] - The function that compares the projected values
         * @returns {Linq}
         */

    }, {
        key: 'orderBy',
        value: function orderBy(keySelector, comparer) {
            return LinqInternal.orderByBasedOperator(this, keySelector, comparer, false);
        }

        /**
         * Returns the elements of 'this' collection sorted in descending order of the projected value
         * given by the `keySelector` function, using the `comparer` function to compare the projected
         * values.  If the `comparer` function is not given, a comparer that uses the natural ordering 
         * of the values will be used to compare the projected values.  Note that subsequent, immediate 
         * calls to either thenBy or thenByDescending will provide subsequent "levels" of sorting (that 
         * is, sorting when two elements are determined to be equal by this orderBy call).
         * 
         * @param {projection} keySelector - The function that projects the value used to sort the elements
         * @param {comparer} [comparer] - The function that compares the projected values
         * @returns {Linq}
         */

    }, {
        key: 'orderByDescending',
        value: function orderByDescending(keySelector, comparer) {
            return LinqInternal.orderByBasedOperator(this, keySelector, comparer, true);
        }

        /**
         * Returns a collection the same elements as 'this' collection but with extra elements added 
         * to the end so that the results collection has a length of at least `width`.  The extra
         * elements that are added are equal to the `padding` value.
         * 
         * @param {number} width - The length that the results collection will be at least equal to
         * @param {*} padding - The value that is added to the results collection to fill it out
         * @returns {Linq}
         */

    }, {
        key: 'pad',
        value: function pad(width, padding) {
            return this.padWith(width, function () {
                return padding;
            });
        }

        /**
         * Returns a collection the same elements as 'this' collection but with extra elements added 
         * to the end so that the results collection has a length of at least `width`.  The extra
         * elements that are added are determined by the `paddingSelector` function—a function that 
         * takes an integer as a parameter (i.e., the position/index that the element returned by the 
         * `paddingSelector` function will have in the results collection .  
         * 
         * @param {number} width - The length that the results collection will be at least equal to
         * @param {projection} paddingSelector - The function that indicates the value to add to the results collection
         * @returns {Linq}
         */

    }, {
        key: 'padWith',
        value: function padWith(width, paddingSelector) {
            var _marked8 = /*#__PURE__*/regeneratorRuntime.mark(padWithGenerator);

            if (!LinqInternal.isValidNumber(width)) throw new Error('Invalid width.');

            LinqInternal.validateRequiredFunction(paddingSelector, 'Invalid padding selector.');

            var iterable = this.toIterable();

            function padWithGenerator() {
                var counter, _iteratorNormalCompletion26, _didIteratorError26, _iteratorError26, _iterator26, _step26, _item3;

                return regeneratorRuntime.wrap(function padWithGenerator$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                counter = 0;
                                _iteratorNormalCompletion26 = true;
                                _didIteratorError26 = false;
                                _iteratorError26 = undefined;
                                _context10.prev = 4;
                                _iterator26 = iterable[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done) {
                                    _context10.next = 14;
                                    break;
                                }

                                _item3 = _step26.value;
                                _context10.next = 10;
                                return _item3;

                            case 10:
                                counter += 1;

                            case 11:
                                _iteratorNormalCompletion26 = true;
                                _context10.next = 6;
                                break;

                            case 14:
                                _context10.next = 20;
                                break;

                            case 16:
                                _context10.prev = 16;
                                _context10.t0 = _context10['catch'](4);
                                _didIteratorError26 = true;
                                _iteratorError26 = _context10.t0;

                            case 20:
                                _context10.prev = 20;
                                _context10.prev = 21;

                                if (!_iteratorNormalCompletion26 && _iterator26.return) {
                                    _iterator26.return();
                                }

                            case 23:
                                _context10.prev = 23;

                                if (!_didIteratorError26) {
                                    _context10.next = 26;
                                    break;
                                }

                                throw _iteratorError26;

                            case 26:
                                return _context10.finish(23);

                            case 27:
                                return _context10.finish(20);

                            case 28:
                                if (!(counter < width)) {
                                    _context10.next = 34;
                                    break;
                                }

                                _context10.next = 31;
                                return paddingSelector(counter);

                            case 31:
                                counter += 1;
                                _context10.next = 28;
                                break;

                            case 34:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _marked8, this, [[4, 16, 20, 28], [21,, 23, 27]]);
            }

            return new Linq(padWithGenerator);
        }

        /**
         * Returns the same elements as 'this' collection, but first executes an `action` on
         * each element of 'this' collection.
         * 
         * @param {action} action - The function to execute on each element of 'this' collection
         * @returns {Linq}
         */

    }, {
        key: 'pipe',
        value: function pipe(action) {
            LinqInternal.validateRequiredFunction(action, 'Invalid action.');

            var iterable = this.toIterable();
            var counter = 0;

            var _iteratorNormalCompletion27 = true;
            var _didIteratorError27 = false;
            var _iteratorError27 = undefined;

            try {
                for (var _iterator27 = iterable[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
                    var _item4 = _step27.value;

                    action(_item4, counter);

                    counter += 1;
                }
            } catch (err) {
                _didIteratorError27 = true;
                _iteratorError27 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion27 && _iterator27.return) {
                        _iterator27.return();
                    }
                } finally {
                    if (_didIteratorError27) {
                        throw _iteratorError27;
                    }
                }
            }

            return new Linq(this.source);
        }

        /**
         * Returns 'this' collection with the `value` prepended (i.e, added to the front).
         * 
         * @param {*} value - The value to be prepended to 'this' collection
         * @returns {Linq}
         */

    }, {
        key: 'prepend',
        value: function prepend(value) {
            var _marked9 = /*#__PURE__*/regeneratorRuntime.mark(prependGenerator);

            var iterable = this.toIterable();

            function prependGenerator() {
                var _iteratorNormalCompletion28, _didIteratorError28, _iteratorError28, _iterator28, _step28, _item5;

                return regeneratorRuntime.wrap(function prependGenerator$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.next = 2;
                                return value;

                            case 2:
                                _iteratorNormalCompletion28 = true;
                                _didIteratorError28 = false;
                                _iteratorError28 = undefined;
                                _context11.prev = 5;
                                _iterator28 = iterable[Symbol.iterator]();

                            case 7:
                                if (_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done) {
                                    _context11.next = 14;
                                    break;
                                }

                                _item5 = _step28.value;
                                _context11.next = 11;
                                return _item5;

                            case 11:
                                _iteratorNormalCompletion28 = true;
                                _context11.next = 7;
                                break;

                            case 14:
                                _context11.next = 20;
                                break;

                            case 16:
                                _context11.prev = 16;
                                _context11.t0 = _context11['catch'](5);
                                _didIteratorError28 = true;
                                _iteratorError28 = _context11.t0;

                            case 20:
                                _context11.prev = 20;
                                _context11.prev = 21;

                                if (!_iteratorNormalCompletion28 && _iterator28.return) {
                                    _iterator28.return();
                                }

                            case 23:
                                _context11.prev = 23;

                                if (!_didIteratorError28) {
                                    _context11.next = 26;
                                    break;
                                }

                                throw _iteratorError28;

                            case 26:
                                return _context11.finish(23);

                            case 27:
                                return _context11.finish(20);

                            case 28:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _marked9, this, [[5, 16, 20, 28], [21,, 23, 27]]);
            }

            return new Linq(prependGenerator);
        }

        /**
         * Returns an equal-length collection where the N-th element is the aggregate of the
         * `operation` function performed on the first N-1 elements of 'this' collection (the
         * first element of the results is set to the `identity` value).  The `operation` 
         * function should be a commutative, binary operation (e.g., sum, multiplication, etc.)
         * Also, the `identity` parameter should be passed the value that is the "identity" for
         * the `operation`—that is, when the `operator` is applied to the `identity` value and 
         * any other value, the results is that same value (e.g., for addition, 0 + n = n; for
         * multiplication, 1 * n = n; for string concatenation, "" + str = str; etc.)
         * 
         * @param {aggregator} operation - The function that aggregates the values of 'this' collection 
         * @param {*} identity - The identity value of the operation
         * @returns {Linq}
         */

    }, {
        key: 'prescan',
        value: function prescan(operation, identity) {
            var _marked10 = /*#__PURE__*/regeneratorRuntime.mark(prescanGenerator);

            LinqInternal.validateRequiredFunction(operation, 'Invalid operation.');

            var iterable = this.toIterable();
            var iterator = LinqInternal.getIterator(iterable);

            function prescanGenerator() {
                var acc, state, _state, value;

                return regeneratorRuntime.wrap(function prescanGenerator$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                acc = identity;
                                state = iterator.next();

                            case 2:
                                if (state.done) {
                                    _context12.next = 10;
                                    break;
                                }

                                _context12.next = 5;
                                return acc;

                            case 5:
                                _state = state, value = _state.value;


                                state = iterator.next();

                                if (!state.done) acc = operation(acc, value);
                                _context12.next = 2;
                                break;

                            case 10:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _marked10, this);
            }

            return new Linq(prescanGenerator);
        }

        /**
         * Returns the elements of 'this' collection in reverse order.
         * 
         * @returns {Linq}
         */

    }, {
        key: 'reverse',
        value: function reverse() {
            var _marked11 = /*#__PURE__*/regeneratorRuntime.mark(gen);

            var iterable = this.toIterable();

            function gen() {
                var i;
                return regeneratorRuntime.wrap(function gen$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                i = iterable.length - 1;

                            case 1:
                                if (!(i >= 0)) {
                                    _context13.next = 7;
                                    break;
                                }

                                _context13.next = 4;
                                return iterable[i];

                            case 4:
                                i--;
                                _context13.next = 1;
                                break;

                            case 7:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _marked11, this);
            }

            if (!LinqInternal.isIndexedCollection(iterable) || !LinqInternal.isCollectionHavingLength(iterable)) iterable = Array.from(iterable);

            return new Linq(gen);
        }

        /**
         * If the `seed` is not given, returns an equal-length collection where the N-th element
         * is the aggregate of the `operation` function performed on the first N elements of
         * 'this' collection.  
         * 
         * If the `seed` is given, then the same as the if the `seed` where not given but on 
         * 'this' collection with the `seed` prepended to it.  Note, that with the `seed` given,
         * this function returns the result of calling `aggregate` (with the same `operation` and
         * `seed`) but with the intermediate aggregation results included with the final aggregation
         * result.
         *   
         * The `operation` function should be a commutative, binary operation (e.g., sum, 
         * multiplication, etc.).
         * 
         * @param {aggregator} operation - The function that aggregates the values of 'this' collection
         * @param {*} [seed] - An initial, seed value that causes scan to generate intermediate values of aggregate function
         * @returns {Linq}
         */

    }, {
        key: 'scan',
        value: function scan(operation, seed) {
            var _marked12 = /*#__PURE__*/regeneratorRuntime.mark(scanGenerator);

            LinqInternal.validateRequiredFunction(operation, 'Invalid operation.');

            var col = seed === undefined ? this : this.prepend(seed);

            function scanGenerator() {
                var iterable, iterator, state, acc;
                return regeneratorRuntime.wrap(function scanGenerator$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                iterable = col.toIterable();
                                iterator = LinqInternal.getIterator(iterable);
                                state = iterator.next();

                                if (!state.done) {
                                    _context14.next = 5;
                                    break;
                                }

                                return _context14.abrupt('return');

                            case 5:
                                acc = state.value;
                                _context14.next = 8;
                                return acc;

                            case 8:

                                state = iterator.next();

                            case 9:
                                if (state.done) {
                                    _context14.next = 16;
                                    break;
                                }

                                acc = operation(acc, state.value);
                                _context14.next = 13;
                                return acc;

                            case 13:

                                state = iterator.next();
                                _context14.next = 9;
                                break;

                            case 16:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, _marked12, this);
            }

            return new Linq(scanGenerator);
        }

        /**
         * Returns a collection of values projected from the elements of 'this' collection.
         * 
         * @param {indexedProjection} selector - The function that projects the values from the elements
         * @returns {Linq}
         */

    }, {
        key: 'select',
        value: function select(selector) {
            var _marked13 = /*#__PURE__*/regeneratorRuntime.mark(selectGenerator);

            LinqInternal.validateRequiredFunction(selector, 'Invalid selector.');

            var iterable = this.toIterable();
            var i = 0;

            function selectGenerator() {
                var _iteratorNormalCompletion29, _didIteratorError29, _iteratorError29, _iterator29, _step29, _item6;

                return regeneratorRuntime.wrap(function selectGenerator$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                _iteratorNormalCompletion29 = true;
                                _didIteratorError29 = false;
                                _iteratorError29 = undefined;
                                _context15.prev = 3;
                                _iterator29 = iterable[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done) {
                                    _context15.next = 13;
                                    break;
                                }

                                _item6 = _step29.value;
                                _context15.next = 9;
                                return selector(_item6, i);

                            case 9:

                                i += 1;

                            case 10:
                                _iteratorNormalCompletion29 = true;
                                _context15.next = 5;
                                break;

                            case 13:
                                _context15.next = 19;
                                break;

                            case 15:
                                _context15.prev = 15;
                                _context15.t0 = _context15['catch'](3);
                                _didIteratorError29 = true;
                                _iteratorError29 = _context15.t0;

                            case 19:
                                _context15.prev = 19;
                                _context15.prev = 20;

                                if (!_iteratorNormalCompletion29 && _iterator29.return) {
                                    _iterator29.return();
                                }

                            case 22:
                                _context15.prev = 22;

                                if (!_didIteratorError29) {
                                    _context15.next = 25;
                                    break;
                                }

                                throw _iteratorError29;

                            case 25:
                                return _context15.finish(22);

                            case 26:
                                return _context15.finish(19);

                            case 27:
                            case 'end':
                                return _context15.stop();
                        }
                    }
                }, _marked13, this, [[3, 15, 19, 27], [20,, 22, 26]]);
            }

            return new Linq(selectGenerator);
        }

        /**
         * Returns the concatenation of values projected from the elements of 'this' collection by the
         * `collectionSelector` function.  If the `resultSelector` function is given, then the results
         * returned by this function will be projected from an element in the concatenation and the 
         * element that originated the part of the concatenation.  Otherwise, the results returned by
         * this function will be the element of the concatenation.
         * 
         * @param {collectionProjection} collectionSelector - The function that projects a collection of values from an element
         * @param {projection} [resultSelector] - The function that projects the results from the concatenated results
         * @returns {Linq}
         */

    }, {
        key: 'selectMany',
        value: function selectMany(collectionSelector, resultSelector) {
            var _marked14 = /*#__PURE__*/regeneratorRuntime.mark(selectManyGenerator);

            LinqInternal.validateRequiredFunction(collectionSelector, 'Invalid collection selector.');
            LinqInternal.validateOptionalFunction(resultSelector, 'Invalid result selector.');

            var iterable = this.toIterable();

            function selectManyGenerator() {
                var i, _iteratorNormalCompletion30, _didIteratorError30, _iteratorError30, _iterator30, _step30, outerItem, projectedItems, innerIterable, _iteratorNormalCompletion31, _didIteratorError31, _iteratorError31, _iterator31, _step31, innerItem;

                return regeneratorRuntime.wrap(function selectManyGenerator$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                i = 0;
                                _iteratorNormalCompletion30 = true;
                                _didIteratorError30 = false;
                                _iteratorError30 = undefined;
                                _context16.prev = 4;
                                _iterator30 = iterable[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done) {
                                    _context16.next = 42;
                                    break;
                                }

                                outerItem = _step30.value;
                                projectedItems = collectionSelector(outerItem, i);


                                i += 1;

                                if (!(projectedItems == null)) {
                                    _context16.next = 12;
                                    break;
                                }

                                return _context16.abrupt('continue', 39);

                            case 12:
                                innerIterable = LinqInternal.ensureLinq(projectedItems).toIterable();
                                _iteratorNormalCompletion31 = true;
                                _didIteratorError31 = false;
                                _iteratorError31 = undefined;
                                _context16.prev = 16;
                                _iterator31 = innerIterable[Symbol.iterator]();

                            case 18:
                                if (_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done) {
                                    _context16.next = 25;
                                    break;
                                }

                                innerItem = _step31.value;
                                _context16.next = 22;
                                return resultSelector == null ? innerItem : resultSelector(innerItem, outerItem);

                            case 22:
                                _iteratorNormalCompletion31 = true;
                                _context16.next = 18;
                                break;

                            case 25:
                                _context16.next = 31;
                                break;

                            case 27:
                                _context16.prev = 27;
                                _context16.t0 = _context16['catch'](16);
                                _didIteratorError31 = true;
                                _iteratorError31 = _context16.t0;

                            case 31:
                                _context16.prev = 31;
                                _context16.prev = 32;

                                if (!_iteratorNormalCompletion31 && _iterator31.return) {
                                    _iterator31.return();
                                }

                            case 34:
                                _context16.prev = 34;

                                if (!_didIteratorError31) {
                                    _context16.next = 37;
                                    break;
                                }

                                throw _iteratorError31;

                            case 37:
                                return _context16.finish(34);

                            case 38:
                                return _context16.finish(31);

                            case 39:
                                _iteratorNormalCompletion30 = true;
                                _context16.next = 6;
                                break;

                            case 42:
                                _context16.next = 48;
                                break;

                            case 44:
                                _context16.prev = 44;
                                _context16.t1 = _context16['catch'](4);
                                _didIteratorError30 = true;
                                _iteratorError30 = _context16.t1;

                            case 48:
                                _context16.prev = 48;
                                _context16.prev = 49;

                                if (!_iteratorNormalCompletion30 && _iterator30.return) {
                                    _iterator30.return();
                                }

                            case 51:
                                _context16.prev = 51;

                                if (!_didIteratorError30) {
                                    _context16.next = 54;
                                    break;
                                }

                                throw _iteratorError30;

                            case 54:
                                return _context16.finish(51);

                            case 55:
                                return _context16.finish(48);

                            case 56:
                            case 'end':
                                return _context16.stop();
                        }
                    }
                }, _marked14, this, [[4, 44, 48, 56], [16, 27, 31, 39], [32,, 34, 38], [49,, 51, 55]]);
            }

            return new Linq(selectManyGenerator);
        }

        /**
         * Returns whether 'this' collection is equal to the `second` collection (that is, has the same elements in the
         * same order).  If the `comparer` function is given, it is used to determine whether elements from each of the
         * two collections are equal.  Otherwise, the "===" operator is used to determine equality.
         * 
         * @param {LinqCompatible} second - The collection to which 'this' collection is compared
         * @param {comparer|equalityComparer} [comparer] - The function used to compare elements of the two collections
         * @returns {boolean}
         */

    }, {
        key: 'sequenceEqual',
        value: function sequenceEqual(second, comparer) {
            LinqInternal.validateOptionalFunction(comparer, 'Invalid comparer.');

            if (second == null) return false;

            var normalizedComparer = LinqInternal.normalizeComparerOrDefault(comparer);

            var firstIterable = this.toIterable();
            var secondIterable = LinqInternal.ensureLinq(second).toIterable();
            var firstLength = LinqInternal.getExplicitCardinality(firstIterable);
            var secondLength = LinqInternal.getExplicitCardinality(secondIterable);

            if (firstLength != null && secondLength != null && firstLength !== secondLength) return false;

            var firstIterator = LinqInternal.getIterator(firstIterable);
            var secondIterator = LinqInternal.getIterator(secondIterable);
            var firstState = firstIterator.next();
            var secondState = secondIterator.next();

            while (!firstState.done && !secondState.done) {
                if (!normalizedComparer(firstState.value, secondState.value)) return false;

                firstState = firstIterator.next();
                secondState = secondIterator.next();
            }

            if (!firstState.done || !secondState.done) return false;

            return true;
        }

        /**
         * Returns whether 'this' collection is equivalent to the `second` collection (that is, has the 
         * same elements regardless of order).  If the `comparer` function is given, it is used to determine
         * whether elements from each of the two collections are equal.  Otherwise, the "===" operator is
         * used to determine equality.
         * 
         * @param {LinqCompatible} second - The collection to which 'this' collection is compared
         * @param {comparer|equalityComparer} [comparer] - The function used to compare elements of the two collections
         * @returns {boolean} 
         */

    }, {
        key: 'sequenceEquivalent',
        value: function sequenceEquivalent(second, comparer) {
            LinqInternal.validateOptionalFunction(comparer, 'Invalid comparer.');

            if (second == null) return false;

            var normalizedComparer = LinqInternal.normalizeComparerOrDefault(comparer);
            var secondLinq = LinqInternal.ensureLinq(second);

            var firstIterable = this.toIterable();
            var secondIterable = secondLinq.toIterable();
            var firstLength = LinqInternal.getExplicitCardinality(firstIterable);
            var secondLength = LinqInternal.getExplicitCardinality(secondIterable);

            if (firstLength != null && secondLength != null && firstLength !== secondLength) return false;

            var firstLookup = this.toLookup(Linq.identity, comparer);
            var secondLookup = secondLinq.toLookup(Linq.identity, comparer);

            var haveSameCount = firstLookup.count() === secondLookup.count();

            var predicate = function predicate(x) {
                var lookupNode = secondLookup.firstOrDefault(function (y) {
                    return normalizedComparer(y.key, x.key);
                });

                if (lookupNode == null) return false;

                return x.values.length === lookupNode.values.length;
            };

            return haveSameCount && firstLookup.all(predicate);
        }

        /**
         * Returns either the only element of 'this' collection (if `predicate` is not given) or the
         * first (and only) element of 'this' collection that satisfies the `predicate` (if 'predicate' is 
         * given).  If there are either multiple elements in 'this' collection (if `predicate` is not given)
         * or there are multiple elements that satisfy the 'predicate' (if `predicate` is given), then an
         * error is thrown.  If there is no "single" element (either because 'this' collection is empty or
         * no element satisfies the `predicate`), an error is thrown.
         * 
         * @param {predicate} [predicate] - The function used to determine the element to return
         * @returns {*} 
         */

    }, {
        key: 'single',
        value: function single(predicate) {
            LinqInternal.validateOptionalFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            return LinqInternal.singleBasedOperator(iterable, predicate, null, true);
        }

        /**
         * Returns either the only element of 'this' collection (if `predicate` is not given) or the
         * first (and only) element of 'this' collection that satisfies the `predicate` (if 'predicate' is 
         * given).  If there are either multiple elements in 'this' collection (if `predicate` is not given)
         * or there are multiple elements that satisfy the `predicate` (if `predicate` is given), then an
         * error is thrown.  If there is no "single" element (either because 'this' collection is empty or
         * no element satisfies the `predicate`), the `defaultValue` is returned (or `undefined` if `defaultValue`
         * is not given).
         * 
         * @param {predicate} [predicate] - The function used to determine the element to return 
         * @param {*} [defaultValue] - The default value that is returned if no single element is found
         * @returns {*} 
         */

    }, {
        key: 'singleOrDefault',
        value: function singleOrDefault(predicate, defaultValue) {
            LinqInternal.validateOptionalFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            return LinqInternal.singleBasedOperator(iterable, predicate, function () {
                return defaultValue;
            }, false);
        }

        /**
         * Returns either the only element of 'this' collection or the value returned by the `fallback`
         * function if 'this' collection is empty.  If there are more than one element in 'this' collection,
         * then an exception will be thrown.
         * 
         * @param {constantFunction} fallback 
         */

    }, {
        key: 'singleOrFallback',
        value: function singleOrFallback(fallback) {
            LinqInternal.validateRequiredFunction(fallback, 'Invalid fallback function.');

            var iterable = this.toIterable();

            return LinqInternal.singleBasedOperator(iterable, null, fallback, false);
        }

        /**
         * Returns the elements of 'this' collection with the first `count` number of elements skipped.
         * 
         * @param {number} count - The number of elements to skip from 'this' collection
         * @returns {Linq}
         */

    }, {
        key: 'skip',
        value: function skip(count) {
            var _marked15 = /*#__PURE__*/regeneratorRuntime.mark(skipGenerator);

            if (!LinqInternal.isValidNumber(count)) throw new Error('Invalid count.');

            var iterable = this.toIterable();

            function skipGenerator() {
                var counter, _iteratorNormalCompletion32, _didIteratorError32, _iteratorError32, _iterator32, _step32, _item7;

                return regeneratorRuntime.wrap(function skipGenerator$(_context17) {
                    while (1) {
                        switch (_context17.prev = _context17.next) {
                            case 0:
                                counter = 1;
                                _iteratorNormalCompletion32 = true;
                                _didIteratorError32 = false;
                                _iteratorError32 = undefined;
                                _context17.prev = 4;
                                _iterator32 = iterable[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done) {
                                    _context17.next = 15;
                                    break;
                                }

                                _item7 = _step32.value;

                                if (!(counter > count)) {
                                    _context17.next = 11;
                                    break;
                                }

                                _context17.next = 11;
                                return _item7;

                            case 11:

                                counter += 1;

                            case 12:
                                _iteratorNormalCompletion32 = true;
                                _context17.next = 6;
                                break;

                            case 15:
                                _context17.next = 21;
                                break;

                            case 17:
                                _context17.prev = 17;
                                _context17.t0 = _context17['catch'](4);
                                _didIteratorError32 = true;
                                _iteratorError32 = _context17.t0;

                            case 21:
                                _context17.prev = 21;
                                _context17.prev = 22;

                                if (!_iteratorNormalCompletion32 && _iterator32.return) {
                                    _iterator32.return();
                                }

                            case 24:
                                _context17.prev = 24;

                                if (!_didIteratorError32) {
                                    _context17.next = 27;
                                    break;
                                }

                                throw _iteratorError32;

                            case 27:
                                return _context17.finish(24);

                            case 28:
                                return _context17.finish(21);

                            case 29:
                            case 'end':
                                return _context17.stop();
                        }
                    }
                }, _marked15, this, [[4, 17, 21, 29], [22,, 24, 28]]);
            }

            return new Linq(skipGenerator);
        }

        /**
         * Returns the elements of 'this' collection, skipping initial elements until an element satisfies
         * the `predicate` function (that first element that satisfies the `predicate` function is 
         * included in the results).
         * 
         * @param {predicate} predicate - The function that indicates when to stop skipping elements
         * @returns {Linq}
         */

    }, {
        key: 'skipUntil',
        value: function skipUntil(predicate) {
            LinqInternal.validateRequiredFunction(predicate, 'Invalid predicate.');

            return this.skipWhile(function (x) {
                return !predicate(x);
            });
        }

        /**
         * Returns the elements of 'this' collection skipping initial elements until an element does not
         * satisfy the `predicate` function (that first element that fails to satisfy the `predicate` function
         * is included in the results).
         * 
         * @param {predicate} predicate = The function that indicates which of the initial elements to skip
         * @returns {Linq} 
         */

    }, {
        key: 'skipWhile',
        value: function skipWhile(predicate) {
            var _marked16 = /*#__PURE__*/regeneratorRuntime.mark(skipWhileGenerator);

            LinqInternal.validateRequiredFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            function skipWhileGenerator() {
                var isSkipping, _iteratorNormalCompletion33, _didIteratorError33, _iteratorError33, _iterator33, _step33, _item8;

                return regeneratorRuntime.wrap(function skipWhileGenerator$(_context18) {
                    while (1) {
                        switch (_context18.prev = _context18.next) {
                            case 0:
                                isSkipping = true;
                                _iteratorNormalCompletion33 = true;
                                _didIteratorError33 = false;
                                _iteratorError33 = undefined;
                                _context18.prev = 4;
                                _iterator33 = iterable[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done) {
                                    _context18.next = 20;
                                    break;
                                }

                                _item8 = _step33.value;

                                if (isSkipping) {
                                    _context18.next = 13;
                                    break;
                                }

                                _context18.next = 11;
                                return _item8;

                            case 11:
                                _context18.next = 17;
                                break;

                            case 13:
                                if (predicate(_item8)) {
                                    _context18.next = 17;
                                    break;
                                }

                                isSkipping = false;
                                _context18.next = 17;
                                return _item8;

                            case 17:
                                _iteratorNormalCompletion33 = true;
                                _context18.next = 6;
                                break;

                            case 20:
                                _context18.next = 26;
                                break;

                            case 22:
                                _context18.prev = 22;
                                _context18.t0 = _context18['catch'](4);
                                _didIteratorError33 = true;
                                _iteratorError33 = _context18.t0;

                            case 26:
                                _context18.prev = 26;
                                _context18.prev = 27;

                                if (!_iteratorNormalCompletion33 && _iterator33.return) {
                                    _iterator33.return();
                                }

                            case 29:
                                _context18.prev = 29;

                                if (!_didIteratorError33) {
                                    _context18.next = 32;
                                    break;
                                }

                                throw _iteratorError33;

                            case 32:
                                return _context18.finish(29);

                            case 33:
                                return _context18.finish(26);

                            case 34:
                            case 'end':
                                return _context18.stop();
                        }
                    }
                }, _marked16, this, [[4, 22, 26, 34], [27,, 29, 33]]);
            }

            return new Linq(skipWhileGenerator);
        }

        /**
         * Returns either the sum of the elements of 'this' collection (if `selector` is not given) or the
         * sum of the projected value of each element of 'this' collection (if `selector` is given).
         * 
         * @param {numericProjection} [selector] - The function that projects the values to be summed
         * @returns {number}
         */

    }, {
        key: 'sum',
        value: function sum(selector) {
            LinqInternal.validateOptionalFunction(selector, 'Invalid selector.');

            var normalizingSelector = function normalizingSelector(x) {
                var value = selector == null ? x : selector(x);

                if (value == null) value = 0;else if (isNaN(value)) throw new Error('Encountered an element that is not a number.');

                return value;
            };

            return this.aggregate(0, function (acc, x) {
                return acc + normalizingSelector(x);
            });
        }

        /**
         * Returns the elements of 'this' collection taking only the first `count` number of elements.
         * 
         * @param {number} count - The number of elements to take from the beginning of the collection
         * @returns {Linq} 
         */

    }, {
        key: 'take',
        value: function take(count) {
            var _marked17 = /*#__PURE__*/regeneratorRuntime.mark(takeGenerator);

            if (!LinqInternal.isValidNumber(count)) throw new Error('Invalid count.');

            var iterable = this.toIterable();

            function takeGenerator() {
                var counter, _iteratorNormalCompletion34, _didIteratorError34, _iteratorError34, _iterator34, _step34, _item9;

                return regeneratorRuntime.wrap(function takeGenerator$(_context19) {
                    while (1) {
                        switch (_context19.prev = _context19.next) {
                            case 0:
                                counter = 0;
                                _iteratorNormalCompletion34 = true;
                                _didIteratorError34 = false;
                                _iteratorError34 = undefined;
                                _context19.prev = 4;
                                _iterator34 = iterable[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done) {
                                    _context19.next = 16;
                                    break;
                                }

                                _item9 = _step34.value;

                                if (!(counter >= count)) {
                                    _context19.next = 10;
                                    break;
                                }

                                return _context19.abrupt('return');

                            case 10:
                                _context19.next = 12;
                                return _item9;

                            case 12:
                                counter += 1;

                            case 13:
                                _iteratorNormalCompletion34 = true;
                                _context19.next = 6;
                                break;

                            case 16:
                                _context19.next = 22;
                                break;

                            case 18:
                                _context19.prev = 18;
                                _context19.t0 = _context19['catch'](4);
                                _didIteratorError34 = true;
                                _iteratorError34 = _context19.t0;

                            case 22:
                                _context19.prev = 22;
                                _context19.prev = 23;

                                if (!_iteratorNormalCompletion34 && _iterator34.return) {
                                    _iterator34.return();
                                }

                            case 25:
                                _context19.prev = 25;

                                if (!_didIteratorError34) {
                                    _context19.next = 28;
                                    break;
                                }

                                throw _iteratorError34;

                            case 28:
                                return _context19.finish(25);

                            case 29:
                                return _context19.finish(22);

                            case 30:
                            case 'end':
                                return _context19.stop();
                        }
                    }
                }, _marked17, this, [[4, 18, 22, 30], [23,, 25, 29]]);
            }

            return new Linq(takeGenerator);
        }

        /**
         * Returns every n-th (n = step) element of 'this' collection.
         * 
         * @param {number} step - The number of elements to bypass before returning the next element
         * @returns {Linq}
         */

    }, {
        key: 'takeEvery',
        value: function takeEvery(step) {
            if (!LinqInternal.isValidNumber(step, function (x) {
                return x > 0;
            })) throw new Error('Invalid step.');

            return this.where(function (x, i) {
                return i % step === 0;
            });
        }

        /**
         * Returns the elements of 'this' collection, taking only the last 'count' number of elements.
         * 
         * @param {number} count - The number of elements to take from the end of the collection
         * @returns {Linq}
         */

    }, {
        key: 'takeLast',
        value: function takeLast(count) {
            if (!LinqInternal.isValidNumber(count, function (x) {
                return x >= 0;
            })) throw new Error('Invalid count');

            if (count === 0) return Linq.empty();

            var iterable = this.toIterable();

            if (LinqInternal.isCollectionHavingExplicitCardinality(iterable)) {
                var length = LinqInternal.getExplicitCardinality(iterable);

                if (length != null) return this.skip(length - count);
            }

            var aggregationFunc = function aggregationFunc(acc, x) {
                if (acc.length === count) acc.shift();

                acc.push(x);

                return acc;
            };

            return new Linq(this.aggregate([], aggregationFunc));
        }

        /**
         * Returns the elements of 'this' collection taking element until an element satisfies the
         * `predicate` function (that first element that satisfies the `predicate` function is not
         * included in the results).
         * 
         * @param {predicate} predicate - The function that indicates when to stop including elements in the results
         * @returns {Linq}
         */

    }, {
        key: 'takeUntil',
        value: function takeUntil(predicate) {
            LinqInternal.validateRequiredFunction(predicate, 'Invalid predicate.');

            return this.takeWhile(function (x) {
                return !predicate(x);
            });
        }

        /**
         * Returns the elements of 'this' collection taking elements until an element does not satisfy
         * the `predicate` function (that first element that fails to satisfy the `predicate` function
         * is not included in the results).
         * 
         * @param {predicate} predicate - The function that indicates which of the initial elements to include in the results
         * @returns {Linq}
         */

    }, {
        key: 'takeWhile',
        value: function takeWhile(predicate) {
            var _marked18 = /*#__PURE__*/regeneratorRuntime.mark(takeWhileGenerator);

            LinqInternal.validateRequiredFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            function takeWhileGenerator() {
                var _iteratorNormalCompletion35, _didIteratorError35, _iteratorError35, _iterator35, _step35, _item10;

                return regeneratorRuntime.wrap(function takeWhileGenerator$(_context20) {
                    while (1) {
                        switch (_context20.prev = _context20.next) {
                            case 0:
                                _iteratorNormalCompletion35 = true;
                                _didIteratorError35 = false;
                                _iteratorError35 = undefined;
                                _context20.prev = 3;
                                _iterator35 = iterable[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done) {
                                    _context20.next = 14;
                                    break;
                                }

                                _item10 = _step35.value;

                                if (predicate(_item10)) {
                                    _context20.next = 9;
                                    break;
                                }

                                return _context20.abrupt('return');

                            case 9:
                                _context20.next = 11;
                                return _item10;

                            case 11:
                                _iteratorNormalCompletion35 = true;
                                _context20.next = 5;
                                break;

                            case 14:
                                _context20.next = 20;
                                break;

                            case 16:
                                _context20.prev = 16;
                                _context20.t0 = _context20['catch'](3);
                                _didIteratorError35 = true;
                                _iteratorError35 = _context20.t0;

                            case 20:
                                _context20.prev = 20;
                                _context20.prev = 21;

                                if (!_iteratorNormalCompletion35 && _iterator35.return) {
                                    _iterator35.return();
                                }

                            case 23:
                                _context20.prev = 23;

                                if (!_didIteratorError35) {
                                    _context20.next = 26;
                                    break;
                                }

                                throw _iteratorError35;

                            case 26:
                                return _context20.finish(23);

                            case 27:
                                return _context20.finish(20);

                            case 28:
                            case 'end':
                                return _context20.stop();
                        }
                    }
                }, _marked18, this, [[3, 16, 20, 28], [21,, 23, 27]]);
            }

            return new Linq(takeWhileGenerator);
        }

        /**
         * Returns the elements of 'this' collection further sorted (from an immediately preceeding orderBy 
         * call) in ascending order of the projected value given by the `keySelector` function, using the
         * `comparer` function to compare the projected values.  If the `comparer` function is not given,
         * a comparer that uses the natural ordering of the values will be used to compare the projected values.  
         * Note that this thenBy call must be immediately preceeded by either an orderBy, orderByDescending, 
         * thenBy, or thenByDescending call.
         * 
         * @param {projection} keySelector - The function that projects the value used to sort the elements
         * @param {comparer} [comparer] - The function that compares the projected values
         * @returns {Linq}
         */

    }, {
        key: 'thenBy',
        value: function thenBy(keySelector, comparer) {
            return LinqInternal.thenByBasedOperator(this, keySelector, comparer, false);
        }

        /**
         * Returns the elements of 'this' collection further sorted (from an immediately preceeding orderBy 
         * call) in descending order of the projected value given by the `keySelector` function, using the
         * `comparer` function to compare the projected values.  If the `comparer` function is not given,
         * a comparer that uses the natural ordering of the values will be used to compare the projected values.  
         * Note that this thenBy call must be immediately preceeded by either an orderBy, orderByDescending, 
         * thenBy, or thenByDescending call.
         * 
         * @param {projection} keySelector - The function that projects the value used to sort the elements
         * @param {comparer} [comparer] - The function that compares the projected values
         * @returns {Linq}
         */

    }, {
        key: 'thenByDescending',
        value: function thenByDescending(keySelector, comparer) {
            return LinqInternal.thenByBasedOperator(this, keySelector, comparer, true);
        }

        /**
         * Returns an array that represents the contents of the Linq object.
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return Array.from(this.toIterable());
        }

        /**
         * Returns a string consisting of all of the elements of 'this' collection delimited by the given
         * 'delimiter' value.  If a `delimiter` value is not given, then the delimiter "," is used.
         * 
         * @param {string} [delimiter] - The delimiter separating the elements in the results
         * @returns {string} 
         */

    }, {
        key: 'toDelimitedString',
        value: function toDelimitedString(delimiter) {
            if (LinqInternal.isEmptyIterable(this.toIterable())) return '';

            if (delimiter == null) delimiter = ',';

            return this.aggregate(null, function (acc, x) {
                return '' + acc + delimiter + x;
            });
        }

        /**
         * Returns an object that represents a "dictionary" of the elements of 'this' collection.  The
         * `keySelector` function is used to project the "key" value for each element of 'this' collection.
         * If the `elementSelector` function is given, the "value" associated with each "key" value is the
         * value projected by the `elementSelector` function.  If the `elementSelector` function is not 
         * given, the "value" associated with each "key" value is the element, itself.
         * 
         * @param {projection} keySelector - The function that projects the key for each element
         * @param {projection} [elementSelector] - The function that projects the value for each key
         * @returns {Linq}
         */

    }, {
        key: 'toDictionary',
        value: function toDictionary(keySelector, elementSelector) {
            LinqInternal.validateRequiredFunction(keySelector, 'Invalid key selector.');
            LinqInternal.validateOptionalFunction(elementSelector, 'Invalid element selector.');

            var normalizedElementSelector = elementSelector == null ? Linq.identity : elementSelector;
            var iterable = this.toIterable();
            var results = {};

            var _iteratorNormalCompletion36 = true;
            var _didIteratorError36 = false;
            var _iteratorError36 = undefined;

            try {
                for (var _iterator36 = iterable[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
                    var _item11 = _step36.value;

                    var _key = keySelector(_item11);

                    if (_key in results) throw new Error('Duplicate key in collection.');

                    results[_key] = normalizedElementSelector(_item11);
                }
            } catch (err) {
                _didIteratorError36 = true;
                _iteratorError36 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion36 && _iterator36.return) {
                        _iterator36.return();
                    }
                } finally {
                    if (_didIteratorError36) {
                        throw _iteratorError36;
                    }
                }
            }

            return results;
        }

        /**
         * Returns an iterable (as defined by the "iterable protocol"--see
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable) that 
         * represents the contents of the Linq object.
         */

    }, {
        key: 'toIterable',
        value: function toIterable() {
            var _marked19 = /*#__PURE__*/regeneratorRuntime.mark(deferredSortGenerator);

            var helper = function helper(source) {
                if (Linq.isLinq(source)) return helper(source.source);else if (Linq.isIterable(source)) return source;else if (Linq.isGenerator(source)) return source();else if (Linq.isFunction(source)) return helper(source());else throw new Error('Could not return an iterable because the \'source\' was not valid.');
            };

            var iterable = helper(this.source);
            var deferredSort = this[deferredSortSymbol];

            if (deferredSort == null) return iterable;

            function deferredSortGenerator() {
                var buffer, _iteratorNormalCompletion37, _didIteratorError37, _iteratorError37, _iterator37, _step37, _item12;

                return regeneratorRuntime.wrap(function deferredSortGenerator$(_context21) {
                    while (1) {
                        switch (_context21.prev = _context21.next) {
                            case 0:
                                buffer = Array.from(iterable);


                                LinqInternal.performDeferredSort(buffer, deferredSort);

                                _iteratorNormalCompletion37 = true;
                                _didIteratorError37 = false;
                                _iteratorError37 = undefined;
                                _context21.prev = 5;
                                _iterator37 = buffer[Symbol.iterator]();

                            case 7:
                                if (_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done) {
                                    _context21.next = 14;
                                    break;
                                }

                                _item12 = _step37.value;
                                _context21.next = 11;
                                return _item12;

                            case 11:
                                _iteratorNormalCompletion37 = true;
                                _context21.next = 7;
                                break;

                            case 14:
                                _context21.next = 20;
                                break;

                            case 16:
                                _context21.prev = 16;
                                _context21.t0 = _context21['catch'](5);
                                _didIteratorError37 = true;
                                _iteratorError37 = _context21.t0;

                            case 20:
                                _context21.prev = 20;
                                _context21.prev = 21;

                                if (!_iteratorNormalCompletion37 && _iterator37.return) {
                                    _iterator37.return();
                                }

                            case 23:
                                _context21.prev = 23;

                                if (!_didIteratorError37) {
                                    _context21.next = 26;
                                    break;
                                }

                                throw _iteratorError37;

                            case 26:
                                return _context21.finish(23);

                            case 27:
                                return _context21.finish(20);

                            case 28:
                            case 'end':
                                return _context21.stop();
                        }
                    }
                }, _marked19, this, [[5, 16, 20, 28], [21,, 23, 27]]);
            }

            return deferredSortGenerator();
        }

        /**
         * Returns a lookup-collection with the elements of 'this' collection grouped by a key
         * projected by the `keySelector` function.  If the optional `comparer` is provided, then
         * the comparer will be used to determine equality between keys.  If the `comparer` is not
         * provided, the '===' operator will be used to determine equality between keys.
         * 
         * @param {projection} keySelector - The function used to project keys from the elements of 'this' collection 
         * @param {comparer|equalityComparer} [keyComparer] - The function used to compare keys 
         * @returns {Linq}
         */

    }, {
        key: 'toLookup',
        value: function toLookup(keySelector, keyComparer) {
            LinqInternal.validateRequiredFunction(keySelector, 'Invalid key selector.');
            LinqInternal.validateOptionalFunction(keyComparer, 'Invalid key comparer.');

            var normalizedComparer = LinqInternal.normalizeComparerOrDefault(keyComparer);

            var iterable = this.toIterable();
            var resultsArray = [];
            var results = new Linq(resultsArray);

            var _iteratorNormalCompletion38 = true;
            var _didIteratorError38 = false;
            var _iteratorError38 = undefined;

            try {
                var _loop4 = function _loop4() {
                    var item = _step38.value;

                    var key = keySelector(item);
                    var lookupNode = results.firstOrDefault(function (x) {
                        return normalizedComparer(x.key, key);
                    });

                    if (lookupNode == null) {
                        lookupNode = { key: key, values: [] };
                        resultsArray.push(lookupNode);
                    }

                    lookupNode.values.push(item);
                };

                for (var _iterator38 = iterable[Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
                    _loop4();
                }
            } catch (err) {
                _didIteratorError38 = true;
                _iteratorError38 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion38 && _iterator38.return) {
                        _iterator38.return();
                    }
                } finally {
                    if (_didIteratorError38) {
                        throw _iteratorError38;
                    }
                }
            }

            return results;
        }

        /**
         * Returns the union of elements in 'this' collection and the `second` collection, using the
         * `comparer` function to determine whether two different elements are equal.  If the `comparer`
         * function is not given, then the "===" operator will be used to compare elements.
         * 
         * @param {LinqCompatible} second - The collection of elements to union
         * @param {comparer|equalityComparer} [comparer] - The function used to compare elements
         * @returns {Linq} 
         */

    }, {
        key: 'union',
        value: function union(second, comparer) {
            var _marked20 = /*#__PURE__*/regeneratorRuntime.mark(unionGenerator);

            LinqInternal.validateOptionalFunction(comparer, 'Invalid comparer.');

            var normalizedComparer = comparer == null ? null : Linq.normalizeComparer(comparer);
            var secondLinq = LinqInternal.ensureLinq(second);

            var firstIterable = this.toIterable();
            var secondIterable = secondLinq.toIterable();

            var disqualifiedSet = new SimpleSet(normalizedComparer);

            function unionGenerator() {
                var _iteratorNormalCompletion39, _didIteratorError39, _iteratorError39, _iterator39, _step39, _item13, isDisqualified, _iteratorNormalCompletion40, _didIteratorError40, _iteratorError40, _iterator40, _step40, _item14, _isDisqualified;

                return regeneratorRuntime.wrap(function unionGenerator$(_context22) {
                    while (1) {
                        switch (_context22.prev = _context22.next) {
                            case 0:
                                _iteratorNormalCompletion39 = true;
                                _didIteratorError39 = false;
                                _iteratorError39 = undefined;
                                _context22.prev = 3;
                                _iterator39 = firstIterable[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done) {
                                    _context22.next = 15;
                                    break;
                                }

                                _item13 = _step39.value;
                                isDisqualified = disqualifiedSet.has(_item13);

                                if (isDisqualified) {
                                    _context22.next = 12;
                                    break;
                                }

                                disqualifiedSet.add(_item13);
                                _context22.next = 12;
                                return _item13;

                            case 12:
                                _iteratorNormalCompletion39 = true;
                                _context22.next = 5;
                                break;

                            case 15:
                                _context22.next = 21;
                                break;

                            case 17:
                                _context22.prev = 17;
                                _context22.t0 = _context22['catch'](3);
                                _didIteratorError39 = true;
                                _iteratorError39 = _context22.t0;

                            case 21:
                                _context22.prev = 21;
                                _context22.prev = 22;

                                if (!_iteratorNormalCompletion39 && _iterator39.return) {
                                    _iterator39.return();
                                }

                            case 24:
                                _context22.prev = 24;

                                if (!_didIteratorError39) {
                                    _context22.next = 27;
                                    break;
                                }

                                throw _iteratorError39;

                            case 27:
                                return _context22.finish(24);

                            case 28:
                                return _context22.finish(21);

                            case 29:
                                _iteratorNormalCompletion40 = true;
                                _didIteratorError40 = false;
                                _iteratorError40 = undefined;
                                _context22.prev = 32;
                                _iterator40 = secondIterable[Symbol.iterator]();

                            case 34:
                                if (_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done) {
                                    _context22.next = 44;
                                    break;
                                }

                                _item14 = _step40.value;
                                _isDisqualified = disqualifiedSet.has(_item14);

                                if (_isDisqualified) {
                                    _context22.next = 41;
                                    break;
                                }

                                disqualifiedSet.add(_item14);
                                _context22.next = 41;
                                return _item14;

                            case 41:
                                _iteratorNormalCompletion40 = true;
                                _context22.next = 34;
                                break;

                            case 44:
                                _context22.next = 50;
                                break;

                            case 46:
                                _context22.prev = 46;
                                _context22.t1 = _context22['catch'](32);
                                _didIteratorError40 = true;
                                _iteratorError40 = _context22.t1;

                            case 50:
                                _context22.prev = 50;
                                _context22.prev = 51;

                                if (!_iteratorNormalCompletion40 && _iterator40.return) {
                                    _iterator40.return();
                                }

                            case 53:
                                _context22.prev = 53;

                                if (!_didIteratorError40) {
                                    _context22.next = 56;
                                    break;
                                }

                                throw _iteratorError40;

                            case 56:
                                return _context22.finish(53);

                            case 57:
                                return _context22.finish(50);

                            case 58:
                            case 'end':
                                return _context22.stop();
                        }
                    }
                }, _marked20, this, [[3, 17, 21, 29], [22,, 24, 28], [32, 46, 50, 58], [51,, 53, 57]]);
            }

            return new Linq(unionGenerator);
        }

        /**
         * Returns the elements of 'this' collection that satisfy the `predicate` function.
         * 
         * @param {indexedProjection} predicate - The function that determines which elements to return
         * @returns {Linq}
         */

    }, {
        key: 'where',
        value: function where(predicate) {
            var _marked21 = /*#__PURE__*/regeneratorRuntime.mark(whereGenerator);

            LinqInternal.validateRequiredFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            function whereGenerator() {
                var i, _iteratorNormalCompletion41, _didIteratorError41, _iteratorError41, _iterator41, _step41, _item15;

                return regeneratorRuntime.wrap(function whereGenerator$(_context23) {
                    while (1) {
                        switch (_context23.prev = _context23.next) {
                            case 0:
                                i = 0;
                                _iteratorNormalCompletion41 = true;
                                _didIteratorError41 = false;
                                _iteratorError41 = undefined;
                                _context23.prev = 4;
                                _iterator41 = iterable[Symbol.iterator]();

                            case 6:
                                if (_iteratorNormalCompletion41 = (_step41 = _iterator41.next()).done) {
                                    _context23.next = 15;
                                    break;
                                }

                                _item15 = _step41.value;

                                if (!predicate(_item15, i)) {
                                    _context23.next = 11;
                                    break;
                                }

                                _context23.next = 11;
                                return _item15;

                            case 11:

                                i += 1;

                            case 12:
                                _iteratorNormalCompletion41 = true;
                                _context23.next = 6;
                                break;

                            case 15:
                                _context23.next = 21;
                                break;

                            case 17:
                                _context23.prev = 17;
                                _context23.t0 = _context23['catch'](4);
                                _didIteratorError41 = true;
                                _iteratorError41 = _context23.t0;

                            case 21:
                                _context23.prev = 21;
                                _context23.prev = 22;

                                if (!_iteratorNormalCompletion41 && _iterator41.return) {
                                    _iterator41.return();
                                }

                            case 24:
                                _context23.prev = 24;

                                if (!_didIteratorError41) {
                                    _context23.next = 27;
                                    break;
                                }

                                throw _iteratorError41;

                            case 27:
                                return _context23.finish(24);

                            case 28:
                                return _context23.finish(21);

                            case 29:
                            case 'end':
                                return _context23.stop();
                        }
                    }
                }, _marked21, this, [[4, 17, 21, 29], [22,, 24, 28]]);
            }

            return new Linq(whereGenerator);
        }

        /**
         * Returns 'this' collection "zipped-up" with the `second` collection such that each value of the
         * returned collection is the value projected from the corresponding element from each of 'this'
         * collection and the `second` collection.  If the size of 'this' collection and the `second` 
         * collection are not equal, the size of the returned collection will equal the minimum of the
         * sizes of 'this' collection and the `second` collection.
         * 
         * @param {LinqCompatible} second - The collection to zip with 'this' collection
         * @param {biSourceProjection} [resultSelector] - The function to use to project the result values
         * @returns {Linq}
         */

    }, {
        key: 'zip',
        value: function zip(second, resultSelector) {
            var _marked22 = /*#__PURE__*/regeneratorRuntime.mark(zipGenerator);

            LinqInternal.validateOptionalFunction(resultSelector, 'Invalid result selector.');

            if (resultSelector == null) resultSelector = Linq.tuple;

            var secondLinq = LinqInternal.ensureLinq(second);
            var firstIterator = LinqInternal.getIterator(this.toIterable());
            var secondIterator = LinqInternal.getIterator(secondLinq.toIterable());

            function zipGenerator() {
                var firstState, secondState;
                return regeneratorRuntime.wrap(function zipGenerator$(_context24) {
                    while (1) {
                        switch (_context24.prev = _context24.next) {
                            case 0:
                                firstState = firstIterator.next();
                                secondState = secondIterator.next();

                            case 2:
                                if (!(!firstState.done && !secondState.done)) {
                                    _context24.next = 9;
                                    break;
                                }

                                _context24.next = 5;
                                return resultSelector(firstState.value, secondState.value);

                            case 5:

                                firstState = firstIterator.next();
                                secondState = secondIterator.next();
                                _context24.next = 2;
                                break;

                            case 9:
                            case 'end':
                                return _context24.stop();
                        }
                    }
                }, _marked22, this);
            }

            return new Linq(zipGenerator);
        }

        /**
         * Returns 'this' collection "zipped-up" with the `second` collection such that each value of the
         * returned collection is the value projected from the corresponding element from each of 'this'
         * collection and the `second` collection.  If the size of 'this' collection and the `second` 
         * collection are not equal, the size of the returned collection will equal the maximum of the
         * sizes of 'this' collection and the `second` collection, and the shorter collection with use
         * values given by the `defaultForFirst` and `defaultForSecond` parameters (corresponding with
         * which corresponding list is shorter).
         * 
         * @param {LinqCompatible} second - The collection to zip with 'this' collection
         * @param {*} defaultForFirst - The value used for 'this' collection when shorter
         * @param {*} defaultForSecond - The value used for the 'second' collecction when shorter
         * @param {biSourceProjection} [resultSelector] - The function to use to project the result values
         * @returns {Linq}
         */

    }, {
        key: 'zipLongest',
        value: function zipLongest(second, defaultForFirst, defaultForSecond, resultSelector) {
            var _marked23 = /*#__PURE__*/regeneratorRuntime.mark(zipGenerator);

            LinqInternal.validateOptionalFunction(resultSelector, 'Invalid result selector.');

            if (resultSelector == null) resultSelector = Linq.tuple;

            var secondLinq = LinqInternal.ensureLinq(second);
            var firstIterator = LinqInternal.getIterator(this.toIterable());
            var secondIterator = LinqInternal.getIterator(secondLinq.toIterable());

            function zipGenerator() {
                var firstState, secondState, firstValue, secondValue;
                return regeneratorRuntime.wrap(function zipGenerator$(_context25) {
                    while (1) {
                        switch (_context25.prev = _context25.next) {
                            case 0:
                                firstState = firstIterator.next();
                                secondState = secondIterator.next();

                            case 2:
                                if (!(!firstState.done || !secondState.done)) {
                                    _context25.next = 11;
                                    break;
                                }

                                firstValue = firstState.done ? defaultForFirst : firstState.value;
                                secondValue = secondState.done ? defaultForSecond : secondState.value;
                                _context25.next = 7;
                                return resultSelector(firstValue, secondValue);

                            case 7:

                                if (!firstState.done) firstState = firstIterator.next();

                                if (!secondState.done) secondState = secondIterator.next();
                                _context25.next = 2;
                                break;

                            case 11:
                            case 'end':
                                return _context25.stop();
                        }
                    }
                }, _marked23, this);
            }

            return new Linq(zipGenerator);
        }
    }], [{
        key: 'isFunction',
        value: function isFunction(func) {
            return typeof func == "function";
        }
    }, {
        key: 'isArray',
        value: function isArray(obj) {
            return Array.isArray(obj);
        } // Kept for backwards-compatibility reasons

    }, {
        key: 'isString',
        value: function isString(obj) {
            return typeof obj === 'string' || obj instanceof String;
        }
    }, {
        key: 'isBoolean',
        value: function isBoolean(obj) {
            return typeof obj === 'boolean' || obj instanceof Boolean;
        }
    }, {
        key: 'isNumber',
        value: function isNumber(obj) {
            return typeof obj === 'number' || obj instanceof Number;
        }
    }, {
        key: 'isSymbol',
        value: function isSymbol(obj) {
            return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'symbol';
        }
    }, {
        key: 'isIterable',
        value: function isIterable(obj) {
            return obj != null && typeof obj[Symbol.iterator] === 'function';
        }
    }, {
        key: 'isGenerator',
        value: function isGenerator(obj) {
            return obj instanceof GeneratorFunction;
        }
    }, {
        key: 'isLinq',
        value: function isLinq(obj) {
            return obj instanceof Linq;
        }
    }, {
        key: 'isPrimitive',
        value: function isPrimitive(obj) {
            return Linq.isString(obj) || Linq.isNumber(obj) || Linq.isBoolean(obj) || Linq.isSymbol(obj) || obj === null || obj === undefined;
        }
    }, {
        key: 'identity',
        value: function identity(x) {
            return x;
        }
    }, {
        key: 'tuple',
        value: function tuple(x, y) {
            return [x, y];
        }

        // Comparer functions

    }, {
        key: 'strictComparer',
        value: function strictComparer(x, y) {
            return x === y;
        }
    }, {
        key: 'defaultStringComparer',
        value: function defaultStringComparer(x, y) {
            return Linq.caseSensitiveStringComparer(x, y);
        }
    }, {
        key: 'caseSensitiveStringComparer',
        value: function caseSensitiveStringComparer(x, y) {
            var normalize = function normalize(value) {
                return value == null ? null : LinqInternal.convertToString(value);
            };

            return Linq.generalComparer(normalize(x), normalize(y));
        }
    }, {
        key: 'caseInsensitiveStringComparer',
        value: function caseInsensitiveStringComparer(x, y) {
            var normalize = function normalize(value) {
                return Linq.isString(value) ? value.toLowerCase() : value;
            };

            return Linq.caseSensitiveStringComparer(normalize(x), normalize(y));
        }
    }, {
        key: 'defaultStringEqualityComparer',
        value: function defaultStringEqualityComparer(x, y) {
            return Linq.caseSensitiveStringEqualityComparer(x, y);
        }
    }, {
        key: 'caseSensitiveStringEqualityComparer',
        value: function caseSensitiveStringEqualityComparer(x, y) {
            return Linq.caseSensitiveStringComparer(x, y) === 0;
        }
    }, {
        key: 'caseInsensitiveStringEqualityComparer',
        value: function caseInsensitiveStringEqualityComparer(x, y) {
            return Linq.caseInsensitiveStringComparer(x, y) === 0;
        }
    }, {
        key: 'generalComparer',
        value: function generalComparer(x, y) {
            if (x == null && y == null) return 0;

            if (x == null) return -1;

            if (y == null) return 1;

            return x < y ? -1 : x > y ? 1 : 0;
        }

        /**
         * This function converts a "comparer" into an "equality comparer".  If the function is already an equality
         * comparer, then the resultant function will remain an equality comparer.
         * 
         * @param {comparer} comparer - The function to convert into an equality comparer
         * @returns {equalityComparer}
         */

    }, {
        key: 'normalizeComparer',
        value: function normalizeComparer(comparer) {
            return function (x, y) {
                var value = comparer(x, y);

                if (Linq.isBoolean(value)) return value;else return value == 0;
            };
        }

        /**
         * This function creates a new comparer based upon the `projection` of values passed to the new comparer.  This
         * function can also be passed a `comparer` that is used in the new comparer to compare the projected values.
         * 
         * @param {projection} projection - The projection from which compare projected values
         * @param {comparer} [comparer] - A comparer with which to compare projected values
         * @returns {comparer}
         */

    }, {
        key: 'createProjectionComparer',
        value: function createProjectionComparer(projection) {
            var comparer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (projection == null) throw new Error('Invalid projection.');

            if (comparer == null) comparer = function comparer(x, y) {
                return Linq.generalComparer(x, y);
            };

            return function (x, y) {
                var results = comparer(projection(x), projection(y));

                if (Linq.isBoolean(results)) throw new Error('The given \'comparer\' was an equality comparer instead of a comparer.');

                return results;
            };
        }

        /**
         * This function create a new equality comparer based upon the `projection` of the values passed to the new equality
         * comparer.  This function can also be passed a `comparer` that is used in the new equality comparer to compare the
         * projected values.
         * 
         * @param {projection} projection - The projection from which to compare projected values
         * @param {comparer|equalityComparer} [comparer] - The comparer with which to compare projected values
         * @returns {equalityComparer}
         */

    }, {
        key: 'createProjectionEqualityComparer',
        value: function createProjectionEqualityComparer(projection) {
            var comparer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (projection == null) throw new Error('Invalid projection.');

            var normalizedComparer = LinqInternal.normalizeComparerOrDefault(comparer);

            return function (x, y) {
                return normalizedComparer(projection(x), projection(y));
            };
        }

        // Constructor functions

        /**
         * Creates a new Linq object, acting very similarly as the Linq constructor, but also accepts:
         * 
         * (1) jQuery objects, and 
         * (2) objects that would cause the constructor to throw an exception (resulting in a Linq object 
         *     that represents a single-item list containing the object).
         * 
         * @param {*} source - A source of items
         * @returns {Linq} 
         */

    }, {
        key: 'from',
        value: function from(source) {
            if (source == null || LinqInternal.isConstructorCompatibleSource(source)) return new Linq(source);else if (typeof jQuery !== 'undefined' && source instanceof jQuery) return new Linq(source.get());else return new Linq([source]);
        }

        /**
         * Create a new Linq object that contains a range of integers.
         * 
         * @param {num} from - The starting value of the range
         * @param {num} to - The ending value of the range
         * @param {num} [step=1] - The amount by which to increment each iteration
         * @returns {Linq} 
         */

    }, {
        key: 'range',
        value: function range(from, to, step) {
            var _marked24 = /*#__PURE__*/regeneratorRuntime.mark(rangeGenerator);

            if (!LinqInternal.isValidNumber(from)) throw new Error("Invalid 'from' value.");

            if (!LinqInternal.isValidNumber(to)) throw new Error("Invalid 'to' value.");

            if (!LinqInternal.isValidNumber(step)) step = 1;

            if (step == 0) throw new Error("Invalid 'step' value--cannot be zero.");

            var compare = void 0;

            if (step > 0) compare = function compare(x, y) {
                return x <= y;
            };else compare = function compare(x, y) {
                return x >= y;
            };

            function rangeGenerator() {
                var i;
                return regeneratorRuntime.wrap(function rangeGenerator$(_context26) {
                    while (1) {
                        switch (_context26.prev = _context26.next) {
                            case 0:
                                i = from;

                            case 1:
                                if (!compare(i, to)) {
                                    _context26.next = 7;
                                    break;
                                }

                                _context26.next = 4;
                                return i;

                            case 4:
                                i += step;
                                _context26.next = 1;
                                break;

                            case 7:
                            case 'end':
                                return _context26.stop();
                        }
                    }
                }, _marked24, this);
            }

            return new Linq(rangeGenerator);
        }

        /**
         * Create a new Linq object that contains a given number of repetitions of an object.
         * 
         * @param {*} item - The item to repeat
         * @param {num} [repetitions=1] - The number of times to repeat the object
         * @returns {Linq}
         */

    }, {
        key: 'repeat',
        value: function repeat(item, repetitions) {
            var _marked25 = /*#__PURE__*/regeneratorRuntime.mark(repeatGenerator);

            if (!LinqInternal.isValidNumber(repetitions)) repetitions = 1;

            function repeatGenerator() {
                var i;
                return regeneratorRuntime.wrap(function repeatGenerator$(_context27) {
                    while (1) {
                        switch (_context27.prev = _context27.next) {
                            case 0:
                                i = 0;

                            case 1:
                                if (!(i < repetitions)) {
                                    _context27.next = 7;
                                    break;
                                }

                                _context27.next = 4;
                                return item;

                            case 4:
                                i++;
                                _context27.next = 1;
                                break;

                            case 7:
                            case 'end':
                                return _context27.stop();
                        }
                    }
                }, _marked25, this);
            }

            return new Linq(repeatGenerator);
        }

        /**
         * Create a new linq object that contains all of the matches for a regex pattern.  Note that 'g' does not need to be added 
         * to the `flags` parameter (it will be automatically added).
         * 
         * @param {string} text 
         * @param {string|RegExp} pattern 
         * @param {string} [flags] 
         * @returns {Linq}
         */

    }, {
        key: 'matches',
        value: function matches(text, pattern, flags) {
            if (pattern == null) throw new Error('Invalid \'pattern\' value.');

            if (text == null) return new Linq();

            if (!Linq.isString(text)) throw new Error('Parameter \'text\' is not a string.');

            if (flags == null) flags = '';

            if (!flags.includes('g')) flags += 'g';

            var internalPattern = void 0;

            if (pattern instanceof RegExp) {
                if (!flags.includes('i') && pattern.ignoreCase) flags += 'i';

                if (!flags.includes('m') && pattern.multiline) flags += 'm';

                internalPattern = pattern.source;
            } else internalPattern = pattern;

            var regex = new RegExp(internalPattern, flags);
            var matches = text.match(regex);

            return new Linq(matches == null ? [] : matches);
        }

        /**
         * Create a new linq object that contains an element for each property of the 'object' passed
         * to the method.  Each element will have a property named by the `keyPropertyName` parameter
         * whose value will equal the name of the property and a property named by the `valuePropertyName`
         * parameter whose value will equal the value of the property.  If the `keyPropertyName`
         * parameter is not given, then it will default to "key"; if the `valuePropertyName` parameter 
         * is not given, then it will default to "value".
         * 
         * @param {*} obj - The object from which to enumerate properties
         * @param {string} [keyPropertyName=key] - The name of the property in the resultant elements containing
         *      the property's key
         * @param {string} [valuePropertyName=value] - The name of the property in the resultant elements containing
         *      the property's value
         * @returns {Linq}
         */

    }, {
        key: 'properties',
        value: function properties(obj, keyPropertyName, valuePropertyName) {
            if (obj == null) return new Linq();

            if (LinqInternal.isStringNullOrEmpty(keyPropertyName)) keyPropertyName = 'key';

            if (LinqInternal.isStringNullOrEmpty(valuePropertyName)) valuePropertyName = 'value';

            var projection = function projection(key) {
                var result = {};

                result[keyPropertyName] = key;
                result[valuePropertyName] = obj[key];

                return result;
            };

            return new Linq(Object.keys(obj).map(projection));
        }

        /**
         * Returns a new empty Linq object.
         * 
         * @returns {Linq}
         */

    }, {
        key: 'empty',
        value: function empty() {
            return new Linq([]);
        }
    }]);

    return Linq;
}();

},{}]},{},[327]);