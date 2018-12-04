import 'babel-polyfill';
import Vue from 'vue';
import App from './app';
// 引入点击态组件
import {TouchActive, TouchStop, ResponsiveLink} from '../../src/index';

// 使用use安装touchActive，touchStop，和ResponsiveLink方法到Vue上
Vue.use(TouchActive);

Vue.use(TouchStop);

Vue.prototype.ResponsiveLink = ResponsiveLink;

Vue.config.productionTip = false;



new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
});
