<template>
    <div id="esriViewDiv">
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
            esriSceneView: null
        }
    },
    methods: {
        initEsriView: function () {
            let that = this

            const options = {
                css: true
            }

            loadModules([
                'esri/Map',
                'esri/views/SceneView'
            ], options).then(([
                EsriMap,
                EsriSceneView
            ]) => {
                let esriMap = new EsriMap({
                    basemap: 'streets',
                    ground: 'world-elevation'
                })

                that.esriSceneView = new EsriSceneView({
                    container: 'esriViewDiv',
                    map: esriMap,
                    scale: 50000000,
                    center: [-101.17, 21.78]
                })
            })
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
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

/* 设置View的外边框 */
.esri-view .esri-view-surface--inset-outline:focus::after {
    outline: auto 0 Highlight !important;
}

/* 设置按钮的Top属性 */
.esri-ui {
    top: 80px !important;
}
</style>
