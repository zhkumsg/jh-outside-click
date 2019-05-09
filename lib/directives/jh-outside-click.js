'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable */
exports.default = {
  bind: function bind(el, binding) {
    el.__outsideClickEvent__ = function (e) {
      if (!el.contains(e.target)) {
        binding.value(e);
      }
    };
    setTimeout(function () {
      document.body.addEventListener('click', el.__outsideClickEvent__);
    });
  },
  unbind: function unbind(el) {
    document.body.removeEventListener('click', el.__outsideClickEvent__);
    delete el.__outsideClickEvent__;
  }
};