import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import getData from './getData.js'
// 导入编辑器样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";


Vue.prototype.$ajax = axios;
Vue.prototype.$getData = getData;
Vue.use(ElementUI)



new Vue({
    el: '#app',
    router,
    render: h => h(App)
})