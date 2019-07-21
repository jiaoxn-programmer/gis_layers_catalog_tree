import * as types from './mutation_types'

/**
 * 更新待添加的图层信息
 * @param {Object} context对象
 * @param {Object} layerInfo 要添加的图层信息
 * @param {string} layerInfo.type 图层类型信息
 * @param {string} layerInfo.url 图层URL地址
 */
export const updateStateLayerInfo = function ({ commit }, layerInfo) {
    commit(types.UPDATE_LAYER_INFO, layerInfo)
}

/**
 * 显示Loading组件
 * @param {Object} context对象
 */
export const showLoadingComponent = function ({ dispatch }) {
    dispatch('loadingVuex/updateLoadingComponentStatus', true, { root: true })
}

/**
 * 隐藏Loading组件
 * @param {Object} context对象
 */
export const hideLoadingComponent = function ({ dispatch }) {
    dispatch('loadingVuex/updateLoadingComponentStatus', false, { root: true })
}
