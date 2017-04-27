const state = {
    count: 0,
    test: []
}

const getters = {
    count: state => state.count
}

const mutations = {
    increment(state,n){
        state.count+=n
    }
}

const actions = {
    increment ({commit, state, rootState}) {
        commit('increment',1)
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}