import * as types from './mutation_types'

/**
 * 设置eChart的内容
 * @param {Object} context对象
 * @param {Object} eChartContent.titleText 主标题
 * @param {string} eChartContent.titleSubText 此标题
 * @param {string} eChartContent.eChartName eChart的名称
 * @param {Array} eChartContent.eChartData eChart的数据
 */
export const setEChartContent = function ({ commit }, eChartContent) {
    commit(types.SET_ECHART_CONTENT, eChartContent)
}

/**
 * eChart的Item的点击事件
 * @param {Object} context对象
 * @param {Object} eChartItemData eChart的Item的data
 */
export const eChartItemClick = function ({ dispatch }, eChartItemData) {
    dispatch('esriViewVuex/updateLayerFilterParams', eChartItemData, { root: true })
}
