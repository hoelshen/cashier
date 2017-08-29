import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export default new Router({
    routes : [
        {path: '/',component: require('./App.vue')},
        { path: '/login', component: resolve => require(['./views/Login.vue'], resolve) }
    ]
})
