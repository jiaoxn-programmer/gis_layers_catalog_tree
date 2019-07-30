<template>
    <div id="esriViewDiv">
        <div id="switchBtnDiv">
            <input id="switchBtn" type="button" v-model="switchBtnText"
            class="esri-component esri-widget-button esri-widget esri-interactive"
            @click="switchBetween2DAnd3D"
            />
        </div>
        <div id="sceneViewLayerListContainerDiv" class="animated fadeInRight" v-show="isShowLayerListWidget"></div>
        <div id="mapViewLayerListContainerDiv" class="animated fadeInRight" v-show="isShowLayerListWidget"></div>
        <!-- <div id="sceneViewMeasureDiv">
            <button id="sceneViewDistanceButton" class="action-button esri-icon-minus" type="button"
            title="测量2点或者多点之前的距离"></button>
            <button id="sceneViewAreaButton" class="action-button esri-icon-polygon" type="button"
            title="测量面积"></button>
        </div>
        <div id="mapViewMeasureDiv">
            <button id="mapViewDistanceButton" class="action-button esri-icon-minus" type="button"
            title="测量2点或者多点之前的距离"></button>
            <button id="mapViewAreaButton" class="action-button esri-icon-polygon" type="button"
            title="测量面积"></button>
        </div> -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { loadModules } from 'esri-loader'
import { setTimeout } from 'timers'

import { Message } from 'element-ui'

import { EventBus } from '@/event-bus/event-bus.js'

