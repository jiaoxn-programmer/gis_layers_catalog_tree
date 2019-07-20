<template>
    <el-container>
        <el-main>
            <esri-view-component></esri-view-component>
        </el-main>
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
