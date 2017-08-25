const state = {
    isLoading:false,
    filelist:[],
}

const getters = {
    isLoading: state => state.isLoading,
    filelist: state => state.filelist,
}

const mutations = {
    viewloading(state,loading){
        state.isLoading = loading;
    },
    filelist(state,msg){
        state.filelist = msg.list;
    },
}

const actions = {
    filelist ({commit, state, rootState},list) {
        commit('filelist',{'list':list});
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}