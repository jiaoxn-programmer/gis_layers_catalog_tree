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
@import url('https://js.arcgis.com/4.12/esri/themes/light/main.css');

#esriViewDiv {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
