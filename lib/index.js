'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jhOutsideClick = require('./directives/jh-outside-click');

var _jhOutsideClick2 = _interopRequireDefault(_jhOutsideClick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	install: function install(Vue, options) {
		var directives = {
			JhOutsideClick: _jhOutsideClick2.default
		};
		Object.keys(directives).forEach(function (key) {
			directives[key].$options = options;
			Vue.directive(key, directives[key]);
		});
	}
};