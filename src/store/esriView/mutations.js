import * as types from './mutation_types'

export default {
    /**
     * 修改state中的layerType和layerUrl的值
     * @param {Object} state state对象
     * @param {Object} layerInfo 需要添加的图层信息
     * @param {string} layerInfo.type 图层类型
     * @param {string} layerInfo.url 图层地址
     */
    [types.UPDATE_LAYER_INFO] (state, layerInfo) {
        state.layerInfo = layerInfo
    }
}
