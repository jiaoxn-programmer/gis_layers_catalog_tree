/**
 * @file 目录树对应的数据处理服务
 * @author JiaoXiangNing(243822080@qq.com)
 */

import store from '@/store/index'

/**
 * 处理从后台获取到的目录树的源数据
 * @param {Array} response 后台API响应结果
 */
export const handleCatalogTreeSourceDataFromBackend = (response) => {
    store.dispatch('catalogTreeVuex/setCatalogTreeSourceData', response['data']['data'])
}
