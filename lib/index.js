'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactTableDefaults = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
//


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _lifecycle = require('./lifecycle');

var _lifecycle2 = _interopRequireDefault(_lifecycle);

var _methods = require('./methods');

var _methods2 = _interopRequireDefault(_methods);

var _defaultProps = require('./defaultProps');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactTableDefaults = exports.ReactTableDefaults = _defaultProps2.default;

exports.default = (0, _createReactClass2.default)(_extends({}, _lifecycle2.default, _methods2.default, {
  render: function render() {
    var _this = this;

    var resolvedState = this.getResolvedState();
    var children = resolvedState.children,
        className = resolvedState.className,
        style = resolvedState.style,
        getProps = resolvedState.getProps,
        getTableProps = resolvedState.getTableProps,
        getTheadGroupProps = resolvedState.getTheadGroupProps,
        getTheadGroupTrProps = resolvedState.getTheadGroupTrProps,
        getTheadGroupThProps = resolvedState.getTheadGroupThProps,
        getTheadProps = resolvedState.getTheadProps,
        getTheadTrProps = resolvedState.getTheadTrProps,
        getTheadThProps = resolvedState.getTheadThProps,
        getTheadFilterProps = resolvedState.getTheadFilterProps,
        getTheadFilterTrProps = resolvedState.getTheadFilterTrProps,
        getTheadFilterThProps = resolvedState.getTheadFilterThProps,
        getTbodyProps = resolvedState.getTbodyProps,
        getTrGroupProps = resolvedState.getTrGroupProps,
        getTrProps = resolvedState.getTrProps,
        getTdProps = resolvedState.getTdProps,
        getTfootProps = resolvedState.getTfootProps,
        getTfootTrProps = resolvedState.getTfootTrProps,
        getTfootTdProps = resolvedState.getTfootTdProps,
        getPaginationProps = resolvedState.getPaginationProps,
        getLoadingProps = resolvedState.getLoadingProps,
        getNoDataProps = resolvedState.getNoDataProps,
        getResizerProps = resolvedState.getResizerProps,
        showPagination = resolvedState.showPagination,
        expanderColumnWidth = resolvedState.expanderColumnWidth,
        manual = resolvedState.manual,
        loadingText = resolvedState.loadingText,
        noDataText = resolvedState.noDataText,
        showFilters = resolvedState.showFilters,
        resizable = resolvedState.resizable,
        loading = resolvedState.loading,
        pageSize = resolvedState.pageSize,
        page = resolvedState.page,
        sorting = resolvedState.sorting,
        filtering = resolvedState.filtering,
        resizing = resolvedState.resizing,
        pages = resolvedState.pages,
        pivotValKey = resolvedState.pivotValKey,
        subRowsKey = resolvedState.subRowsKey,
        expandedRows = resolvedState.expandedRows,
        onExpandRow = resolvedState.onExpandRow,
        TableComponent = resolvedState.TableComponent,
        TheadComponent = resolvedState.TheadComponent,
        TbodyComponent = resolvedState.TbodyComponent,
        TrGroupComponent = resolvedState.TrGroupComponent,
        TrComponent = resolvedState.TrComponent,
        ThComponent = resolvedState.ThComponent,
        TdComponent = resolvedState.TdComponent,
        TfootComponent = resolvedState.TfootComponent,
        ExpanderComponent = resolvedState.ExpanderComponent,
        PaginationComponent = resolvedState.PaginationComponent,
        LoadingComponent = resolvedState.LoadingComponent,
        SubComponent = resolvedState.SubComponent,
        NoDataComponent = resolvedState.NoDataComponent,
        ResizerComponent = resolvedState.ResizerComponent,
        resolvedData = resolvedState.resolvedData,
        allVisibleColumns = resolvedState.allVisibleColumns,
        headerGroups = resolvedState.headerGroups,
        hasHeaderGroups = resolvedState.hasHeaderGroups,
        sortedData = resolvedState.sortedData;

    // Pagination

    var startRow = pageSize * page;
    var endRow = startRow + pageSize;
    var pageRows = manual ? resolvedData : sortedData.slice(startRow, endRow);
    var minRows = this.getMinRows();
    var padRows = _utils2.default.range(Math.max(minRows - pageRows.length, 0));

    var hasColumnFooter = allVisibleColumns.some(function (d) {
      return d.footer;
    });

    var recurseRowsViewIndex = function recurseRowsViewIndex(rows) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

      return [rows.map(function (row, i) {
        index++;
        var rowWithViewIndex = _extends({}, row, {
          _viewIndex: index
        });
        var newPath = path.concat([i]);
        if (rowWithViewIndex[subRowsKey] && _utils2.default.get(expandedRows, newPath)) {
          var _recurseRowsViewIndex = recurseRowsViewIndex(rowWithViewIndex[subRowsKey], newPath, index);

          var _recurseRowsViewIndex2 = _slicedToArray(_recurseRowsViewIndex, 2);

          rowWithViewIndex[subRowsKey] = _recurseRowsViewIndex2[0];
          index = _recurseRowsViewIndex2[1];
        }
        return rowWithViewIndex;
      }), index];
    };

    var _recurseRowsViewIndex3 = recurseRowsViewIndex(pageRows);

    var _recurseRowsViewIndex4 = _slicedToArray(_recurseRowsViewIndex3, 1);

    pageRows = _recurseRowsViewIndex4[0];


    var canPrevious = page > 0;
    var canNext = page + 1 < pages;

    var rowMinWidth = _utils2.default.sum(allVisibleColumns.map(function (d) {
      var resized = resizing.find(function (x) {
        return x.id === d.id;
      }) || {};
      return _utils2.default.getFirstDefined(resized.value, d.width, d.minWidth);
    }));

    var rowIndex = -1;

    var finalState = _extends({}, resolvedState, {
      startRow: startRow,
      endRow: endRow,
      pageRows: pageRows,
      minRows: minRows,
      padRows: padRows,
      hasColumnFooter: hasColumnFooter,
      canPrevious: canPrevious,
      canNext: canNext,
      rowMinWidth: rowMinWidth
    });

    // Visual Components

    var makeHeaderGroups = function makeHeaderGroups() {
      var theadGroupProps = _utils2.default.splitProps(getTheadGroupProps(finalState, undefined, undefined, _this));
      var theadGroupTrProps = _utils2.default.splitProps(getTheadGroupTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TheadComponent,
        _extends({
          className: (0, _classnames2.default)('-headerGroups', theadGroupProps.className),
          style: _extends({}, theadGroupProps.style, {
            minWidth: rowMinWidth + 'px'
          })
        }, theadGroupProps.rest),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: theadGroupTrProps.className,
            style: theadGroupTrProps.style
          }, theadGroupTrProps.rest),
          headerGroups.map(makeHeaderGroup)
        )
      );
    };

    var makeHeaderGroup = function makeHeaderGroup(column, i) {
      var flex = _utils2.default.sum(column.columns.map(function (d) {
        var resized = resizing.find(function (x) {
          return x.id === d.id;
        }) || {};
        return d.width || resized.value ? 0 : d.minWidth;
      }));
      var width = _utils2.default.sum(column.columns.map(function (d) {
        var resized = resizing.find(function (x) {
          return x.id === d.id;
        }) || {};
        return _utils2.default.getFirstDefined(resized.value, d.width, d.minWidth);
      }));
      var maxWidth = _utils2.default.sum(column.columns.map(function (d) {
        var resized = resizing.find(function (x) {
          return x.id === d.id;
        }) || {};
        return _utils2.default.getFirstDefined(resized.value, d.width, d.maxWidth);
      }));
      var theadGroupThProps = _utils2.default.splitProps(getTheadGroupThProps(finalState, undefined, column, _this));
      var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this));

      var classes = [column.headerClassName, theadGroupThProps.className, columnHeaderProps.className];

      var styles = _extends({}, column.headerStyle, theadGroupThProps.style, columnHeaderProps.style);

      var rest = _extends({}, theadGroupThProps.rest, columnHeaderProps.rest);

      var flexStyles = {
        flex: flex + ' 0 auto',
        width: width + 'px',
        maxWidth: maxWidth + 'px'
      };

      if (column.expander) {
        if (column.pivotColumns) {
          return _react2.default.createElement(ThComponent, _extends({
            key: i,
            className: (0, _classnames2.default)('rt-pivot-header', classes),
            style: _extends({}, styles, flexStyles)
          }, rest));
        }
        return _react2.default.createElement(ThComponent, _extends({
          key: i,
          className: (0, _classnames2.default)('rt-expander-header', classes),
          style: _extends({}, styles, {
            flex: '0 0 auto',
            width: expanderColumnWidth + 'px'
          })
        }, rest));
      }
      return _react2.default.createElement(
        ThComponent,
        _extends({
          key: i,
          className: (0, _classnames2.default)(classes),
          style: _extends({}, styles, flexStyles)
        }, rest),
        _utils2.default.normalizeComponent(column.header, {
          data: sortedData,
          column: column
        })
      );
    };

    var makeHeaders = function makeHeaders() {
      var theadProps = _utils2.default.splitProps(getTheadProps(finalState, undefined, undefined, _this));
      var theadTrProps = _utils2.default.splitProps(getTheadTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TheadComponent,
        _extends({
          className: (0, _classnames2.default)('-header', theadProps.className),
          style: _extends({}, theadProps.style, {
            minWidth: rowMinWidth + 'px'
          })
        }, theadProps.rest),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: theadTrProps.className,
            style: theadTrProps.style
          }, theadTrProps.rest),
          allVisibleColumns.map(makeHeader)
        )
      );
    };

    var makeHeader = function makeHeader(column, i) {
      var resized = resizing.find(function (x) {
        return x.id === column.id;
      }) || {};
      var sort = sorting.find(function (d) {
        return d.id === column.id;
      });
      var show = typeof column.show === 'function' ? column.show() : column.show;
      var width = _utils2.default.getFirstDefined(resized.value, column.width, column.minWidth);
      var maxWidth = _utils2.default.getFirstDefined(resized.value, column.width, column.maxWidth);
      var theadThProps = _utils2.default.splitProps(getTheadThProps(finalState, undefined, column, _this));
      var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this));

      var classes = [column.headerClassName, theadThProps.className, columnHeaderProps.className];

      var styles = _extends({}, column.headerStyle, theadThProps.style, columnHeaderProps.style);

      var rest = _extends({}, theadThProps.rest, columnHeaderProps.rest);

      var resizer = resizable ? _react2.default.createElement(ResizerComponent, _extends({
        onMouseDown: function onMouseDown(e) {
          return _this.resizeColumnStart(column, e, false);
        },
        onTouchStart: function onTouchStart(e) {
          return _this.resizeColumnStart(column, e, true);
        }
      }, resizerProps)) : null;

      if (column.expander) {
        if (column.pivotColumns) {
          var pivotSort = sorting.find(function (d) {
            return d.id === column.id;
          });
          return _react2.default.createElement(
            ThComponent,
            _extends({
              key: i,
              className: (0, _classnames2.default)('rt-pivot-header', 'rt-resizable-header', column.sortable && '-cursor-pointer', classes, pivotSort ? pivotSort.desc ? '-sort-desc' : '-sort-asc' : ''),
              style: _extends({}, styles, {
                flex: width + ' 0 auto',
                width: width + 'px',
                maxWidth: maxWidth + 'px'
              }),
              toggleSort: function toggleSort(e) {
                column.sortable && _this.sortColumn(column.pivotColumns, e.shiftKey);
              }
            }, rest),
            _react2.default.createElement(
              'div',
              { className: 'rt-resizable-header-content' },
              column.pivotColumns.map(function (pivotColumn, i) {
                return _react2.default.createElement(
                  'span',
                  { key: pivotColumn.id },
                  _utils2.default.normalizeComponent(pivotColumn.header, {
                    data: sortedData,
                    column: column
                  }),
                  i < column.pivotColumns.length - 1 && _react2.default.createElement(ExpanderComponent, null)
                );
              })
            ),
            resizer
          );
        }
        return _react2.default.createElement(ThComponent, _extends({
          key: i,
          className: (0, _classnames2.default)('rt-expander-header', classes),
          style: _extends({}, styles, {
            flex: '0 0 auto',
            width: expanderColumnWidth + 'px'
          })
        }, rest));
      }

      return _react2.default.createElement(
        ThComponent,
        _extends({
          key: i,
          className: (0, _classnames2.default)(classes, 'rt-resizable-header', sort ? sort.desc ? '-sort-desc' : '-sort-asc' : '', column.sortable && '-cursor-pointer', !show && '-hidden'),
          style: _extends({}, styles, {
            flex: width + ' 0 auto',
            width: width + 'px',
            maxWidth: maxWidth + 'px'
          }),
          toggleSort: function toggleSort(e) {
            column.sortable && _this.sortColumn(column, e.shiftKey);
          }
        }, rest),
        _react2.default.createElement(
          'div',
          { className: 'rt-resizable-header-content' },
          _utils2.default.normalizeComponent(column.header, {
            data: sortedData,
            column: column
          })
        ),
        resizer
      );
    };

    var makeFilters = function makeFilters() {
      var theadFilterProps = _utils2.default.splitProps(getTheadFilterProps(finalState, undefined, undefined, _this));
      var theadFilterTrProps = _utils2.default.splitProps(getTheadFilterTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TheadComponent,
        _extends({
          className: (0, _classnames2.default)('-filters', theadFilterProps.className),
          style: _extends({}, theadFilterProps.style, {
            minWidth: rowMinWidth + 'px'
          })
        }, theadFilterProps.rest),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: theadFilterTrProps.className,
            style: theadFilterTrProps.style
          }, theadFilterTrProps.rest),
          allVisibleColumns.map(makeFilter)
        )
      );
    };

    var makeFilter = function makeFilter(column, i) {
      var resized = resizing.find(function (x) {
        return x.id === column.id;
      }) || {};
      var width = _utils2.default.getFirstDefined(resized.value, column.width, column.minWidth);
      var maxWidth = _utils2.default.getFirstDefined(resized.value, column.width, column.maxWidth);
      var theadFilterThProps = _utils2.default.splitProps(getTheadFilterThProps(finalState, undefined, column, _this));
      var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this));

      var classes = [column.headerClassName, theadFilterThProps.className, columnHeaderProps.className];

      var styles = _extends({}, column.headerStyle, theadFilterThProps.style, columnHeaderProps.style);

      var rest = _extends({}, theadFilterThProps.rest, columnHeaderProps.rest);

      if (column.expander) {
        if (column.pivotColumns) {
          var pivotCols = [];

          var _loop = function _loop(_i) {
            var col = column.pivotColumns[_i];
            var filter = filtering.find(function (filter) {
              return filter.id === column.id && filter.pivotId === col.id;
            });
            pivotCols.push(_react2.default.createElement(
              'span',
              { key: col.id,
                style: { flex: 1 } },
              !col.hideFilter ? _utils2.default.normalizeComponent(col.filterRender, {
                col: col,
                filter: filter,
                onFilterChange: function onFilterChange(value) {
                  return _this.filterColumn(column, value, col);
                }
              }, _defaultProps2.default.column.filterRender) : null
            ));
            if (_i < column.pivotColumns.length - 1) {
              pivotCols.push(_react2.default.createElement(ExpanderComponent, { key: col.id + '-' + _i }));
            }
          };

          for (var _i = 0; _i < column.pivotColumns.length; _i++) {
            _loop(_i);
          }
          return _react2.default.createElement(
            ThComponent,
            _extends({
              key: i,
              className: (0, _classnames2.default)('rt-pivot-header', column.sortable && '-cursor-pointer', classes),
              style: _extends({}, styles, {
                flex: width + ' 0 auto',
                width: width + 'px',
                maxWidth: maxWidth + 'px',
                display: 'flex'
              })
            }, rest),
            pivotCols
          );
        }
        return _react2.default.createElement(ThComponent, _extends({
          key: i,
          className: (0, _classnames2.default)('rt-expander-header', classes),
          style: _extends({}, styles, {
            flex: '0 0 auto',
            width: expanderColumnWidth + 'px'
          })
        }, rest));
      }

      var filter = filtering.find(function (filter) {
        return filter.id === column.id;
      });

      return _react2.default.createElement(
        ThComponent,
        _extends({
          key: i,
          className: (0, _classnames2.default)(classes),
          style: _extends({}, styles, {
            flex: width + ' 0 auto',
            width: width + 'px',
            maxWidth: maxWidth + 'px'
          })
        }, rest),
        !column.hideFilter ? _utils2.default.normalizeComponent(column.filterRender, {
          column: column,
          filter: filter,
          onFilterChange: function onFilterChange(value) {
            return _this.filterColumn(column, value);
          }
        }, _defaultProps2.default.column.filterRender) : null
      );
    };

    var makePageRow = function makePageRow(row, i) {
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var rowInfo = {
        row: row.__original,
        rowValues: row,
        index: row.__index,
        viewIndex: ++rowIndex,
        level: path.length,
        nestingPath: path.concat([i]),
        aggregated: !!row[subRowsKey],
        subRows: row[subRowsKey]
      };
      var isExpanded = _utils2.default.get(expandedRows, rowInfo.nestingPath);
      var trGroupProps = getTrGroupProps(finalState, rowInfo, undefined, _this);
      var trProps = _utils2.default.splitProps(getTrProps(finalState, rowInfo, undefined, _this));
      return _react2.default.createElement(
        TrGroupComponent,
        _extends({
          key: rowInfo.nestingPath.join('_')
        }, trGroupProps),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: (0, _classnames2.default)(trProps.className, row._viewIndex % 2 ? '-even' : '-odd'),
            style: trProps.style
          }, trProps.rest),
          allVisibleColumns.map(function (column, i2) {
            var resized = resizing.find(function (x) {
              return x.id === column.id;
            }) || {};
            var show = typeof column.show === 'function' ? column.show() : column.show;
            var width = _utils2.default.getFirstDefined(resized.value, column.width, column.minWidth);
            var maxWidth = _utils2.default.getFirstDefined(resized.value, column.width, column.maxWidth);
            var tdProps = _utils2.default.splitProps(getTdProps(finalState, rowInfo, column, _this));
            var columnProps = _utils2.default.splitProps(column.getProps(finalState, rowInfo, column, _this));

            var classes = [tdProps.className, column.className, columnProps.className];

            var styles = _extends({}, tdProps.style, column.style, columnProps.style);

            if (column.expander) {
              var onTdClick = function onTdClick(e) {
                if (onExpandRow) {
                  return onExpandRow(rowInfo.nestingPath, e);
                }
                var newExpandedRows = _utils2.default.clone(expandedRows);
                if (isExpanded) {
                  return _this.setStateWithData({
                    expandedRows: _utils2.default.set(newExpandedRows, rowInfo.nestingPath, false)
                  });
                }
                return _this.setStateWithData({
                  expandedRows: _utils2.default.set(newExpandedRows, rowInfo.nestingPath, {})
                });
              };

              if (column.pivotColumns) {
                // Return the pivot expander cell
                var PivotCell = column.pivotRender;
                return _react2.default.createElement(
                  TdComponent,
                  _extends({
                    key: i2,
                    className: (0, _classnames2.default)('rt-pivot', classes),
                    style: _extends({}, styles, {
                      paddingLeft: rowInfo.nestingPath.length === 1 ? undefined : 30 * (rowInfo.nestingPath.length - 1) + 'px',
                      flex: width + ' 0 auto',
                      width: width + 'px',
                      maxWidth: maxWidth + 'px'
                    })
                  }, tdProps.rest, {
                    onClick: onTdClick
                  }),
                  rowInfo.subRows ? _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(ExpanderComponent, {
                      isExpanded: isExpanded
                    }),
                    column && column.pivotRender ? _react2.default.createElement(PivotCell, _extends({}, rowInfo, {
                      value: rowInfo.rowValues[pivotValKey]
                    })) : _react2.default.createElement(
                      'span',
                      null,
                      row[pivotValKey],
                      ' (',
                      rowInfo.subRows.length,
                      ')'
                    )
                  ) : SubComponent ? _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(ExpanderComponent, {
                      isExpanded: isExpanded
                    })
                  ) : null
                );
              }

              // Return the regular expander cell
              return _react2.default.createElement(
                TdComponent,
                {
                  key: i2,
                  className: (0, _classnames2.default)(classes, { hidden: !show }),
                  style: _extends({}, styles, {
                    flex: '0 0 auto',
                    width: expanderColumnWidth + 'px'
                  }),
                  onClick: onTdClick
                },
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(ExpanderComponent, {
                    isExpanded: isExpanded
                  })
                )
              );
            }

            // Return regular cell
            return _react2.default.createElement(
              TdComponent,
              _extends({
                key: i2,
                className: (0, _classnames2.default)(classes, !show && 'hidden'),
                style: _extends({}, styles, {
                  flex: width + ' 0 auto',
                  width: width + 'px',
                  maxWidth: maxWidth + 'px'
                })
              }, tdProps.rest),
              _utils2.default.normalizeComponent(column.render, _extends({}, rowInfo, {
                value: rowInfo.rowValues[column.id]
              }), rowInfo.rowValues[column.id])
            );
          })
        ),
        rowInfo.subRows && isExpanded && rowInfo.subRows.map(function (d, i) {
          return makePageRow(d, i, rowInfo.nestingPath);
        }),
        SubComponent && !rowInfo.subRows && isExpanded && SubComponent(rowInfo)
      );
    };

    var makePadRow = function makePadRow(row, i) {
      var trGroupProps = getTrGroupProps(finalState, undefined, undefined, _this);
      var trProps = _utils2.default.splitProps(getTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TrGroupComponent,
        _extends({
          key: i
        }, trGroupProps),
        _react2.default.createElement(
          TrComponent,
          {
            className: (0, _classnames2.default)('-padRow', trProps.className),
            style: trProps.style || {}
          },
          allVisibleColumns.map(function (column, i2) {
            var resized = resizing.find(function (x) {
              return x.id === column.id;
            }) || {};
            var show = typeof column.show === 'function' ? column.show() : column.show;
            var width = _utils2.default.getFirstDefined(resized.value, column.width, column.minWidth);
            var maxWidth = _utils2.default.getFirstDefined(resized.value, column.width, column.maxWidth);
            var tdProps = _utils2.default.splitProps(getTdProps(finalState, undefined, column, _this));
            var columnProps = _utils2.default.splitProps(column.getProps(finalState, undefined, column, _this));

            var classes = [tdProps.className, column.className, columnProps.className];

            var styles = _extends({}, tdProps.style, column.style, columnProps.style);

            return _react2.default.createElement(
              TdComponent,
              _extends({
                key: i2,
                className: (0, _classnames2.default)(classes, !show && 'hidden'),
                style: _extends({}, styles, {
                  flex: width + ' 0 auto',
                  width: width + 'px',
                  maxWidth: maxWidth + 'px'
                })
              }, tdProps.rest),
              '\xA0'
            );
          })
        )
      );
    };

    var makeColumnFooters = function makeColumnFooters() {
      var tFootProps = getTfootProps(finalState, undefined, undefined, _this);
      var tFootTrProps = _utils2.default.splitProps(getTfootTrProps(finalState, undefined, undefined, _this));
      return _react2.default.createElement(
        TfootComponent,
        _extends({
          className: tFootProps.className,
          style: _extends({}, tFootProps.style, {
            minWidth: rowMinWidth + 'px'
          })
        }, tFootProps.rest),
        _react2.default.createElement(
          TrComponent,
          _extends({
            className: (0, _classnames2.default)(tFootTrProps.className),
            style: tFootTrProps.style
          }, tFootTrProps.rest),
          allVisibleColumns.map(function (column, i2) {
            var resized = resizing.find(function (x) {
              return x.id === column.id;
            }) || {};
            var show = typeof column.show === 'function' ? column.show() : column.show;
            var width = _utils2.default.getFirstDefined(resized.value, column.width, column.minWidth);
            var maxWidth = _utils2.default.getFirstDefined(resized.value, column.width, column.maxWidth);
            var tFootTdProps = _utils2.default.splitProps(getTfootTdProps(finalState, undefined, undefined, _this));
            var columnProps = _utils2.default.splitProps(column.getProps(finalState, undefined, column, _this));
            var columnFooterProps = _utils2.default.splitProps(column.getFooterProps(finalState, undefined, column, _this));

            var classes = [tFootTdProps.className, column.className, columnProps.className, columnFooterProps.className];

            var styles = _extends({}, tFootTdProps.style, column.style, columnProps.style, columnFooterProps.style);

            if (column.expander) {
              if (column.pivotColumns) {
                return _react2.default.createElement(
                  TdComponent,
                  _extends({
                    key: i2,
                    className: (0, _classnames2.default)('rt-pivot', classes),
                    style: _extends({}, styles, {
                      flex: width + ' 0 auto',
                      width: width + 'px',
                      maxWidth: maxWidth + 'px'
                    })
                  }, columnProps.rest, tFootTdProps.rest, columnFooterProps.rest),
                  _utils2.default.normalizeComponent(column.footer)
                );
              }

              // Return the regular expander cell
              return _react2.default.createElement(TdComponent, {
                key: i2,
                className: (0, _classnames2.default)(classes, { hidden: !show }),
                style: _extends({}, styles, {
                  flex: '0 0 auto',
                  width: expanderColumnWidth + 'px'
                })
              });
            }

            // Return regular cell
            return _react2.default.createElement(
              TdComponent,
              _extends({
                key: i2,
                className: (0, _classnames2.default)(classes, !show && 'hidden'),
                style: _extends({}, styles, {
                  flex: width + ' 0 auto',
                  width: width + 'px',
                  maxWidth: maxWidth + 'px'
                })
              }, columnProps.rest, tFootTdProps.rest, columnFooterProps.rest),
              _utils2.default.normalizeComponent(column.footer, {
                data: sortedData,
                column: column
              })
            );
          })
        )
      );
    };

    var rootProps = _utils2.default.splitProps(getProps(finalState, undefined, undefined, this));
    var tableProps = _utils2.default.splitProps(getTableProps(finalState, undefined, undefined, this));
    var tBodyProps = _utils2.default.splitProps(getTbodyProps(finalState, undefined, undefined, this));
    var paginationProps = _utils2.default.splitProps(getPaginationProps(finalState, undefined, undefined, this));
    var loadingProps = getLoadingProps(finalState, undefined, undefined, this);
    var noDataProps = getNoDataProps(finalState, undefined, undefined, this);
    var resizerProps = getResizerProps(finalState, undefined, undefined, this);

    var makeTable = function makeTable() {
      return _react2.default.createElement(
        'div',
        _extends({
          className: (0, _classnames2.default)('ReactTable', className, rootProps.className),
          style: _extends({}, style, rootProps.style)
        }, rootProps.rest),
        _react2.default.createElement(
          TableComponent,
          _extends({
            className: (0, _classnames2.default)(tableProps.className),
            style: tableProps.style
          }, tableProps.rest),
          hasHeaderGroups ? makeHeaderGroups() : null,
          makeHeaders(),
          showFilters ? makeFilters() : null,
          _react2.default.createElement(
            TbodyComponent,
            _extends({
              className: (0, _classnames2.default)(tBodyProps.className),
              style: _extends({}, tBodyProps.style, {
                minWidth: rowMinWidth + 'px'
              })
            }, tBodyProps.rest),
            pageRows.map(function (d, i) {
              return makePageRow(d, i);
            }),
            padRows.map(makePadRow)
          ),
          hasColumnFooter ? makeColumnFooters() : null
        ),
        showPagination ? _react2.default.createElement(PaginationComponent, _extends({}, resolvedState, {
          pages: pages,
          canPrevious: canPrevious,
          canNext: canNext,
          onPageChange: _this.onPageChange,
          onPageSizeChange: _this.onPageSizeChange,
          className: paginationProps.className,
          style: paginationProps.style
        }, paginationProps.rest)) : null,
        !pageRows.length && _react2.default.createElement(
          NoDataComponent,
          noDataProps,
          _utils2.default.normalizeComponent(noDataText)
        ),
        _react2.default.createElement(LoadingComponent, _extends({
          loading: loading,
          loadingText: loadingText
        }, loadingProps))
      );
    };

    // childProps are optionally passed to a function-as-a-child
    return children ? children(finalState, makeTable, this) : makeTable();
  }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdFRhYmxlRGVmYXVsdHMiLCJyZW5kZXIiLCJyZXNvbHZlZFN0YXRlIiwiZ2V0UmVzb2x2ZWRTdGF0ZSIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJnZXRQcm9wcyIsImdldFRhYmxlUHJvcHMiLCJnZXRUaGVhZEdyb3VwUHJvcHMiLCJnZXRUaGVhZEdyb3VwVHJQcm9wcyIsImdldFRoZWFkR3JvdXBUaFByb3BzIiwiZ2V0VGhlYWRQcm9wcyIsImdldFRoZWFkVHJQcm9wcyIsImdldFRoZWFkVGhQcm9wcyIsImdldFRoZWFkRmlsdGVyUHJvcHMiLCJnZXRUaGVhZEZpbHRlclRyUHJvcHMiLCJnZXRUaGVhZEZpbHRlclRoUHJvcHMiLCJnZXRUYm9keVByb3BzIiwiZ2V0VHJHcm91cFByb3BzIiwiZ2V0VHJQcm9wcyIsImdldFRkUHJvcHMiLCJnZXRUZm9vdFByb3BzIiwiZ2V0VGZvb3RUclByb3BzIiwiZ2V0VGZvb3RUZFByb3BzIiwiZ2V0UGFnaW5hdGlvblByb3BzIiwiZ2V0TG9hZGluZ1Byb3BzIiwiZ2V0Tm9EYXRhUHJvcHMiLCJnZXRSZXNpemVyUHJvcHMiLCJzaG93UGFnaW5hdGlvbiIsImV4cGFuZGVyQ29sdW1uV2lkdGgiLCJtYW51YWwiLCJsb2FkaW5nVGV4dCIsIm5vRGF0YVRleHQiLCJzaG93RmlsdGVycyIsInJlc2l6YWJsZSIsImxvYWRpbmciLCJwYWdlU2l6ZSIsInBhZ2UiLCJzb3J0aW5nIiwiZmlsdGVyaW5nIiwicmVzaXppbmciLCJwYWdlcyIsInBpdm90VmFsS2V5Iiwic3ViUm93c0tleSIsImV4cGFuZGVkUm93cyIsIm9uRXhwYW5kUm93IiwiVGFibGVDb21wb25lbnQiLCJUaGVhZENvbXBvbmVudCIsIlRib2R5Q29tcG9uZW50IiwiVHJHcm91cENvbXBvbmVudCIsIlRyQ29tcG9uZW50IiwiVGhDb21wb25lbnQiLCJUZENvbXBvbmVudCIsIlRmb290Q29tcG9uZW50IiwiRXhwYW5kZXJDb21wb25lbnQiLCJQYWdpbmF0aW9uQ29tcG9uZW50IiwiTG9hZGluZ0NvbXBvbmVudCIsIlN1YkNvbXBvbmVudCIsIk5vRGF0YUNvbXBvbmVudCIsIlJlc2l6ZXJDb21wb25lbnQiLCJyZXNvbHZlZERhdGEiLCJhbGxWaXNpYmxlQ29sdW1ucyIsImhlYWRlckdyb3VwcyIsImhhc0hlYWRlckdyb3VwcyIsInNvcnRlZERhdGEiLCJzdGFydFJvdyIsImVuZFJvdyIsInBhZ2VSb3dzIiwic2xpY2UiLCJtaW5Sb3dzIiwiZ2V0TWluUm93cyIsInBhZFJvd3MiLCJyYW5nZSIsIk1hdGgiLCJtYXgiLCJsZW5ndGgiLCJoYXNDb2x1bW5Gb290ZXIiLCJzb21lIiwiZCIsImZvb3RlciIsInJlY3Vyc2VSb3dzVmlld0luZGV4Iiwicm93cyIsInBhdGgiLCJpbmRleCIsIm1hcCIsInJvdyIsImkiLCJyb3dXaXRoVmlld0luZGV4IiwiX3ZpZXdJbmRleCIsIm5ld1BhdGgiLCJjb25jYXQiLCJnZXQiLCJjYW5QcmV2aW91cyIsImNhbk5leHQiLCJyb3dNaW5XaWR0aCIsInN1bSIsInJlc2l6ZWQiLCJmaW5kIiwieCIsImlkIiwiZ2V0Rmlyc3REZWZpbmVkIiwidmFsdWUiLCJ3aWR0aCIsIm1pbldpZHRoIiwicm93SW5kZXgiLCJmaW5hbFN0YXRlIiwibWFrZUhlYWRlckdyb3VwcyIsInRoZWFkR3JvdXBQcm9wcyIsInNwbGl0UHJvcHMiLCJ1bmRlZmluZWQiLCJ0aGVhZEdyb3VwVHJQcm9wcyIsInJlc3QiLCJtYWtlSGVhZGVyR3JvdXAiLCJjb2x1bW4iLCJmbGV4IiwiY29sdW1ucyIsIm1heFdpZHRoIiwidGhlYWRHcm91cFRoUHJvcHMiLCJjb2x1bW5IZWFkZXJQcm9wcyIsImdldEhlYWRlclByb3BzIiwiY2xhc3NlcyIsImhlYWRlckNsYXNzTmFtZSIsInN0eWxlcyIsImhlYWRlclN0eWxlIiwiZmxleFN0eWxlcyIsImV4cGFuZGVyIiwicGl2b3RDb2x1bW5zIiwibm9ybWFsaXplQ29tcG9uZW50IiwiaGVhZGVyIiwiZGF0YSIsIm1ha2VIZWFkZXJzIiwidGhlYWRQcm9wcyIsInRoZWFkVHJQcm9wcyIsIm1ha2VIZWFkZXIiLCJzb3J0Iiwic2hvdyIsInRoZWFkVGhQcm9wcyIsInJlc2l6ZXIiLCJyZXNpemVDb2x1bW5TdGFydCIsImUiLCJyZXNpemVyUHJvcHMiLCJwaXZvdFNvcnQiLCJzb3J0YWJsZSIsImRlc2MiLCJzb3J0Q29sdW1uIiwic2hpZnRLZXkiLCJwaXZvdENvbHVtbiIsIm1ha2VGaWx0ZXJzIiwidGhlYWRGaWx0ZXJQcm9wcyIsInRoZWFkRmlsdGVyVHJQcm9wcyIsIm1ha2VGaWx0ZXIiLCJ0aGVhZEZpbHRlclRoUHJvcHMiLCJwaXZvdENvbHMiLCJjb2wiLCJmaWx0ZXIiLCJwaXZvdElkIiwicHVzaCIsImhpZGVGaWx0ZXIiLCJmaWx0ZXJSZW5kZXIiLCJvbkZpbHRlckNoYW5nZSIsImZpbHRlckNvbHVtbiIsImRpc3BsYXkiLCJtYWtlUGFnZVJvdyIsInJvd0luZm8iLCJfX29yaWdpbmFsIiwicm93VmFsdWVzIiwiX19pbmRleCIsInZpZXdJbmRleCIsImxldmVsIiwibmVzdGluZ1BhdGgiLCJhZ2dyZWdhdGVkIiwic3ViUm93cyIsImlzRXhwYW5kZWQiLCJ0ckdyb3VwUHJvcHMiLCJ0clByb3BzIiwiam9pbiIsImkyIiwidGRQcm9wcyIsImNvbHVtblByb3BzIiwib25UZENsaWNrIiwibmV3RXhwYW5kZWRSb3dzIiwiY2xvbmUiLCJzZXRTdGF0ZVdpdGhEYXRhIiwic2V0IiwiUGl2b3RDZWxsIiwicGl2b3RSZW5kZXIiLCJwYWRkaW5nTGVmdCIsImhpZGRlbiIsIm1ha2VQYWRSb3ciLCJtYWtlQ29sdW1uRm9vdGVycyIsInRGb290UHJvcHMiLCJ0Rm9vdFRyUHJvcHMiLCJ0Rm9vdFRkUHJvcHMiLCJjb2x1bW5Gb290ZXJQcm9wcyIsImdldEZvb3RlclByb3BzIiwicm9vdFByb3BzIiwidGFibGVQcm9wcyIsInRCb2R5UHJvcHMiLCJwYWdpbmF0aW9uUHJvcHMiLCJsb2FkaW5nUHJvcHMiLCJub0RhdGFQcm9wcyIsIm1ha2VUYWJsZSIsIm9uUGFnZUNoYW5nZSIsIm9uUGFnZVNpemVDaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQTs7O0FBSEE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLElBQU1BLHdFQUFOOztrQkFFUTtBQUliQyxRQUphLG9CQUlIO0FBQUE7O0FBQ1IsUUFBTUMsZ0JBQWdCLEtBQUtDLGdCQUFMLEVBQXRCO0FBRFEsUUFHTkMsUUFITSxHQXNFSkYsYUF0RUksQ0FHTkUsUUFITTtBQUFBLFFBSU5DLFNBSk0sR0FzRUpILGFBdEVJLENBSU5HLFNBSk07QUFBQSxRQUtOQyxLQUxNLEdBc0VKSixhQXRFSSxDQUtOSSxLQUxNO0FBQUEsUUFNTkMsUUFOTSxHQXNFSkwsYUF0RUksQ0FNTkssUUFOTTtBQUFBLFFBT05DLGFBUE0sR0FzRUpOLGFBdEVJLENBT05NLGFBUE07QUFBQSxRQVFOQyxrQkFSTSxHQXNFSlAsYUF0RUksQ0FRTk8sa0JBUk07QUFBQSxRQVNOQyxvQkFUTSxHQXNFSlIsYUF0RUksQ0FTTlEsb0JBVE07QUFBQSxRQVVOQyxvQkFWTSxHQXNFSlQsYUF0RUksQ0FVTlMsb0JBVk07QUFBQSxRQVdOQyxhQVhNLEdBc0VKVixhQXRFSSxDQVdOVSxhQVhNO0FBQUEsUUFZTkMsZUFaTSxHQXNFSlgsYUF0RUksQ0FZTlcsZUFaTTtBQUFBLFFBYU5DLGVBYk0sR0FzRUpaLGFBdEVJLENBYU5ZLGVBYk07QUFBQSxRQWNOQyxtQkFkTSxHQXNFSmIsYUF0RUksQ0FjTmEsbUJBZE07QUFBQSxRQWVOQyxxQkFmTSxHQXNFSmQsYUF0RUksQ0FlTmMscUJBZk07QUFBQSxRQWdCTkMscUJBaEJNLEdBc0VKZixhQXRFSSxDQWdCTmUscUJBaEJNO0FBQUEsUUFpQk5DLGFBakJNLEdBc0VKaEIsYUF0RUksQ0FpQk5nQixhQWpCTTtBQUFBLFFBa0JOQyxlQWxCTSxHQXNFSmpCLGFBdEVJLENB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QUFRRSxpQkFBT2tNLGdCQUFnQmpNO0FBUnpCLFdBU01pTSxnQkFBZ0J2RixJQVR0QixFQURELEdBWUcsSUE3Q047QUE4Q0csU0FBQzVDLFNBQVNRLE1BQVYsSUFDQztBQUFDLHlCQUFEO0FBQ002SCxxQkFETjtBQUdHLDBCQUFFekUsa0JBQUYsQ0FBcUIvRixVQUFyQjtBQUhILFNBL0NKO0FBcURFLHNDQUFDLGdCQUFEO0FBQ0UsbUJBQVNHLE9BRFg7QUFFRSx1QkFBYUo7QUFGZixXQUdNd0ssWUFITjtBQXJERixPQURnQjtBQUFBLEtBQWxCOztBQThEQTtBQUNBLFdBQU9wTSxXQUFXQSxTQUFTc0csVUFBVCxFQUFxQmdHLFNBQXJCLEVBQWdDLElBQWhDLENBQVgsR0FBbURBLFdBQTFEO0FBQ0Q7QUE5NkJZLEciLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBDcmVhdGVDbGFzcyBmcm9tICdjcmVhdGUtcmVhY3QtY2xhc3MnXHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXHJcbi8vXHJcbmltcG9ydCBfIGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCBsaWZlY3ljbGUgZnJvbSAnLi9saWZlY3ljbGUnXHJcbmltcG9ydCBtZXRob2RzIGZyb20gJy4vbWV0aG9kcydcclxuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdFByb3BzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IFJlYWN0VGFibGVEZWZhdWx0cyA9IGRlZmF1bHRzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVDbGFzcyh7XHJcbiAgLi4ubGlmZWN5Y2xlLFxyXG4gIC4uLm1ldGhvZHMsXHJcblxyXG4gIHJlbmRlciAoKSB7XHJcbiAgICBjb25zdCByZXNvbHZlZFN0YXRlID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKClcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2hpbGRyZW4sXHJcbiAgICAgIGNsYXNzTmFtZSxcclxuICAgICAgc3R5bGUsXHJcbiAgICAgIGdldFByb3BzLFxyXG4gICAgICBnZXRUYWJsZVByb3BzLFxyXG4gICAgICBnZXRUaGVhZEdyb3VwUHJvcHMsXHJcbiAgICAgIGdldFRoZWFkR3JvdXBUclByb3BzLFxyXG4gICAgICBnZXRUaGVhZEdyb3VwVGhQcm9wcyxcclxuICAgICAgZ2V0VGhlYWRQcm9wcyxcclxuICAgICAgZ2V0VGhlYWRUclByb3BzLFxyXG4gICAgICBnZXRUaGVhZFRoUHJvcHMsXHJcbiAgICAgIGdldFRoZWFkRmlsdGVyUHJvcHMsXHJcbiAgICAgIGdldFRoZWFkRmlsdGVyVHJQcm9wcyxcclxuICAgICAgZ2V0VGhlYWRGaWx0ZXJUaFByb3BzLFxyXG4gICAgICBnZXRUYm9keVByb3BzLFxyXG4gICAgICBnZXRUckdyb3VwUHJvcHMsXHJcbiAgICAgIGdldFRyUHJvcHMsXHJcbiAgICAgIGdldFRkUHJvcHMsXHJcbiAgICAgIGdldFRmb290UHJvcHMsXHJcbiAgICAgIGdldFRmb290VHJQcm9wcyxcclxuICAgICAgZ2V0VGZvb3RUZFByb3BzLFxyXG4gICAgICBnZXRQYWdpbmF0aW9uUHJvcHMsXHJcbiAgICAgIGdldExvYWRpbmdQcm9wcyxcclxuICAgICAgZ2V0Tm9EYXRhUHJvcHMsXHJcbiAgICAgIGdldFJlc2l6ZXJQcm9wcyxcclxuICAgICAgc2hvd1BhZ2luYXRpb24sXHJcbiAgICAgIGV4cGFuZGVyQ29sdW1uV2lkdGgsXHJcbiAgICAgIG1hbnVhbCxcclxuICAgICAgbG9hZGluZ1RleHQsXHJcbiAgICAgIG5vRGF0YVRleHQsXHJcbiAgICAgIHNob3dGaWx0ZXJzLFxyXG4gICAgICByZXNpemFibGUsXHJcbiAgICAgIC8vIFN0YXRlXHJcbiAgICAgIGxvYWRpbmcsXHJcbiAgICAgIHBhZ2VTaXplLFxyXG4gICAgICBwYWdlLFxyXG4gICAgICBzb3J0aW5nLFxyXG4gICAgICBmaWx0ZXJpbmcsXHJcbiAgICAgIHJlc2l6aW5nLFxyXG4gICAgICBwYWdlcyxcclxuICAgICAgLy8gUGl2b3RpbmcgU3RhdGVcclxuICAgICAgcGl2b3RWYWxLZXksXHJcbiAgICAgIHN1YlJvd3NLZXksXHJcbiAgICAgIGV4cGFuZGVkUm93cyxcclxuICAgICAgb25FeHBhbmRSb3csXHJcbiAgICAgIC8vIENvbXBvbmVudHNcclxuICAgICAgVGFibGVDb21wb25lbnQsXHJcbiAgICAgIFRoZWFkQ29tcG9uZW50LFxyXG4gICAgICBUYm9keUNvbXBvbmVudCxcclxuICAgICAgVHJHcm91cENvbXBvbmVudCxcclxuICAgICAgVHJDb21wb25lbnQsXHJcbiAgICAgIFRoQ29tcG9uZW50LFxyXG4gICAgICBUZENvbXBvbmVudCxcclxuICAgICAgVGZvb3RDb21wb25lbnQsXHJcbiAgICAgIEV4cGFuZGVyQ29tcG9uZW50LFxyXG4gICAgICBQYWdpbmF0aW9uQ29tcG9uZW50LFxyXG4gICAgICBMb2FkaW5nQ29tcG9uZW50LFxyXG4gICAgICBTdWJDb21wb25lbnQsXHJcbiAgICAgIE5vRGF0YUNvbXBvbmVudCxcclxuICAgICAgUmVzaXplckNvbXBvbmVudCxcclxuICAgICAgLy8gRGF0YSBtb2RlbFxyXG4gICAgICByZXNvbHZlZERhdGEsXHJcbiAgICAgIGFsbFZpc2libGVDb2x1bW5zLFxyXG4gICAgICBoZWFkZXJHcm91cHMsXHJcbiAgICAgIGhhc0hlYWRlckdyb3VwcyxcclxuICAgICAgLy8gU29ydGVkIERhdGFcclxuICAgICAgc29ydGVkRGF0YVxyXG4gICAgfSA9IHJlc29sdmVkU3RhdGVcclxuXHJcbiAgICAvLyBQYWdpbmF0aW9uXHJcbiAgICBjb25zdCBzdGFydFJvdyA9IHBhZ2VTaXplICogcGFnZVxyXG4gICAgY29uc3QgZW5kUm93ID0gc3RhcnRSb3cgKyBwYWdlU2l6ZVxyXG4gICAgbGV0IHBhZ2VSb3dzID0gbWFudWFsID8gcmVzb2x2ZWREYXRhIDogc29ydGVkRGF0YS5zbGljZShzdGFydFJvdywgZW5kUm93KVxyXG4gICAgY29uc3QgbWluUm93cyA9IHRoaXMuZ2V0TWluUm93cygpXHJcbiAgICBjb25zdCBwYWRSb3dzID0gXy5yYW5nZShNYXRoLm1heChtaW5Sb3dzIC0gcGFnZVJvd3MubGVuZ3RoLCAwKSlcclxuXHJcbiAgICBjb25zdCBoYXNDb2x1bW5Gb290ZXIgPSBhbGxWaXNpYmxlQ29sdW1ucy5zb21lKGQgPT4gZC5mb290ZXIpXHJcblxyXG4gICAgY29uc3QgcmVjdXJzZVJvd3NWaWV3SW5kZXggPSAocm93cywgcGF0aCA9IFtdLCBpbmRleCA9IC0xKSA9PiB7XHJcbiAgICAgIHJldHVybiBbXHJcbiAgICAgICAgcm93cy5tYXAoKHJvdywgaSkgPT4ge1xyXG4gICAgICAgICAgaW5kZXgrK1xyXG4gICAgICAgICAgY29uc3Qgcm93V2l0aFZpZXdJbmRleCA9IHtcclxuICAgICAgICAgICAgLi4ucm93LFxyXG4gICAgICAgICAgICBfdmlld0luZGV4OiBpbmRleFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgbmV3UGF0aCA9IHBhdGguY29uY2F0KFtpXSlcclxuICAgICAgICAgIGlmIChyb3dXaXRoVmlld0luZGV4W3N1YlJvd3NLZXldICYmIF8uZ2V0KGV4cGFuZGVkUm93cywgbmV3UGF0aCkpIHtcclxuICAgICAgICAgICAgW3Jvd1dpdGhWaWV3SW5kZXhbc3ViUm93c0tleV0sIGluZGV4XSA9IHJlY3Vyc2VSb3dzVmlld0luZGV4KHJvd1dpdGhWaWV3SW5kZXhbc3ViUm93c0tleV0sIG5ld1BhdGgsIGluZGV4KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJvd1dpdGhWaWV3SW5kZXhcclxuICAgICAgICB9KSxcclxuICAgICAgICBpbmRleFxyXG4gICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgW3BhZ2VSb3dzXSA9IHJlY3Vyc2VSb3dzVmlld0luZGV4KHBhZ2VSb3dzKVxyXG5cclxuICAgIGNvbnN0IGNhblByZXZpb3VzID0gcGFnZSA+IDBcclxuICAgIGNvbnN0IGNhbk5leHQgPSBwYWdlICsgMSA8IHBhZ2VzXHJcblxyXG4gICAgY29uc3Qgcm93TWluV2lkdGggPSBfLnN1bShhbGxWaXNpYmxlQ29sdW1ucy5tYXAoZCA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc2l6ZWQgPSByZXNpemluZy5maW5kKHggPT4geC5pZCA9PT0gZC5pZCkgfHwge31cclxuICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWQudmFsdWUsIGQud2lkdGgsIGQubWluV2lkdGgpXHJcbiAgICB9KSlcclxuXHJcbiAgICBsZXQgcm93SW5kZXggPSAtMVxyXG5cclxuICAgIGNvbnN0IGZpbmFsU3RhdGUgPSB7XHJcbiAgICAgIC4uLnJlc29sdmVkU3RhdGUsXHJcbiAgICAgIHN0YXJ0Um93LFxyXG4gICAgICBlbmRSb3csXHJcbiAgICAgIHBhZ2VSb3dzLFxyXG4gICAgICBtaW5Sb3dzLFxyXG4gICAgICBwYWRSb3dzLFxyXG4gICAgICBoYXNDb2x1bW5Gb290ZXIsXHJcbiAgICAgIGNhblByZXZpb3VzLFxyXG4gICAgICBjYW5OZXh0LFxyXG4gICAgICByb3dNaW5XaWR0aFxyXG4gICAgfVxyXG5cclxuICAgIC8vIFZpc3VhbCBDb21wb25lbnRzXHJcblxyXG4gICAgY29uc3QgbWFrZUhlYWRlckdyb3VwcyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgdGhlYWRHcm91cFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRoZWFkR3JvdXBQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXHJcbiAgICAgIGNvbnN0IHRoZWFkR3JvdXBUclByb3BzID0gXy5zcGxpdFByb3BzKGdldFRoZWFkR3JvdXBUclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VGhlYWRDb21wb25lbnRcclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnLWhlYWRlckdyb3VwcycsIHRoZWFkR3JvdXBQcm9wcy5jbGFzc05hbWUpfVxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgLi4udGhlYWRHcm91cFByb3BzLnN0eWxlLFxyXG4gICAgICAgICAgICBtaW5XaWR0aDogYCR7cm93TWluV2lkdGh9cHhgXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgey4uLnRoZWFkR3JvdXBQcm9wcy5yZXN0fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxUckNvbXBvbmVudFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoZWFkR3JvdXBUclByb3BzLmNsYXNzTmFtZX1cclxuICAgICAgICAgICAgc3R5bGU9e3RoZWFkR3JvdXBUclByb3BzLnN0eWxlfVxyXG4gICAgICAgICAgICB7Li4udGhlYWRHcm91cFRyUHJvcHMucmVzdH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge2hlYWRlckdyb3Vwcy5tYXAobWFrZUhlYWRlckdyb3VwKX1cclxuICAgICAgICAgIDwvVHJDb21wb25lbnQ+XHJcbiAgICAgICAgPC9UaGVhZENvbXBvbmVudD5cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1ha2VIZWFkZXJHcm91cCA9IChjb2x1bW4sIGkpID0+IHtcclxuICAgICAgY29uc3QgZmxleCA9IF8uc3VtKGNvbHVtbi5jb2x1bW5zLm1hcChkID0+IHtcclxuICAgICAgICBjb25zdCByZXNpemVkID0gcmVzaXppbmcuZmluZCh4ID0+IHguaWQgPT09IGQuaWQpIHx8IHt9XHJcbiAgICAgICAgcmV0dXJuIGQud2lkdGggfHwgcmVzaXplZC52YWx1ZSA/IDAgOiBkLm1pbldpZHRoXHJcbiAgICAgIH0pKVxyXG4gICAgICBjb25zdCB3aWR0aCA9IF8uc3VtKGNvbHVtbi5jb2x1bW5zLm1hcChkID0+IHtcclxuICAgICAgICBjb25zdCByZXNpemVkID0gcmVzaXppbmcuZmluZCh4ID0+IHguaWQgPT09IGQuaWQpIHx8IHt9XHJcbiAgICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWQudmFsdWUsIGQud2lkdGgsIGQubWluV2lkdGgpXHJcbiAgICAgIH0pKVxyXG4gICAgICBjb25zdCBtYXhXaWR0aCA9IF8uc3VtKGNvbHVtbi5jb2x1bW5zLm1hcChkID0+IHtcclxuICAgICAgICBjb25zdCByZXNpemVkID0gcmVzaXppbmcuZmluZCh4ID0+IHguaWQgPT09IGQuaWQpIHx8IHt9XHJcbiAgICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWQudmFsdWUsIGQud2lkdGgsIGQubWF4V2lkdGgpXHJcbiAgICAgIH0pKVxyXG4gICAgICBjb25zdCB0aGVhZEdyb3VwVGhQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZEdyb3VwVGhQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXHJcbiAgICAgIGNvbnN0IGNvbHVtbkhlYWRlclByb3BzID0gXy5zcGxpdFByb3BzKGNvbHVtbi5nZXRIZWFkZXJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXHJcblxyXG4gICAgICBjb25zdCBjbGFzc2VzID0gW1xyXG4gICAgICAgIGNvbHVtbi5oZWFkZXJDbGFzc05hbWUsXHJcbiAgICAgICAgdGhlYWRHcm91cFRoUHJvcHMuY2xhc3NOYW1lLFxyXG4gICAgICAgIGNvbHVtbkhlYWRlclByb3BzLmNsYXNzTmFtZVxyXG4gICAgICBdXHJcblxyXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgLi4uY29sdW1uLmhlYWRlclN0eWxlLFxyXG4gICAgICAgIC4uLnRoZWFkR3JvdXBUaFByb3BzLnN0eWxlLFxyXG4gICAgICAgIC4uLmNvbHVtbkhlYWRlclByb3BzLnN0eWxlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlc3QgPSB7XHJcbiAgICAgICAgLi4udGhlYWRHcm91cFRoUHJvcHMucmVzdCxcclxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5yZXN0XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZsZXhTdHlsZXMgPSB7XHJcbiAgICAgICAgZmxleDogYCR7ZmxleH0gMCBhdXRvYCxcclxuICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxyXG4gICAgICAgIG1heFdpZHRoOiBgJHttYXhXaWR0aH1weGBcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNvbHVtbi5leHBhbmRlcikge1xyXG4gICAgICAgIGlmIChjb2x1bW4ucGl2b3RDb2x1bW5zKSB7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8VGhDb21wb25lbnRcclxuICAgICAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxyXG4gICAgICAgICAgICAgICAgJ3J0LXBpdm90LWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxyXG4gICAgICAgICAgICAgICAgLi4uZmxleFN0eWxlc1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgey4uLnJlc3R9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8VGhDb21wb25lbnRcclxuICAgICAgICAgICAga2V5PXtpfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXHJcbiAgICAgICAgICAgICAgJ3J0LWV4cGFuZGVyLWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgY2xhc3Nlc1xyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIC4uLnN0eWxlcyxcclxuICAgICAgICAgICAgICBmbGV4OiBgMCAwIGF1dG9gLFxyXG4gICAgICAgICAgICAgIHdpZHRoOiBgJHtleHBhbmRlckNvbHVtbldpZHRofXB4YFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICB7Li4ucmVzdH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRoQ29tcG9uZW50XHJcbiAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXHJcbiAgICAgICAgICAgIGNsYXNzZXNcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAuLi5zdHlsZXMsXHJcbiAgICAgICAgICAgIC4uLmZsZXhTdHlsZXNcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICB7Li4ucmVzdH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7Xy5ub3JtYWxpemVDb21wb25lbnQoY29sdW1uLmhlYWRlciwge1xyXG4gICAgICAgICAgICBkYXRhOiBzb3J0ZWREYXRhLFxyXG4gICAgICAgICAgICBjb2x1bW46IGNvbHVtblxyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9UaENvbXBvbmVudD5cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1ha2VIZWFkZXJzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB0aGVhZFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRoZWFkUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxyXG4gICAgICBjb25zdCB0aGVhZFRyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRUclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VGhlYWRDb21wb25lbnRcclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnLWhlYWRlcicsIHRoZWFkUHJvcHMuY2xhc3NOYW1lKX1cclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIC4uLnRoZWFkUHJvcHMuc3R5bGUsXHJcbiAgICAgICAgICAgIG1pbldpZHRoOiBgJHtyb3dNaW5XaWR0aH1weGBcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICB7Li4udGhlYWRQcm9wcy5yZXN0fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxUckNvbXBvbmVudFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoZWFkVHJQcm9wcy5jbGFzc05hbWV9XHJcbiAgICAgICAgICAgIHN0eWxlPXt0aGVhZFRyUHJvcHMuc3R5bGV9XHJcbiAgICAgICAgICAgIHsuLi50aGVhZFRyUHJvcHMucmVzdH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge2FsbFZpc2libGVDb2x1bW5zLm1hcChtYWtlSGVhZGVyKX1cclxuICAgICAgICAgIDwvVHJDb21wb25lbnQ+XHJcbiAgICAgICAgPC9UaGVhZENvbXBvbmVudD5cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1ha2VIZWFkZXIgPSAoY29sdW1uLCBpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc2l6ZWQgPSByZXNpemluZy5maW5kKHggPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxyXG4gICAgICBjb25zdCBzb3J0ID0gc29ydGluZy5maW5kKGQgPT4gZC5pZCA9PT0gY29sdW1uLmlkKVxyXG4gICAgICBjb25zdCBzaG93ID0gdHlwZW9mIGNvbHVtbi5zaG93ID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnNob3coKSA6IGNvbHVtbi5zaG93XHJcbiAgICAgIGNvbnN0IHdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWluV2lkdGgpXHJcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXHJcbiAgICAgIGNvbnN0IHRoZWFkVGhQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZFRoUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpKVxyXG4gICAgICBjb25zdCBjb2x1bW5IZWFkZXJQcm9wcyA9IF8uc3BsaXRQcm9wcyhjb2x1bW4uZ2V0SGVhZGVyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpKVxyXG5cclxuICAgICAgY29uc3QgY2xhc3NlcyA9IFtcclxuICAgICAgICBjb2x1bW4uaGVhZGVyQ2xhc3NOYW1lLFxyXG4gICAgICAgIHRoZWFkVGhQcm9wcy5jbGFzc05hbWUsXHJcbiAgICAgICAgY29sdW1uSGVhZGVyUHJvcHMuY2xhc3NOYW1lXHJcbiAgICAgIF1cclxuXHJcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgICAuLi5jb2x1bW4uaGVhZGVyU3R5bGUsXHJcbiAgICAgICAgLi4udGhlYWRUaFByb3BzLnN0eWxlLFxyXG4gICAgICAgIC4uLmNvbHVtbkhlYWRlclByb3BzLnN0eWxlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlc3QgPSB7XHJcbiAgICAgICAgLi4udGhlYWRUaFByb3BzLnJlc3QsXHJcbiAgICAgICAgLi4uY29sdW1uSGVhZGVyUHJvcHMucmVzdFxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXNpemVyID0gcmVzaXphYmxlID8gKFxyXG4gICAgICAgIDxSZXNpemVyQ29tcG9uZW50XHJcbiAgICAgICAgICBvbk1vdXNlRG93bj17ZSA9PiB0aGlzLnJlc2l6ZUNvbHVtblN0YXJ0KGNvbHVtbiwgZSwgZmFsc2UpfVxyXG4gICAgICAgICAgb25Ub3VjaFN0YXJ0PXtlID0+IHRoaXMucmVzaXplQ29sdW1uU3RhcnQoY29sdW1uLCBlLCB0cnVlKX1cclxuICAgICAgICAgIHsuLi5yZXNpemVyUHJvcHN9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGxcclxuXHJcbiAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHtcclxuICAgICAgICBpZiAoY29sdW1uLnBpdm90Q29sdW1ucykge1xyXG4gICAgICAgICAgY29uc3QgcGl2b3RTb3J0ID0gc29ydGluZy5maW5kKGQgPT4gZC5pZCA9PT0gY29sdW1uLmlkKVxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFRoQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAga2V5PXtpfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcclxuICAgICAgICAgICAgICAgICdydC1waXZvdC1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgJ3J0LXJlc2l6YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uLnNvcnRhYmxlICYmICctY3Vyc29yLXBvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NlcyxcclxuICAgICAgICAgICAgICAgIHBpdm90U29ydCA/IChwaXZvdFNvcnQuZGVzYyA/ICctc29ydC1kZXNjJyA6ICctc29ydC1hc2MnKSA6ICcnXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxyXG4gICAgICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxyXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgdG9nZ2xlU29ydD17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbi5zb3J0YWJsZSAmJiB0aGlzLnNvcnRDb2x1bW4oY29sdW1uLnBpdm90Q29sdW1ucywgZS5zaGlmdEtleSlcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIHsuLi5yZXN0fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3J0LXJlc2l6YWJsZS1oZWFkZXItY29udGVudCc+XHJcbiAgICAgICAgICAgICAgICB7Y29sdW1uLnBpdm90Q29sdW1ucy5tYXAoKHBpdm90Q29sdW1uLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtwaXZvdENvbHVtbi5pZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7Xy5ub3JtYWxpemVDb21wb25lbnQocGl2b3RDb2x1bW4uaGVhZGVyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHNvcnRlZERhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogY29sdW1uXHJcbiAgICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgICAgIHtpIDwgY29sdW1uLnBpdm90Q29sdW1ucy5sZW5ndGggLSAxICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuZGVyQ29tcG9uZW50IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAge3Jlc2l6ZXJ9XHJcbiAgICAgICAgICAgIDwvVGhDb21wb25lbnQ+XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8VGhDb21wb25lbnRcclxuICAgICAgICAgICAga2V5PXtpfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXHJcbiAgICAgICAgICAgICAgJ3J0LWV4cGFuZGVyLWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgY2xhc3Nlc1xyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIC4uLnN0eWxlcyxcclxuICAgICAgICAgICAgICBmbGV4OiBgMCAwIGF1dG9gLFxyXG4gICAgICAgICAgICAgIHdpZHRoOiBgJHtleHBhbmRlckNvbHVtbldpZHRofXB4YFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICB7Li4ucmVzdH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUaENvbXBvbmVudFxyXG4gICAgICAgICAga2V5PXtpfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxyXG4gICAgICAgICAgICBjbGFzc2VzLFxyXG4gICAgICAgICAgICAncnQtcmVzaXphYmxlLWhlYWRlcicsXHJcbiAgICAgICAgICAgIHNvcnQgPyAoc29ydC5kZXNjID8gJy1zb3J0LWRlc2MnIDogJy1zb3J0LWFzYycpIDogJycsXHJcbiAgICAgICAgICAgIGNvbHVtbi5zb3J0YWJsZSAmJiAnLWN1cnNvci1wb2ludGVyJyxcclxuICAgICAgICAgICAgIXNob3cgJiYgJy1oaWRkZW4nLFxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIC4uLnN0eWxlcyxcclxuICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXHJcbiAgICAgICAgICAgIG1heFdpZHRoOiBgJHttYXhXaWR0aH1weGBcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICB0b2dnbGVTb3J0PXsoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb2x1bW4uc29ydGFibGUgJiYgdGhpcy5zb3J0Q29sdW1uKGNvbHVtbiwgZS5zaGlmdEtleSlcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICB7Li4ucmVzdH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncnQtcmVzaXphYmxlLWhlYWRlci1jb250ZW50Jz5cclxuICAgICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KGNvbHVtbi5oZWFkZXIsIHtcclxuICAgICAgICAgICAgICBkYXRhOiBzb3J0ZWREYXRhLFxyXG4gICAgICAgICAgICAgIGNvbHVtbjogY29sdW1uXHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICB7cmVzaXplcn1cclxuICAgICAgICA8L1RoQ29tcG9uZW50PlxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWFrZUZpbHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRoZWFkRmlsdGVyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRGaWx0ZXJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXHJcbiAgICAgIGNvbnN0IHRoZWFkRmlsdGVyVHJQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZEZpbHRlclRyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUaGVhZENvbXBvbmVudFxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCctZmlsdGVycycsIHRoZWFkRmlsdGVyUHJvcHMuY2xhc3NOYW1lKX1cclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIC4uLnRoZWFkRmlsdGVyUHJvcHMuc3R5bGUsXHJcbiAgICAgICAgICAgIG1pbldpZHRoOiBgJHtyb3dNaW5XaWR0aH1weGBcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICB7Li4udGhlYWRGaWx0ZXJQcm9wcy5yZXN0fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxUckNvbXBvbmVudFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoZWFkRmlsdGVyVHJQcm9wcy5jbGFzc05hbWV9XHJcbiAgICAgICAgICAgIHN0eWxlPXt0aGVhZEZpbHRlclRyUHJvcHMuc3R5bGV9XHJcbiAgICAgICAgICAgIHsuLi50aGVhZEZpbHRlclRyUHJvcHMucmVzdH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge2FsbFZpc2libGVDb2x1bW5zLm1hcChtYWtlRmlsdGVyKX1cclxuICAgICAgICAgIDwvVHJDb21wb25lbnQ+XHJcbiAgICAgICAgPC9UaGVhZENvbXBvbmVudD5cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1ha2VGaWx0ZXIgPSAoY29sdW1uLCBpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc2l6ZWQgPSByZXNpemluZy5maW5kKHggPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxyXG4gICAgICBjb25zdCB3aWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWQudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1pbldpZHRoKVxyXG4gICAgICBjb25zdCBtYXhXaWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWQudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1heFdpZHRoKVxyXG4gICAgICBjb25zdCB0aGVhZEZpbHRlclRoUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRGaWx0ZXJUaFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcclxuICAgICAgY29uc3QgY29sdW1uSGVhZGVyUHJvcHMgPSBfLnNwbGl0UHJvcHMoY29sdW1uLmdldEhlYWRlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcclxuXHJcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXHJcbiAgICAgICAgY29sdW1uLmhlYWRlckNsYXNzTmFtZSxcclxuICAgICAgICB0aGVhZEZpbHRlclRoUHJvcHMuY2xhc3NOYW1lLFxyXG4gICAgICAgIGNvbHVtbkhlYWRlclByb3BzLmNsYXNzTmFtZVxyXG4gICAgICBdXHJcblxyXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgLi4uY29sdW1uLmhlYWRlclN0eWxlLFxyXG4gICAgICAgIC4uLnRoZWFkRmlsdGVyVGhQcm9wcy5zdHlsZSxcclxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5zdHlsZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXN0ID0ge1xyXG4gICAgICAgIC4uLnRoZWFkRmlsdGVyVGhQcm9wcy5yZXN0LFxyXG4gICAgICAgIC4uLmNvbHVtbkhlYWRlclByb3BzLnJlc3RcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNvbHVtbi5leHBhbmRlcikge1xyXG4gICAgICAgIGlmIChjb2x1bW4ucGl2b3RDb2x1bW5zKSB7XHJcbiAgICAgICAgICBjb25zdCBwaXZvdENvbHMgPSBbXVxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW4ucGl2b3RDb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IGNvbHVtbi5waXZvdENvbHVtbnNbaV1cclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZmlsdGVyaW5nLmZpbmQoZmlsdGVyID0+IGZpbHRlci5pZCA9PT0gY29sdW1uLmlkICYmIGZpbHRlci5waXZvdElkID09PSBjb2wuaWQpXHJcbiAgICAgICAgICAgIHBpdm90Q29scy5wdXNoKFxyXG4gICAgICAgICAgICAgIDxzcGFuIGtleT17Y29sLmlkfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tmbGV4OiAxfX0+XHJcbiAgICAgICAgICAgICAgICB7IWNvbC5oaWRlRmlsdGVyID8gKFxyXG4gICAgICAgICAgICAgICAgICBfLm5vcm1hbGl6ZUNvbXBvbmVudChjb2wuZmlsdGVyUmVuZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICAgIG9uRmlsdGVyQ2hhbmdlOiAodmFsdWUpID0+ICh0aGlzLmZpbHRlckNvbHVtbihjb2x1bW4sIHZhbHVlLCBjb2wpKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdHMuY29sdW1uLmZpbHRlclJlbmRlclxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgaWYgKGkgPCBjb2x1bW4ucGl2b3RDb2x1bW5zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICBwaXZvdENvbHMucHVzaCg8RXhwYW5kZXJDb21wb25lbnQga2V5PXtjb2wuaWQgKyAnLScgKyBpfSAvPilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFRoQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAga2V5PXtpfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcclxuICAgICAgICAgICAgICAgICdydC1waXZvdC1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uLnNvcnRhYmxlICYmICctY3Vyc29yLXBvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgY2xhc3Nlc1xyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIC4uLnN0eWxlcyxcclxuICAgICAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoOiBgJHttYXhXaWR0aH1weGAsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCdcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIHsuLi5yZXN0fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3Bpdm90Q29sc31cclxuICAgICAgICAgICAgPC9UaENvbXBvbmVudD5cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxUaENvbXBvbmVudFxyXG4gICAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcclxuICAgICAgICAgICAgICAncnQtZXhwYW5kZXItaGVhZGVyJyxcclxuICAgICAgICAgICAgICBjbGFzc2VzXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgLi4uc3R5bGVzLFxyXG4gICAgICAgICAgICAgIGZsZXg6IGAwIDAgYXV0b2AsXHJcbiAgICAgICAgICAgICAgd2lkdGg6IGAke2V4cGFuZGVyQ29sdW1uV2lkdGh9cHhgXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIHsuLi5yZXN0fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZpbHRlciA9IGZpbHRlcmluZy5maW5kKGZpbHRlciA9PiBmaWx0ZXIuaWQgPT09IGNvbHVtbi5pZClcclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRoQ29tcG9uZW50XHJcbiAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXHJcbiAgICAgICAgICAgIGNsYXNzZXNcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAuLi5zdHlsZXMsXHJcbiAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxyXG4gICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxyXG4gICAgICAgICAgICBtYXhXaWR0aDogYCR7bWF4V2lkdGh9cHhgXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgey4uLnJlc3R9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgeyFjb2x1bW4uaGlkZUZpbHRlciA/IChcclxuICAgICAgICAgICAgXy5ub3JtYWxpemVDb21wb25lbnQoY29sdW1uLmZpbHRlclJlbmRlcixcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW4sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICBvbkZpbHRlckNoYW5nZTogKHZhbHVlKSA9PiAodGhpcy5maWx0ZXJDb2x1bW4oY29sdW1uLCB2YWx1ZSkpXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBkZWZhdWx0cy5jb2x1bW4uZmlsdGVyUmVuZGVyXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIDwvVGhDb21wb25lbnQ+XHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYWtlUGFnZVJvdyA9IChyb3csIGksIHBhdGggPSBbXSkgPT4ge1xyXG4gICAgICBjb25zdCByb3dJbmZvID0ge1xyXG4gICAgICAgIHJvdzogcm93Ll9fb3JpZ2luYWwsXHJcbiAgICAgICAgcm93VmFsdWVzOiByb3csXHJcbiAgICAgICAgaW5kZXg6IHJvdy5fX2luZGV4LFxyXG4gICAgICAgIHZpZXdJbmRleDogKytyb3dJbmRleCxcclxuICAgICAgICBsZXZlbDogcGF0aC5sZW5ndGgsXHJcbiAgICAgICAgbmVzdGluZ1BhdGg6IHBhdGguY29uY2F0KFtpXSksXHJcbiAgICAgICAgYWdncmVnYXRlZDogISFyb3dbc3ViUm93c0tleV0sXHJcbiAgICAgICAgc3ViUm93czogcm93W3N1YlJvd3NLZXldXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgaXNFeHBhbmRlZCA9IF8uZ2V0KGV4cGFuZGVkUm93cywgcm93SW5mby5uZXN0aW5nUGF0aClcclxuICAgICAgY29uc3QgdHJHcm91cFByb3BzID0gZ2V0VHJHcm91cFByb3BzKGZpbmFsU3RhdGUsIHJvd0luZm8sIHVuZGVmaW5lZCwgdGhpcylcclxuICAgICAgY29uc3QgdHJQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUclByb3BzKGZpbmFsU3RhdGUsIHJvd0luZm8sIHVuZGVmaW5lZCwgdGhpcykpXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRyR3JvdXBDb21wb25lbnRcclxuICAgICAgICAgIGtleT17cm93SW5mby5uZXN0aW5nUGF0aC5qb2luKCdfJyl9XHJcbiAgICAgICAgICB7Li4udHJHcm91cFByb3BzfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxUckNvbXBvbmVudFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXHJcbiAgICAgICAgICAgICAgdHJQcm9wcy5jbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgcm93Ll92aWV3SW5kZXggJSAyID8gJy1ldmVuJyA6ICctb2RkJ1xyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBzdHlsZT17dHJQcm9wcy5zdHlsZX1cclxuICAgICAgICAgICAgey4uLnRyUHJvcHMucmVzdH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge2FsbFZpc2libGVDb2x1bW5zLm1hcCgoY29sdW1uLCBpMikgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHJlc2l6ZWQgPSByZXNpemluZy5maW5kKHggPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxyXG4gICAgICAgICAgICAgIGNvbnN0IHNob3cgPSB0eXBlb2YgY29sdW1uLnNob3cgPT09ICdmdW5jdGlvbicgPyBjb2x1bW4uc2hvdygpIDogY29sdW1uLnNob3dcclxuICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWQudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1pbldpZHRoKVxyXG4gICAgICAgICAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXHJcbiAgICAgICAgICAgICAgY29uc3QgdGRQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUZFByb3BzKGZpbmFsU3RhdGUsIHJvd0luZm8sIGNvbHVtbiwgdGhpcykpXHJcbiAgICAgICAgICAgICAgY29uc3QgY29sdW1uUHJvcHMgPSBfLnNwbGl0UHJvcHMoY29sdW1uLmdldFByb3BzKGZpbmFsU3RhdGUsIHJvd0luZm8sIGNvbHVtbiwgdGhpcykpXHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXHJcbiAgICAgICAgICAgICAgICB0ZFByb3BzLmNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbi5jbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Qcm9wcy5jbGFzc05hbWVcclxuICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgICAgICAgICAgIC4uLnRkUHJvcHMuc3R5bGUsXHJcbiAgICAgICAgICAgICAgICAuLi5jb2x1bW4uc3R5bGUsXHJcbiAgICAgICAgICAgICAgICAuLi5jb2x1bW5Qcm9wcy5zdHlsZVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYgKGNvbHVtbi5leHBhbmRlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb25UZENsaWNrID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgaWYgKG9uRXhwYW5kUm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9uRXhwYW5kUm93KHJvd0luZm8ubmVzdGluZ1BhdGgsIGUpXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgbGV0IG5ld0V4cGFuZGVkUm93cyA9IF8uY2xvbmUoZXhwYW5kZWRSb3dzKVxyXG4gICAgICAgICAgICAgICAgICBpZiAoaXNFeHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlV2l0aERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRSb3dzOiBfLnNldChuZXdFeHBhbmRlZFJvd3MsIHJvd0luZm8ubmVzdGluZ1BhdGgsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRSb3dzOiBfLnNldChuZXdFeHBhbmRlZFJvd3MsIHJvd0luZm8ubmVzdGluZ1BhdGgsIHt9KVxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW4ucGl2b3RDb2x1bW5zKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgcGl2b3QgZXhwYW5kZXIgY2VsbFxyXG4gICAgICAgICAgICAgICAgICBjb25zdCBQaXZvdENlbGwgPSBjb2x1bW4ucGl2b3RSZW5kZXJcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8VGRDb21wb25lbnRcclxuICAgICAgICAgICAgICAgICAgICAgIGtleT17aTJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdydC1waXZvdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiByb3dJbmZvLm5lc3RpbmdQYXRoLmxlbmd0aCA9PT0gMSA/IHVuZGVmaW5lZCA6IGAkezMwICogKHJvd0luZm8ubmVzdGluZ1BhdGgubGVuZ3RoIC0gMSl9cHhgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiBgJHt3aWR0aH0gMCBhdXRvYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IGAke21heFdpZHRofXB4YFxyXG4gICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgIHsuLi50ZFByb3BzLnJlc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblRkQ2xpY2t9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAge3Jvd0luZm8uc3ViUm93cyA/IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuZGVyQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0V4cGFuZGVkPXtpc0V4cGFuZGVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbHVtbiAmJiBjb2x1bW4ucGl2b3RSZW5kZXIgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGl2b3RDZWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5yb3dJbmZvfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cm93SW5mby5yb3dWYWx1ZXNbcGl2b3RWYWxLZXldfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApIDogPHNwYW4+e3Jvd1twaXZvdFZhbEtleV19ICh7cm93SW5mby5zdWJSb3dzLmxlbmd0aH0pPC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgKSA6IFN1YkNvbXBvbmVudCA/IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4cGFuZGVyQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0V4cGFuZGVkPXtpc0V4cGFuZGVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvVGRDb21wb25lbnQ+XHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHJlZ3VsYXIgZXhwYW5kZXIgY2VsbFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgPFRkQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtpMn1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLFxyXG4gICAgICAgICAgICAgICAgICAgICAge2hpZGRlbjogIXNob3d9XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZmxleDogYDAgMCBhdXRvYCxcclxuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgJHtleHBhbmRlckNvbHVtbldpZHRofXB4YFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25UZENsaWNrfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8RXhwYW5kZXJDb21wb25lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFeHBhbmRlZD17aXNFeHBhbmRlZH1cclxuICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L1RkQ29tcG9uZW50PlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgLy8gUmV0dXJuIHJlZ3VsYXIgY2VsbFxyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8VGRDb21wb25lbnRcclxuICAgICAgICAgICAgICAgICAga2V5PXtpMn1cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgIXNob3cgJiYgJ2hpZGRlbidcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogYCR7bWF4V2lkdGh9cHhgXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgIHsuLi50ZFByb3BzLnJlc3R9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtfLm5vcm1hbGl6ZUNvbXBvbmVudChjb2x1bW4ucmVuZGVyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4ucm93SW5mbyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93SW5mby5yb3dWYWx1ZXNbY29sdW1uLmlkXVxyXG4gICAgICAgICAgICAgICAgICB9LCByb3dJbmZvLnJvd1ZhbHVlc1tjb2x1bW4uaWRdKX1cclxuICAgICAgICAgICAgICAgIDwvVGRDb21wb25lbnQ+XHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvVHJDb21wb25lbnQ+XHJcbiAgICAgICAgICB7KFxyXG4gICAgICAgICAgICByb3dJbmZvLnN1YlJvd3MgJiZcclxuICAgICAgICAgICAgaXNFeHBhbmRlZCAmJlxyXG4gICAgICAgICAgICByb3dJbmZvLnN1YlJvd3MubWFwKChkLCBpKSA9PiBtYWtlUGFnZVJvdyhkLCBpLCByb3dJbmZvLm5lc3RpbmdQYXRoKSlcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICB7U3ViQ29tcG9uZW50ICYmICFyb3dJbmZvLnN1YlJvd3MgJiYgaXNFeHBhbmRlZCAmJiBTdWJDb21wb25lbnQocm93SW5mbyl9XHJcbiAgICAgICAgPC9Uckdyb3VwQ29tcG9uZW50PlxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWFrZVBhZFJvdyA9IChyb3csIGkpID0+IHtcclxuICAgICAgY29uc3QgdHJHcm91cFByb3BzID0gZ2V0VHJHcm91cFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKVxyXG4gICAgICBjb25zdCB0clByb3BzID0gXy5zcGxpdFByb3BzKGdldFRyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUckdyb3VwQ29tcG9uZW50XHJcbiAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICB7Li4udHJHcm91cFByb3BzfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxUckNvbXBvbmVudFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXHJcbiAgICAgICAgICAgICAgJy1wYWRSb3cnLFxyXG4gICAgICAgICAgICAgIHRyUHJvcHMuY2xhc3NOYW1lLFxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBzdHlsZT17dHJQcm9wcy5zdHlsZSB8fCB7fX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge2FsbFZpc2libGVDb2x1bW5zLm1hcCgoY29sdW1uLCBpMikgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHJlc2l6ZWQgPSByZXNpemluZy5maW5kKHggPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxyXG4gICAgICAgICAgICAgIGNvbnN0IHNob3cgPSB0eXBlb2YgY29sdW1uLnNob3cgPT09ICdmdW5jdGlvbicgPyBjb2x1bW4uc2hvdygpIDogY29sdW1uLnNob3dcclxuICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWQudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1pbldpZHRoKVxyXG4gICAgICAgICAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXHJcbiAgICAgICAgICAgICAgY29uc3QgdGRQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUZFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcclxuICAgICAgICAgICAgICBjb25zdCBjb2x1bW5Qcm9wcyA9IF8uc3BsaXRQcm9wcyhjb2x1bW4uZ2V0UHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpKVxyXG5cclxuICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW1xyXG4gICAgICAgICAgICAgICAgdGRQcm9wcy5jbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uUHJvcHMuY2xhc3NOYW1lXHJcbiAgICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAuLi50ZFByb3BzLnN0eWxlLFxyXG4gICAgICAgICAgICAgICAgLi4uY29sdW1uLnN0eWxlLFxyXG4gICAgICAgICAgICAgICAgLi4uY29sdW1uUHJvcHMuc3R5bGVcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8VGRDb21wb25lbnRcclxuICAgICAgICAgICAgICAgICAga2V5PXtpMn1cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgIXNob3cgJiYgJ2hpZGRlbidcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogYCR7bWF4V2lkdGh9cHhgXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgIHsuLi50ZFByb3BzLnJlc3R9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICZuYnNwO1xyXG4gICAgICAgICAgICAgICAgPC9UZENvbXBvbmVudD5cclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9UckNvbXBvbmVudD5cclxuICAgICAgICA8L1RyR3JvdXBDb21wb25lbnQ+XHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYWtlQ29sdW1uRm9vdGVycyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgdEZvb3RQcm9wcyA9IGdldFRmb290UHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXHJcbiAgICAgIGNvbnN0IHRGb290VHJQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUZm9vdFRyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUZm9vdENvbXBvbmVudFxyXG4gICAgICAgICAgY2xhc3NOYW1lPXt0Rm9vdFByb3BzLmNsYXNzTmFtZX1cclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIC4uLnRGb290UHJvcHMuc3R5bGUsXHJcbiAgICAgICAgICAgIG1pbldpZHRoOiBgJHtyb3dNaW5XaWR0aH1weGBcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICB7Li4udEZvb3RQcm9wcy5yZXN0fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxUckNvbXBvbmVudFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXHJcbiAgICAgICAgICAgICAgdEZvb3RUclByb3BzLmNsYXNzTmFtZVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBzdHlsZT17dEZvb3RUclByb3BzLnN0eWxlfVxyXG4gICAgICAgICAgICB7Li4udEZvb3RUclByb3BzLnJlc3R9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHthbGxWaXNpYmxlQ29sdW1ucy5tYXAoKGNvbHVtbiwgaTIpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCByZXNpemVkID0gcmVzaXppbmcuZmluZCh4ID0+IHguaWQgPT09IGNvbHVtbi5pZCkgfHwge31cclxuICAgICAgICAgICAgICBjb25zdCBzaG93ID0gdHlwZW9mIGNvbHVtbi5zaG93ID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnNob3coKSA6IGNvbHVtbi5zaG93XHJcbiAgICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChyZXNpemVkLnZhbHVlLCBjb2x1bW4ud2lkdGgsIGNvbHVtbi5taW5XaWR0aClcclxuICAgICAgICAgICAgICBjb25zdCBtYXhXaWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWQudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1heFdpZHRoKVxyXG4gICAgICAgICAgICAgIGNvbnN0IHRGb290VGRQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUZm9vdFRkUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxyXG4gICAgICAgICAgICAgIGNvbnN0IGNvbHVtblByb3BzID0gXy5zcGxpdFByb3BzKGNvbHVtbi5nZXRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXHJcbiAgICAgICAgICAgICAgY29uc3QgY29sdW1uRm9vdGVyUHJvcHMgPSBfLnNwbGl0UHJvcHMoY29sdW1uLmdldEZvb3RlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcclxuXHJcbiAgICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFtcclxuICAgICAgICAgICAgICAgIHRGb290VGRQcm9wcy5jbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uUHJvcHMuY2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uRm9vdGVyUHJvcHMuY2xhc3NOYW1lXHJcbiAgICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAuLi50Rm9vdFRkUHJvcHMuc3R5bGUsXHJcbiAgICAgICAgICAgICAgICAuLi5jb2x1bW4uc3R5bGUsXHJcbiAgICAgICAgICAgICAgICAuLi5jb2x1bW5Qcm9wcy5zdHlsZSxcclxuICAgICAgICAgICAgICAgIC4uLmNvbHVtbkZvb3RlclByb3BzLnN0eWxlXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAoY29sdW1uLmV4cGFuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uLnBpdm90Q29sdW1ucykge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxUZENvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtpMn1cclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3J0LXBpdm90JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiBgJHttYXhXaWR0aH1weGBcclxuICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICB7Li4uY29sdW1uUHJvcHMucmVzdH1cclxuICAgICAgICAgICAgICAgICAgICAgIHsuLi50Rm9vdFRkUHJvcHMucmVzdH1cclxuICAgICAgICAgICAgICAgICAgICAgIHsuLi5jb2x1bW5Gb290ZXJQcm9wcy5yZXN0fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIHtfLm5vcm1hbGl6ZUNvbXBvbmVudChjb2x1bW4uZm9vdGVyKX1cclxuICAgICAgICAgICAgICAgICAgICA8L1RkQ29tcG9uZW50PlxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSByZWd1bGFyIGV4cGFuZGVyIGNlbGxcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIDxUZENvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17aTJ9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyxcclxuICAgICAgICAgICAgICAgICAgICAgIHtoaWRkZW46ICFzaG93fVxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcyxcclxuICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IGAwIDAgYXV0b2AsXHJcbiAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7ZXhwYW5kZXJDb2x1bW5XaWR0aH1weGBcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgLy8gUmV0dXJuIHJlZ3VsYXIgY2VsbFxyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8VGRDb21wb25lbnRcclxuICAgICAgICAgICAgICAgICAga2V5PXtpMn1cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgIXNob3cgJiYgJ2hpZGRlbidcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogYCR7bWF4V2lkdGh9cHhgXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgIHsuLi5jb2x1bW5Qcm9wcy5yZXN0fVxyXG4gICAgICAgICAgICAgICAgICB7Li4udEZvb3RUZFByb3BzLnJlc3R9XHJcbiAgICAgICAgICAgICAgICAgIHsuLi5jb2x1bW5Gb290ZXJQcm9wcy5yZXN0fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7Xy5ub3JtYWxpemVDb21wb25lbnQoY29sdW1uLmZvb3Rlciwge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHNvcnRlZERhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBjb2x1bW5cclxuICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICA8L1RkQ29tcG9uZW50PlxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L1RyQ29tcG9uZW50PlxyXG4gICAgICAgIDwvVGZvb3RDb21wb25lbnQ+XHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByb290UHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0UHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxyXG4gICAgY29uc3QgdGFibGVQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUYWJsZVByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcclxuICAgIGNvbnN0IHRCb2R5UHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGJvZHlQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXHJcbiAgICBjb25zdCBwYWdpbmF0aW9uUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0UGFnaW5hdGlvblByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcclxuICAgIGNvbnN0IGxvYWRpbmdQcm9wcyA9IGdldExvYWRpbmdQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcylcclxuICAgIGNvbnN0IG5vRGF0YVByb3BzID0gZ2V0Tm9EYXRhUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXHJcbiAgICBjb25zdCByZXNpemVyUHJvcHMgPSBnZXRSZXNpemVyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXHJcblxyXG4gICAgY29uc3QgbWFrZVRhYmxlID0gKCkgPT4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxyXG4gICAgICAgICAgJ1JlYWN0VGFibGUnLFxyXG4gICAgICAgICAgY2xhc3NOYW1lLFxyXG4gICAgICAgICAgcm9vdFByb3BzLmNsYXNzTmFtZVxyXG4gICAgICAgICl9XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIC4uLnN0eWxlLFxyXG4gICAgICAgICAgLi4ucm9vdFByb3BzLnN0eWxlXHJcbiAgICAgICAgfX1cclxuICAgICAgICB7Li4ucm9vdFByb3BzLnJlc3R9XHJcbiAgICAgID5cclxuICAgICAgICA8VGFibGVDb21wb25lbnRcclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0YWJsZVByb3BzLmNsYXNzTmFtZSl9XHJcbiAgICAgICAgICBzdHlsZT17dGFibGVQcm9wcy5zdHlsZX1cclxuICAgICAgICAgIHsuLi50YWJsZVByb3BzLnJlc3R9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge2hhc0hlYWRlckdyb3VwcyA/IG1ha2VIZWFkZXJHcm91cHMoKSA6IG51bGx9XHJcbiAgICAgICAgICB7bWFrZUhlYWRlcnMoKX1cclxuICAgICAgICAgIHtzaG93RmlsdGVycyA/IG1ha2VGaWx0ZXJzKCkgOiBudWxsfVxyXG4gICAgICAgICAgPFRib2R5Q29tcG9uZW50XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0Qm9keVByb3BzLmNsYXNzTmFtZSl9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgLi4udEJvZHlQcm9wcy5zdHlsZSxcclxuICAgICAgICAgICAgICBtaW5XaWR0aDogYCR7cm93TWluV2lkdGh9cHhgXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIHsuLi50Qm9keVByb3BzLnJlc3R9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtwYWdlUm93cy5tYXAoKGQsIGkpID0+IG1ha2VQYWdlUm93KGQsIGkpKX1cclxuICAgICAgICAgICAge3BhZFJvd3MubWFwKG1ha2VQYWRSb3cpfVxyXG4gICAgICAgICAgPC9UYm9keUNvbXBvbmVudD5cclxuICAgICAgICAgIHtoYXNDb2x1bW5Gb290ZXIgPyBtYWtlQ29sdW1uRm9vdGVycygpIDogbnVsbH1cclxuICAgICAgICA8L1RhYmxlQ29tcG9uZW50PlxyXG4gICAgICAgIHtzaG93UGFnaW5hdGlvbiA/IChcclxuICAgICAgICAgIDxQYWdpbmF0aW9uQ29tcG9uZW50XHJcbiAgICAgICAgICAgIHsuLi5yZXNvbHZlZFN0YXRlfVxyXG4gICAgICAgICAgICBwYWdlcz17cGFnZXN9XHJcbiAgICAgICAgICAgIGNhblByZXZpb3VzPXtjYW5QcmV2aW91c31cclxuICAgICAgICAgICAgY2FuTmV4dD17Y2FuTmV4dH1cclxuICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLm9uUGFnZUNoYW5nZX1cclxuICAgICAgICAgICAgb25QYWdlU2l6ZUNoYW5nZT17dGhpcy5vblBhZ2VTaXplQ2hhbmdlfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e3BhZ2luYXRpb25Qcm9wcy5jbGFzc05hbWV9XHJcbiAgICAgICAgICAgIHN0eWxlPXtwYWdpbmF0aW9uUHJvcHMuc3R5bGV9XHJcbiAgICAgICAgICAgIHsuLi5wYWdpbmF0aW9uUHJvcHMucmVzdH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgeyFwYWdlUm93cy5sZW5ndGggJiYgKFxyXG4gICAgICAgICAgPE5vRGF0YUNvbXBvbmVudFxyXG4gICAgICAgICAgICB7Li4ubm9EYXRhUHJvcHN9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtfLm5vcm1hbGl6ZUNvbXBvbmVudChub0RhdGFUZXh0KX1cclxuICAgICAgICAgIDwvTm9EYXRhQ29tcG9uZW50PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgPExvYWRpbmdDb21wb25lbnRcclxuICAgICAgICAgIGxvYWRpbmc9e2xvYWRpbmd9XHJcbiAgICAgICAgICBsb2FkaW5nVGV4dD17bG9hZGluZ1RleHR9XHJcbiAgICAgICAgICB7Li4ubG9hZGluZ1Byb3BzfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG5cclxuICAgIC8vIGNoaWxkUHJvcHMgYXJlIG9wdGlvbmFsbHkgcGFzc2VkIHRvIGEgZnVuY3Rpb24tYXMtYS1jaGlsZFxyXG4gICAgcmV0dXJuIGNoaWxkcmVuID8gY2hpbGRyZW4oZmluYWxTdGF0ZSwgbWFrZVRhYmxlLCB0aGlzKSA6IG1ha2VUYWJsZSgpXHJcbiAgfVxyXG59KVxyXG4iXX0=