export default {
    name: 'EsriViewComponent',
    mounted () {
        let that = this

        // 初始化当前View
        this.initEsriView()

        // 监听缩放到指定区域
        EventBus.$on('zoomToSomeZone', function (zoneExtentParams) {
            loadModules([
                'esri/geometry/Extent',
                'esri/geometry/Geometry',
                'esri/geometry/SpatialReference'
            ]).then(([
                EsriExtent,
                EsriGeometry,
                EsriSpatialReference
            ]) => {
                let zoneExtent = new EsriExtent({
                    xmax: zoneExtentParams.right,
                    xmin: zoneExtentParams.left,
                    ymax: zoneExtentParams.top,
                    ymin: zoneExtentParams.bottom,
                    spatialReference: new EsriSpatialReference(zoneExtentParams.wkid)
                })

                that.activateView.goTo(zoneExtent)
            })
        })

        // 监听点击查询
        EventBus.$on('queryByClick', function () {
            that.queryByClick()
        })
    },
    computed: {
        ...mapState('esriViewVuex', {
            layerInfoFromNode: state => state.layerInfo,
            layerFilterParams: state => state.featureLayerFilterParams
        })
    },
    data: function () {
        return {
            esriSceneView: null,
            esriMapView: null,
            activateView: null,
            containerDiv: 'esriViewDiv',
            switchBtnText: '2D',
            isShowLayerListWidget: false
        }
    },
    methods: {
        /**
         * 初始化View
         */
        initEsriView: function () {
            let that = this

            that.showLoadingComponentAction().then(function () {
                let loading = that.$loading({
                    target: document.getElementById('loadingDiv'),
                    lock: false,
                    text: '正在初始化场景...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })

                loadModules([
                    'esri/Map',
                    'esri/views/MapView',
                    'esri/views/SceneView',
                    'esri/widgets/LayerList'
                ]).then(([
                    EsriMap,
                    EsriMapView,
                    EsriSceneView,
                    EsriLayerList
                ]) => {
                    let initialEsriViewParams = {
                        container: that.containerDiv
                    }

                    let esriMap = new EsriMap({
                        basemap: 'streets',
                        ground: 'world-elevation'
                    })

                    // 初始化SceneView
                    that.esriSceneView = createEsriView(initialEsriViewParams, '3d')
                    that.esriSceneView.map = esriMap

                    // SceneView添加LayerListWidget
                    let esriSceneViewLayerListWidget = new EsriLayerList({
                        view: that.esriSceneView,
                        container: 'sceneViewLayerListContainerDiv',
                        listItemCreatedFunction: that.layerListWidgetDefineActions
                    })
                    esriSceneViewLayerListWidget.on('trigger-action', that.layerListWidgetTriggerEvent)
                    that.esriSceneView.ui.add(esriSceneViewLayerListWidget)

                    // SceneView添加测量工具
                    // that.esriSceneView.ui.add('sceneViewMeasureDiv', 'top-right')

                    // 初始化MapView
                    initialEsriViewParams.container = null
                    that.esriMapView = createEsriView(initialEsriViewParams, '2d')
                    that.esriMapView.map = esriMap

                    // MapView添加LayerListWidget
                    let esriMapViewLayerListWidget = new EsriLayerList({
                        view: that.esriMapView,
                        container: 'mapViewLayerListContainerDiv',
                        listItemCreatedFunction: that.layerListWidgetDefineActions
                    })
                    esriMapViewLayerListWidget.on('trigger-action', that.layerListWidgetTriggerEvent)
                    that.esriMapView.ui.add(esriMapViewLayerListWidget)

                    // MapView添加测量工具
                    // that.esriMapView.ui.add('mapViewMeasureDiv', 'top-right')

                    // 设置当前激活的view
                    that.activateView = that.esriSceneView

                    // 监听View的加载完成事件
                    that.activateView.when(function () {
                        loading.close()
                        that.hideLoadingComponentAction()

                        if (that.$route.name === 'EsriViewPage') {
                            setTimeout(function () {
                                that.$router.push({
                                    name: 'CatalogTreePage'
                                })
                            }, 1000)
                        }
                    })

                    /**
                     * 根据参数和类型创建相对应的view实例
                     * @param {Object} esriViewParams 创建view所需的参数
                     * @param {string} esriViewParams.container view的容器div的id
                     * @param {string} type 创建view的类型，从'2d'和'3d'中选择
                     */
                    function createEsriView (esriViewParams, type) {
                        let esriView = null
                        let is2D = type === '2d'

                        if (is2D) {
                            esriView = new EsriMapView(esriViewParams)
                        } else {
                            esriView = new EsriSceneView(esriViewParams)
                        }

                        return esriView
                    }
                })
            })
        },
        /**
         * MapView和SceneView的切换
         */
        switchBetween2DAnd3D: function () {
            let is3D = this.activateView.type === '3d'
            let activeViewPoint = this.activateView.viewpoint.clone()

            this.activateView.container = null

            if (is3D) {
                this.esriMapView.viewpoint = activeViewPoint
                this.esriMapView.container = this.containerDiv
                this.activateView = this.esriMapView
                this.switchBtnText = '3D'
            } else {
                this.esriSceneView.viewpoint = activeViewPoint
                this.esriSceneView.container = this.containerDiv
                this.activateView = this.esriSceneView
                this.switchBtnText = '2D'
            }
        },
        /**
         * 添加图层到View中
         * @param {Object} layerInfo 需要添加的图层信息
         * @param {string} layerInfo.type 图层类型
         * @param {string} layerInfo.url 图层地址
         */
        addLayerToView: function (layerInfo) {
            switch (layerInfo.type) {
                case 'TileLayer': {
                    this.addVectorTileLayerToView(layerInfo)
                    break
                }
                case 'FeatureLayer': {
                    this.addFeatureLayerToView(layerInfo)
                    break
                }
                default: {
                }
            }

            this.isShowLayerListWidget = true
        },
        /**
         * 添加矢量切片图层
         * @param {Object} layerInfo 需要添加的图层信息
         * @param {string} layerInfo.type 图层类型
         * @param {string} layerInfo.url 图层地址
         */
        addVectorTileLayerToView: function (layerInfo) {
            let that = this

            // 显示Loading组件，图层加载完毕后关闭Loading组件
            that.showLoadingComponentAction().then(function () {
                const loading = that.$loading({
                    target: document.getElementById('loadingDiv'),
                    lock: false,
                    text: '正在加载图层...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })

                loadModules([
                    'esri/layers/VectorTileLayer'
                ]).then(([
                    EsriVectorTileLayer
                ]) => {
                    let esriVectorTileLayer = new EsriVectorTileLayer({
                        url: layerInfo.url
                    })

                    esriVectorTileLayer.when(function () {
                        that.activateView.goTo(
                            esriVectorTileLayer.fullExtent.extent
                        )

                        // 关闭Loading组件
                        loading.close()
                        that.hideLoadingComponentAction()
                    })

                    that.activateView.map.removeAll()
                    that.activateView.map.add(esriVectorTileLayer)
                })
            })
        },
        /**
         * 添加要素图层
         * @param {Object} layerInfo 需要添加的图层信息
         * @param {string} layerInfo.type 图层类型
         * @param {string} layerInfo.url 图层地址
         * @param {string} layerInfo.title 图层标题
         */
        addFeatureLayerToView: function (layerInfo) {
            let that = this

            // 显示Loading组件
            that.showLoadingComponentAction().then(function () {
                const loading = that.$loading({
                    target: document.getElementById('loadingDiv'),
                    lock: false,
                    text: '正在加载图层...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })

                loadModules([
                    'esri/layers/FeatureLayer'
                ]).then(([
                    EsriFeatureLayer
                ]) => {
                    let esriFeatureLayer = new EsriFeatureLayer({
                        url: layerInfo.url,
                        title: layerInfo.title
                    })

                    esriFeatureLayer.when(function () {
                        that.activateView.goTo(
                            esriFeatureLayer.fullExtent.extent
                        )

                        // 获取图层的统计信息
                        that.gatherStatisticsOfFeatureLayer(esriFeatureLayer)

                        // 关闭Loading组件
                        loading.close()
                        that.hideLoadingComponentAction()
                    })

                    esriFeatureLayer.on('layerview-destroy', function () {
                        esriFeatureLayer.popupTemplate = null

                        that.activateView.popup.close()

                        that.setActivateMenuIndexAction('-1')
                    })

                    that.activateView.map.removeAll()
                    that.activateView.map.add(esriFeatureLayer)
                })
            })
        },
        /**
         * 统计要素图层的信息
         * @param {Object} featureLayer 要统计的要素图层
         */
        gatherStatisticsOfFeatureLayer: function (featureLayer) {
            let that = this

            const statisticsFields = [
                'POPU',
                'POPU_94'
            ]

            const statisticDefinitiond = statisticsFields.map(function (fieldName) {
                return {
                    onStatisticField: fieldName,
                    outStatisticFieldName: fieldName + '_TOTAL',
                    statisticType: 'sum'
                }
            })

            const query = featureLayer.createQuery()
            query.outStatistics = statisticDefinitiond
            query.geometry = featureLayer.fullExtent.extent

            featureLayer.queryFeatures(query).then(function (response) {
                if (response.features.length > 0) {
                    that.$router.push({
                        name: 'StatisticsResultPage'
                    })

                    let attributes = response.features[0].attributes

                    that.transferEChartContentAction({
                        titleText: '图层统计结果',
                        titleSubText: '纯属虚构',
                        eChartName: '图层统计结果',
                        eChartData: [
                            {
                                value: attributes['POPU_TOTAL'],
                                name: 'POPU_TOTAL',
                                filed: 'NAMEEN',
                                filedValue: 'Qinghai'
                            }, {
                                value: attributes['POPU_94_TOTAL'],
                                name: 'POPU_94_TOTAL',
                                filed: 'NAMEEN',
                                filedValue: 'Gansu'
                            }
                        ]
                    })
                } else {
                    return {}
                }
            })
        },
        /**
         * LayerListWidget微件的listItemCreatedFunction定义
         * @param {Object} event
         */
        layerListWidgetDefineActions: function (event) {
            let item = event.item

            item.actionsSections = [
                [
                    {
                        title: '缩放至图层范围',
                        className: 'esri-icon-zoom-out-fixed',
                        id: 'full-extent'
                    }, {
                        title: '图层信息',
                        className: 'esri-icon-description',
                        id: 'information'
                    }
                ]
            ]
        },
        /**
         * LayerListWidget图层的Item对应的操作事件
         * @param {Object} event
         */
        layerListWidgetTriggerEvent: function (event) {
            let actionId = event.action.id
            let targetLayer = event.item.layer

            if (actionId === 'full-extent') {
                this.activateView.goTo(targetLayer.fullExtent)
            } else if (actionId === 'information') {
                window.open(targetLayer.url)
            }
        },
        /**
         * 生成要素图层的PopupTemplate
         * @return {Object} 要素图层的PopupTemplate
         */
        generateFeatureLayerPopupTemplate: function () {
            let featureLayerPopupTemplate = {
                title: '{NAME}',
                content: [
                    {
                        type: 'fields',
                        fieldInfos: [
                            {
                                fieldName: 'NAME',
                                label: '名称'
                            },
                            {
                                fieldName: 'AREA',
                                label: '面积'
                            }
                        ]
                    }
                ]
            }

            return featureLayerPopupTemplate
        },
        /**
         * 点击查询要素图层的属性
         */
        queryByClick: function () {
            let esriViewLayers = this.activateView.map.layers.items
            let featureLayer = null
            for (let index = 0; index < esriViewLayers.length; index++) {
                let esriViewLayer = esriViewLayers[index]

                if (esriViewLayer.type === 'feature') {
                    featureLayer = esriViewLayer
                    break
                }
            }

            if (featureLayer) {
                featureLayer.popupTemplate = this.generateFeatureLayerPopupTemplate()

                Message({
                    message: '点击要素图层查看其属性信息',
                    type: 'success'
                })
            } else {
                Message({
                    message: '请加载相应的要素图层',
                    type: 'warning'
                })
            }
        },
        ...mapActions({
            showLoadingComponentAction: 'esriViewVuex/showLoadingComponent',
            hideLoadingComponentAction: 'esriViewVuex/hideLoadingComponent',
            transferEChartContentAction: 'esriViewVuex/transferEChartContent',
            setActivateMenuIndexAction: 'esriViewVuex/setActivateMenuIndex'
        })
    },
    watch: {
        layerInfoFromNode (newValue) {
            this.addLayerToView(newValue)
        },
        layerFilterParams (newValue) {
            let definitionExpression = newValue['filed'] + ' = \'' + newValue['filedValue'] + '\''

            let featureLayer = this.activateView.map.layers.items[0]
            featureLayer.definitionExpression = definitionExpression
            featureLayer.refresh()
        },
        zoomToZone (zoneExtent) {

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* 引用ArcGIS API For JS的样式文件 */
@import url('https://js.arcgis.com/4.12/esri/themes/dark/main.css');

/* 设置存储View的Div的高度和宽度 */
#esriViewDiv {
    position: absolute;
    top: 64px;
    bottom: 0;
    left: 0;
    right: 0;
}

/* 设置View的外边框 */
.esri-view .esri-view-surface--inset-outline:focus::after {
    outline: auto 0 Highlight !important;
}

/* 设置二三维切换按钮的div和input样式 */
#switchBtnDiv {
    position: absolute;
    right: 15px;
    bottom: 20px;
}
#switchBtnDiv input {
    border: none;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px;
}

/* SceneView中存放LayerListWidget的div样式 */
#sceneViewLayerListContainerDiv {
    top: 15px;
    right: 0px;
}

/* MapView中存放LayerListWidget的div样式 */
#mapViewLayerListContainerDiv {
    top: 15px;
    right: 0px;
}
</style>
