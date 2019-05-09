/* eslint-disable */
export default {
  bind(el, binding) {
    el.__outsideClickEvent__ = e => {
      if (!el.contains(e.target)) {
        binding.value(e);
      }
    };
    setTimeout(() => {
      document.body.addEventListener('click', el.__outsideClickEvent__);
    });
  },
  unbind(el) {
    document.body.removeEventListener('click', el.__outsideClickEvent__);
    delete el.__outsideClickEvent__;
  },
};
