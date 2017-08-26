const state = {
    isLoading:false,
    filelist:[],
    m4sfilelist:[],
    plazafile:{},
}

const getters = {
    isLoading: state => state.isLoading,
    filelist: state => state.filelist,
    m4sfilelist: state => state.m4sfilelist,
    plazafile: state => state.plazafile,
}

const mutations = {
    viewloading(state,loading){
        state.isLoading = loading;
    },
    filelist(state,msg){
        state.filelist = msg.list;
    },
    m4sfilelist(state,msg){
        state.m4sfilelist = msg.list;
    },
    add2plaza(state,file){
        state.plazafile = file;
    },
}

const actions = {
    filelist ({commit, state, rootState},list) {
        commit('filelist',{'list':list});
    },
    m4sfilelist ({commit, state, rootState},list) {
        commit('m4sfilelist',{'list':list});
    },
    add2FilePlaza({commit, state, rootState},file) {
        commit('add2plaza',file);
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}