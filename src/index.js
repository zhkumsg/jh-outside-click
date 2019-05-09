import JhOutsideClick from './directives/jh-outside-click';

export default {
	install(Vue, options) {
		const directives = {
			JhOutsideClick,
		};
		Object.keys(directives).forEach(key => {
			directives[key].$options = options;
			Vue.directive(key, directives[key]);
		});
	},
};
