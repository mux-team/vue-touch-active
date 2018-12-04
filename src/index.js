import touchActive from './components/touchActive';
import touchStop from './components/touchStop';
import ResponsiveLink from './responsiveLink/ResponsiveLink';

const TouchActive = {
    install: function(Vue) {
        Vue.component('touch-active', touchActive);
    }
};

const TouchStop = {
    install: function(Vue) {
        Vue.component('touch-stop', touchStop);
    }
};

export {
    TouchActive,
    TouchStop,
    ResponsiveLink
};



