import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import LoginView from '@/views/login/index'
import Home from '@/views/home/index'
import bannerList from '@/views/image/bannerList.vue'
import menuManage from '@/views/tags/menuManage.vue'
import videoList from '@/views/video/videoList.vue'
import acticleList from '@/views/media/acticleList.vue'
import centerService from '@/views/tags/centerService.vue'

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path: '/login',
      name: "login",
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: '',
      component: Home,
      children:[
        {
          path: "/",
          name:'',
          redirect:'bannerList',
          meta: { requiresAuth: true }
        },
        {
          path: '/bannerList',
          name: "bannerList",
          component: bannerList,
        },{
          path: '/menuManage',
          name: "menuManage",
          component: menuManage,
        },{
          path: '/centerService',
          name: "centerService",
          component: centerService,
        },{
          path: '/acticleList',
          name: "acticleList",
          component: acticleList,
        },{
          path: '/videoList',
          name: "videoList",
          component: videoList,
        }
      ]
    },
  ]
})
