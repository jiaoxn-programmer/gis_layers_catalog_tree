import * as types from './mutation_types'

export const updateLoadingComponentStatus = function ({ commit }, isShowLoading) {
    commit(types.UPDATE_LOADING_STATUS, isShowLoading)
}
