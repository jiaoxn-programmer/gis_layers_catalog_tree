import * as types from './mutation_types'

export default {
    /**
     * 修改state中的layerType和layerUrl的值
     * @param {Object} state state对象
     * @param {Object} layerInfo 需要添加的图层信息
     * @param {string} layerInfo.type 图层类型
     * @param {string} layerInfo.url 图层地址
     * @param {string} layerInfo.title 图层标题
     */
    [types.UPDATE_LAYER_INFO] (state, layerInfo) {
        state.layerInfo = layerInfo
    },
    /**
     * 修改图层过滤参数
     * @param {Object} state对象
     * @param {Object} filterLayerParams 需要添加的图层信息
     * @param {string} filterLayerParams.field 字段名称
     * @param {string} filterLayerParams.fieldValue 字段值
     */
    [types.UPDATE_LAYER_FILTER_PARAMS] (state, filterLayerParams) {
        state.featureLayerFilterParams = filterLayerParams
    }
}
