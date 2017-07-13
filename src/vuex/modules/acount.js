const state = {
    autologin:false,
    user: '',
    token:'',
    uk: '',
}

const getters = {
    autologin: state => state.autologin,
    user: state => state.user,
    token: state => state.token,
    uk: state => state.uk,
}

const mutations = {
    login(state,msg){
        state.token = msg.token;
    },
    BDuser(state,msg){
        state.uk = msg.uk;
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
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}