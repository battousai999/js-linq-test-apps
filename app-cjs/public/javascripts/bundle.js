(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//require('babel-polyfill');
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

},{"js-linq":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Linq = exports.Grouping = exports.SimpleSet = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _iterator42 = require('babel-runtime/core-js/symbol/iterator');

var _iterator43 = _interopRequireDefault(_iterator42);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    $linq Version 2.0.0 (by Kurtis Jones @ https://github.com/battousai999/js-linq)
*/

var LinqInternal = function () {
    function LinqInternal() {
        (0, _classCallCheck3.default)(this, LinqInternal);
    }

    (0, _createClass3.default)(LinqInternal, null, [{
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
            return x instanceof _set2.default || x instanceof _map2.default;
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

            return (0, _getIterator3.default)(iterable);
        }
    }, {
        key: 'firstBasedOperator',
        value: function firstBasedOperator(iterable, predicate, defaultValue, throwIfNotFound) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(iterable), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
                for (var _iterator2 = (0, _getIterator3.default)(iterable), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
                    for (var _iterator3 = (0, _getIterator3.default)(iterable), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
                for (var _iterator4 = (0, _getIterator3.default)(iterable), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
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
        (0, _classCallCheck3.default)(this, SimpleSet);

        this.set = new _set2.default();
        this.comparer = equalityComparer;
        this.usesComparer = equalityComparer != null;
        this.containsOnlyPrimitives = true;
    }

    (0, _createClass3.default)(SimpleSet, [{
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
                for (var _iterator5 = (0, _getIterator3.default)(this.set.values()), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
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
                for (var _iterator6 = (0, _getIterator3.default)(this.set.values()), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
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
                for (var _iterator7 = (0, _getIterator3.default)(iterable), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
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


var GeneratorFunction = /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}).constructor;

var deferredSortSymbol = (0, _symbol2.default)('Provides private-like access for a deferredSort property.');

var Grouping = exports.Grouping = function Grouping(key, values) {
    (0, _classCallCheck3.default)(this, Grouping);

    this.key = key;
    this.values = values == null ? [] : (0, _from2.default)(values);
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
        (0, _classCallCheck3.default)(this, Linq);

        if (source == null) source = [];

        if (LinqInternal.isConstructorCompatibleSource(source)) this.source = source;else throw new Error('The \'source\' is neither an iterable, a generator, nor a function that returns such.');
    }

    // Helper functions


    (0, _createClass3.default)(Linq, [{
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
                for (var _iterator8 = (0, _getIterator3.default)(iterable), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
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
                for (var _iterator9 = (0, _getIterator3.default)(iterable), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
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
            var _marked = /*#__PURE__*/_regenerator2.default.mark(appendGenerator);

            var iterable = this.toIterable();

            function appendGenerator() {
                var _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, item;

                return _regenerator2.default.wrap(function appendGenerator$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _iteratorNormalCompletion10 = true;
                                _didIteratorError10 = false;
                                _iteratorError10 = undefined;
                                _context2.prev = 3;
                                _iterator10 = (0, _getIterator3.default)(iterable);

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
                for (var _iterator11 = (0, _getIterator3.default)(iterable), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
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
            var _marked2 = /*#__PURE__*/_regenerator2.default.mark(batchGenerator);

            LinqInternal.validateOptionalFunction(resultSelector, 'Invalid result selector.');

            if (!LinqInternal.isValidNumber(size, function (x) {
                return x > 0;
            })) throw new Error('Invalid size.');

            var iterable = this.toIterable();

            function batchGenerator() {
                var bucket, index, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, item;

                return _regenerator2.default.wrap(function batchGenerator$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                bucket = null;
                                index = 0;
                                _iteratorNormalCompletion12 = true;
                                _didIteratorError12 = false;
                                _iteratorError12 = undefined;
                                _context3.prev = 5;
                                _iterator12 = (0, _getIterator3.default)(iterable);

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
            var _marked3 = /*#__PURE__*/_regenerator2.default.mark(concatGenerator);

            if (second == null) return new Linq(this);

            var secondLinq = LinqInternal.ensureLinq(second);

            var firstIterable = this.toIterable();
            var secondIterable = secondLinq.toIterable();

            function concatGenerator() {
                var _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, item, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, _item2;

                return _regenerator2.default.wrap(function concatGenerator$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _iteratorNormalCompletion13 = true;
                                _didIteratorError13 = false;
                                _iteratorError13 = undefined;
                                _context4.prev = 3;
                                _iterator13 = (0, _getIterator3.default)(firstIterable);

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
                                _iterator14 = (0, _getIterator3.default)(secondIterable);

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
                for (var _iterator15 = (0, _getIterator3.default)(iterable), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
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
                for (var _iterator16 = (0, _getIterator3.default)(iterable), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
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
            var _marked4 = /*#__PURE__*/_regenerator2.default.mark(equizipGenerator);

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
                return _regenerator2.default.wrap(function equizipGenerator$(_context5) {
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
            var _marked5 = /*#__PURE__*/_regenerator2.default.mark(exceptGenerator);

            LinqInternal.validateOptionalFunction(comparer, 'Invalid comparer.');

            var normalizedComparer = comparer == null ? null : Linq.normalizeComparer(comparer);
            var secondLinq = LinqInternal.ensureLinq(second);

            var firstIterable = this.toIterable();
            var secondIterable = secondLinq.toIterable();

            var disqualifiedSet = SimpleSet.initialize(secondIterable, normalizedComparer);

            function exceptGenerator() {
                var _iteratorNormalCompletion17, _didIteratorError17, _iteratorError17, _iterator17, _step17, item, isDisqualified;

                return _regenerator2.default.wrap(function exceptGenerator$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _iteratorNormalCompletion17 = true;
                                _didIteratorError17 = false;
                                _iteratorError17 = undefined;
                                _context6.prev = 3;
                                _iterator17 = (0, _getIterator3.default)(firstIterable);

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
                for (var _iterator18 = (0, _getIterator3.default)(iterable), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
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

                for (var _iterator19 = (0, _getIterator3.default)(iterable), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
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

                for (var _iterator20 = (0, _getIterator3.default)(iterable), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
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
                for (var _iterator21 = (0, _getIterator3.default)(iterable), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
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
                for (var _iterator22 = (0, _getIterator3.default)(iterable), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
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
            var _marked6 = /*#__PURE__*/_regenerator2.default.mark(intersectGenerator);

            LinqInternal.validateOptionalFunction(comparer, 'Invalid comparer.');

            var secondLinq = LinqInternal.ensureLinq(second);
            var normalizedComparer = comparer == null ? null : Linq.normalizeComparer(comparer);

            var firstIterable = this.toIterable();
            var secondIterable = secondLinq.toIterable();

            var includedSet = SimpleSet.initialize(secondIterable, normalizedComparer);

            function intersectGenerator() {
                var _iteratorNormalCompletion23, _didIteratorError23, _iteratorError23, _iterator23, _step23, item, wasRemoved;

                return _regenerator2.default.wrap(function intersectGenerator$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _iteratorNormalCompletion23 = true;
                                _didIteratorError23 = false;
                                _iteratorError23 = undefined;
                                _context7.prev = 3;
                                _iterator23 = (0, _getIterator3.default)(firstIterable);

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
            var _marked7 = /*#__PURE__*/_regenerator2.default.mark(joinGenerator);

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

                return _regenerator2.default.wrap(function joinGenerator$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _iteratorNormalCompletion24 = true;
                                _didIteratorError24 = false;
                                _iteratorError24 = undefined;
                                _context9.prev = 3;
                                _loop3 = /*#__PURE__*/_regenerator2.default.mark(function _loop3() {
                                    var item, outerKey, groupValues, _iteratorNormalCompletion25, _didIteratorError25, _iteratorError25, _iterator25, _step25, groupItem;

                                    return _regenerator2.default.wrap(function _loop3$(_context8) {
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
                                                    _iterator25 = (0, _getIterator3.default)(groupValues.values);

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
                                _iterator24 = (0, _getIterator3.default)(outerIterable);

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
            var _marked8 = /*#__PURE__*/_regenerator2.default.mark(padWithGenerator);

            if (!LinqInternal.isValidNumber(width)) throw new Error('Invalid width.');

            LinqInternal.validateRequiredFunction(paddingSelector, 'Invalid padding selector.');

            var iterable = this.toIterable();

            function padWithGenerator() {
                var counter, _iteratorNormalCompletion26, _didIteratorError26, _iteratorError26, _iterator26, _step26, _item3;

                return _regenerator2.default.wrap(function padWithGenerator$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                counter = 0;
                                _iteratorNormalCompletion26 = true;
                                _didIteratorError26 = false;
                                _iteratorError26 = undefined;
                                _context10.prev = 4;
                                _iterator26 = (0, _getIterator3.default)(iterable);

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
                for (var _iterator27 = (0, _getIterator3.default)(iterable), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
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
            var _marked9 = /*#__PURE__*/_regenerator2.default.mark(prependGenerator);

            var iterable = this.toIterable();

            function prependGenerator() {
                var _iteratorNormalCompletion28, _didIteratorError28, _iteratorError28, _iterator28, _step28, _item5;

                return _regenerator2.default.wrap(function prependGenerator$(_context11) {
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
                                _iterator28 = (0, _getIterator3.default)(iterable);

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
            var _marked10 = /*#__PURE__*/_regenerator2.default.mark(prescanGenerator);

            LinqInternal.validateRequiredFunction(operation, 'Invalid operation.');

            var iterable = this.toIterable();
            var iterator = LinqInternal.getIterator(iterable);

            function prescanGenerator() {
                var acc, state, _state, value;

                return _regenerator2.default.wrap(function prescanGenerator$(_context12) {
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
            var _marked11 = /*#__PURE__*/_regenerator2.default.mark(gen);

            var iterable = this.toIterable();

            function gen() {
                var i;
                return _regenerator2.default.wrap(function gen$(_context13) {
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

            if (!LinqInternal.isIndexedCollection(iterable) || !LinqInternal.isCollectionHavingLength(iterable)) iterable = (0, _from2.default)(iterable);

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
            var _marked12 = /*#__PURE__*/_regenerator2.default.mark(scanGenerator);

            LinqInternal.validateRequiredFunction(operation, 'Invalid operation.');

            var col = seed === undefined ? this : this.prepend(seed);

            function scanGenerator() {
                var iterable, iterator, state, acc;
                return _regenerator2.default.wrap(function scanGenerator$(_context14) {
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
            var _marked13 = /*#__PURE__*/_regenerator2.default.mark(selectGenerator);

            LinqInternal.validateRequiredFunction(selector, 'Invalid selector.');

            var iterable = this.toIterable();
            var i = 0;

            function selectGenerator() {
                var _iteratorNormalCompletion29, _didIteratorError29, _iteratorError29, _iterator29, _step29, _item6;

                return _regenerator2.default.wrap(function selectGenerator$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                _iteratorNormalCompletion29 = true;
                                _didIteratorError29 = false;
                                _iteratorError29 = undefined;
                                _context15.prev = 3;
                                _iterator29 = (0, _getIterator3.default)(iterable);

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
            var _marked14 = /*#__PURE__*/_regenerator2.default.mark(selectManyGenerator);

            LinqInternal.validateRequiredFunction(collectionSelector, 'Invalid collection selector.');
            LinqInternal.validateOptionalFunction(resultSelector, 'Invalid result selector.');

            var iterable = this.toIterable();

            function selectManyGenerator() {
                var i, _iteratorNormalCompletion30, _didIteratorError30, _iteratorError30, _iterator30, _step30, outerItem, projectedItems, innerIterable, _iteratorNormalCompletion31, _didIteratorError31, _iteratorError31, _iterator31, _step31, innerItem;

                return _regenerator2.default.wrap(function selectManyGenerator$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                i = 0;
                                _iteratorNormalCompletion30 = true;
                                _didIteratorError30 = false;
                                _iteratorError30 = undefined;
                                _context16.prev = 4;
                                _iterator30 = (0, _getIterator3.default)(iterable);

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
                                _iterator31 = (0, _getIterator3.default)(innerIterable);

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
            var _marked15 = /*#__PURE__*/_regenerator2.default.mark(skipGenerator);

            if (!LinqInternal.isValidNumber(count)) throw new Error('Invalid count.');

            var iterable = this.toIterable();

            function skipGenerator() {
                var counter, _iteratorNormalCompletion32, _didIteratorError32, _iteratorError32, _iterator32, _step32, _item7;

                return _regenerator2.default.wrap(function skipGenerator$(_context17) {
                    while (1) {
                        switch (_context17.prev = _context17.next) {
                            case 0:
                                counter = 1;
                                _iteratorNormalCompletion32 = true;
                                _didIteratorError32 = false;
                                _iteratorError32 = undefined;
                                _context17.prev = 4;
                                _iterator32 = (0, _getIterator3.default)(iterable);

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
            var _marked16 = /*#__PURE__*/_regenerator2.default.mark(skipWhileGenerator);

            LinqInternal.validateRequiredFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            function skipWhileGenerator() {
                var isSkipping, _iteratorNormalCompletion33, _didIteratorError33, _iteratorError33, _iterator33, _step33, _item8;

                return _regenerator2.default.wrap(function skipWhileGenerator$(_context18) {
                    while (1) {
                        switch (_context18.prev = _context18.next) {
                            case 0:
                                isSkipping = true;
                                _iteratorNormalCompletion33 = true;
                                _didIteratorError33 = false;
                                _iteratorError33 = undefined;
                                _context18.prev = 4;
                                _iterator33 = (0, _getIterator3.default)(iterable);

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
            var _marked17 = /*#__PURE__*/_regenerator2.default.mark(takeGenerator);

            if (!LinqInternal.isValidNumber(count)) throw new Error('Invalid count.');

            var iterable = this.toIterable();

            function takeGenerator() {
                var counter, _iteratorNormalCompletion34, _didIteratorError34, _iteratorError34, _iterator34, _step34, _item9;

                return _regenerator2.default.wrap(function takeGenerator$(_context19) {
                    while (1) {
                        switch (_context19.prev = _context19.next) {
                            case 0:
                                counter = 0;
                                _iteratorNormalCompletion34 = true;
                                _didIteratorError34 = false;
                                _iteratorError34 = undefined;
                                _context19.prev = 4;
                                _iterator34 = (0, _getIterator3.default)(iterable);

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
            var _marked18 = /*#__PURE__*/_regenerator2.default.mark(takeWhileGenerator);

            LinqInternal.validateRequiredFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            function takeWhileGenerator() {
                var _iteratorNormalCompletion35, _didIteratorError35, _iteratorError35, _iterator35, _step35, _item10;

                return _regenerator2.default.wrap(function takeWhileGenerator$(_context20) {
                    while (1) {
                        switch (_context20.prev = _context20.next) {
                            case 0:
                                _iteratorNormalCompletion35 = true;
                                _didIteratorError35 = false;
                                _iteratorError35 = undefined;
                                _context20.prev = 3;
                                _iterator35 = (0, _getIterator3.default)(iterable);

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
            return (0, _from2.default)(this.toIterable());
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
                for (var _iterator36 = (0, _getIterator3.default)(iterable), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
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
            var _marked19 = /*#__PURE__*/_regenerator2.default.mark(deferredSortGenerator);

            var helper = function helper(source) {
                if (Linq.isLinq(source)) return helper(source.source);else if (Linq.isIterable(source)) return source;else if (Linq.isGenerator(source)) return source();else if (Linq.isFunction(source)) return helper(source());else throw new Error('Could not return an iterable because the \'source\' was not valid.');
            };

            var iterable = helper(this.source);
            var deferredSort = this[deferredSortSymbol];

            if (deferredSort == null) return iterable;

            function deferredSortGenerator() {
                var buffer, _iteratorNormalCompletion37, _didIteratorError37, _iteratorError37, _iterator37, _step37, _item12;

                return _regenerator2.default.wrap(function deferredSortGenerator$(_context21) {
                    while (1) {
                        switch (_context21.prev = _context21.next) {
                            case 0:
                                buffer = (0, _from2.default)(iterable);


                                LinqInternal.performDeferredSort(buffer, deferredSort);

                                _iteratorNormalCompletion37 = true;
                                _didIteratorError37 = false;
                                _iteratorError37 = undefined;
                                _context21.prev = 5;
                                _iterator37 = (0, _getIterator3.default)(buffer);

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

                for (var _iterator38 = (0, _getIterator3.default)(iterable), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
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
            var _marked20 = /*#__PURE__*/_regenerator2.default.mark(unionGenerator);

            LinqInternal.validateOptionalFunction(comparer, 'Invalid comparer.');

            var normalizedComparer = comparer == null ? null : Linq.normalizeComparer(comparer);
            var secondLinq = LinqInternal.ensureLinq(second);

            var firstIterable = this.toIterable();
            var secondIterable = secondLinq.toIterable();

            var disqualifiedSet = new SimpleSet(normalizedComparer);

            function unionGenerator() {
                var _iteratorNormalCompletion39, _didIteratorError39, _iteratorError39, _iterator39, _step39, _item13, isDisqualified, _iteratorNormalCompletion40, _didIteratorError40, _iteratorError40, _iterator40, _step40, _item14, _isDisqualified;

                return _regenerator2.default.wrap(function unionGenerator$(_context22) {
                    while (1) {
                        switch (_context22.prev = _context22.next) {
                            case 0:
                                _iteratorNormalCompletion39 = true;
                                _didIteratorError39 = false;
                                _iteratorError39 = undefined;
                                _context22.prev = 3;
                                _iterator39 = (0, _getIterator3.default)(firstIterable);

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
                                _iterator40 = (0, _getIterator3.default)(secondIterable);

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
            var _marked21 = /*#__PURE__*/_regenerator2.default.mark(whereGenerator);

            LinqInternal.validateRequiredFunction(predicate, 'Invalid predicate.');

            var iterable = this.toIterable();

            function whereGenerator() {
                var i, _iteratorNormalCompletion41, _didIteratorError41, _iteratorError41, _iterator41, _step41, _item15;

                return _regenerator2.default.wrap(function whereGenerator$(_context23) {
                    while (1) {
                        switch (_context23.prev = _context23.next) {
                            case 0:
                                i = 0;
                                _iteratorNormalCompletion41 = true;
                                _didIteratorError41 = false;
                                _iteratorError41 = undefined;
                                _context23.prev = 4;
                                _iterator41 = (0, _getIterator3.default)(iterable);

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
            var _marked22 = /*#__PURE__*/_regenerator2.default.mark(zipGenerator);

            LinqInternal.validateOptionalFunction(resultSelector, 'Invalid result selector.');

            if (resultSelector == null) resultSelector = Linq.tuple;

            var secondLinq = LinqInternal.ensureLinq(second);
            var firstIterator = LinqInternal.getIterator(this.toIterable());
            var secondIterator = LinqInternal.getIterator(secondLinq.toIterable());

            function zipGenerator() {
                var firstState, secondState;
                return _regenerator2.default.wrap(function zipGenerator$(_context24) {
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
            var _marked23 = /*#__PURE__*/_regenerator2.default.mark(zipGenerator);

            LinqInternal.validateOptionalFunction(resultSelector, 'Invalid result selector.');

            if (resultSelector == null) resultSelector = Linq.tuple;

            var secondLinq = LinqInternal.ensureLinq(second);
            var firstIterator = LinqInternal.getIterator(this.toIterable());
            var secondIterator = LinqInternal.getIterator(secondLinq.toIterable());

            function zipGenerator() {
                var firstState, secondState, firstValue, secondValue;
                return _regenerator2.default.wrap(function zipGenerator$(_context25) {
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
            return (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'symbol';
        }
    }, {
        key: 'isIterable',
        value: function isIterable(obj) {
            return obj != null && typeof obj[_iterator43.default] === 'function';
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
            var _marked24 = /*#__PURE__*/_regenerator2.default.mark(rangeGenerator);

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
                return _regenerator2.default.wrap(function rangeGenerator$(_context26) {
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
            var _marked25 = /*#__PURE__*/_regenerator2.default.mark(repeatGenerator);

            if (!LinqInternal.isValidNumber(repetitions)) repetitions = 1;

            function repeatGenerator() {
                var i;
                return _regenerator2.default.wrap(function repeatGenerator$(_context27) {
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

            return new Linq((0, _keys2.default)(obj).map(projection));
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

},{"babel-runtime/core-js/array/from":3,"babel-runtime/core-js/get-iterator":4,"babel-runtime/core-js/map":5,"babel-runtime/core-js/object/keys":7,"babel-runtime/core-js/set":8,"babel-runtime/core-js/symbol":9,"babel-runtime/core-js/symbol/iterator":10,"babel-runtime/helpers/classCallCheck":11,"babel-runtime/helpers/createClass":12,"babel-runtime/helpers/typeof":13,"babel-runtime/regenerator":14}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":15}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":16}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/map"), __esModule: true };
},{"core-js/library/fn/map":17}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":18}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":19}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/set"), __esModule: true };
},{"core-js/library/fn/set":20}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":21}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":22}],11:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],12:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":6}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":9,"../core-js/symbol/iterator":10}],14:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":118}],15:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":37,"../../modules/es6.array.from":100,"../../modules/es6.string.iterator":107}],16:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/core.get-iterator":99,"../modules/es6.string.iterator":107,"../modules/web.dom.iterable":117}],17:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.map');
require('../modules/es7.map.to-json');
require('../modules/es7.map.of');
require('../modules/es7.map.from');
module.exports = require('../modules/_core').Map;

},{"../modules/_core":37,"../modules/es6.map":102,"../modules/es6.object.to-string":105,"../modules/es6.string.iterator":107,"../modules/es7.map.from":109,"../modules/es7.map.of":110,"../modules/es7.map.to-json":111,"../modules/web.dom.iterable":117}],18:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":37,"../../modules/es6.object.define-property":103}],19:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/_core":37,"../../modules/es6.object.keys":104}],20:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.set');
require('../modules/es7.set.to-json');
require('../modules/es7.set.of');
require('../modules/es7.set.from');
module.exports = require('../modules/_core').Set;

},{"../modules/_core":37,"../modules/es6.object.to-string":105,"../modules/es6.set":106,"../modules/es6.string.iterator":107,"../modules/es7.set.from":112,"../modules/es7.set.of":113,"../modules/es7.set.to-json":114,"../modules/web.dom.iterable":117}],21:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/_core":37,"../../modules/es6.object.to-string":105,"../../modules/es6.symbol":108,"../../modules/es7.symbol.async-iterator":115,"../../modules/es7.symbol.observable":116}],22:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/_wks-ext":96,"../../modules/es6.string.iterator":107,"../../modules/web.dom.iterable":117}],23:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],24:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],25:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],26:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":56}],27:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":47}],28:[function(require,module,exports){
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

},{"./_to-absolute-index":87,"./_to-iobject":89,"./_to-length":90}],29:[function(require,module,exports){
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

},{"./_array-species-create":31,"./_ctx":39,"./_iobject":53,"./_to-length":90,"./_to-object":91}],30:[function(require,module,exports){
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

},{"./_is-array":55,"./_is-object":56,"./_wks":97}],31:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":30}],32:[function(require,module,exports){
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

},{"./_cof":33,"./_wks":97}],33:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],34:[function(require,module,exports){
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

},{"./_an-instance":25,"./_ctx":39,"./_descriptors":41,"./_for-of":47,"./_iter-define":59,"./_iter-step":61,"./_meta":64,"./_object-create":65,"./_object-dp":66,"./_redefine-all":78,"./_set-species":82,"./_validate-collection":94}],35:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof');
var from = require('./_array-from-iterable');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"./_array-from-iterable":27,"./_classof":32}],36:[function(require,module,exports){
'use strict';
var global = require('./_global');
var $export = require('./_export');
var meta = require('./_meta');
var fails = require('./_fails');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var setToStringTag = require('./_set-to-string-tag');
var dP = require('./_object-dp').f;
var each = require('./_array-methods')(0);
var DESCRIPTORS = require('./_descriptors');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_an-instance":25,"./_array-methods":29,"./_descriptors":41,"./_export":45,"./_fails":46,"./_for-of":47,"./_global":48,"./_hide":50,"./_is-object":56,"./_meta":64,"./_object-dp":66,"./_redefine-all":78,"./_set-to-string-tag":83}],37:[function(require,module,exports){
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],38:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":66,"./_property-desc":77}],39:[function(require,module,exports){
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

},{"./_a-function":23}],40:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],41:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":46}],42:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":48,"./_is-object":56}],43:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],44:[function(require,module,exports){
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

},{"./_object-gops":71,"./_object-keys":74,"./_object-pie":75}],45:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
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

},{"./_core":37,"./_ctx":39,"./_global":48,"./_hide":50}],46:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],47:[function(require,module,exports){
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

},{"./_an-object":26,"./_ctx":39,"./_is-array-iter":54,"./_iter-call":57,"./_to-length":90,"./core.get-iterator-method":98}],48:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],49:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],50:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":41,"./_object-dp":66,"./_property-desc":77}],51:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":48}],52:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":41,"./_dom-create":42,"./_fails":46}],53:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":33}],54:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":62,"./_wks":97}],55:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":33}],56:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],57:[function(require,module,exports){
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

},{"./_an-object":26}],58:[function(require,module,exports){
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

},{"./_hide":50,"./_object-create":65,"./_property-desc":77,"./_set-to-string-tag":83,"./_wks":97}],59:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var has = require('./_has');
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
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
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
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
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

},{"./_export":45,"./_has":49,"./_hide":50,"./_iter-create":58,"./_iterators":62,"./_library":63,"./_object-gpo":72,"./_redefine":79,"./_set-to-string-tag":83,"./_wks":97}],60:[function(require,module,exports){
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

},{"./_wks":97}],61:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],62:[function(require,module,exports){
module.exports = {};

},{}],63:[function(require,module,exports){
module.exports = true;

},{}],64:[function(require,module,exports){
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

},{"./_fails":46,"./_has":49,"./_is-object":56,"./_object-dp":66,"./_uid":93}],65:[function(require,module,exports){
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

},{"./_an-object":26,"./_dom-create":42,"./_enum-bug-keys":43,"./_html":51,"./_object-dps":67,"./_shared-key":84}],66:[function(require,module,exports){
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

},{"./_an-object":26,"./_descriptors":41,"./_ie8-dom-define":52,"./_to-primitive":92}],67:[function(require,module,exports){
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

},{"./_an-object":26,"./_descriptors":41,"./_object-dp":66,"./_object-keys":74}],68:[function(require,module,exports){
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

},{"./_descriptors":41,"./_has":49,"./_ie8-dom-define":52,"./_object-pie":75,"./_property-desc":77,"./_to-iobject":89,"./_to-primitive":92}],69:[function(require,module,exports){
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

},{"./_object-gopn":70,"./_to-iobject":89}],70:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":43,"./_object-keys-internal":73}],71:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],72:[function(require,module,exports){
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

},{"./_has":49,"./_shared-key":84,"./_to-object":91}],73:[function(require,module,exports){
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

},{"./_array-includes":28,"./_has":49,"./_shared-key":84,"./_to-iobject":89}],74:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":43,"./_object-keys-internal":73}],75:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],76:[function(require,module,exports){
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

},{"./_core":37,"./_export":45,"./_fails":46}],77:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],78:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":50}],79:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":50}],80:[function(require,module,exports){
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

},{"./_a-function":23,"./_ctx":39,"./_export":45,"./_for-of":47}],81:[function(require,module,exports){
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

},{"./_export":45}],82:[function(require,module,exports){
'use strict';
var global = require('./_global');
var core = require('./_core');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_core":37,"./_descriptors":41,"./_global":48,"./_object-dp":66,"./_wks":97}],83:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":49,"./_object-dp":66,"./_wks":97}],84:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":85,"./_uid":93}],85:[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":48}],86:[function(require,module,exports){
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

},{"./_defined":40,"./_to-integer":88}],87:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":88}],88:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],89:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":40,"./_iobject":53}],90:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":88}],91:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":40}],92:[function(require,module,exports){
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

},{"./_is-object":56}],93:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],94:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":56}],95:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":37,"./_global":48,"./_library":63,"./_object-dp":66,"./_wks-ext":96}],96:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":97}],97:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":48,"./_shared":85,"./_uid":93}],98:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":32,"./_core":37,"./_iterators":62,"./_wks":97}],99:[function(require,module,exports){
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":26,"./_core":37,"./core.get-iterator-method":98}],100:[function(require,module,exports){
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

},{"./_create-property":38,"./_ctx":39,"./_export":45,"./_is-array-iter":54,"./_iter-call":57,"./_iter-detect":60,"./_to-length":90,"./_to-object":91,"./core.get-iterator-method":98}],101:[function(require,module,exports){
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

},{"./_add-to-unscopables":24,"./_iter-define":59,"./_iter-step":61,"./_iterators":62,"./_to-iobject":89}],102:[function(require,module,exports){
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

},{"./_collection":36,"./_collection-strong":34,"./_validate-collection":94}],103:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":41,"./_export":45,"./_object-dp":66}],104:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":74,"./_object-sap":76,"./_to-object":91}],105:[function(require,module,exports){

},{}],106:[function(require,module,exports){
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

},{"./_collection":36,"./_collection-strong":34,"./_validate-collection":94}],107:[function(require,module,exports){
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

},{"./_iter-define":59,"./_string-at":86}],108:[function(require,module,exports){
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

},{"./_an-object":26,"./_descriptors":41,"./_enum-keys":44,"./_export":45,"./_fails":46,"./_global":48,"./_has":49,"./_hide":50,"./_is-array":55,"./_is-object":56,"./_library":63,"./_meta":64,"./_object-create":65,"./_object-dp":66,"./_object-gopd":68,"./_object-gopn":70,"./_object-gopn-ext":69,"./_object-gops":71,"./_object-keys":74,"./_object-pie":75,"./_property-desc":77,"./_redefine":79,"./_set-to-string-tag":83,"./_shared":85,"./_to-iobject":89,"./_to-primitive":92,"./_uid":93,"./_wks":97,"./_wks-define":95,"./_wks-ext":96}],109:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
require('./_set-collection-from')('Map');

},{"./_set-collection-from":80}],110:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
require('./_set-collection-of')('Map');

},{"./_set-collection-of":81}],111:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Map', { toJSON: require('./_collection-to-json')('Map') });

},{"./_collection-to-json":35,"./_export":45}],112:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
require('./_set-collection-from')('Set');

},{"./_set-collection-from":80}],113:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
require('./_set-collection-of')('Set');

},{"./_set-collection-of":81}],114:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });

},{"./_collection-to-json":35,"./_export":45}],115:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":95}],116:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":95}],117:[function(require,module,exports){
require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./_global":48,"./_hide":50,"./_iterators":62,"./_wks":97,"./es6.array.iterator":101}],118:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":119}],119:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);

},{}]},{},[1]);
