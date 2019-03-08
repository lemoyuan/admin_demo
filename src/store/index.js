import Vue from "vue"
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

const state = {
    resConfig:{},
    adminInfo: {
        realName:"",
    },//用户信息
    menuList: [],//菜单栏
    showLoading: false,

};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});