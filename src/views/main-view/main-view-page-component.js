/**
 * @file MainViewPageComponent组件对应的js文件
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import { mapActions } from 'vuex'

import { EventBus } from '@/event-bus/event-bus'

import HeaderBarComponent from '@/components/header-bar/HeaderBarComponent'
import EsriViewComponent from '@/components/esri-view/EsriViewComponent'
import CatalogTreeWithSpanComponent from '@/components/catalog-tree-with-span/CatalogTreeWithSpanComponent'
import FunctionButtonGroupComponent from '@/components/function-button-group/FunctionButtonGroupComponent'

export default {
    name: 'MainViewPageComponent',
    data: function () {
        return {
            loading: null,
            isShowCatalogTree: false
        }
    },
    mounted () {
        let that = this

        // 显示加载页面
        this.showLoadingComponent('正在初始化场景...')

        // 监听目录树节点的点击事件
        EventBus.$on('catalogTreeNodeClick', function (catalogTreeNodeData) {
            that.handleCatalogTreeNodeClick(catalogTreeNodeData)
        })
    },
    components: {
        'esri-view-component': EsriViewComponent,
        'header-bar-component': HeaderBarComponent,
        'catalog-tree-with-span-component': CatalogTreeWithSpanComponent,
        'function-button-group-component': FunctionButtonGroupComponent
    },
    methods: {
        /**
         * esri视图加载完成后的监听事件
         */
        esriViewLoaded: function () {
            // 关闭LoadingComponent组件
            if (this.loading) {
                this.loading.close()
                this.loading = null
                this.updateLoadingComponentStatusAction(false)
            }

            // 显示目录树组件
            this.isShowCatalogTree = true
        },
        /**
         * 显示加载页面
         * @param {String} loadingMessage 加载页面显示的文字信息
         */
        showLoadingComponent: function (loadingMessage) {
            let that = this

            // 显示Loading组件
            this.updateLoadingComponentStatusAction(true).then(function () {
                that.loading = that.$loading({
                    target: document.getElementById('loadingDiv'),
                    lock: false,
                    text: loadingMessage,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
            })
        },
        /**
         * 处理目录树节点的点击事件
         * @param {Object} nodeData 目录树节点对应的数据
         */
        handleCatalogTreeNodeClick: function (nodeData) {
            if ('webMapItemId' in nodeData) {
                this.$refs.esriViewComponent.loadWebMapByItemId(nodeData['webMapItemId'])
            }
        },
        handleFunctionButtonClick: function (type) {
            switch (type) {
                case 'measurement':
                    this.$refs.esriViewComponent.measurementOnEsriView()
                    break
                default:
                    console.log('请选择一个功能模块')
            }
        },
        ...mapActions({
            updateLoadingComponentStatusAction: 'loadingVuex/updateLoadingComponentStatus'
        })
    }
}
