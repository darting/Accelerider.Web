const state = {
    videopath:'',
    videofile:{},
}

const getters = {
    videopath: state => state.videopath,
    videofile: state => state.videofile,
}

const mutations = {
    playmovie(state,msg){
        state.videofile = msg;
    },
    play(state,msg){
        state.videopath = msg;
    },
}

const actions = {
    playmovie ({commit, state, rootState},file) {
        commit('playmovie',file);
    },
    play ({commit, state, rootState},src) {
        commit('play',src);
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}