<template>
    <div>
        <div class="inputDiv">
            <el-input v-model="filterText" placeholder="输入关键字进行查询"></el-input>
        </div>
        <el-tree
        :data="catalogTreeData"
        :props="defaultProps"
        :accordion="true"
        :highlight-current="true"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        ref="tree">
        </el-tree>
    </div>
</template>

<script>
import { Message } from 'element-ui'

import { mapActions } from 'vuex'

export default {
    name: 'CatalogTreeComponent',
    data: function () {
        return {
            catalogTreeData: [
                {
                    label: '基础地图',
                    children: [
                        {
                            label: '基础地理信息',
                            layerType: 'TileLayer',
                            layerUrl: 'https://tiles.arcgis.com/tiles/cDevWdPu8Ni4rALu/arcgis/rest/services/Provinces1/VectorTileServer'
                        }, {
                            label: '卫星影像',
                            layerType: 'FeatureLayer',
                            layerUrl: 'https://services1.arcgis.com/cDevWdPu8Ni4rALu/ArcGIS/rest/services/%E7%9C%81%E7%BA%A7%E8%A1%8C%E6%94%BF%E5%8C%BA/FeatureServer/0'
                        }, {
                            label: '航拍图'
                        }, {
                            label: '无人机拍摄'
                        }
                    ]
                }, {
                    label: '国土调查',
                    children: [
                        {
                            label: '基期地类图斑'
                        }, {
                            label: '二调图斑'
                        }, {
                            label: '三调图斑'
                        }, {
                            label: '不动产登记'
                        }, {
                            label: '基准地价'
                        }
                    ]
                }, {
                    label: '专题应用',
                    children: [
                        {
                            label: '地址灾害点'
                        }, {
                            label: '林区图层'
                        }, {
                            label: '权籍调查实例'
                        }, {
                            label: '权籍调查宅基地'
                        }, {
                            label: '征地图层'
                        }, {
                            label: '拆旧图层'
                        }, {
                            label: '建新区图层'
                        }
                    ]
                }, {
                    label: '监管规划',
                    children: [
                        {
                            label: '供地图层'
                        }, {
                            label: '拿地计划'
                        }, {
                            label: '基本农田'
                        }, {
                            label: '建设用地管制分区'
                        }, {
                            label: '土地规划地类'
                        }, {
                            label: '项目区图层'
                        }
                    ]
                }, {
                    label: '中心业务'
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            filterText: ''
        }
    },
    watch: {
        filterText (value) {
            this.$refs.tree.filter(value)
        }
    },
    methods: {
        /**
         * 目录树节点点击事件
         */
        handleNodeClick: function (data) {
            // 判断节点是否含有图层信息，如果有，则在地图中加载
            if (data.hasOwnProperty('layerUrl') && data.hasOwnProperty('layerType')) {
                let layerUrl = data.layerUrl
                let layerType = data.layerType

                // 如果图层地址和图层属性均有值，则根据类型加载对应的图层
                if (layerUrl && layerType) {
                    this.transferLayerInfoFromCatalogNodeAction({
                        type: layerType,
                        url: layerUrl
                    })
                } else {
                    Message({
                        message: '当前节点没有对应的图层，请联系管理员',
                        type: 'error'
                    })
                }
            }
        },
        /**
         * 过滤目录树节点
         * @param {string} value 过滤的文字
         * @param {string} data 节点的label值
         */
        filterNode: function (value, data) {
            if (!value) {
                return true
            }

            return data.label.indexOf(value) !== -1
        },
        ...mapActions({
            transferLayerInfoFromCatalogNodeAction: 'catalogTreeVuex/transferLayerInfoFromCatalogNode'
        })
    }
}
</script>

<style>
/* 设置存放el-input的div的背景 */
.inputDiv {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px;
}

/* 修改默认的el-input的样式 */
.el-input__inner {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    line-height: 30px;
    height: 30px;
}

/* 修改tree控件的背景颜色、字体颜色和内边距 */
.el-tree {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 5px 0px;
}

/* 修改tree控件选中后的背景颜色 */
.el-tree-node:focus > .el-tree-node__content {
    background-color: rgba(255, 255, 255, 0.4);
}

/* 修改tree控件鼠标滑入后背景颜色 */
.el-tree-node__content:hover {
    background-color: rgba(255, 255, 255, 0.4);
}

/* 修改tree控件文本的右侧内边距 */
.el-tree-node__label {
    padding-right: 10px;
}

/* hight-current为True的时候，修改高亮的颜色 */
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: rgba(255, 255, 255, 0.4);
}
</style>
