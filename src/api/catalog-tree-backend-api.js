/**
 * @file 目录树相关的后台API接口
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import request from '@/utils/request'

import { handleCatalogTreeSourceDataFromBackend } from '@/services/catalog_tree_service'

/**
 * 获取目录树源数据
 */
export const fetchCatalogTreeSourceData = () => {
    request.http_get('http://localhost/api/catalog-tree').then(response => {
        handleCatalogTreeSourceDataFromBackend(response)
    }, error => {
        console.log(error)
    })
}
