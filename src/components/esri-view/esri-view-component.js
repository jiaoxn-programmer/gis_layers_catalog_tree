/**
 * @file EsriViewComponent组件对应的JS文件
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import { loadModules } from 'esri-loader'

export default {
    name: 'EsriViewComponent',
    props: [
        'portalInfo'
    ],
    mounted () {
        // 初始化当前View
        this.initEsriView()
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

            loadModules([
                'esri/config',
                'esri/Map',
                'esri/views/MapView',
                'esri/views/SceneView'
            ]).then(([
                EsriConfig,
                EsriMap,
                EsriMapView,
                EsriSceneView
            ]) => {
                // 设置Portal的URL地址
                if (that.portalInfo && that.portalInfo.hasOwnProperty('url')) {
                    EsriConfig.portalUrl = that.portalInfo['url']
                }

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

                // 初始化MapView
                initialEsriViewParams.container = null
                that.esriMapView = createEsriView(initialEsriViewParams, '2d')
                that.esriMapView.map = esriMap

                // 设置当前激活的view
                that.activateView = that.esriSceneView

                // 监听View的加载完成事件
                that.activateView.when(function () {
                    that.$emit('esriViewLoaded')
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
         * 加载WebMap
         * @param {String} itemId
         */
        loadWebMapByItemId: function (itemId) {
            let that = this

            loadModules([
                'esri/WebMap'
            ]).then(([
                EsriWebMap
            ]) => {
                let webMap = EsriWebMap({
                    portalItem: {
                        id: itemId
                    }
                })

                that.activateView.map = webMap
            })
        }
    }
}
