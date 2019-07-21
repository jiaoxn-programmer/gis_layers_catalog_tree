import * as types from './mutation_types'

export default {
    /**
     * 设置eChart的内容
     * @param {Object} state state对象
     * @param {Object} eChartContent.titleText 主标题
     * @param {string} eChartContent.titleSubText 此标题
     * @param {string} eChartContent.eChartName eChart的名称
     * @param {Array} eChartContent.eChartData eChart的数据
     */
    [types.SET_ECHART_CONTENT] (state, eChartContent) {
        state.eChartContent = eChartContent
    }
}
