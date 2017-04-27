import Vue from 'vue'
import Vuex from 'vuex'

//import fileviewStore from './modules/fileview'
import testStore from './modules/test'

Vue.use(Vuex)

const state = {
	requesting: false,
	error: {}
}

const getters = {
	requesting: state => state.requesting,
	error: state => state.error
}

export default new Vuex.Store({
	state,
	getters,
	modules: {
		//fileviewStore,
		testStore
	}
})
