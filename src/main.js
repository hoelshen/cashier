import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './router';
import axios from 'axios';

Vue.prototype.$ajax = axios;
Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})