/* 引入模块的vuex要素 */
import * as moduleActions from './actions'
import * as moduleGetters from './getters'
import moduleStates from './states'
import moduleMutations from './mutations'

export default {
    namespaced: true,
    state: moduleStates,
    mutations: moduleMutations,
    actions: moduleActions,
    getters: moduleGetters
}
