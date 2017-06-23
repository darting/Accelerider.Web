const state = {
    path:'',
    filelist: [],
    downfiles:{},
    downlinks:{}
}

const getters = {
    path: state => state.path,
    filelist: state => state.filelist,
    downfiles: state => state.downfiles,
    downlinks: state => state.downlinks,
}

const mutations = {
    filelist(state,msg){
        state.filelist = msg.list;
    },
    changepath(state,msg){
        state.path = msg.path;
    },
    downfiles(state,msg){
        state.downfiles = msg.files;
    },
    showdownlinks(state,msg){
        state.downlinks = msg.links;
    },
}

const actions = {
    filelist ({commit, state, rootState},list) {
        commit('filelist',{'list':list});
    },
    changepath ({commit, state, rootState},path) {
        commit('changepath',{'path':path});
    },
    downfiles({commit, state, rootState},files) {
        commit('downfiles',{'files':files});
    },
    showdownlinks({commit, state, rootState},links) {
        commit('showdownlinks',{'links':links});
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}