/**
 * @file 统计结果对应的数据处理服务
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import store from '@/store/index'

/**
 * 处理从后台获取到的统计结果的源数据
 * @param {Array} response 后台API响应结果
 * @param {Function} successfulCallback POST请求成功后的回调函数
 * @param {Function} failCallback POST请求失败后的回调函数
 */
export const handleStatisticalDataFromBackend = (response, successfulCallback, failCallback) => {
    return store.dispatch('statisticalResult/setEChartContent', response['data']['data']).then(
        () => {
            successfulCallback()
        },
        () => {
            failCallback()
        }
    )
}
