<template>
    <div>
        <div id="catalogTreeDiv">
            <catalog-tree-component></catalog-tree-component>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import CatalogTreeComponent from '@/components/catalogTree/components/CatalogTreeComponent'

export default {
    name: 'CatalogTreePage',
    components: {
        'catalog-tree-component': CatalogTreeComponent
    }
}
</script>

<style scoped>
/* 目录树组件最外侧Div */
#catalogTreeDiv {
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
</style>
