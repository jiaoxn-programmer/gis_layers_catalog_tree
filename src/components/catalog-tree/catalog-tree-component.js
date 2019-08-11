/**
 * @file CatalogTreeComponent组件对应的js文件
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import { mapGetters, mapActions } from 'vuex'

import { EventBus } from '@/event-bus/event-bus'
import { fetchCatalogTreeSourceData } from '@/api/catalog-tree-backend-api'

export default {
    name: 'CatalogTreeComponent',
    mounted () {
        this.isShowCatalogTree = true

        // 获取目录树源数据
        fetchCatalogTreeSourceData()
    },
    computed: {
        ...mapGetters('catalogTreeVuex', [
            'catalogTreeData'
        ])
    },
    data: function () {
        return {
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
            // 发送目录树节点点击事件
            EventBus.$emit('catalogTreeNodeClick', data)
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
