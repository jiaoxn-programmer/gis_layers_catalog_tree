/**
 * @file 目录树对应的mutations
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import * as types from './mutation_types'

export default {
    /**
     * 设置目录树源数据
     * @param {Object} state state对象
     * @param {Array} catalogTreeData 目录树源数据
     */
    [types.SET_CATALOG_TREE_DATA] (state, catalogTreeData) {
        state.catalogTreeData = catalogTreeData
    }
}
