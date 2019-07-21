<template>
    <div id="esriViewDiv"
    v-loading="false"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div id="switchBtnDiv">
            <input id="switchBtn" type="button" v-model="switchBtnText"
            class="esri-component esri-widget-button esri-widget esri-interactive"
            @click="switchBetween2DAnd3D"
            />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { loadModules } from 'esri-loader'
import { setTimeout } from 'timers'

export default {
    name: 'EsriViewComponent',
    mounted () {
        // 初始化当前View
        this.initEsriView()
    },
    computed: {
        ...mapState('esriViewVuex', {
            layerInfoFromNode: state => state.layerInfo
        })
    },
    data: function () {
        return {
            esriSceneView: null,
            esriMapView: null,
            activateView: null,
            containerDiv: 'esriViewDiv',
            switchBtnText: '2D'
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
                    'esri/views/SceneView'
                ]).then(([
                    EsriMap,
                    EsriMapView,
                    EsriSceneView
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
                    that.activateView = that.esriSceneView

                    // 初始化MapView
                    initialEsriViewParams.container = null
                    that.esriMapView = createEsriView(initialEsriViewParams, '2d')
                    that.esriMapView.map = esriMap

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
            let that = this
            let loading = null

            switch (layerInfo.type) {
                case 'TileLayer': {
                    // 显示Loading组件，图层加载完毕后关闭Loading组件
                    that.showLoadingComponentAction().then(function () {
                        loading = that.$loading({
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
                    break
                }
                case 'FeatureLayer': {
                    // 显示Loading组件
                    that.showLoadingComponentAction().then(function () {
                        loading = that.$loading({
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
                                url: layerInfo.url
                            })

                            esriFeatureLayer.when(function () {
                                that.activateView.goTo(
                                    esriFeatureLayer.fullExtent.extent
                                )

                                // 关闭Loading组件
                                loading.close()
                                that.hideLoadingComponentAction()
                            })

                            that.activateView.map.removeAll()
                            that.activateView.map.add(esriFeatureLayer)
                        })
                    })
                    break
                }
                default: {
                }
            }
        },
        ...mapActions({
            showLoadingComponentAction: 'esriViewVuex/showLoadingComponent',
            hideLoadingComponentAction: 'esriViewVuex/hideLoadingComponent'
        })
    },
    watch: {
        layerInfoFromNode (newValue) {
            this.addLayerToView(newValue)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* 引用ArcGIS API For JS的样式文件 */
@import url('https://js.arcgis.com/4.12/esri/themes/light/main.css');

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
</style>
