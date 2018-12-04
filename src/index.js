import TouchActive from './components/touchActive';
import TouchStop from './components/touchStop';
import ResponsiveLink from './responsiveLink/responsiveLink';

export {
    TouchActive,
    TouchStop,
    ResponsiveLink
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('touch-active', TouchActive);
    window.Vue.component('touch-stop', TouchStop);
}
