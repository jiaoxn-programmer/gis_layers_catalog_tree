<template>
    <el-container>
        <esri-view-component></esri-view-component>
        <router-view></router-view>
    </el-container>
</template>

<script>
import EsriViewComponent from '@/components/esriView/components/EsriViewComponent'

export default {
    name: 'EsriViewPage',
    components: {
        'esri-view-component': EsriViewComponent
    }
}
</script>

<style scoped>

</style>
