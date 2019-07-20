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
export default {
    name: 'CatalogTreeComponent',
    data: function () {
        return {
            catalogTreeData: [
                {
                    label: '基础地图',
                    children: [
                        {
                            label: '基础地理信息'
                        }, {
                            label: '卫星影像'
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
        handleNodeClick: function () {
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
        }
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
