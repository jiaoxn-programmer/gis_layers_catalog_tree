/**
 * @file MainViewPageComponent组件对应的js文件
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import { mapActions, mapGetters } from 'vuex'

import { EventBus } from '@/event-bus/event-bus'

import HeaderBarComponent from '@/components/header-bar/HeaderBarComponent'
import EsriViewComponent from '@/components/esri-view/EsriViewComponent'
import CatalogTreeWithSpanComponent from '@/components/catalog-tree-with-span/CatalogTreeWithSpanComponent'
import FunctionButtonGroupComponent from '@/components/function-button-group/FunctionButtonGroupComponent'
import StatisticalResultComponent from '@/components/statistical-result/StatisticalResultComponent'

import { fetchStatisticalData } from '@/api/statistical-result-backend-api'

export default {
    name: 'MainViewPageComponent',
    data: function () {
        return {
            loading: null,
            isShowCatalogTree: false,
            isShowButtonGroup: false
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

        // 监听sketch组件销毁事件
        EventBus.$on('destroySketchWidget', function () {
            that.hideStatisticalResultAction()
        })
    },
    computed: {
        ...mapGetters('statisticalResult', [
            'isShowStatisticalResult'
        ])
    },
    components: {
        'esri-view-component': EsriViewComponent,
        'header-bar-component': HeaderBarComponent,
        'catalog-tree-with-span-component': CatalogTreeWithSpanComponent,
        'function-button-group-component': FunctionButtonGroupComponent,
        'statistical-result-component': StatisticalResultComponent
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

            // 显示功能按钮组件
            this.isShowButtonGroup = true
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
        /**
         * 功能按钮组的对应的功能
         * @param {String} type 执行的功能
         */
        handleFunctionButtonClick: function (type) {
            switch (type) {
                case 'lengthMeasurement':
                    this.$refs.esriViewComponent.measureLengthOnEsriView()
                    break
                case 'areaMeasurement':
                    this.$refs.esriViewComponent.measureAreaOnEsriView()
                    break
                case 'frameSelectionStatistics':
                    this.executeFrameSelectionStatistics()
                    break
                default:
                    console.log('请选择一个功能模块')
            }
        },
        /**
         * 执行框选统计查询
         */
        executeFrameSelectionStatistics: function () {
            let that = this

            this.$refs.esriViewComponent.frameSelectionOnEsriView().then(
                (drawResultAsGraphic) => {
                    const extent = drawResultAsGraphic.geometry.extent

                    const extentXMax = extent.xmax
                    const extentXMin = extent.xmin
                    const extentYMax = extent.ymax
                    const extentYMin = extent.ymin

                    const postRequestBody = {
                        xmax: extentXMax,
                        xmin: extentXMin,
                        ymax: extentYMax,
                        ymin: extentYMin
                    }

                    // 使用POST请求，获取统计结果
                    fetchStatisticalData(postRequestBody, successfulCallback, failCallback)
                },
                (drawError) => {
                    console.log(drawError)
                }
            )

            function successfulCallback () {
                that.showStatisticalResultAction()
            }

            function failCallback () {
                console.log('error')
            }
        },
        ...mapActions({
            updateLoadingComponentStatusAction: 'loadingVuex/updateLoadingComponentStatus',
            showStatisticalResultAction: 'statisticalResult/showStatisticalResult',
            hideStatisticalResultAction: 'statisticalResult/hideStatisticalResult'
        })
    }
}
