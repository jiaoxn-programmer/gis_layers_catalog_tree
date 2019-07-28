/**
 * 将目录树节点的图层信息传递到esriView模块中
 * @param {Object} context对象
 * @param {Object} layerInfoFromCatalogNode 从目录树节点传递的图层信息
 * @param {string} layerInfoFromCatalogNode.type 图层类型
 * @param {string} layerInfoFromCatalogNode.url 图层地址
 * @param {string} layerInfoFromCatalogNode.title 图层标题
 */
export const transferLayerInfoFromCatalogNode = function ({ dispatch }, layerInfoFromCatalogNode) {
    dispatch('esriViewVuex/updateStateLayerInfo', layerInfoFromCatalogNode, { root: true })
}
