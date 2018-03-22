import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import getData from './getData.js'
import ElSearchTablePagination from 'el-search-table-pagination'


Vue.prototype.$ajax = axios;
Vue.prototype.$getData = getData;
Vue.use(ElementUI)
Vue.use(ElSearchTablePagination)



new Vue({
    el: '#app',
    router,
    render: h => h(App)
})