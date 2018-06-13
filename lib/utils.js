'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//
exports.default = {
  get: get,
  set: set,
  takeRight: takeRight,
  last: last,
  orderBy: orderBy,
  range: range,
  remove: remove,
  clone: clone,
  getFirstDefined: getFirstDefined,
  sum: sum,
  makeTemplateComponent: makeTemplateComponent,
  groupBy: groupBy,
  isArray: isArray,
  splitProps: splitProps,
  compactObject: compactObject,
  isSortingDesc: isSortingDesc,
  normalizeComponent: normalizeComponent
};


function get(obj, path, def) {
  if (!path) {
    return obj;
  }
  var pathObj = makePathArray(path);
  var val = void 0;
  try {
    val = pathObj.reduce(function (current, pathPart) {
      return current[pathPart];
    }, obj);
  } catch (e) {}
  return typeof val !== 'undefined' ? val : def;
}

function set() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments[1];
  var value = arguments[2];

  var keys = makePathArray(path);
  var keyPart = void 0;
  var cursor = obj;
  while ((keyPart = keys.shift()) && keys.length) {
    if (!cursor[keyPart]) {
      cursor[keyPart] = {};
    }
    cursor = cursor[keyPart];
  }
  cursor[keyPart] = value;
  return obj;
}

function takeRight(arr, n) {
  var start = n > arr.length ? 0 : arr.length - n;
  return arr.slice(start);
}

function last(arr) {
  return arr[arr.length - 1];
}

function range(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(n);
  }
  return arr;
}

function orderBy(arr, funcs, dirs) {
  return arr.sort(function (a, b) {
    for (var i = 0; i < funcs.length; i++) {
      var comp = funcs[i];
      var ca = comp(a);
      var cb = comp(b);
      var desc = dirs[i] === false || dirs[i] === 'desc';
      if (ca > cb) {
        return desc ? -1 : 1;
      }
      if (ca < cb) {
        return desc ? 1 : -1;
      }
    }
    return dirs[0] ? a.__index - b.__index : b.__index - a.__index;
  });
}

function remove(a, b) {
  return a.filter(function (o, i) {
    var r = b(o);
    if (r) {
      a.splice(i, 1);
      return true;
    }
    return false;
  });
}

function clone(a) {
  try {
    return JSON.parse(JSON.stringify(a, function (key, value) {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    }));
  } catch (e) {
    return a;
  }
}

function getFirstDefined() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] !== 'undefined') {
      return args[i];
    }
  }
}

function sum(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function makeTemplateComponent(compClass) {
  return function (_ref) {
    var children = _ref.children,
        className = _ref.className,
        rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _classnames2.default)(compClass, className)
      }, rest),
      children
    );
  };
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x, i) {
    var resKey = typeof key === 'function' ? key(x, i) : x[key];
    rv[resKey] = isArray(rv[resKey]) ? rv[resKey] : [];
    rv[resKey].push(x);
    return rv;
  }, {});
}

function isArray(a) {
  return Array.isArray(a);
}

// ########################################################################
// Non-exported Helpers
// ########################################################################

function makePathArray(obj) {
  return flattenDeep(obj).join('.').replace('[', '.').replace(']', '').split('.');
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i++) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

function splitProps(_ref2) {
  var className = _ref2.className,
      style = _ref2.style,
      rest = _objectWithoutProperties(_ref2, ['className', 'style']);

  return {
    className: className,
    style: style,
    rest: rest
  };
}

