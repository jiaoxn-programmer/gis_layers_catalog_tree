/**
 * @file 统计结果相关的后台服务接口
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import qs from 'qs'

import request from '@/utils/request'

import { handleStatisticalDataFromBackend } from '@/services/statistical_result_service'

/**
 * 获取统计结果
 * @param {Object} requestBody POST请求体
 * @param {Function} successfulCallback POST请求成功后的回调函数
 * @param {Function} failCallback POST请求失败后的回调函数
 */
export const fetchStatisticalData = (requestBody, successfulCallback, failCallback) => {
    request.http_post('http://localhost/api/statistical-data', qs.stringify(requestBody)).then(response => {
        handleStatisticalDataFromBackend(response, successfulCallback, failCallback)
    }, error => {
        console.log(error)
    })
}
