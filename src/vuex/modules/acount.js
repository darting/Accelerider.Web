const state = {
    autologin:false,
    user: '',
    token:'',
    uk: '',
    info:{},
}

const getters = {
    autologin: state => state.autologin,
    user: state => state.user,
    token: state => state.token,
    uk: state => state.uk,
    userInfo: state => state.info,
}

const mutations = {
    login(state,msg){
        state.token = msg.token;
    },
    BDuser(state,msg){
        state.uk = msg.uk;
    },
    BDuserInfo(state,msg){
        state.info = msg.info;
    }
}

const actions = {
    autologin({commit, state, rootState},obj) {
        localStorage.setItem('autologin', JSON.stringify(obj));
    },
    login ({commit, state, rootState},token) {
        sessionStorage.setItem('accessToken', token);
        commit('login',{'token':token});
    },
    BDuser({commit, state, rootState},uk) {
        sessionStorage.setItem('accessUk', uk);
        commit('BDuser',{'uk':uk});
    },
    BDuserInfo({commit, state, rootState},userInfo) {
        commit('BDuserInfo',{'info':userInfo});
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}