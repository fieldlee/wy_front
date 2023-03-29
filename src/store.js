import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '' || localStorage.getItem('account'),
	  userType: '' || localStorage.getItem('userType'),
	  isLogin: false
  },
  mutations: {
    setToken: (state, token) => {
      state.access_token = token
        // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
      // localStorage.setItem('account', user_name)
    },
    setUserName: (state, user_name) => {
      state.userName = user_name
        // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
      // localStorage.setItem('account', user_name)
    },
    setUserType: (state, type) => {
      state.userType = type
        // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
      // localStorage.setItem('userType', type)
    },
    setUserStatus(state, flag) {
      state.isLogin = flag;
    }
  },
  actions: {
    setUserStatus({commit}, flag) {
      commit("userStatus", flag)
    },
    setUserType({commit}, flag) {
      commit("userType", flag)
    },
    setLoginStatus({commit}, flag) {
      commit("isLogin", flag)
    }
  }
})
