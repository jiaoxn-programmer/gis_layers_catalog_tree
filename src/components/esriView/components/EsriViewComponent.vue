<template>
    <div id="esriViewDiv">
        <div id="switchBtnDiv">
            <input id="switchBtn" type="button" v-model="switchBtnText"
            class="esri-component esri-widget-button esri-widget esri-interactive"
            @click="switchBetween2DAnd3D"
            />
        </div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader'

export default {
    name: 'EsriViewComponent',
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
