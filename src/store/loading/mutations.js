import * as types from './mutation_types'

export default {
    /**
     * 更新Loading组件的显示状态
     * @param {Object} state state对象
     * @param {boolean} isShowLoading 是否显示Loading组件
     */
    [types.UPDATE_LOADING_STATUS] (state, isShowLoading) {
        state.isShowLoading = isShowLoading
    }
}
