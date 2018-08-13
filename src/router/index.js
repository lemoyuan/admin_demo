import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home.vue'
import a from '../components/a.vue'
import b2 from '../components/b2.vue'
import b1 from '../components/b1.vue'
import login from '../components/login.vue'

Vue.use(Router)

export default new Router({
    // mode:'history',
    // base: __dirname,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login,
        },
        {
            path: '/',
            name: 'home',
            component: home,
            redirect: '/a',
            children:[
                {
                    path: '/a',
                    name: 'a',
                    component: a,
                },
                {
                    path: '/b1',
                    name: 'b1',
                    component: b1,
                },
                {
                    path: '/b2',
                    name: 'b2',
                    component: b2,
                },
            ]
        },

    ]
})