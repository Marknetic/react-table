'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// import _ from './utils'

var defaultButton = function defaultButton(props) {
  return _react2.default.createElement(
    'button',
    _extends({ type: 'button' }, props, { className: '-btn' }),
    props.children
  );
};

exports.default = (0, _createReactClass2.default)({
  getInitialState: function getInitialState() {
    return {
      page: this.props.page
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ page: nextProps.page });
  },
  getSafePage: function getSafePage(page) {
    if (isNaN(page)) {
      page = this.props.page;
    }
    return Math.min(Math.max(page, 0), this.props.pages - 1);
  },
  changePage: function changePage(page) {
    page = this.getSafePage(page);
    this.setState({ page: page });
    if (this.props.page !== page) {
      this.props.onPageChange(page);
    }
  },
  applyPage: function applyPage(e) {
    e && e.preventDefault();
    var page = this.state.page;
    this.changePage(page === '' ? this.props.page : page);
  },
  render: function render() {
    var _this = this;

    var _props = this.props,
        pages = _props.pages,
        page = _props.page,
        showPageSizeOptions = _props.showPageSizeOptions,
        pageSizeOptions = _props.pageSizeOptions,
        pageSize = _props.pageSize,
        showPageJump = _props.showPageJump,
        canPrevious = _props.canPrevious,
        canNext = _props.canNext,
        onPageSizeChange = _props.onPageSizeChange,
        className = _props.className,
        _props$PreviousCompon = _props.PreviousComponent,
        PreviousComponent = _props$PreviousCompon === undefined ? defaultButton : _props$PreviousCompon,
        _props$NextComponent = _props.NextComponent,
        NextComponent = _props$NextComponent === undefined ? defaultButton : _props$NextComponent;


    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(className, '-pagination'),
        style: this.props.paginationStyle
      },
      _react2.default.createElement(
        'div',
        { className: '-previous' },
        _react2.default.createElement(
          PreviousComponent,
          {
            onClick: function onClick(e) {
              if (!canPrevious) return;
              _this.changePage(page - 1);
            },
            disabled: !canPrevious
          },
          this.props.previousText
        )
      ),
      _react2.default.createElement(
        'div',
        { className: '-center' },
        _react2.default.createElement(
          'span',
          { className: '-pageInfo' },
          this.props.pageText,
          ' ',
          showPageJump ? _react2.default.createElement(
            'div',
            { className: '-pageJump' },
            _react2.default.createElement('input', {
              type: this.state.page === '' ? 'text' : 'number',
              onChange: function onChange(e) {
                var val = e.target.value;
                var page = val - 1;
                if (val === '') {
                  return _this.setState({ page: val });
                }
                _this.setState({ page: _this.getSafePage(page) });
              },
              value: this.state.page === '' ? '' : this.state.page + 1,
              onBlur: this.applyPage,
              onKeyPress: function onKeyPress(e) {
                if (e.which === 13 || e.keyCode === 13) {
                  _this.applyPage();
                }
              }
            })
          ) : _react2.default.createElement(
            'span',
            { className: '-currentPage' },
            page + 1
          ),
          ' ',
          this.props.ofText,
          ' ',
          _react2.default.createElement(
            'span',
            { className: '-totalPages' },
            pages
          )
        ),
        showPageSizeOptions && _react2.default.createElement(
          'span',
          { className: 'select-wrap -pageSizeOptions' },
          _react2.default.createElement(
            'select',
            {
              onChange: function onChange(e) {
                return onPageSizeChange(Number(e.target.value));
              },
              value: pageSize
            },
            pageSizeOptions.map(function (option, i) {
              return _react2.default.createElement(
                'option',
                {
                  key: i,
                  value: option },
                option,
                ' ',
                _this.props.rowsText
              );
            })
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: '-next' },
        _react2.default.createElement(
          NextComponent,
          {
            onClick: function onClick(e) {
              if (!canNext) return;
              _this.changePage(page + 1);
            },
            disabled: !canNext
          },
          this.props.nextText
        )
      )
    );
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYWdpbmF0aW9uLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRCdXR0b24iLCJwcm9wcyIsImNoaWxkcmVuIiwiZ2V0SW5pdGlhbFN0YXRlIiwicGFnZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJzZXRTdGF0ZSIsImdldFNhZmVQYWdlIiwiaXNOYU4iLCJNYXRoIiwibWluIiwibWF4IiwicGFnZXMiLCJjaGFuZ2VQYWdlIiwib25QYWdlQ2hhbmdlIiwiYXBwbHlQYWdlIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RhdGUiLCJyZW5kZXIiLCJzaG93UGFnZVNpemVPcHRpb25zIiwicGFnZVNpemVPcHRpb25zIiwicGFnZVNpemUiLCJzaG93UGFnZUp1bXAiLCJjYW5QcmV2aW91cyIsImNhbk5leHQiLCJvblBhZ2VTaXplQ2hhbmdlIiwiY2xhc3NOYW1lIiwiUHJldmlvdXNDb21wb25lbnQiLCJOZXh0Q29tcG9uZW50IiwicGFnaW5hdGlvblN0eWxlIiwicHJldmlvdXNUZXh0IiwicGFnZVRleHQiLCJ2YWwiLCJ0YXJnZXQiLCJ2YWx1ZSIsIndoaWNoIiwia2V5Q29kZSIsIm9mVGV4dCIsIk51bWJlciIsIm1hcCIsIm9wdGlvbiIsImkiLCJyb3dzVGV4dCIsIm5leHRUZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBQ0E7QUFDQTs7QUFFQSxJQUFNQSxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUNDLEtBQUQ7QUFBQSxTQUNwQjtBQUFBO0FBQUEsZUFBUSxNQUFLLFFBQWIsSUFBMEJBLEtBQTFCLElBQWlDLFdBQVUsTUFBM0M7QUFBbURBLFVBQU1DO0FBQXpELEdBRG9CO0FBQUEsQ0FBdEI7O2tCQUllLGdDQUFZO0FBQ3pCQyxpQkFEeUIsNkJBQ047QUFDakIsV0FBTztBQUNMQyxZQUFNLEtBQUtILEtBQUwsQ0FBV0c7QUFEWixLQUFQO0FBR0QsR0FMd0I7QUFNekJDLDJC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O0FBQUEsVUFBSyxXQUFVLE9BQWY7QUFDRTtBQUFDLHVCQUFEO0FBQUE7QUFDRSxxQkFBUyxpQkFBQzNCLENBQUQsRUFBTztBQUNkLGtCQUFJLENBQUNTLE9BQUwsRUFBYztBQUNkLG9CQUFLWixVQUFMLENBQWdCVixPQUFPLENBQXZCO0FBQ0QsYUFKSDtBQUtFLHNCQUFVLENBQUNzQjtBQUxiO0FBT0csZUFBS3pCLEtBQUwsQ0FBVzRDO0FBUGQ7QUFERjtBQTdERixLQURGO0FBMkVEO0FBeEh3QixDQUFaLEMiLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IENyZWF0ZUNsYXNzIGZyb20gJ2NyZWF0ZS1yZWFjdC1jbGFzcydcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcclxuLy9cclxuLy8gaW1wb3J0IF8gZnJvbSAnLi91dGlscydcclxuXHJcbmNvbnN0IGRlZmF1bHRCdXR0b24gPSAocHJvcHMpID0+IChcclxuICA8YnV0dG9uIHR5cGU9J2J1dHRvbicgey4uLnByb3BzfSBjbGFzc05hbWU9Jy1idG4nPntwcm9wcy5jaGlsZHJlbn08L2J1dHRvbj5cclxuKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZSAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwYWdlOiB0aGlzLnByb3BzLnBhZ2VcclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7cGFnZTogbmV4dFByb3BzLnBhZ2V9KVxyXG4gIH0sXHJcbiAgZ2V0U2FmZVBhZ2UgKHBhZ2UpIHtcclxuICAgIGlmIChpc05hTihwYWdlKSkge1xyXG4gICAgICBwYWdlID0gdGhpcy5wcm9wcy5wYWdlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgocGFnZSwgMCksIHRoaXMucHJvcHMucGFnZXMgLSAxKVxyXG4gIH0sXHJcbiAgY2hhbmdlUGFnZSAocGFnZSkge1xyXG4gICAgcGFnZSA9IHRoaXMuZ2V0U2FmZVBhZ2UocGFnZSlcclxuICAgIHRoaXMuc2V0U3RhdGUoe3BhZ2V9KVxyXG4gICAgaWYgKHRoaXMucHJvcHMucGFnZSAhPT0gcGFnZSkge1xyXG4gICAgICB0aGlzLnByb3BzLm9uUGFnZUNoYW5nZShwYWdlKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXBwbHlQYWdlIChlKSB7XHJcbiAgICBlICYmIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgY29uc3QgcGFnZSA9IHRoaXMuc3RhdGUucGFnZVxyXG4gICAgdGhpcy5jaGFuZ2VQYWdlKHBhZ2UgPT09ICcnID8gdGhpcy5wcm9wcy5wYWdlIDogcGFnZSlcclxuICB9LFxyXG4gIHJlbmRlciAoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIC8vIENvbXB1dGVkXHJcbiAgICAgIHBhZ2VzLFxyXG4gICAgICAvLyBQcm9wc1xyXG4gICAgICBwYWdlLFxyXG4gICAgICBzaG93UGFnZVNpemVPcHRpb25zLFxyXG4gICAgICBwYWdlU2l6ZU9wdGlvbnMsXHJcbiAgICAgIHBhZ2VTaXplLFxyXG4gICAgICBzaG93UGFnZUp1bXAsXHJcbiAgICAgIGNhblByZXZpb3VzLFxyXG4gICAgICBjYW5OZXh0LFxyXG4gICAgICBvblBhZ2VTaXplQ2hhbmdlLFxyXG4gICAgICBjbGFzc05hbWUsXHJcbiAgICAgIFByZXZpb3VzQ29tcG9uZW50ID0gZGVmYXVsdEJ1dHRvbixcclxuICAgICAgTmV4dENvbXBvbmVudCA9IGRlZmF1bHRCdXR0b25cclxuICAgIH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhjbGFzc05hbWUsICctcGFnaW5hdGlvbicpfVxyXG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLnBhZ2luYXRpb25TdHlsZX1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSctcHJldmlvdXMnPlxyXG4gICAgICAgICAgPFByZXZpb3VzQ29tcG9uZW50XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFjYW5QcmV2aW91cykgcmV0dXJuXHJcbiAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHBhZ2UgLSAxKVxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17IWNhblByZXZpb3VzfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5wcmV2aW91c1RleHR9XHJcbiAgICAgICAgICA8L1ByZXZpb3VzQ29tcG9uZW50PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSctY2VudGVyJz5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nLXBhZ2VJbmZvJz5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMucGFnZVRleHR9IHtzaG93UGFnZUp1bXAgPyAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9Jy1wYWdlSnVtcCc+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5zdGF0ZS5wYWdlID09PSAnJyA/ICd0ZXh0JyA6ICdudW1iZXInfVxyXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gZS50YXJnZXQudmFsdWVcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWdlID0gdmFsIC0gMVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7cGFnZTogdmFsfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cGFnZTogdGhpcy5nZXRTYWZlUGFnZShwYWdlKX0pXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnBhZ2UgPT09ICcnID8gJycgOiB0aGlzLnN0YXRlLnBhZ2UgKyAxfVxyXG4gICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuYXBwbHlQYWdlfVxyXG4gICAgICAgICAgICAgICAgICBvbktleVByZXNzPXtlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS53aGljaCA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseVBhZ2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSctY3VycmVudFBhZ2UnPntwYWdlICsgMX08L3NwYW4+XHJcbiAgICAgICAgICAgICl9IHt0aGlzLnByb3BzLm9mVGV4dH0gPHNwYW4gY2xhc3NOYW1lPSctdG90YWxQYWdlcyc+e3BhZ2VzfTwvc3Bhbj5cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIHtzaG93UGFnZVNpemVPcHRpb25zICYmIChcclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdzZWxlY3Qtd3JhcCAtcGFnZVNpemVPcHRpb25zJz5cclxuICAgICAgICAgICAgICA8c2VsZWN0XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uUGFnZVNpemVDaGFuZ2UoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17cGFnZVNpemV9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge3BhZ2VTaXplT3B0aW9ucy5tYXAoKG9wdGlvbiwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cclxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtvcHRpb259PlxyXG4gICAgICAgICAgICAgICAgICAgICAge29wdGlvbn0ge3RoaXMucHJvcHMucm93c1RleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSctbmV4dCc+XHJcbiAgICAgICAgICA8TmV4dENvbXBvbmVudFxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICghY2FuTmV4dCkgcmV0dXJuXHJcbiAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHBhZ2UgKyAxKVxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17IWNhbk5leHR9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLm5leHRUZXh0fVxyXG4gICAgICAgICAgPC9OZXh0Q29tcG9uZW50PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcbiJdfQ==