import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userName: '' || localStorage.getItem('account'),
        userType: '' || localStorage.getItem('userType'),
        tryCount: '' || localStorage.getItem('tryCount'),
        expired: '' || localStorage.getItem('expired'),
        token: '' || localStorage.getItem('access_token'),
        userStatus: false || localStorage.getItem('userStatus')
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token
            // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
            localStorage.setItem('access_token', token)
        },
        setUserName: (state, userName) => {
            state.userName = userName
            // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
            localStorage.setItem('account', userName)
        },
        setUserType: (state, type) => {
            state.userType = type
            // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
            localStorage.setItem('userType', type)
        },
        setTryCount: (state, type) => {
            state.tryCount = type
            localStorage.setItem('tryCount', type)
        },
        setExpired: (state, type) => {
            state.expired = type
            localStorage.setItem('expired', type)
        },
        setUserStatus(state, flag) {
            state.userStatus = flag;
        }
    },
    actions: {
        setUserStatus({ commit }, flag) {
            commit("userStatus", flag)
        },
        setUserType({ commit }, flag) {
            commit("userType", flag)
        },
        setToken({ commit }, flag) {
            commit("token", flag)
        },
        setUserName({ commit }, flag) {
            commit("userName", flag)
        },
        setTryCount({ commit }, flag) {
            commit("tryCount", flag)
        },
        setExpired({ commit }, flag) {
            commit("expired", flag)
        }
    }
})
