
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    title: '',
    show: true,
    adminInfo: null,//用户信息
    //adminInfo: {name:"111",email:"222@qq.com",id:"sjds51515"},//用户信息
}

//导出vuex的实例，其中包含state，mutations，getters，actions

export default new Vuex.Store({  
    state,  
    mutations,  
    actions,  
    getters,  
});