function compactObject(obj) {
  var newObj = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined && typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

function isSortingDesc(d) {
  return !!(d.sort === 'desc' || d.desc === true || d.asc === false);
}

function normalizeComponent(Comp) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Comp;

  return typeof Comp === 'function' ? Object.getPrototypeOf(Comp).isReactComponent ? _react2.default.createElement(Comp, params) : Comp(params) : fallback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJnZXQiLCJzZXQiLCJ0YWtlUmlnaHQiLCJsYXN0Iiwib3JkZXJCeSIsInJhbmdlIiwicmVtb3ZlIiwiY2xvbmUiLCJnZXRGaXJzdERlZmluZWQiLCJzdW0iLCJtYWtlVGVtcGxhdGVDb21wb25lbnQiLCJncm91cEJ5IiwiaXNBcnJheSIsInNwbGl0UHJvcHMiLCJjb21wYWN0T2JqZWN0IiwiaXNTb3J0aW5nRGVzYyIsIm5vcm1hbGl6ZUNvbXBvbmVudCIsIm9iaiIsInBhdGgiLCJkZWYiLCJwYXRoT2JqIiwibWFrZVBhdGhBcnJheSIsInZhbCIsInJlZHVjZSIsImN1cnJlbnQiLCJwYXRoUGFydCIsImUiLCJ2YWx1ZSIsImtleXMiLCJrZXlQYXJ0IiwiY3Vyc29yIiwic2hpZnQiLCJsZW5ndGgiLCJhcnIiLCJuIiwic3RhcnQiLCJzbGljZSIsImkiLCJwdXNoIiwiZnVuY3MiLCJkaXJzIiwic29ydCIsImEiLCJiIiwiY29tcCIsImNhIiwiY2IiLCJkZXNjIiwiX19pbmRleCIsImZpbHRlciIsIm8iLCJyIiwic3BsaWNlIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwia2V5IiwidG9TdHJpbmciLCJhcmdzIiwiY29tcENsYXNzIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJyZXN0IiwieHMiLCJydiIsIngiLCJyZXNLZXkiLCJBcnJheSIsImZsYXR0ZW5EZWVwIiwiam9pbiIsInJlcGxhY2UiLCJzcGxpdCIsIm5ld0FyciIsInN0eWxlIiwibmV3T2JqIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJkIiwiYXNjIiwiQ29tcCIsInBhcmFtcyIsImZhbGxiYWNrIiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJpc1JlYWN0Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBQ0E7a0JBQ2U7QUFDYkEsVUFEYTtBQUViQyxVQUZhO0FBR2JDLHNCQUhh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T2xCLEdBQVAsSUFBY3ZDLElBQUl1QyxHQUFKLENBQWQ7QUFDRDtBQUNGO0FBQ0QsU0FBT2tCLE1BQVA7QUFDRDs7QUFFRCxTQUFTM0QsYUFBVCxDQUF3QjhELENBQXhCLEVBQTJCO0FBQ3pCLFNBQU8sQ0FBQyxFQUFFQSxFQUFFcEMsSUFBRixLQUFXLE1BQVgsSUFBcUJvQyxFQUFFOUIsSUFBRixLQUFXLElBQWhDLElBQXdDOEIsRUFBRUMsR0FBRixLQUFVLEtBQXBELENBQVI7QUFDRDs7QUFFRCxTQUFTOUQsa0JBQVQsQ0FBNkIrRCxJQUE3QixFQUFpRTtBQUFBLE1BQTlCQyxNQUE4Qix1RUFBckIsRUFBcUI7QUFBQSxNQUFqQkMsUUFBaUIsdUVBQU5GLElBQU07O0FBQy9ELFNBQU8sT0FBT0EsSUFBUCxLQUFnQixVQUFoQixHQUNMRyxPQUFPQyxjQUFQLENBQXNCSixJQUF0QixFQUE0QkssZ0JBQTVCLEdBQ0UsOEJBQUMsSUFBRCxFQUNNSixNQUROLENBREYsR0FJSUQsS0FBS0MsTUFBTCxDQUxDLEdBTUhDLFFBTko7QUFPRCIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcclxuLy9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldCxcclxuICBzZXQsXHJcbiAgdGFrZVJpZ2h0LFxyXG4gIGxhc3QsXHJcbiAgb3JkZXJCeSxcclxuICByYW5nZSxcclxuICByZW1vdmUsXHJcbiAgY2xvbmUsXHJcbiAgZ2V0Rmlyc3REZWZpbmVkLFxyXG4gIHN1bSxcclxuICBtYWtlVGVtcGxhdGVDb21wb25lbnQsXHJcbiAgZ3JvdXBCeSxcclxuICBpc0FycmF5LFxyXG4gIHNwbGl0UHJvcHMsXHJcbiAgY29tcGFjdE9iamVjdCxcclxuICBpc1NvcnRpbmdEZXNjLFxyXG4gIG5vcm1hbGl6ZUNvbXBvbmVudFxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQgKG9iaiwgcGF0aCwgZGVmKSB7XHJcbiAgaWYgKCFwYXRoKSB7XHJcbiAgICByZXR1cm4gb2JqXHJcbiAgfVxyXG4gIGNvbnN0IHBhdGhPYmogPSBtYWtlUGF0aEFycmF5KHBhdGgpXHJcbiAgbGV0IHZhbFxyXG4gIHRyeSB7XHJcbiAgICB2YWwgPSBwYXRoT2JqLnJlZHVjZSgoY3VycmVudCwgcGF0aFBhcnQpID0+IGN1cnJlbnRbcGF0aFBhcnRdLCBvYmopXHJcbiAgfSBjYXRjaCAoZSkge31cclxuICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgPyB2YWwgOiBkZWZcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0IChvYmogPSB7fSwgcGF0aCwgdmFsdWUpIHtcclxuICBjb25zdCBrZXlzID0gbWFrZVBhdGhBcnJheShwYXRoKVxyXG4gIGxldCBrZXlQYXJ0XHJcbiAgbGV0IGN1cnNvciA9IG9ialxyXG4gIHdoaWxlICgoa2V5UGFydCA9IGtleXMuc2hpZnQoKSkgJiYga2V5cy5sZW5ndGgpIHtcclxuICAgIGlmICghY3Vyc29yW2tleVBhcnRdKSB7XHJcbiAgICAgIGN1cnNvcltrZXlQYXJ0XSA9IHt9XHJcbiAgICB9XHJcbiAgICBjdXJzb3IgPSBjdXJzb3Jba2V5UGFydF1cclxuICB9XHJcbiAgY3Vyc29yW2tleVBhcnRdID0gdmFsdWVcclxuICByZXR1cm4gb2JqXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRha2VSaWdodCAoYXJyLCBuKSB7XHJcbiAgY29uc3Qgc3RhcnQgPSBuID4gYXJyLmxlbmd0aCA/IDAgOiBhcnIubGVuZ3RoIC0gblxyXG4gIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxhc3QgKGFycikge1xyXG4gIHJldHVybiBhcnJbYXJyLmxlbmd0aCAtIDFdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhbmdlIChuKSB7XHJcbiAgY29uc3QgYXJyID0gW11cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgYXJyLnB1c2gobilcclxuICB9XHJcbiAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5mdW5jdGlvbiBvcmRlckJ5IChhcnIsIGZ1bmNzLCBkaXJzKSB7XHJcbiAgcmV0dXJuIGFyci5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbXAgPSBmdW5jc1tpXVxyXG4gICAgICBjb25zdCBjYSA9IGNvbXAoYSlcclxuICAgICAgY29uc3QgY2IgPSBjb21wKGIpXHJcbiAgICAgIGNvbnN0IGRlc2MgPSBkaXJzW2ldID09PSBmYWxzZSB8fCBkaXJzW2ldID09PSAnZGVzYydcclxuICAgICAgaWYgKGNhID4gY2IpIHtcclxuICAgICAgICByZXR1cm4gZGVzYyA/IC0xIDogMVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChjYSA8IGNiKSB7XHJcbiAgICAgICAgcmV0dXJuIGRlc2MgPyAxIDogLTFcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRpcnNbMF1cclxuICAgICAgPyBhLl9faW5kZXggLSBiLl9faW5kZXhcclxuICAgICAgOiBiLl9faW5kZXggLSBhLl9faW5kZXhcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmUgKGEsIGIpIHtcclxuICByZXR1cm4gYS5maWx0ZXIoZnVuY3Rpb24gKG8sIGkpIHtcclxuICAgIHZhciByID0gYihvKVxyXG4gICAgaWYgKHIpIHtcclxuICAgICAgYS5zcGxpY2UoaSwgMSlcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb25lIChhKSB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGEsIChrZXksIHZhbHVlKSA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgfSkpXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGFcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEZpcnN0RGVmaW5lZCAoLi4uYXJncykge1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKHR5cGVvZiBhcmdzW2ldICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4gYXJnc1tpXVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3VtIChhcnIpIHtcclxuICByZXR1cm4gYXJyLnJlZHVjZSgoYSwgYikgPT4ge1xyXG4gICAgcmV0dXJuIGEgKyBiXHJcbiAgfSwgMClcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZVRlbXBsYXRlQ29tcG9uZW50IChjb21wQ2xhc3MpIHtcclxuICByZXR1cm4gKHtjaGlsZHJlbiwgY2xhc3NOYW1lLCAuLi5yZXN0fSkgPT4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoY29tcENsYXNzLCBjbGFzc05hbWUpfVxyXG4gICAgICB7Li4ucmVzdH1cclxuICAgID5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBncm91cEJ5ICh4cywga2V5KSB7XHJcbiAgcmV0dXJuIHhzLnJlZHVjZSgocnYsIHgsIGkpID0+IHtcclxuICAgIGNvbnN0IHJlc0tleSA9IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicgPyBrZXkoeCwgaSkgOiB4W2tleV1cclxuICAgIHJ2W3Jlc0tleV0gPSBpc0FycmF5KHJ2W3Jlc0tleV0pID8gcnZbcmVzS2V5XSA6IFtdXHJcbiAgICBydltyZXNLZXldLnB1c2goeClcclxuICAgIHJldHVybiBydlxyXG4gIH0sIHt9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0FycmF5IChhKSB7XHJcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYSlcclxufVxyXG5cclxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbi8vIE5vbi1leHBvcnRlZCBIZWxwZXJzXHJcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG5cclxuZnVuY3Rpb24gbWFrZVBhdGhBcnJheSAob2JqKSB7XHJcbiAgcmV0dXJuIGZsYXR0ZW5EZWVwKG9iailcclxuICAgICAgLmpvaW4oJy4nKVxyXG4gICAgICAucmVwbGFjZSgnWycsICcuJylcclxuICAgICAgLnJlcGxhY2UoJ10nLCAnJylcclxuICAgICAgLnNwbGl0KCcuJylcclxufVxyXG5cclxuZnVuY3Rpb24gZmxhdHRlbkRlZXAgKGFyciwgbmV3QXJyID0gW10pIHtcclxuICBpZiAoIWlzQXJyYXkoYXJyKSkge1xyXG4gICAgbmV3QXJyLnB1c2goYXJyKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICBmbGF0dGVuRGVlcChhcnJbaV0sIG5ld0FycilcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG5ld0FyclxyXG59XHJcblxyXG5mdW5jdGlvbiBzcGxpdFByb3BzICh7Y2xhc3NOYW1lLCBzdHlsZSwgLi4ucmVzdH0pIHtcclxuICByZXR1cm4ge1xyXG4gICAgY2xhc3NOYW1lLFxyXG4gICAgc3R5bGUsXHJcbiAgICByZXN0XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wYWN0T2JqZWN0IChvYmopIHtcclxuICBjb25zdCBuZXdPYmogPSB7fVxyXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSAmJiBvYmpba2V5XSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvYmpba2V5XSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbmV3T2JqXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzU29ydGluZ0Rlc2MgKGQpIHtcclxuICByZXR1cm4gISEoZC5zb3J0ID09PSAnZGVzYycgfHwgZC5kZXNjID09PSB0cnVlIHx8IGQuYXNjID09PSBmYWxzZSlcclxufVxyXG5cclxuZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChDb21wLCBwYXJhbXMgPSB7fSwgZmFsbGJhY2sgPSBDb21wKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiBDb21wID09PSAnZnVuY3Rpb24nID8gKFxyXG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbXApLmlzUmVhY3RDb21wb25lbnQgPyAoXHJcbiAgICAgIDxDb21wXHJcbiAgICAgICAgey4uLnBhcmFtc31cclxuICAgICAgLz5cclxuICAgICkgOiBDb21wKHBhcmFtcylcclxuICApIDogZmFsbGJhY2tcclxufVxyXG4iXX0=