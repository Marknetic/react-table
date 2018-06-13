'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
//


var emptyObj = function emptyObj() {
  return {};
};

exports.default = {
  // General
  data: [],
  loading: false,
  showPagination: true,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  defaultPageSize: 20,
  showPageJump: true,
  expanderColumnWidth: 35,
  collapseOnSortingChange: true,
  collapseOnPageChange: true,
  collapseOnDataChange: true,
  freezeWhenExpanded: false,
  defaultSorting: [],
  showFilters: false,
  defaultFiltering: [],
  defaultFilterMethod: function defaultFilterMethod(filter, row, column) {
    var id = filter.pivotId || filter.id;
    return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
  },
  resizable: true,
  defaultResizing: [],

  // Controlled State Overrides
  // page: undefined,
  // pageSize: undefined,
  // sorting: undefined,

  // Controlled State Callbacks
  onExpandSubComponent: undefined,
  onPageChange: undefined,
  onPageSizeChange: undefined,
  onSortingChange: undefined,
  onFilteringChange: undefined,
  onResize: undefined,

  // Pivoting
  pivotBy: undefined,
  pivotColumnWidth: 200,
  pivotValKey: '_pivotVal',
  pivotIDKey: '_pivotID',
  subRowsKey: '_subRows',

  // Pivoting State Overrides
  // expandedRows: {},

  // Pivoting State Callbacks
  onExpandRow: undefined,

  // General Callbacks
  onChange: function onChange() {
    return null;
  },

  // Classes
  className: '',
  style: {},

  // Component decorators
  getProps: emptyObj,
  getTableProps: emptyObj,
  getTheadGroupProps: emptyObj,
  getTheadGroupTrProps: emptyObj,
  getTheadGroupThProps: emptyObj,
  getTheadProps: emptyObj,
  getTheadTrProps: emptyObj,
  getTheadThProps: emptyObj,
  getTheadFilterProps: emptyObj,
  getTheadFilterTrProps: emptyObj,
  getTheadFilterThProps: emptyObj,
  getTbodyProps: emptyObj,
  getTrGroupProps: emptyObj,
  getTrProps: emptyObj,
  getTdProps: emptyObj,
  getTfootProps: emptyObj,
  getTfootTrProps: emptyObj,
  getTfootTdProps: emptyObj,
  getPaginationProps: emptyObj,
  getLoadingProps: emptyObj,
  getNoDataProps: emptyObj,
  getResizerProps: emptyObj,

  // Global Column Defaults
  column: {
    sortable: true,
    show: true,
    minWidth: 100,
    // Cells only
    render: undefined,
    className: '',
    style: {},
    getProps: emptyObj,
    // Headers only
    header: undefined,
    headerClassName: '',
    headerStyle: {},
    getHeaderProps: emptyObj,
    // Footers only
    footer: undefined,
    footerClassName: '',
    footerStyle: {},
    getFooterProps: emptyObj,
    filterMethod: undefined,
    hideFilter: false,
    filterRender: function filterRender(_ref) {
      var filter = _ref.filter,
          onFilterChange = _ref.onFilterChange;
      return _react2.default.createElement('input', { type: 'text',
        style: {
          width: '100%'
        },
        value: filter ? filter.value : '',
        onChange: function onChange(event) {
          return onFilterChange(event.target.value);
        }
      });
    }
  },

  // Text
  previousText: 'Previous',
  nextText: 'Next',
  loadingText: 'Loading...',
  noDataText: 'No rows found',
  pageText: 'Page',
  ofText: 'of',
  rowsText: 'rows',

  // Components
  TableComponent: _utils2.default.makeTemplateComponent('rt-table'),
  TheadComponent: _utils2.default.makeTemplateComponent('rt-thead'),
  TbodyComponent: _utils2.default.makeTemplateComponent('rt-tbody'),
  TrGroupComponent: _utils2.default.makeTemplateComponent('rt-tr-group'),
  TrComponent: _utils2.default.makeTemplateComponent('rt-tr'),
  ThComponent: function ThComponent(_ref2) {
    var toggleSort = _ref2.toggleSort,
        className = _ref2.className,
        children = _ref2.children,
        rest = _objectWithoutProperties(_ref2, ['toggleSort', 'className', 'children']);

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _classnames2.default)(className, 'rt-th'),
        onClick: function onClick(e) {
          toggleSort && toggleSort(e);
        }
      }, rest),
      children
    );
  },
  TdComponent: _utils2.default.makeTemplateComponent('rt-td'),
  TfootComponent: _utils2.default.makeTemplateComponent('rt-tfoot'),
  ExpanderComponent: function ExpanderComponent(_ref3) {
    var isExpanded = _ref3.isExpanded,
        rest = _objectWithoutProperties(_ref3, ['isExpanded']);

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _classnames2.default)('rt-expander', isExpanded && '-open')
      }, rest),
      '\u2022'
    );
  },
  PaginationComponent: _pagination2.default,
  PreviousComponent: undefined,
  NextComponent: undefined,
  LoadingComponent: function LoadingComponent(_ref4) {
    var className = _ref4.className,
        loading = _ref4.loading,
        loadingText = _ref4.loadingText,
        rest = _objectWithoutProperties(_ref4, ['className', 'loading', 'loadingText']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('-loading', { '-active': loading }, className)
      }, rest),
      _react2.default.createElement(
        'div',
        { className: '-loading-inner' },
        loadingText
      )
    );
  },
  NoDataComponent: _utils2.default.makeTemplateComponent('rt-noData'),
  ResizerComponent: _utils2.default.makeTemplateComponent('rt-resizer')
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0UHJvcHMuanMiXSwibmFtZXMiOlsiZW1wdHlPYmoiLCJkYXRhIiwibG9hZGluZyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlU2l6ZSIsInNob3dQYWdlSnVtcCIsImV4cGFuZGVyQ29sdW1uV2lkdGgiLCJjb2xsYXBzZU9uU29ydGluZ0NoYW5nZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiY29sbGFwc2VPbkRhdGFDaGFuZ2UiLCJmcmVlemVXaGVuRXhwYW5kZWQiLCJkZWZhdWx0U29ydGluZyIsInNob3dGaWx0ZXJzIiwiZGVmYXVsdEZpbHRlcmluZyIsImRlZmF1bHRGaWx0ZXJNZXRob2QiLCJmaWx0ZXIiLCJyb3ciLCJjb2x1bW4iLCJpZCIsInBpdm90SWQiLCJ1bmRlZmluZWQiLCJTdHJpbmciLCJzdGFydHNXaXRoIiwidmFsdWUiLCJyZXNpemFibGUiLCJkZWZhdWx0UmVzaXppbmciLCJvbkV4cGFuZFN1YkNvbXBvbmVudCIsIm9uUGFnZUNoYW5nZSIsIm9uUGFnZVNpemVDaGFuZ2UiLCJvblNvcnRpbmdDaGFuZ2UiLCJvbkZpbHRlcmluZ0NoYW5nZSIsIm9uUmVzaXplIiwicGl2b3RCeSIsInBpdm90Q29sdW1uV2lkdGgiLCJwaXZvdFZhbEtleSIsInBpdm90SURLZXkiLCJzdWJSb3dzS2V5Iiwib25FeHBhbmRSb3ciLCJvbkNoYW5nZSIsImNsYXNzTmFtZSIsInN0eWxlIiwiZ2V0UHJvcHMiLCJnZXRUYWJsZVByb3BzIiwiZ2V0VGhlYWRHcm91cFByb3BzIiwiZ2V0VGhlYWRHcm91cFRyUHJvcHMiLCJnZXRUaGVhZEdyb3VwVGhQcm9wcyIsImdldFRoZWFkUHJvcHMiLCJnZXRUaGVhZFRyUHJvcHMiLCJnZXRUaGVhZFRoUHJvcHMiLCJnZXRUaGVhZEZpbHRlclByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJUclByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJUaFByb3BzIiwiZ2V0VGJvZHlQcm9wcyIsImdldFRyR3JvdXBQcm9wcyIsImdldFRyUHJvcHMiLCJnZXRUZFByb3BzIiwiZ2V0VGZvb3RQcm9wcyIsImdldFRmb290VHJQcm9wcyIsImdldFRmb290VGRQcm9wcyIsImdldFBhZ2luYXRpb25Qcm9wcyIsImdldExvYWRpbmdQcm9wcyIsImdldE5vRGF0YVByb3BzIiwiZ2V0UmVzaXplclByb3BzIiwic29ydGFibGUiLCJzaG93IiwibWluV2lkdGgiLCJyZW5kZXIiLCJoZWFkZXIiLCJoZWFkZXJDbGFzc05hbWUiLCJoZWFkZXJTdHlsZSIsImdldEhlYWRlclByb3BzIiwiZm9vdGVyIiwiZm9vdGVyQ2xhc3NOYW1lIiwiZm9vdGVyU3R5bGUiLCJnZXRGb290ZXJQcm9wcyIsImZpbHRlck1ldGhvZCIsImhpZGVGaWx0ZXIiLCJmaWx0ZXJSZW5kZXIiLCJvbkZpbHRlckNoYW5nZSIsIndpZHRoIiwiZXZlbnQiLCJ0YXJnZXQiLCJwcmV2aW91c1RleHQiLCJuZXh0VGV4dCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInBhZ2VUZXh0Iiwib2ZUZXh0Iiwicm93c1RleHQiLCJUYWJsZUNvbXBvbmVudCIsIm1ha2VUZW1wbGF0ZUNvbXBvbmVudCIsIlRoZWFkQ29tcG9uZW50IiwiVGJvZHlDb21wb25lbnQiLCJUckdyb3VwQ29tcG9uZW50IiwiVHJDb21wb25lbnQiLCJUaENvbXBvbmVudCIsInRvZ2dsZVNvcnQiLCJjaGlsZHJlbiIsInJlc3QiLCJlIiwiVGRDb21wb25lbnQiLCJUZm9vdENvbXBvbmVudCIsIkV4cGFuZGVyQ29tcG9uZW50IiwiaXNFeHBhbmRlZCIsIlBhZ2luYXRpb25Db21wb25lbnQiLCJQcmV2aW91c0NvbXBvbmVudCIsIk5leHRDb21wb25lbnQiLCJMb2FkaW5nQ29tcG9uZW50IiwiTm9EYXRhQ29tcG9uZW50IiwiUmVzaXplckNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7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QVczRCxTQUFYLEVBQXNCLE9BQXRCLENBRGI7QUFFRSxpQkFBUyxvQkFBSztBQUNaeUQsd0JBQWNBLFdBQVdHLENBQVgsQ0FBZDtBQUNEO0FBSkgsU0FLTUQsSUFMTjtBQU9HRDtBQVBILEtBREY7QUFXRCxHQTdJWTtBQThJYkcsZUFBYSxnQkFBRVYscUJBQUYsQ0FBd0IsT0FBeEIsQ0E5SUE7QUErSWJXLGtCQUFnQixnQkFBRVgscUJBQUYsQ0FBd0IsVUFBeEIsQ0EvSUg7QUFnSmJZLHFCQUFtQixrQ0FBMkI7QUFBQSxRQUF6QkMsVUFBeUIsU0FBekJBLFVBQXlCO0FBQUEsUUFBVkwsSUFBVTs7QUFDNUMsV0FDRTtBQUFBO0FBQUE7QUFDRSxtQkFBVywwQkFBVyxhQUFYLEVBQTBCSyxjQUFjLE9BQXhDO0FBRGIsU0FFTUwsSUFGTjtBQUFBO0FBQUEsS0FERjtBQU1ELEdBdkpZO0FBd0piTSwyQ0F4SmE7QUF5SmJDLHFCQUFtQnJGLFNBekpOO0FBMEpic0YsaUJBQWV0RixTQTFKRjtBQTJKYnVGLG9CQUFrQjtBQUFBLFFBQUVwRSxTQUFGLFNBQUVBLFNBQUY7QUFBQSxRQUFhdkMsT0FBYixTQUFhQSxPQUFiO0FBQUEsUUFBc0JvRixXQUF0QixTQUFzQkEsV0FBdEI7QUFBQSxRQUFzQ2MsSUFBdEM7O0FBQUEsV0FDaEI7QUFBQTtBQUFBLGlCQUFLLFdBQVcsMEJBQ2QsVUFEYyxFQUVkLEVBQUMsV0FBV2xHLE9BQVosRUFGYyxFQUdkdUMsU0FIYztBQUFoQixTQUtNMkQsSUFMTjtBQU9FO0FBQUE7QUFBQSxVQUFLLFdBQVUsZ0JBQWY7QUFDR2Q7QUFESDtBQVBGLEtBRGdCO0FBQUEsR0EzSkw7QUF3S2J3QixtQkFBaUIsZ0JBQUVsQixxQkFBRixDQUF3QixXQUF4QixDQXhLSjtBQXlLYm1CLG9CQUFrQixnQkFBRW5CLHFCQUFGLENBQXdCLFlBQXhCO0FBektMLEMiLCJmaWxlIjoiZGVmYXVsdFByb3BzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xyXG4vL1xyXG5pbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xyXG5pbXBvcnQgUGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24nXHJcblxyXG5jb25zdCBlbXB0eU9iaiA9ICgpID0+ICh7fSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvLyBHZW5lcmFsXHJcbiAgZGF0YTogW10sXHJcbiAgbG9hZGluZzogZmFsc2UsXHJcbiAgc2hvd1BhZ2luYXRpb246IHRydWUsXHJcbiAgc2hvd1BhZ2VTaXplT3B0aW9uczogdHJ1ZSxcclxuICBwYWdlU2l6ZU9wdGlvbnM6IFs1LCAxMCwgMjAsIDI1LCA1MCwgMTAwXSxcclxuICBkZWZhdWx0UGFnZVNpemU6IDIwLFxyXG4gIHNob3dQYWdlSnVtcDogdHJ1ZSxcclxuICBleHBhbmRlckNvbHVtbldpZHRoOiAzNSxcclxuICBjb2xsYXBzZU9uU29ydGluZ0NoYW5nZTogdHJ1ZSxcclxuICBjb2xsYXBzZU9uUGFnZUNoYW5nZTogdHJ1ZSxcclxuICBjb2xsYXBzZU9uRGF0YUNoYW5nZTogdHJ1ZSxcclxuICBmcmVlemVXaGVuRXhwYW5kZWQ6IGZhbHNlLFxyXG4gIGRlZmF1bHRTb3J0aW5nOiBbXSxcclxuICBzaG93RmlsdGVyczogZmFsc2UsXHJcbiAgZGVmYXVsdEZpbHRlcmluZzogW10sXHJcbiAgZGVmYXVsdEZpbHRlck1ldGhvZDogKGZpbHRlciwgcm93LCBjb2x1bW4pID0+IHtcclxuICAgIGNvbnN0IGlkID0gZmlsdGVyLnBpdm90SWQgfHwgZmlsdGVyLmlkXHJcbiAgICByZXR1cm4gcm93W2lkXSAhPT0gdW5kZWZpbmVkID8gU3RyaW5nKHJvd1tpZF0pLnN0YXJ0c1dpdGgoZmlsdGVyLnZhbHVlKSA6IHRydWVcclxuICB9LFxyXG4gIHJlc2l6YWJsZTogdHJ1ZSxcclxuICBkZWZhdWx0UmVzaXppbmc6IFtdLFxyXG5cclxuICAvLyBDb250cm9sbGVkIFN0YXRlIE92ZXJyaWRlc1xyXG4gIC8vIHBhZ2U6IHVuZGVmaW5lZCxcclxuICAvLyBwYWdlU2l6ZTogdW5kZWZpbmVkLFxyXG4gIC8vIHNvcnRpbmc6IHVuZGVmaW5lZCxcclxuXHJcbiAgLy8gQ29udHJvbGxlZCBTdGF0ZSBDYWxsYmFja3NcclxuICBvbkV4cGFuZFN1YkNvbXBvbmVudDogdW5kZWZpbmVkLFxyXG4gIG9uUGFnZUNoYW5nZTogdW5kZWZpbmVkLFxyXG4gIG9uUGFnZVNpemVDaGFuZ2U6IHVuZGVmaW5lZCxcclxuICBvblNvcnRpbmdDaGFuZ2U6IHVuZGVmaW5lZCxcclxuICBvbkZpbHRlcmluZ0NoYW5nZTogdW5kZWZpbmVkLFxyXG4gIG9uUmVzaXplOiB1bmRlZmluZWQsXHJcblxyXG4gIC8vIFBpdm90aW5nXHJcbiAgcGl2b3RCeTogdW5kZWZpbmVkLFxyXG4gIHBpdm90Q29sdW1uV2lkdGg6IDIwMCxcclxuICBwaXZvdFZhbEtleTogJ19waXZvdFZhbCcsXHJcbiAgcGl2b3RJREtleTogJ19waXZvdElEJyxcclxuICBzdWJSb3dzS2V5OiAnX3N1YlJvd3MnLFxyXG5cclxuICAvLyBQaXZvdGluZyBTdGF0ZSBPdmVycmlkZXNcclxuICAvLyBleHBhbmRlZFJvd3M6IHt9LFxyXG5cclxuICAvLyBQaXZvdGluZyBTdGF0ZSBDYWxsYmFja3NcclxuICBvbkV4cGFuZFJvdzogdW5kZWZpbmVkLFxyXG5cclxuICAvLyBHZW5lcmFsIENhbGxiYWNrc1xyXG4gIG9uQ2hhbmdlOiAoKSA9PiBudWxsLFxyXG5cclxuICAvLyBDbGFzc2VzXHJcbiAgY2xhc3NOYW1lOiAnJyxcclxuICBzdHlsZToge30sXHJcblxyXG4gIC8vIENvbXBvbmVudCBkZWNvcmF0b3JzXHJcbiAgZ2V0UHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRhYmxlUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRoZWFkR3JvdXBQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGhlYWRHcm91cFRyUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRoZWFkR3JvdXBUaFByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUaGVhZFByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUaGVhZFRyUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRoZWFkVGhQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGhlYWRGaWx0ZXJQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGhlYWRGaWx0ZXJUclByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUaGVhZEZpbHRlclRoUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRib2R5UHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRyR3JvdXBQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VHJQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGRQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGZvb3RQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGZvb3RUclByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUZm9vdFRkUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFBhZ2luYXRpb25Qcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0TG9hZGluZ1Byb3BzOiBlbXB0eU9iaixcclxuICBnZXROb0RhdGFQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0UmVzaXplclByb3BzOiBlbXB0eU9iaixcclxuXHJcbiAgLy8gR2xvYmFsIENvbHVtbiBEZWZhdWx0c1xyXG4gIGNvbHVtbjoge1xyXG4gICAgc29ydGFibGU6IHRydWUsXHJcbiAgICBzaG93OiB0cnVlLFxyXG4gICAgbWluV2lkdGg6IDEwMCxcclxuICAgIC8vIENlbGxzIG9ubHlcclxuICAgIHJlbmRlcjogdW5kZWZpbmVkLFxyXG4gICAgY2xhc3NOYW1lOiAnJyxcclxuICAgIHN0eWxlOiB7fSxcclxuICAgIGdldFByb3BzOiBlbXB0eU9iaixcclxuICAgIC8vIEhlYWRlcnMgb25seVxyXG4gICAgaGVhZGVyOiB1bmRlZmluZWQsXHJcbiAgICBoZWFkZXJDbGFzc05hbWU6ICcnLFxyXG4gICAgaGVhZGVyU3R5bGU6IHt9LFxyXG4gICAgZ2V0SGVhZGVyUHJvcHM6IGVtcHR5T2JqLFxyXG4gICAgLy8gRm9vdGVycyBvbmx5XHJcbiAgICBmb290ZXI6IHVuZGVmaW5lZCxcclxuICAgIGZvb3RlckNsYXNzTmFtZTogJycsXHJcbiAgICBmb290ZXJTdHlsZToge30sXHJcbiAgICBnZXRGb290ZXJQcm9wczogZW1wdHlPYmosXHJcbiAgICBmaWx0ZXJNZXRob2Q6IHVuZGVmaW5lZCxcclxuICAgIGhpZGVGaWx0ZXI6IGZhbHNlLFxyXG4gICAgZmlsdGVyUmVuZGVyOiAoe2ZpbHRlciwgb25GaWx0ZXJDaGFuZ2V9KSA9PiAoXHJcbiAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0J1xyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogJzEwMCUnXHJcbiAgICAgICAgfX1cclxuICAgICAgICB2YWx1ZT17ZmlsdGVyID8gZmlsdGVyLnZhbHVlIDogJyd9XHJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25GaWx0ZXJDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgLz5cclxuICAgIClcclxuICB9LFxyXG5cclxuICAvLyBUZXh0XHJcbiAgcHJldmlvdXNUZXh0OiAnUHJldmlvdXMnLFxyXG4gIG5leHRUZXh0OiAnTmV4dCcsXHJcbiAgbG9hZGluZ1RleHQ6ICdMb2FkaW5nLi4uJyxcclxuICBub0RhdGFUZXh0OiAnTm8gcm93cyBmb3VuZCcsXHJcbiAgcGFnZVRleHQ6ICdQYWdlJyxcclxuICBvZlRleHQ6ICdvZicsXHJcbiAgcm93c1RleHQ6ICdyb3dzJyxcclxuXHJcbiAgLy8gQ29tcG9uZW50c1xyXG4gIFRhYmxlQ29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdGFibGUnKSxcclxuICBUaGVhZENvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXRoZWFkJyksXHJcbiAgVGJvZHlDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10Ym9keScpLFxyXG4gIFRyR3JvdXBDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10ci1ncm91cCcpLFxyXG4gIFRyQ29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdHInKSxcclxuICBUaENvbXBvbmVudDogKHt0b2dnbGVTb3J0LCBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5yZXN0fSkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhjbGFzc05hbWUsICdydC10aCcpfVxyXG4gICAgICAgIG9uQ2xpY2s9e2UgPT4ge1xyXG4gICAgICAgICAgdG9nZ2xlU29ydCAmJiB0b2dnbGVTb3J0KGUpXHJcbiAgICAgICAgfX1cclxuICAgICAgICB7Li4ucmVzdH1cclxuICAgICAgPlxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfSxcclxuICBUZENvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXRkJyksXHJcbiAgVGZvb3RDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10Zm9vdCcpLFxyXG4gIEV4cGFuZGVyQ29tcG9uZW50OiAoe2lzRXhwYW5kZWQsIC4uLnJlc3R9KSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC1leHBhbmRlcicsIGlzRXhwYW5kZWQgJiYgJy1vcGVuJyl9XHJcbiAgICAgICAgey4uLnJlc3R9XHJcbiAgICAgID4mYnVsbDs8L2Rpdj5cclxuICAgIClcclxuICB9LFxyXG4gIFBhZ2luYXRpb25Db21wb25lbnQ6IFBhZ2luYXRpb24sXHJcbiAgUHJldmlvdXNDb21wb25lbnQ6IHVuZGVmaW5lZCxcclxuICBOZXh0Q29tcG9uZW50OiB1bmRlZmluZWQsXHJcbiAgTG9hZGluZ0NvbXBvbmVudDogKHtjbGFzc05hbWUsIGxvYWRpbmcsIGxvYWRpbmdUZXh0LCAuLi5yZXN0fSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXHJcbiAgICAgICctbG9hZGluZycsXHJcbiAgICAgIHsnLWFjdGl2ZSc6IGxvYWRpbmd9LFxyXG4gICAgICBjbGFzc05hbWVcclxuICAgICl9XHJcbiAgICAgIHsuLi5yZXN0fVxyXG4gICAgPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nLWxvYWRpbmctaW5uZXInPlxyXG4gICAgICAgIHtsb2FkaW5nVGV4dH1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApLFxyXG4gIE5vRGF0YUNvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LW5vRGF0YScpLFxyXG4gIFJlc2l6ZXJDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC1yZXNpemVyJylcclxufVxyXG4iXX0=