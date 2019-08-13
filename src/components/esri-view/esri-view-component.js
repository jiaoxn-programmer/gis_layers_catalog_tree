/**
 * @file EsriViewComponent组件对应的JS文件
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import { loadModules } from 'esri-loader'

import { EventBus } from '@/event-bus/event-bus'

export default {
    name: 'EsriViewComponent',
    props: [
        'portalInfo'
    ],
    mounted () {
        let that = this

        // 初始化当前View
        this.initEsriView()

        // 监听测量事件
        EventBus.$on('MEASUREMENT_ON_ESRI_VIEW', () => {
            that.measurementOnEsriView()
        })
    },
    data: function () {
        return {
            esriSceneView: null,
            esriMapView: null,
            activateView: null,
            containerDiv: 'esriViewDiv',
            switchBtnText: '2D',
            layerListWidget: null,
            measurementWidget: null,
            isMeasurement: false
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

            // 销毁测量微件
            this.isMeasurement = false
            this.setActiveMeasureWidget(null)

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
                'esri/WebMap',
                'esri/widgets/LayerList'
            ]).then(([
                EsriWebMap,
                EsriLayerList
            ]) => {
                // 实例化WebMap
                let webMap = new EsriWebMap({
                    portalItem: {
                        id: itemId
                    }
                })

                // 如果当前存在列表组件，则先销毁，再创建
                if (that.layerListWidget) {
                    that.layerListWidget.destroy()
                }

                // 创建新的列表组件
                that.layerListWidget = new EsriLayerList({
                    view: that.activateView,
                    listItemCreatedFunction: defineActions
                })
                that.layerListWidget.on('trigger-action', layerListItemClickEvent)

                // 列表组件添加到当前视图中
                that.activateView.map = webMap
                that.activateView.ui.add(that.layerListWidget, 'top-right')
            })

            // 定义LayerList组件的Item操作选项
            function defineActions (event) {
                let item = event.item

                item.actionsSections = [
                    [
                        {
                            title: '缩放至图层',
                            className: 'esri-icon-zoom-out-fixed',
                            id: 'full-extent'
                        },
                        {
                            title: '查看图层信息',
                            className: 'esri-icon-description',
                            id: 'information'
                        }
                    ],
                    [
                        {
                            title: '增加图层透明度',
                            className: 'esri-icon-up',
                            id: 'increase-opacity'
                        },
                        {
                            title: '减小图层透明度',
                            className: 'esri-icon-down',
                            id: 'decrease-opacity'
                        }
                    ]
                ]
            }

            // LayerList组件的Item点击事件
            function layerListItemClickEvent (event) {
                let targetLayer = event.item.layer
                let id = event.action.id

                if (id === 'full-extent') {
                    that.activateView.goTo(targetLayer.fullExtent)
                } else if (id === 'information') {
                    window.open(targetLayer.url)
                } else if (id === 'increase-opacity') {
                    if (targetLayer.opacity < 1) {
                        targetLayer.opacity += 0.25
                    }
                } else if (id === 'decrease-opacity') {
                    if (targetLayer.opacity > 0) {
                        targetLayer.opacity -= 0.25
                    }
                }
            }
        },
        /**
         * 执行距离测量
         */
        measurementOnEsriView: function () {
            let that = this

            if (this.isMeasurement) {
                this.setActiveMeasureWidget(null)
                this.isMeasurement = false
            } else {
                this.isMeasurement = true

                setTimeout(function () {
                    that.activateView.ui.add('topBarDiv', 'top-right')

                    document.getElementById('distanceButton').addEventListener('click', function () {
                        that.setActiveMeasureWidget(null)

                        if (!this.classList.contains('active')) {
                            that.setActiveMeasureWidget('distance')
                        } else {
                            that.setActiveMeasureWidget(null)
                        }
                    })

                    document.getElementById('areaButton').addEventListener('click', function () {
                        that.setActiveMeasureWidget(null)

                        if (!this.classList.contains('active')) {
                            that.setActiveMeasureWidget('area')
                        } else {
                            that.setActiveMeasureWidget(null)
                        }
                    })
                }, 500)
            }
        },
        /**
         * 设置当前正在使用的测试微件
         * @param {String} type 组件类型
         */
        setActiveMeasureWidget: function (type) {
            switch (type) {
                case 'distance':
                    if (this.activateView.type === '2d') {
                        this.measureDistanceOnMapView()
                    } else {
                        this.measureDistanceOnSceneView()
                    }
                    break
                case 'area':
                    if (this.activateView.type === '2d') {
                        this.measureAreaOnMapView()
                    } else {
                        this.measureAreaOnSceneView()
                    }
                    break
                case null:
                    if (this.measurementWidget) {
                        this.activateView.ui.remove(this.measurementWidget)
                        this.measurementWidget.destroy()
                        this.measurementWidget = null
                    }
                    break
            }
        },
        /**
         * 在SceneView中执行距离测量功能
         */
        measureDistanceOnSceneView: function () {
            let that = this

            loadModules([
                'esri/widgets/DirectLineMeasurement3D'
            ]).then(([
                EsriDirectLineMeasurement3D
            ]) => {
                that.measurementWidget = new EsriDirectLineMeasurement3D({
                    view: that.activateView
                })

                that.measurementWidget.viewModel.newMeasurement()
                that.activateView.ui.add(that.measurementWidget, 'top-right')
                that.setActiveButton(document.getElementById('distanceButton'))
            })
        },
        /**
         * 在MapView中执行距离测量功能
         */
        measureDistanceOnMapView: function () {
            let that = this

            loadModules([
                'esri/widgets/DistanceMeasurement2D'
            ]).then(([
                EsriDistanceMeasurement2D
            ]) => {
                that.measurementWidget = new EsriDistanceMeasurement2D({
                    view: that.activateView
                })

                that.measurementWidget.viewModel.newMeasurement()
                that.activateView.ui.add(that.measurementWidget, 'top-right')
                that.setActiveButton(document.getElementById('distanceButton'))
            })
        },
        /**
         * 在SceneView中执行面积测量功能
         */
        measureAreaOnSceneView: function () {
            let that = this

            loadModules([
                'esri/widgets/AreaMeasurement3D'
            ]).then(([
                EsriAreaMeasurement3D
            ]) => {
                that.measurementWidget = new EsriAreaMeasurement3D({
                    view: that.activateView
                })

                that.measurementWidget.viewModel.newMeasurement()
                that.activateView.ui.add(that.measurementWidget, 'top-right')
                that.setActiveButton(document.getElementById('areaButton'))
            })
        },
        /**
         * 在MapView中执行面积测量功能
         */
        measureAreaOnMapView: function () {
            let that = this

            loadModules([
                'esri/widgets/AreaMeasurement2D'
            ]).then(([
                EsriAreaMeasurement2D
            ]) => {
                that.measurementWidget = new EsriAreaMeasurement2D({
                    view: that.activateView
                })

                that.measurementWidget.viewModel.newMeasurement()
                that.activateView.ui.add(that.measurementWidget, 'top-right')
                that.setActiveButton(document.getElementById('areaButton'))
            })
        },
        setActiveButton: function (selectedButton) {
            this.activateView.focus()

            let elements = document.getElementsByClassName('active')

            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove('active')
            }
            if (selectedButton) {
                selectedButton.classList.add('active')
            }
        }
    }
}
