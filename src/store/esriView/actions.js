import * as types from './mutation_types'

/**
 * 更新待添加的图层信息
 * @param {Object} context对象
 * @param {Object} layerInfo 要添加的图层信息
 * @param {string} layerInfo.type 图层类型信息
 * @param {string} layerInfo.url 图层URL地址
 * @param {string} layerInfo.title 图层标题
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

/**
 * 传递eChart内容
 * @param {Object} context对象
 * @param {Object} eChartContent.titleText 主标题
 * @param {string} eChartContent.titleSubText 此标题
 * @param {string} eChartContent.eChartName eChart的名称
 * @param {Array} eChartContent.eChartData eChart的数据
 */
export const transferEChartContent = function ({ dispatch }, eChartContent) {
    dispatch('statisticsResult/setEChartContent', eChartContent, { root: true })
}

/**
 * 更新图层过滤信息
 * @param {Object} context对象
 * @param {Object} layerFilterParams 图层过滤参数信息
 */
export const updateLayerFilterParams = function ({ commit }, layerFilterParams) {
    commit(types.UPDATE_LAYER_FILTER_PARAMS, layerFilterParams)
}
