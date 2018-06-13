'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
  getDataModel: function getDataModel(newState) {
    var _this = this;

    var columns = newState.columns,
        _newState$pivotBy = newState.pivotBy,
        pivotBy = _newState$pivotBy === undefined ? [] : _newState$pivotBy,
        data = newState.data,
        pivotIDKey = newState.pivotIDKey,
        pivotValKey = newState.pivotValKey,
        subRowsKey = newState.subRowsKey,
        expanderColumnWidth = newState.expanderColumnWidth,
        SubComponent = newState.SubComponent;

    // Determine Header Groups

    var hasHeaderGroups = false;
    columns.forEach(function (column) {
      if (column.columns) {
        hasHeaderGroups = true;
      }
    });

    // Build Header Groups
    var headerGroups = [];
    var currentSpan = [];

    // A convenience function to add a header and reset the currentSpan
    var addHeader = function addHeader(columns) {
      var column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : columns[0];

      headerGroups.push(_extends({}, _this.props.column, column, {
        columns: columns
      }));
      currentSpan = [];
    };

    var noSubExpanderColumns = columns.map(function (col) {
      return _extends({}, col, {
        columns: col.columns ? col.columns.filter(function (d) {
          return !d.expander;
        }) : undefined
      });
    });

    var expanderColumnIndex = columns.findIndex(function (col) {
      return col.expander;
    });
    var needsExpander = (SubComponent || pivotBy.length) && expanderColumnIndex === -1;
    var columnsWithExpander = needsExpander ? [{ expander: true }].concat(_toConsumableArray(noSubExpanderColumns)) : noSubExpanderColumns;
    if (needsExpander) {
      expanderColumnIndex = 0;
    }

    var makeDecoratedColumn = function makeDecoratedColumn(column) {
      var dcol = _extends({}, _this.props.column, column);

      if (dcol.expander) {
        dcol.width = expanderColumnWidth;
        return dcol;
      }

      if (typeof dcol.accessor === 'string') {
        var _ret = function () {
          dcol.id = dcol.id || dcol.accessor;
          var accessorString = dcol.accessor;
          dcol.accessor = function (row) {
            return _utils2.default.get(row, accessorString);
          };
          return {
            v: dcol
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }

      if (dcol.accessor && !dcol.id) {
        console.warn(dcol);
        throw new Error('A column id is required if using a non-string accessor for column above.');
      }

      if (!dcol.accessor) {
        dcol.accessor = function (d) {
          return undefined;
        };
      }

      // Ensure minWidth is not greater than maxWidth if set
      if (dcol.maxWidth < dcol.minWidth) {
        dcol.minWidth = dcol.maxWidth;
      }

      return dcol;
    };

    // Decorate the columns
    var decorateAndAddToAll = function decorateAndAddToAll(col) {
      var decoratedColumn = makeDecoratedColumn(col);
      allDecoratedColumns.push(decoratedColumn);
      return decoratedColumn;
    };
    var allDecoratedColumns = [];
    var decoratedColumns = columnsWithExpander.map(function (column, i) {
      if (column.columns) {
        return _extends({}, column, {
          columns: column.columns.map(decorateAndAddToAll)
        });
      } else {
        return decorateAndAddToAll(column);
      }
    });

    // Build the visible columns, headers and flat column list
    var visibleColumns = decoratedColumns.slice();
    var allVisibleColumns = [];

    visibleColumns = visibleColumns.map(function (column, i) {
      if (column.columns) {
        var visibleSubColumns = column.columns.filter(function (d) {
          return pivotBy.indexOf(d.id) > -1 ? false : _utils2.default.getFirstDefined(d.show, true);
        });
        return _extends({}, column, {
          columns: visibleSubColumns
        });
      }
      return column;
    });

    visibleColumns = visibleColumns.filter(function (column) {
      return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _utils2.default.getFirstDefined(column.show, true);
    });

    // Move the pivot columns into a single column if needed
    if (pivotBy.length) {
      var pivotColumns = [];
      for (var i = 0; i < allDecoratedColumns.length; i++) {
        if (pivotBy.indexOf(allDecoratedColumns[i].id) > -1) {
          pivotColumns.push(allDecoratedColumns[i]);
        }
      }
      var _pivotColumn = _extends({}, pivotColumns[0], {
        pivotColumns: pivotColumns,
        expander: true
      });
      visibleColumns[expanderColumnIndex] = _pivotColumn;
    }

    // Build flast list of allVisibleColumns and HeaderGroups
    visibleColumns.forEach(function (column, i) {
      if (column.columns) {
        allVisibleColumns = allVisibleColumns.concat(column.columns);
        if (currentSpan.length > 0) {
          addHeader(currentSpan);
        }
        addHeader(column.columns, column);
        return;
      }
      allVisibleColumns.push(column);
      currentSpan.push(column);
    });
    if (hasHeaderGroups && currentSpan.length > 0) {
      addHeader(currentSpan);
    }

    // Access the data
    var resolvedData = data.map(function (d, i) {
      var row = {
        __original: d,
        __index: i
      };
      allDecoratedColumns.forEach(function (column) {
        if (column.expander) return;
        row[column.id] = column.accessor(d);
      });
      return row;
    });

    // If pivoting, recursively group the data
    var aggregate = function aggregate(rows) {
      var aggregationValues = {};
      aggregatingColumns.forEach(function (column) {
        var values = rows.map(function (d) {
          return d[column.id];
        });
        aggregationValues[column.id] = column.aggregate(values, rows);
      });
      return aggregationValues;
    };
    var standardColumns = pivotBy.length ? allVisibleColumns.slice(1) : allVisibleColumns;
    var aggregatingColumns = standardColumns.filter(function (d) {
      return d.aggregate;
    });
    var pivotColumn = void 0;
    if (pivotBy.length) {
      (function () {
        pivotColumn = allVisibleColumns[0];
        var groupRecursively = function groupRecursively(rows, keys) {
          var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

          // This is the last level, just return the rows
          if (i === keys.length) {
            return rows;
          }
          // Group the rows together for this level
          var groupedRows = Object.entries(_utils2.default.groupBy(rows, keys[i])).map(function (_ref) {
            var _ref3;

            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            return _ref3 = {}, _defineProperty(_ref3, pivotIDKey, keys[i]), _defineProperty(_ref3, pivotValKey, key), _defineProperty(_ref3, keys[i], key), _defineProperty(_ref3, subRowsKey, value), _ref3;
          });
          // Recurse into the subRows
          groupedRows = groupedRows.map(function (rowGroup) {
            var subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
            return _extends({}, rowGroup, _defineProperty({}, subRowsKey, subRows), aggregate(subRows));
          });
          return groupedRows;
        };
        resolvedData = groupRecursively(resolvedData, pivotBy);
      })();
    }

    return _extends({}, newState, {
      resolvedData: resolvedData,
      pivotColumn: pivotColumn,
      allVisibleColumns: allVisibleColumns,
      headerGroups: headerGroups,
      allDecoratedColumns: allDecoratedColumns,
      hasHeaderGroups: hasHeaderGroups
    });
  },
  getSortedData: function getSortedData(resolvedState) {
    var manual = resolvedState.manual,
        sorting = resolvedState.sorting,
        filtering = resolvedState.filtering,
        showFilters = resolvedState.showFilters,
        defaultFilterMethod = resolvedState.defaultFilterMethod,
        resolvedData = resolvedState.resolvedData,
        allVisibleColumns = resolvedState.allVisibleColumns;

    // Resolve the data from either manual data or sorted data

    return {
      sortedData: manual ? resolvedData : this.sortData(this.filterData(resolvedData, showFilters, filtering, defaultFilterMethod, allVisibleColumns), sorting)
    };
  },
  fireOnChange: function fireOnChange() {
    this.props.onChange(this.getResolvedState(), this);
  },
  getPropOrState: function getPropOrState(key) {
    return _utils2.default.getFirstDefined(this.props[key], this.state[key]);
  },
  getStateOrProp: function getStateOrProp(key) {
    return _utils2.default.getFirstDefined(this.state[key], this.props[key]);
  },
  filterData: function filterData(data, showFilters, filtering, defaultFilterMethod, allVisibleColumns) {
    var _this2 = this;

    var filteredData = data;

    if (showFilters && filtering.length) {
      filteredData = filtering.reduce(function (filteredSoFar, nextFilter) {
        return filteredSoFar.filter(function (row) {
          var column = void 0;

          if (nextFilter.pivotId) {
            var parentColumn = allVisibleColumns.find(function (x) {
              return x.id === nextFilter.id;
            });
            column = parentColumn.pivotColumns.find(function (x) {
              return x.id === nextFilter.pivotId;
            });
          } else {
            column = allVisibleColumns.find(function (x) {
              return x.id === nextFilter.id;
            });
          }

          var filterMethod = column.filterMethod || defaultFilterMethod;

          return filterMethod(nextFilter, row, column);
        });
      }, filteredData);

      // Apply the filter to the subrows if we are pivoting, and then
      // filter any rows without subcolumns because it would be strange to show
      filteredData = filteredData.map(function (row) {
        if (!row[_this2.props.subRowsKey]) {
          return row;
        }
        return _extends({}, row, _defineProperty({}, _this2.props.subRowsKey, _this2.filterData(row[_this2.props.subRowsKey], showFilters, filtering, defaultFilterMethod, allVisibleColumns)));
      }).filter(function (row) {
        if (!row[_this2.props.subRowsKey]) {
          return true;
        }
        return row[_this2.props.subRowsKey].length > 0;
      });
    }

    return filteredData;
  },
  sortData: function sortData(data, sorting) {
    var _this3 = this;

    if (!sorting.length) {
      return data;
    }

    var sorted = _utils2.default.orderBy(data, sorting.map(function (sort) {
      return function (row) {
        if (row[sort.id] === null || row[sort.id] === undefined) {
          return -Infinity;
        }
        return typeof row[sort.id] === 'string' ? row[sort.id].toLowerCase() : row[sort.id];
      };
    }), sorting.map(function (d) {
      return !d.desc;
    }));

    return sorted.map(function (row) {
      if (!row[_this3.props.subRowsKey]) {
        return row;
      }
      return _extends({}, row, _defineProperty({}, _this3.props.subRowsKey, _this3.sortData(row[_this3.props.subRowsKey], sorting)));
    });
  },
  getMinRows: function getMinRows() {
    return _utils2.default.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
  },


  // User actions
  onPageChange: function onPageChange(page) {
    var _this4 = this;

    var _props = this.props,
        onPageChange = _props.onPageChange,
        collapseOnPageChange = _props.collapseOnPageChange;

    if (onPageChange) {
      return onPageChange(page);
    }
    var newState = { page: page };
    if (collapseOnPageChange) {
      newState.expandedRows = {};
    }
    this.setStateWithData(newState, function () {
      _this4.fireOnChange();
    });
  },
  onPageSizeChange: function onPageSizeChange(newPageSize) {
    var _this5 = this;

    var onPageSizeChange = this.props.onPageSizeChange;

    var _getResolvedState = this.getResolvedState(),
        pageSize = _getResolvedState.pageSize,
        page = _getResolvedState.page;

    // Normalize the page to display


    var currentRow = pageSize * page;
    var newPage = Math.floor(currentRow / newPageSize);

    if (onPageSizeChange) {
      return onPageSizeChange(newPageSize, newPage);
    }

    this.setStateWithData({
      pageSize: newPageSize,
      page: newPage
    }, function () {
      _this5.fireOnChange();
    });
  },
  sortColumn: function sortColumn(column, additive) {
    var _this6 = this;

    var _getResolvedState2 = this.getResolvedState(),
        sorting = _getResolvedState2.sorting,
        skipNextSort = _getResolvedState2.skipNextSort;

    // we can't stop event propagation from the column resize move handlers
    // attached to the document because of react's synthetic events
    // so we have to prevent the sort function from actually sorting
    // if we click on the column resize element within a header.


    if (skipNextSort) {
      this.setStateWithData({
        skipNextSort: false
      });
      return;
    }

    var onSortingChange = this.props.onSortingChange;

    if (onSortingChange) {
      return onSortingChange(column, additive);
    }
    var newSorting = _utils2.default.clone(sorting || []).map(function (d) {
      d.desc = _utils2.default.isSortingDesc(d);
      return d;
    });
    if (!_utils2.default.isArray(column)) {
      // Single-Sort
      var existingIndex = newSorting.findIndex(function (d) {
        return d.id === column.id;
      });
      if (existingIndex > -1) {
        var existing = newSorting[existingIndex];
        if (existing.desc) {
          if (additive) {
            newSorting.splice(existingIndex, 1);
          } else {
            existing.desc = false;
            newSorting = [existing];
          }
        } else {
          existing.desc = true;
          if (!additive) {
            newSorting = [existing];
          }
        }
      } else {
        if (additive) {
          newSorting.push({
            id: column.id,
            desc: false
          });
        } else {
          newSorting = [{
            id: column.id,
            desc: false
          }];
        }
      }
    } else {
      (function () {
        // Multi-Sort
        var existingIndex = newSorting.findIndex(function (d) {
          return d.id === column[0].id;
        });
        // Existing Sorted Column
        if (existingIndex > -1) {
          var _existing = newSorting[existingIndex];
          if (_existing.desc) {
            if (additive) {
              newSorting.splice(existingIndex, column.length);
            } else {
              column.forEach(function (d, i) {
                newSorting[existingIndex + i].desc = false;
              });
            }
          } else {
            column.forEach(function (d, i) {
              newSorting[existingIndex + i].desc = true;
            });
          }
          if (!additive) {
            newSorting = newSorting.slice(existingIndex, column.length);
          }
        } else {
          // New Sort Column
          if (additive) {
            newSorting = newSorting.concat(column.map(function (d) {
              return {
                id: d.id,
                desc: false
              };
            }));
          } else {
            newSorting = column.map(function (d) {
              return {
                id: d.id,
                desc: false
              };
            });
          }
        }
      })();
    }
    this.setStateWithData({
      page: !sorting.length && newSorting.length || !additive ? 0 : this.state.page,
      sorting: newSorting
    }, function () {
      _this6.fireOnChange();
    });
  },
  filterColumn: function filterColumn(column, value, pivotColumn) {
    var _this7 = this;

    var _getResolvedState3 = this.getResolvedState(),
        filtering = _getResolvedState3.filtering;

    var onFilteringChange = this.props.onFilteringChange;


    if (onFilteringChange) {
      return onFilteringChange(column, value, pivotColumn);
    }

    // Remove old filter first if it exists
    var newFiltering = (filtering || []).filter(function (x) {
      if (x.id !== column.id) {
        return true;
      }
      if (x.pivotId) {
        if (pivotColumn) {
          return x.pivotId !== pivotColumn.id;
        }
        return true;
      }
    });

    if (value !== '') {
      newFiltering.push({
        id: column.id,
        value: value,
        pivotId: pivotColumn ? pivotColumn.id : undefined
      });
    }

    this.setStateWithData({
      filtering: newFiltering
    }, function () {
      _this7.fireOnChange();
    });
  },
  resizeColumnStart: function resizeColumnStart(column, event, isTouch) {
    var _this8 = this;

    var onResize = this.props.onResize;


    if (onResize) {
      return onResize(column, event, isTouch);
    }

    var parentWidth = event.target.parentElement.getBoundingClientRect().width;

    var pageX = void 0;
    if (isTouch) {
      pageX = event.changedTouches[0].pageX;
    } else {
      pageX = event.pageX;
    }

    this.setStateWithData({
      currentlyResizing: {
        id: column.id,
        startX: pageX,
        parentWidth: parentWidth
      }
    }, function () {
      if (isTouch) {
        document.addEventListener('touchmove', _this8.resizeColumnMoving);
        document.addEventListener('touchcancel', _this8.resizeColumnEnd);
        document.addEventListener('touchend', _this8.resizeColumnEnd);
      } else {
        document.addEventListener('mousemove', _this8.resizeColumnMoving);
        document.addEventListener('mouseup', _this8.resizeColumnEnd);
        document.addEventListener('mouseleave', _this8.resizeColumnEnd);
      }
    });
  },
  resizeColumnEnd: function resizeColumnEnd(event) {
    var isTouch = event.type === 'touchend' || event.type === 'touchcancel';

    if (isTouch) {
      document.removeEventListener('touchmove', this.resizeColumnMoving);
      document.removeEventListener('touchcancel', this.resizeColumnEnd);
      document.removeEventListener('touchend', this.resizeColumnEnd);
    }

    // If its a touch event clear the mouse one's as well because sometimes
    // the mouseDown event gets called as well, but the mouseUp event doesn't
    document.removeEventListener('mousemove', this.resizeColumnMoving);
    document.removeEventListener('mouseup', this.resizeColumnEnd);
    document.removeEventListener('mouseleave', this.resizeColumnEnd);

    // The touch events don't propagate up to the sorting's onMouseDown event so
    // no need to prevent it from happening or else the first click after a touch
    // event resize will not sort the column.
    if (!isTouch) {
      this.setStateWithData({
        skipNextSort: true
      });
    }
  },
  resizeColumnMoving: function resizeColumnMoving(event) {
    var _getResolvedState4 = this.getResolvedState(),
        resizing = _getResolvedState4.resizing,
        currentlyResizing = _getResolvedState4.currentlyResizing;

    // Delete old value


    var newResizing = resizing.filter(function (x) {
      return x.id !== currentlyResizing.id;
    });

    var pageX = void 0;

    if (event.type === 'touchmove') {
      pageX = event.changedTouches[0].pageX;
    } else if (event.type === 'mousemove') {
      pageX = event.pageX;
    }

    // Set the min size to 10 to account for margin and border or else the group headers don't line up correctly
    var newWidth = Math.max(currentlyResizing.parentWidth + pageX - currentlyResizing.startX, 11);

    newResizing.push({
      id: currentlyResizing.id,
      value: newWidth
    });

    this.setStateWithData({
      resizing: newResizing
    });
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLmpzIl0sIm5hbWVzIjpbImdldERhdGFNb2RlbCIsIm5ld1N0YXRlIiwiY29sdW1ucyIsInBpdm90QnkiLCJkYXRhIiwicGl2b3RJREtleSIsInBpdm90VmFsS2V5Iiwic3ViUm93c0tleSIsImV4cGFuZGVyQ29sdW1uV2lkdGgiLCJTdWJDb21wb25lbnQiLCJoYXNIZWFkZXJHcm91cHMiLCJmb3JFYWNoIiwiY29sdW1uIiwiaGVhZGVyR3JvdXBzIiwiY3VycmVudFNwYW4iLCJhZGRIZWFkZXIiLCJwdXNoIiwicHJvcHMiLCJub1N1YkV4cGFuZGVyQ29sdW1ucyIsIm1hcCIsImNvbCIsImZpbHRlciIsImQiLCJleHBhbmRlciIsInVuZGVmaW5lZCIsImV4cGFuZGVyQ29sdW1uSW5kZXgiLCJmaW5kSW5kZXgiLCJuZWVkc0V4cGFuZGVyIiwibGVuZ3RoIiwiY29sdW1uc1dpdGhFeHBhbmRlciIsIm1ha2VEZWNvcmF0ZWRDb2x1bW4iLCJkY29sIiwid2lkdGgiLCJhY2Nlc3NvciIsImlkIiwiYWNjZXNzb3JTdHJpbmciLCJnZXQiLCJyb3ciLCJjb25zb2xlIiwid2FybiIsIkVycm9yIiwibWF4V2lkdGgiLCJtaW5XaWR0aCIsImRlY29yYXRlQW5kQWRkVG9BbGwiLCJkZWNvcmF0ZWRDb2x1bW4iLCJhbGxEZWNvcmF0ZWRDb2x1bW5zIiwiZGVjb3JhdGVkQ29sdW1ucyIsImkiLCJ2aXNpYmxlQ29sdW1ucyIsInNsaWNlIiwiYWxsVmlzaWJsZUNvbHVtbnMiLCJ2aXNpYmxlU3ViQ29sdW1ucyIsImluZGV4T2YiLCJnZXRGaXJzdERlZmluZWQiLCJzaG93IiwicGl2b3RDb2x1bW5zIiwicGl2b3RDb2x1bW4iLCJjb25jYXQiLCJyZXNvbHZlZERhdGEiLCJfX29yaWdpbmFsIiwiX19pbmRleCIsImFnZ3JlZ2F0ZSIsInJvd3MiLCJhZ2dyZWdhdGlvblZhbHVlcyIsImFnZ3JlZ2F0aW5nQ29sdW1ucyIsInZhbHVlcyIsInN0YW5kYXJkQ29sdW1ucyIsImdyb3VwUmVjdXJzaXZlbHkiLCJrZXlzIiwiZ3JvdXBlZFJvd3MiLCJPYmplY3QiLCJlbnRyaWVzIiwiZ3JvdXBCeSIsImtleSIsInZhbHVlIiwic3ViUm93cyIsInJvd0dyb3VwIiwiZ2V0U29ydGVkRGF0YSIsInJlc29sdmVkU3RhdGUiLCJtYW51YWwiLCJzb3J0aW5nIiwiZmlsdGVyaW5nIiwic2hvd0ZpbHRlcnMiLCJkZWZhdWx0RmlsdGVyTWV0aG9kIiwic29ydGVkRGF0YSIsInNvcnREYXRhIiwiZmlsdGVyRGF0YSIsImZpcmVPbkNoYW5nZSIsIm9uQ2hhbmdlIiwiZ2V0UmVzb2x2ZWRTdGF0ZSIsImdldFByb3BPclN0YXRlIiwic3RhdGUiLCJnZXRTdGF0ZU9yUHJvcCIsImZpbHRlcmVkRGF0YSIsInJlZHVjZSIsImZpbHRlcmVkU29GYXIiLCJuZXh0RmlsdGVyIiwicGl2b3RJZCIsInBhcmVudENvbHVtbiIsImZpbmQiLCJ4IiwiZmlsdGVyTWV0aG9kIiwic29ydGVkIiwib3JkZXJCeSIsInNvcnQiLCJJbmZpbml0eSIsInRvTG93ZXJDYXNlIiwiZGVzYyIsImdldE1pblJvd3MiLCJtaW5Sb3dzIiwib25QYWdlQ2hhbmdlIiwicGFnZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiZXhwYW5kZWRSb3dzIiwic2V0U3RhdGVXaXRoRGF0YSIsIm9uUGFnZVNpemVDaGFuZ2UiLCJuZXdQYWdlU2l6ZSIsInBhZ2VTaXplIiwiY3VycmVudFJvdyIsIm5ld1BhZ2UiLCJNYXRoIiwiZmxvb3IiLCJzb3J0Q29sdW1uIiwiYWRkaXRpdmUiLCJza2lwTmV4dFNvcnQiLCJvblNvcnRpbmdDaGFuZ2UiLCJuZXdTb3J0aW5nIiwiY2xvbmUiLCJpc1NvcnRpbmdEZXNjIiwiaXNBcnJheSIsImV4aXN0aW5nSW5kZXgiLCJleGlzdGluZyIsInNwbGljZSIsImZpbHRlckNvbHVtbiIsIm9uRmlsdGVyaW5nQ2hhbmdlIiwibmV3RmlsdGVyaW5nIiwicmVzaXplQ29sdW1uU3RhcnQiLCJldmVudCIsImlzVG91Y2giLCJvblJlc2l6ZSIsInBhcmVudFdpZHRoIiwidGFyZ2V0IiwicGFyZW50RWxlbWVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VYIiwiY2hhbmdlZFRvdWNoZXMiLCJjdXJyZW50bHlSZXNpemluZyIsInN0YXJ0WCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc2l6ZUNvbHVtbk1vdmluZyIsInJlc2l6ZUNvbHVtbkVuZCIsInR5cGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVzaXppbmciLCJuZXdSZXNpemluZyIsIm5ld1dpZHRoIiwibWF4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7OztrQkFFZTtBQUNiQSxjQURhLHdCQUNDQyxRQURELEVBQ1c7QUFBQTs7QUFBQSxRQUVwQkMsT0FGb0IsR0FVbEJELFFBVmtCLENBRXBCQyxPQUZvQjtBQUFBLDRCQVVsQkQsUUFWa0IsQ0FHcEJFLE9BSG9CO0FBQUEsUUFHcEJBLE9BSG9CLHFDQUdWLEVBSFU7QUFBQSxRQUlwQkMsSUFKb0IsR0FVbEJILFFBVmtCLENBSXBCRyxJQUpvQjtBQUFBLFFBS3BCQyxVQUxvQixHQVVsQkosUUFWa0IsQ0FLcEJJLFVBTG9CO0FBQUEsUUFNcEJDLFdBTm9CLEdBVWxCTCxRQVZrQixDQU1wQkssV0FOb0I7QUFBQSxRQU9wQkMsVUFQb0IsR0FVbEJOLFFBVmtCLENBT3BCTSxVQVBvQjtBQUFBLFFBUXBCQyxtQkFSb0IsR0FVbEJQLFFBVmtCLENBUXBCTyxtQkFSb0I7QUFBQSxRQVNwQkMsWUFUb0IsR0FVbEJSLFFBVmtCLENBU3BCUSxZQVRvQjs7QUFZdEI7O0FBQ0EsUUFBSUMsa0JBQWtCLEtBQXRCO0FBQ0FSLFlBQVFTLE9BQVIsQ0FBZ0Isa0JBQVU7QUFDeEIsVUFBSUMsT0FBT1YsT0FBWCxFQUFvQjtBQUNsQlEsMEJBQWtCLElBQWxCO0FBQ0Q7QUFDRixLQUpEOztBQU1BO0FBQ0EsUUFBTUcsZUFBZSxFQUFyQjtBQUNBLFFBQUlDLGNBQWMsRUFBbEI7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QUFFZndDLGFBQU9rRjtBQUZRLEtBQWpCOztBQUtBLFNBQUsxQyxnQkFBTCxDQUFzQjtBQUNwQndDLGdCQUFVQztBQURVLEtBQXRCO0FBR0Q7QUExakJZLEMiLCJmaWxlIjoibWV0aG9kcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0RGF0YU1vZGVsIChuZXdTdGF0ZSkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjb2x1bW5zLFxyXG4gICAgICBwaXZvdEJ5ID0gW10sXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIHBpdm90SURLZXksXHJcbiAgICAgIHBpdm90VmFsS2V5LFxyXG4gICAgICBzdWJSb3dzS2V5LFxyXG4gICAgICBleHBhbmRlckNvbHVtbldpZHRoLFxyXG4gICAgICBTdWJDb21wb25lbnRcclxuICAgIH0gPSBuZXdTdGF0ZVxyXG5cclxuICAgIC8vIERldGVybWluZSBIZWFkZXIgR3JvdXBzXHJcbiAgICBsZXQgaGFzSGVhZGVyR3JvdXBzID0gZmFsc2VcclxuICAgIGNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xyXG4gICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcclxuICAgICAgICBoYXNIZWFkZXJHcm91cHMgPSB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgLy8gQnVpbGQgSGVhZGVyIEdyb3Vwc1xyXG4gICAgY29uc3QgaGVhZGVyR3JvdXBzID0gW11cclxuICAgIGxldCBjdXJyZW50U3BhbiA9IFtdXHJcblxyXG4gICAgLy8gQSBjb252ZW5pZW5jZSBmdW5jdGlvbiB0byBhZGQgYSBoZWFkZXIgYW5kIHJlc2V0IHRoZSBjdXJyZW50U3BhblxyXG4gICAgY29uc3QgYWRkSGVhZGVyID0gKGNvbHVtbnMsIGNvbHVtbiA9IGNvbHVtbnNbMF0pID0+IHtcclxuICAgICAgaGVhZGVyR3JvdXBzLnB1c2goe1xyXG4gICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxyXG4gICAgICAgIC4uLmNvbHVtbixcclxuICAgICAgICBjb2x1bW5zOiBjb2x1bW5zXHJcbiAgICAgIH0pXHJcbiAgICAgIGN1cnJlbnRTcGFuID0gW11cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub1N1YkV4cGFuZGVyQ29sdW1ucyA9IGNvbHVtbnMubWFwKGNvbCA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uY29sLFxyXG4gICAgICAgIGNvbHVtbnM6IGNvbC5jb2x1bW5zID8gY29sLmNvbHVtbnMuZmlsdGVyKGQgPT4gIWQuZXhwYW5kZXIpIDogdW5kZWZpbmVkXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgbGV0IGV4cGFuZGVyQ29sdW1uSW5kZXggPSBjb2x1bW5zLmZpbmRJbmRleChjb2wgPT4gY29sLmV4cGFuZGVyKVxyXG4gICAgY29uc3QgbmVlZHNFeHBhbmRlciA9IChTdWJDb21wb25lbnQgfHwgcGl2b3RCeS5sZW5ndGgpICYmIGV4cGFuZGVyQ29sdW1uSW5kZXggPT09IC0xXHJcbiAgICBjb25zdCBjb2x1bW5zV2l0aEV4cGFuZGVyID0gbmVlZHNFeHBhbmRlciA/IFt7ZXhwYW5kZXI6IHRydWV9LCAuLi5ub1N1YkV4cGFuZGVyQ29sdW1uc10gOiBub1N1YkV4cGFuZGVyQ29sdW1uc1xyXG4gICAgaWYgKG5lZWRzRXhwYW5kZXIpIHtcclxuICAgICAgZXhwYW5kZXJDb2x1bW5JbmRleCA9IDBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYWtlRGVjb3JhdGVkQ29sdW1uID0gKGNvbHVtbikgPT4ge1xyXG4gICAgICBjb25zdCBkY29sID0ge1xyXG4gICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxyXG4gICAgICAgIC4uLmNvbHVtblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGNvbC5leHBhbmRlcikge1xyXG4gICAgICAgIGRjb2wud2lkdGggPSBleHBhbmRlckNvbHVtbldpZHRoXHJcbiAgICAgICAgcmV0dXJuIGRjb2xcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiBkY29sLmFjY2Vzc29yID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGRjb2wuaWQgPSBkY29sLmlkIHx8IGRjb2wuYWNjZXNzb3JcclxuICAgICAgICBjb25zdCBhY2Nlc3NvclN0cmluZyA9IGRjb2wuYWNjZXNzb3JcclxuICAgICAgICBkY29sLmFjY2Vzc29yID0gcm93ID0+IF8uZ2V0KHJvdywgYWNjZXNzb3JTdHJpbmcpXHJcbiAgICAgICAgcmV0dXJuIGRjb2xcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRjb2wuYWNjZXNzb3IgJiYgIWRjb2wuaWQpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oZGNvbClcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgY29sdW1uIGlkIGlzIHJlcXVpcmVkIGlmIHVzaW5nIGEgbm9uLXN0cmluZyBhY2Nlc3NvciBmb3IgY29sdW1uIGFib3ZlLicpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghZGNvbC5hY2Nlc3Nvcikge1xyXG4gICAgICAgIGRjb2wuYWNjZXNzb3IgPSBkID0+IHVuZGVmaW5lZFxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBFbnN1cmUgbWluV2lkdGggaXMgbm90IGdyZWF0ZXIgdGhhbiBtYXhXaWR0aCBpZiBzZXRcclxuICAgICAgaWYgKGRjb2wubWF4V2lkdGggPCBkY29sLm1pbldpZHRoKSB7XHJcbiAgICAgICAgZGNvbC5taW5XaWR0aCA9IGRjb2wubWF4V2lkdGhcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGRjb2xcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWNvcmF0ZSB0aGUgY29sdW1uc1xyXG4gICAgY29uc3QgZGVjb3JhdGVBbmRBZGRUb0FsbCA9IChjb2wpID0+IHtcclxuICAgICAgY29uc3QgZGVjb3JhdGVkQ29sdW1uID0gbWFrZURlY29yYXRlZENvbHVtbihjb2wpXHJcbiAgICAgIGFsbERlY29yYXRlZENvbHVtbnMucHVzaChkZWNvcmF0ZWRDb2x1bW4pXHJcbiAgICAgIHJldHVybiBkZWNvcmF0ZWRDb2x1bW5cclxuICAgIH1cclxuICAgIGxldCBhbGxEZWNvcmF0ZWRDb2x1bW5zID0gW11cclxuICAgIGNvbnN0IGRlY29yYXRlZENvbHVtbnMgPSBjb2x1bW5zV2l0aEV4cGFuZGVyLm1hcCgoY29sdW1uLCBpKSA9PiB7XHJcbiAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAuLi5jb2x1bW4sXHJcbiAgICAgICAgICBjb2x1bW5zOiBjb2x1bW4uY29sdW1ucy5tYXAoZGVjb3JhdGVBbmRBZGRUb0FsbClcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGRlY29yYXRlQW5kQWRkVG9BbGwoY29sdW1uKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIEJ1aWxkIHRoZSB2aXNpYmxlIGNvbHVtbnMsIGhlYWRlcnMgYW5kIGZsYXQgY29sdW1uIGxpc3RcclxuICAgIGxldCB2aXNpYmxlQ29sdW1ucyA9IGRlY29yYXRlZENvbHVtbnMuc2xpY2UoKVxyXG4gICAgbGV0IGFsbFZpc2libGVDb2x1bW5zID0gW11cclxuXHJcbiAgICB2aXNpYmxlQ29sdW1ucyA9IHZpc2libGVDb2x1bW5zLm1hcCgoY29sdW1uLCBpKSA9PiB7XHJcbiAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xyXG4gICAgICAgIGNvbnN0IHZpc2libGVTdWJDb2x1bW5zID0gY29sdW1uLmNvbHVtbnMuZmlsdGVyKGQgPT4gcGl2b3RCeS5pbmRleE9mKGQuaWQpID4gLTEgPyBmYWxzZSA6IF8uZ2V0Rmlyc3REZWZpbmVkKGQuc2hvdywgdHJ1ZSkpXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLmNvbHVtbixcclxuICAgICAgICAgIGNvbHVtbnM6IHZpc2libGVTdWJDb2x1bW5zXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb2x1bW5cclxuICAgIH0pXHJcblxyXG4gICAgdmlzaWJsZUNvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5maWx0ZXIoY29sdW1uID0+IHtcclxuICAgICAgcmV0dXJuIGNvbHVtbi5jb2x1bW5zID8gY29sdW1uLmNvbHVtbnMubGVuZ3RoIDogcGl2b3RCeS5pbmRleE9mKGNvbHVtbi5pZCkgPiAtMSA/IGZhbHNlIDogXy5nZXRGaXJzdERlZmluZWQoY29sdW1uLnNob3csIHRydWUpXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIE1vdmUgdGhlIHBpdm90IGNvbHVtbnMgaW50byBhIHNpbmdsZSBjb2x1bW4gaWYgbmVlZGVkXHJcbiAgICBpZiAocGl2b3RCeS5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgcGl2b3RDb2x1bW5zID0gW11cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxEZWNvcmF0ZWRDb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHBpdm90QnkuaW5kZXhPZihhbGxEZWNvcmF0ZWRDb2x1bW5zW2ldLmlkKSA+IC0xKSB7XHJcbiAgICAgICAgICBwaXZvdENvbHVtbnMucHVzaChhbGxEZWNvcmF0ZWRDb2x1bW5zW2ldKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBwaXZvdENvbHVtbiA9IHtcclxuICAgICAgICAuLi5waXZvdENvbHVtbnNbMF0sXHJcbiAgICAgICAgcGl2b3RDb2x1bW5zLFxyXG4gICAgICAgIGV4cGFuZGVyOiB0cnVlXHJcbiAgICAgIH1cclxuICAgICAgdmlzaWJsZUNvbHVtbnNbZXhwYW5kZXJDb2x1bW5JbmRleF0gPSBwaXZvdENvbHVtblxyXG4gICAgfVxyXG5cclxuICAgIC8vIEJ1aWxkIGZsYXN0IGxpc3Qgb2YgYWxsVmlzaWJsZUNvbHVtbnMgYW5kIEhlYWRlckdyb3Vwc1xyXG4gICAgdmlzaWJsZUNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpKSA9PiB7XHJcbiAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xyXG4gICAgICAgIGFsbFZpc2libGVDb2x1bW5zID0gYWxsVmlzaWJsZUNvbHVtbnMuY29uY2F0KGNvbHVtbi5jb2x1bW5zKVxyXG4gICAgICAgIGlmIChjdXJyZW50U3Bhbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBhZGRIZWFkZXIoY3VycmVudFNwYW4pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFkZEhlYWRlcihjb2x1bW4uY29sdW1ucywgY29sdW1uKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGFsbFZpc2libGVDb2x1bW5zLnB1c2goY29sdW1uKVxyXG4gICAgICBjdXJyZW50U3Bhbi5wdXNoKGNvbHVtbilcclxuICAgIH0pXHJcbiAgICBpZiAoaGFzSGVhZGVyR3JvdXBzICYmIGN1cnJlbnRTcGFuLmxlbmd0aCA+IDApIHtcclxuICAgICAgYWRkSGVhZGVyKGN1cnJlbnRTcGFuKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFjY2VzcyB0aGUgZGF0YVxyXG4gICAgbGV0IHJlc29sdmVkRGF0YSA9IGRhdGEubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJvdyA9IHtcclxuICAgICAgICBfX29yaWdpbmFsOiBkLFxyXG4gICAgICAgIF9faW5kZXg6IGlcclxuICAgICAgfVxyXG4gICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcclxuICAgICAgICBpZiAoY29sdW1uLmV4cGFuZGVyKSByZXR1cm5cclxuICAgICAgICByb3dbY29sdW1uLmlkXSA9IGNvbHVtbi5hY2Nlc3NvcihkKVxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm4gcm93XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIElmIHBpdm90aW5nLCByZWN1cnNpdmVseSBncm91cCB0aGUgZGF0YVxyXG4gICAgY29uc3QgYWdncmVnYXRlID0gKHJvd3MpID0+IHtcclxuICAgICAgY29uc3QgYWdncmVnYXRpb25WYWx1ZXMgPSB7fVxyXG4gICAgICBhZ2dyZWdhdGluZ0NvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHJvd3MubWFwKGQgPT4gZFtjb2x1bW4uaWRdKVxyXG4gICAgICAgIGFnZ3JlZ2F0aW9uVmFsdWVzW2NvbHVtbi5pZF0gPSBjb2x1bW4uYWdncmVnYXRlKHZhbHVlcywgcm93cylcclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuIGFnZ3JlZ2F0aW9uVmFsdWVzXHJcbiAgICB9XHJcbiAgICBsZXQgc3RhbmRhcmRDb2x1bW5zID0gcGl2b3RCeS5sZW5ndGggPyBhbGxWaXNpYmxlQ29sdW1ucy5zbGljZSgxKSA6IGFsbFZpc2libGVDb2x1bW5zXHJcbiAgICBjb25zdCBhZ2dyZWdhdGluZ0NvbHVtbnMgPSBzdGFuZGFyZENvbHVtbnMuZmlsdGVyKGQgPT4gZC5hZ2dyZWdhdGUpXHJcbiAgICBsZXQgcGl2b3RDb2x1bW5cclxuICAgIGlmIChwaXZvdEJ5Lmxlbmd0aCkge1xyXG4gICAgICBwaXZvdENvbHVtbiA9IGFsbFZpc2libGVDb2x1bW5zWzBdXHJcbiAgICAgIGNvbnN0IGdyb3VwUmVjdXJzaXZlbHkgPSAocm93cywga2V5cywgaSA9IDApID0+IHtcclxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBsYXN0IGxldmVsLCBqdXN0IHJldHVybiB0aGUgcm93c1xyXG4gICAgICAgIGlmIChpID09PSBrZXlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuIHJvd3NcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gR3JvdXAgdGhlIHJvd3MgdG9nZXRoZXIgZm9yIHRoaXMgbGV2ZWxcclxuICAgICAgICBsZXQgZ3JvdXBlZFJvd3MgPSBPYmplY3QuZW50cmllcyhcclxuICAgICAgICAgIF8uZ3JvdXBCeShyb3dzLCBrZXlzW2ldKSlcclxuICAgICAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFtwaXZvdElES2V5XToga2V5c1tpXSxcclxuICAgICAgICAgICAgW3Bpdm90VmFsS2V5XToga2V5LFxyXG4gICAgICAgICAgICBba2V5c1tpXV06IGtleSxcclxuICAgICAgICAgICAgW3N1YlJvd3NLZXldOiB2YWx1ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gUmVjdXJzZSBpbnRvIHRoZSBzdWJSb3dzXHJcbiAgICAgICAgZ3JvdXBlZFJvd3MgPSBncm91cGVkUm93cy5tYXAocm93R3JvdXAgPT4ge1xyXG4gICAgICAgICAgbGV0IHN1YlJvd3MgPSBncm91cFJlY3Vyc2l2ZWx5KHJvd0dyb3VwW3N1YlJvd3NLZXldLCBrZXlzLCBpICsgMSlcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLnJvd0dyb3VwLFxyXG4gICAgICAgICAgICBbc3ViUm93c0tleV06IHN1YlJvd3MsXHJcbiAgICAgICAgICAgIC4uLmFnZ3JlZ2F0ZShzdWJSb3dzKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGdyb3VwZWRSb3dzXHJcbiAgICAgIH1cclxuICAgICAgcmVzb2x2ZWREYXRhID0gZ3JvdXBSZWN1cnNpdmVseShyZXNvbHZlZERhdGEsIHBpdm90QnkpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4ubmV3U3RhdGUsXHJcbiAgICAgIHJlc29sdmVkRGF0YSxcclxuICAgICAgcGl2b3RDb2x1bW4sXHJcbiAgICAgIGFsbFZpc2libGVDb2x1bW5zLFxyXG4gICAgICBoZWFkZXJHcm91cHMsXHJcbiAgICAgIGFsbERlY29yYXRlZENvbHVtbnMsXHJcbiAgICAgIGhhc0hlYWRlckdyb3Vwc1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0U29ydGVkRGF0YSAocmVzb2x2ZWRTdGF0ZSkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBtYW51YWwsXHJcbiAgICAgIHNvcnRpbmcsXHJcbiAgICAgIGZpbHRlcmluZyxcclxuICAgICAgc2hvd0ZpbHRlcnMsXHJcbiAgICAgIGRlZmF1bHRGaWx0ZXJNZXRob2QsXHJcbiAgICAgIHJlc29sdmVkRGF0YSxcclxuICAgICAgYWxsVmlzaWJsZUNvbHVtbnNcclxuICAgIH0gPSByZXNvbHZlZFN0YXRlXHJcblxyXG4gICAgLy8gUmVzb2x2ZSB0aGUgZGF0YSBmcm9tIGVpdGhlciBtYW51YWwgZGF0YSBvciBzb3J0ZWQgZGF0YVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc29ydGVkRGF0YTogbWFudWFsID8gcmVzb2x2ZWREYXRhIDogdGhpcy5zb3J0RGF0YSh0aGlzLmZpbHRlckRhdGEocmVzb2x2ZWREYXRhLCBzaG93RmlsdGVycywgZmlsdGVyaW5nLCBkZWZhdWx0RmlsdGVyTWV0aG9kLCBhbGxWaXNpYmxlQ29sdW1ucyksIHNvcnRpbmcpXHJcbiAgICB9XHJcbiAgfSxcclxuICBmaXJlT25DaGFuZ2UgKCkge1xyXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLmdldFJlc29sdmVkU3RhdGUoKSwgdGhpcylcclxuICB9LFxyXG4gIGdldFByb3BPclN0YXRlIChrZXkpIHtcclxuICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnByb3BzW2tleV0sIHRoaXMuc3RhdGVba2V5XSlcclxuICB9LFxyXG4gIGdldFN0YXRlT3JQcm9wIChrZXkpIHtcclxuICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnN0YXRlW2tleV0sIHRoaXMucHJvcHNba2V5XSlcclxuICB9LFxyXG4gIGZpbHRlckRhdGEgKGRhdGEsIHNob3dGaWx0ZXJzLCBmaWx0ZXJpbmcsIGRlZmF1bHRGaWx0ZXJNZXRob2QsIGFsbFZpc2libGVDb2x1bW5zKSB7XHJcbiAgICBsZXQgZmlsdGVyZWREYXRhID0gZGF0YVxyXG5cclxuICAgIGlmIChzaG93RmlsdGVycyAmJiBmaWx0ZXJpbmcubGVuZ3RoKSB7XHJcbiAgICAgIGZpbHRlcmVkRGF0YSA9IGZpbHRlcmluZy5yZWR1Y2UoXHJcbiAgICAgICAgKGZpbHRlcmVkU29GYXIsIG5leHRGaWx0ZXIpID0+IHtcclxuICAgICAgICAgIHJldHVybiBmaWx0ZXJlZFNvRmFyLmZpbHRlcihcclxuICAgICAgICAgICAgKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCBjb2x1bW5cclxuXHJcbiAgICAgICAgICAgICAgaWYgKG5leHRGaWx0ZXIucGl2b3RJZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50Q29sdW1uID0gYWxsVmlzaWJsZUNvbHVtbnMuZmluZCh4ID0+IHguaWQgPT09IG5leHRGaWx0ZXIuaWQpXHJcbiAgICAgICAgICAgICAgICBjb2x1bW4gPSBwYXJlbnRDb2x1bW4ucGl2b3RDb2x1bW5zLmZpbmQoeCA9PiB4LmlkID09PSBuZXh0RmlsdGVyLnBpdm90SWQpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbiA9IGFsbFZpc2libGVDb2x1bW5zLmZpbmQoeCA9PiB4LmlkID09PSBuZXh0RmlsdGVyLmlkKVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgY29uc3QgZmlsdGVyTWV0aG9kID0gY29sdW1uLmZpbHRlck1ldGhvZCB8fCBkZWZhdWx0RmlsdGVyTWV0aG9kXHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJNZXRob2QobmV4dEZpbHRlciwgcm93LCBjb2x1bW4pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgICwgZmlsdGVyZWREYXRhXHJcbiAgICAgIClcclxuXHJcbiAgICAgIC8vIEFwcGx5IHRoZSBmaWx0ZXIgdG8gdGhlIHN1YnJvd3MgaWYgd2UgYXJlIHBpdm90aW5nLCBhbmQgdGhlblxyXG4gICAgICAvLyBmaWx0ZXIgYW55IHJvd3Mgd2l0aG91dCBzdWJjb2x1bW5zIGJlY2F1c2UgaXQgd291bGQgYmUgc3RyYW5nZSB0byBzaG93XHJcbiAgICAgIGZpbHRlcmVkRGF0YSA9IGZpbHRlcmVkRGF0YS5tYXAocm93ID0+IHtcclxuICAgICAgICBpZiAoIXJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldKSB7XHJcbiAgICAgICAgICByZXR1cm4gcm93XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAuLi5yb3csXHJcbiAgICAgICAgICBbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XTogdGhpcy5maWx0ZXJEYXRhKHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLCBzaG93RmlsdGVycywgZmlsdGVyaW5nLCBkZWZhdWx0RmlsdGVyTWV0aG9kLCBhbGxWaXNpYmxlQ29sdW1ucylcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmZpbHRlcihyb3cgPT4ge1xyXG4gICAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XS5sZW5ndGggPiAwXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlcmVkRGF0YVxyXG4gIH0sXHJcbiAgc29ydERhdGEgKGRhdGEsIHNvcnRpbmcpIHtcclxuICAgIGlmICghc29ydGluZy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzb3J0ZWQgPSBfLm9yZGVyQnkoZGF0YSwgc29ydGluZy5tYXAoc29ydCA9PiB7XHJcbiAgICAgIHJldHVybiByb3cgPT4ge1xyXG4gICAgICAgIGlmIChyb3dbc29ydC5pZF0gPT09IG51bGwgfHwgcm93W3NvcnQuaWRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHJldHVybiAtSW5maW5pdHlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiByb3dbc29ydC5pZF0gPT09ICdzdHJpbmcnID8gcm93W3NvcnQuaWRdLnRvTG93ZXJDYXNlKCkgOiByb3dbc29ydC5pZF1cclxuICAgICAgfVxyXG4gICAgfSksIHNvcnRpbmcubWFwKGQgPT4gIWQuZGVzYykpXHJcblxyXG4gICAgcmV0dXJuIHNvcnRlZC5tYXAocm93ID0+IHtcclxuICAgICAgaWYgKCFyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSkge1xyXG4gICAgICAgIHJldHVybiByb3dcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnJvdyxcclxuICAgICAgICBbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XTogdGhpcy5zb3J0RGF0YShyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSwgc29ydGluZylcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBnZXRNaW5Sb3dzICgpIHtcclxuICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnByb3BzLm1pblJvd3MsIHRoaXMuZ2V0U3RhdGVPclByb3AoJ3BhZ2VTaXplJykpXHJcbiAgfSxcclxuXHJcbiAgLy8gVXNlciBhY3Rpb25zXHJcbiAgb25QYWdlQ2hhbmdlIChwYWdlKSB7XHJcbiAgICBjb25zdCB7b25QYWdlQ2hhbmdlLCBjb2xsYXBzZU9uUGFnZUNoYW5nZX0gPSB0aGlzLnByb3BzXHJcbiAgICBpZiAob25QYWdlQ2hhbmdlKSB7XHJcbiAgICAgIHJldHVybiBvblBhZ2VDaGFuZ2UocGFnZSlcclxuICAgIH1cclxuICAgIGNvbnN0IG5ld1N0YXRlID0ge3BhZ2V9XHJcbiAgICBpZiAoY29sbGFwc2VPblBhZ2VDaGFuZ2UpIHtcclxuICAgICAgbmV3U3RhdGUuZXhwYW5kZWRSb3dzID0ge31cclxuICAgIH1cclxuICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcclxuICAgICAgbmV3U3RhdGVcclxuICAgICAgLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maXJlT25DaGFuZ2UoKVxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgb25QYWdlU2l6ZUNoYW5nZSAobmV3UGFnZVNpemUpIHtcclxuICAgIGNvbnN0IHtvblBhZ2VTaXplQ2hhbmdlfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IHtwYWdlU2l6ZSwgcGFnZX0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxyXG5cclxuICAgIC8vIE5vcm1hbGl6ZSB0aGUgcGFnZSB0byBkaXNwbGF5XHJcbiAgICBjb25zdCBjdXJyZW50Um93ID0gcGFnZVNpemUgKiBwYWdlXHJcbiAgICBjb25zdCBuZXdQYWdlID0gTWF0aC5mbG9vcihjdXJyZW50Um93IC8gbmV3UGFnZVNpemUpXHJcblxyXG4gICAgaWYgKG9uUGFnZVNpemVDaGFuZ2UpIHtcclxuICAgICAgcmV0dXJuIG9uUGFnZVNpemVDaGFuZ2UobmV3UGFnZVNpemUsIG5ld1BhZ2UpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHtcclxuICAgICAgcGFnZVNpemU6IG5ld1BhZ2VTaXplLFxyXG4gICAgICBwYWdlOiBuZXdQYWdlXHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuZmlyZU9uQ2hhbmdlKClcclxuICAgIH0pXHJcbiAgfSxcclxuICBzb3J0Q29sdW1uIChjb2x1bW4sIGFkZGl0aXZlKSB7XHJcbiAgICBjb25zdCB7c29ydGluZywgc2tpcE5leHRTb3J0fSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXHJcblxyXG4gICAgLy8gd2UgY2FuJ3Qgc3RvcCBldmVudCBwcm9wYWdhdGlvbiBmcm9tIHRoZSBjb2x1bW4gcmVzaXplIG1vdmUgaGFuZGxlcnNcclxuICAgIC8vIGF0dGFjaGVkIHRvIHRoZSBkb2N1bWVudCBiZWNhdXNlIG9mIHJlYWN0J3Mgc3ludGhldGljIGV2ZW50c1xyXG4gICAgLy8gc28gd2UgaGF2ZSB0byBwcmV2ZW50IHRoZSBzb3J0IGZ1bmN0aW9uIGZyb20gYWN0dWFsbHkgc29ydGluZ1xyXG4gICAgLy8gaWYgd2UgY2xpY2sgb24gdGhlIGNvbHVtbiByZXNpemUgZWxlbWVudCB3aXRoaW4gYSBoZWFkZXIuXHJcbiAgICBpZiAoc2tpcE5leHRTb3J0KSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XHJcbiAgICAgICAgc2tpcE5leHRTb3J0OiBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7b25Tb3J0aW5nQ2hhbmdlfSA9IHRoaXMucHJvcHNcclxuICAgIGlmIChvblNvcnRpbmdDaGFuZ2UpIHtcclxuICAgICAgcmV0dXJuIG9uU29ydGluZ0NoYW5nZShjb2x1bW4sIGFkZGl0aXZlKVxyXG4gICAgfVxyXG4gICAgbGV0IG5ld1NvcnRpbmcgPSBfLmNsb25lKHNvcnRpbmcgfHwgW10pLm1hcChkID0+IHtcclxuICAgICAgZC5kZXNjID0gXy5pc1NvcnRpbmdEZXNjKGQpXHJcbiAgICAgIHJldHVybiBkXHJcbiAgICB9KVxyXG4gICAgaWYgKCFfLmlzQXJyYXkoY29sdW1uKSkge1xyXG4gICAgICAvLyBTaW5nbGUtU29ydFxyXG4gICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gbmV3U29ydGluZy5maW5kSW5kZXgoZCA9PiBkLmlkID09PSBjb2x1bW4uaWQpXHJcbiAgICAgIGlmIChleGlzdGluZ0luZGV4ID4gLTEpIHtcclxuICAgICAgICBjb25zdCBleGlzdGluZyA9IG5ld1NvcnRpbmdbZXhpc3RpbmdJbmRleF1cclxuICAgICAgICBpZiAoZXhpc3RpbmcuZGVzYykge1xyXG4gICAgICAgICAgaWYgKGFkZGl0aXZlKSB7XHJcbiAgICAgICAgICAgIG5ld1NvcnRpbmcuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIDEpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBleGlzdGluZy5kZXNjID0gZmFsc2VcclxuICAgICAgICAgICAgbmV3U29ydGluZyA9IFtleGlzdGluZ11cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZXhpc3RpbmcuZGVzYyA9IHRydWVcclxuICAgICAgICAgIGlmICghYWRkaXRpdmUpIHtcclxuICAgICAgICAgICAgbmV3U29ydGluZyA9IFtleGlzdGluZ11cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGFkZGl0aXZlKSB7XHJcbiAgICAgICAgICBuZXdTb3J0aW5nLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogY29sdW1uLmlkLFxyXG4gICAgICAgICAgICBkZXNjOiBmYWxzZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3U29ydGluZyA9IFt7XHJcbiAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXHJcbiAgICAgICAgICAgIGRlc2M6IGZhbHNlXHJcbiAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gTXVsdGktU29ydFxyXG4gICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gbmV3U29ydGluZy5maW5kSW5kZXgoZCA9PiBkLmlkID09PSBjb2x1bW5bMF0uaWQpXHJcbiAgICAgIC8vIEV4aXN0aW5nIFNvcnRlZCBDb2x1bW5cclxuICAgICAgaWYgKGV4aXN0aW5nSW5kZXggPiAtMSkge1xyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gbmV3U29ydGluZ1tleGlzdGluZ0luZGV4XVxyXG4gICAgICAgIGlmIChleGlzdGluZy5kZXNjKSB7XHJcbiAgICAgICAgICBpZiAoYWRkaXRpdmUpIHtcclxuICAgICAgICAgICAgbmV3U29ydGluZy5zcGxpY2UoZXhpc3RpbmdJbmRleCwgY29sdW1uLmxlbmd0aClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbHVtbi5mb3JFYWNoKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgbmV3U29ydGluZ1tleGlzdGluZ0luZGV4ICsgaV0uZGVzYyA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbHVtbi5mb3JFYWNoKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIG5ld1NvcnRpbmdbZXhpc3RpbmdJbmRleCArIGldLmRlc2MgPSB0cnVlXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFkZGl0aXZlKSB7XHJcbiAgICAgICAgICBuZXdTb3J0aW5nID0gbmV3U29ydGluZy5zbGljZShleGlzdGluZ0luZGV4LCBjb2x1bW4ubGVuZ3RoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBOZXcgU29ydCBDb2x1bW5cclxuICAgICAgICBpZiAoYWRkaXRpdmUpIHtcclxuICAgICAgICAgIG5ld1NvcnRpbmcgPSBuZXdTb3J0aW5nLmNvbmNhdChjb2x1bW4ubWFwKGQgPT4gKHtcclxuICAgICAgICAgICAgaWQ6IGQuaWQsXHJcbiAgICAgICAgICAgIGRlc2M6IGZhbHNlXHJcbiAgICAgICAgICB9KSkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld1NvcnRpbmcgPSBjb2x1bW4ubWFwKGQgPT4gKHtcclxuICAgICAgICAgICAgaWQ6IGQuaWQsXHJcbiAgICAgICAgICAgIGRlc2M6IGZhbHNlXHJcbiAgICAgICAgICB9KSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XHJcbiAgICAgIHBhZ2U6ICgoIXNvcnRpbmcubGVuZ3RoICYmIG5ld1NvcnRpbmcubGVuZ3RoKSB8fCAhYWRkaXRpdmUpID8gMCA6IHRoaXMuc3RhdGUucGFnZSxcclxuICAgICAgc29ydGluZzogbmV3U29ydGluZ1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICB0aGlzLmZpcmVPbkNoYW5nZSgpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZmlsdGVyQ29sdW1uIChjb2x1bW4sIHZhbHVlLCBwaXZvdENvbHVtbikge1xyXG4gICAgY29uc3Qge2ZpbHRlcmluZ30gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxyXG4gICAgY29uc3Qge29uRmlsdGVyaW5nQ2hhbmdlfSA9IHRoaXMucHJvcHNcclxuXHJcbiAgICBpZiAob25GaWx0ZXJpbmdDaGFuZ2UpIHtcclxuICAgICAgcmV0dXJuIG9uRmlsdGVyaW5nQ2hhbmdlKGNvbHVtbiwgdmFsdWUsIHBpdm90Q29sdW1uKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSBvbGQgZmlsdGVyIGZpcnN0IGlmIGl0IGV4aXN0c1xyXG4gICAgY29uc3QgbmV3RmlsdGVyaW5nID0gKGZpbHRlcmluZyB8fCBbXSkuZmlsdGVyKHggPT4ge1xyXG4gICAgICBpZiAoeC5pZCAhPT0gY29sdW1uLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgICBpZiAoeC5waXZvdElkKSB7XHJcbiAgICAgICAgaWYgKHBpdm90Q29sdW1uKSB7XHJcbiAgICAgICAgICByZXR1cm4geC5waXZvdElkICE9PSBwaXZvdENvbHVtbi5pZFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGlmICh2YWx1ZSAhPT0gJycpIHtcclxuICAgICAgbmV3RmlsdGVyaW5nLnB1c2goe1xyXG4gICAgICAgIGlkOiBjb2x1bW4uaWQsXHJcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgIHBpdm90SWQ6IHBpdm90Q29sdW1uID8gcGl2b3RDb2x1bW4uaWQgOiB1bmRlZmluZWRcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoe1xyXG4gICAgICBmaWx0ZXJpbmc6IG5ld0ZpbHRlcmluZ1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICB0aGlzLmZpcmVPbkNoYW5nZSgpXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgcmVzaXplQ29sdW1uU3RhcnQgKGNvbHVtbiwgZXZlbnQsIGlzVG91Y2gpIHtcclxuICAgIGNvbnN0IHtvblJlc2l6ZX0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgaWYgKG9uUmVzaXplKSB7XHJcbiAgICAgIHJldHVybiBvblJlc2l6ZShjb2x1bW4sIGV2ZW50LCBpc1RvdWNoKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhcmVudFdpZHRoID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuXHJcbiAgICBsZXQgcGFnZVhcclxuICAgIGlmIChpc1RvdWNoKSB7XHJcbiAgICAgIHBhZ2VYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVhcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoe1xyXG4gICAgICBjdXJyZW50bHlSZXNpemluZzoge1xyXG4gICAgICAgIGlkOiBjb2x1bW4uaWQsXHJcbiAgICAgICAgc3RhcnRYOiBwYWdlWCxcclxuICAgICAgICBwYXJlbnRXaWR0aDogcGFyZW50V2lkdGhcclxuICAgICAgfVxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICBpZiAoaXNUb3VjaCkge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMucmVzaXplQ29sdW1uTW92aW5nKVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgcmVzaXplQ29sdW1uRW5kIChldmVudCkge1xyXG4gICAgbGV0IGlzVG91Y2ggPSBldmVudC50eXBlID09PSAndG91Y2hlbmQnIHx8IGV2ZW50LnR5cGUgPT09ICd0b3VjaGNhbmNlbCdcclxuXHJcbiAgICBpZiAoaXNUb3VjaCkge1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBpdHMgYSB0b3VjaCBldmVudCBjbGVhciB0aGUgbW91c2Ugb25lJ3MgYXMgd2VsbCBiZWNhdXNlIHNvbWV0aW1lc1xyXG4gICAgLy8gdGhlIG1vdXNlRG93biBldmVudCBnZXRzIGNhbGxlZCBhcyB3ZWxsLCBidXQgdGhlIG1vdXNlVXAgZXZlbnQgZG9lc24ndFxyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXHJcblxyXG4gICAgLy8gVGhlIHRvdWNoIGV2ZW50cyBkb24ndCBwcm9wYWdhdGUgdXAgdG8gdGhlIHNvcnRpbmcncyBvbk1vdXNlRG93biBldmVudCBzb1xyXG4gICAgLy8gbm8gbmVlZCB0byBwcmV2ZW50IGl0IGZyb20gaGFwcGVuaW5nIG9yIGVsc2UgdGhlIGZpcnN0IGNsaWNrIGFmdGVyIGEgdG91Y2hcclxuICAgIC8vIGV2ZW50IHJlc2l6ZSB3aWxsIG5vdCBzb3J0IHRoZSBjb2x1bW4uXHJcbiAgICBpZiAoIWlzVG91Y2gpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHtcclxuICAgICAgICBza2lwTmV4dFNvcnQ6IHRydWVcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG4gIHJlc2l6ZUNvbHVtbk1vdmluZyAoZXZlbnQpIHtcclxuICAgIGNvbnN0IHtyZXNpemluZywgY3VycmVudGx5UmVzaXppbmd9ID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKClcclxuXHJcbiAgICAvLyBEZWxldGUgb2xkIHZhbHVlXHJcbiAgICBjb25zdCBuZXdSZXNpemluZyA9IHJlc2l6aW5nLmZpbHRlcih4ID0+IHguaWQgIT09IGN1cnJlbnRseVJlc2l6aW5nLmlkKVxyXG5cclxuICAgIGxldCBwYWdlWFxyXG5cclxuICAgIGlmIChldmVudC50eXBlID09PSAndG91Y2htb3ZlJykge1xyXG4gICAgICBwYWdlWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYXHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZW1vdmUnKSB7XHJcbiAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVhcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgdGhlIG1pbiBzaXplIHRvIDEwIHRvIGFjY291bnQgZm9yIG1hcmdpbiBhbmQgYm9yZGVyIG9yIGVsc2UgdGhlIGdyb3VwIGhlYWRlcnMgZG9uJ3QgbGluZSB1cCBjb3JyZWN0bHlcclxuICAgIGNvbnN0IG5ld1dpZHRoID0gTWF0aC5tYXgoY3VycmVudGx5UmVzaXppbmcucGFyZW50V2lkdGggKyBwYWdlWCAtIGN1cnJlbnRseVJlc2l6aW5nLnN0YXJ0WCwgMTEpXHJcblxyXG4gICAgbmV3UmVzaXppbmcucHVzaCh7XHJcbiAgICAgIGlkOiBjdXJyZW50bHlSZXNpemluZy5pZCxcclxuICAgICAgdmFsdWU6IG5ld1dpZHRoXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XHJcbiAgICAgIHJlc2l6aW5nOiBuZXdSZXNpemluZ1xyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19