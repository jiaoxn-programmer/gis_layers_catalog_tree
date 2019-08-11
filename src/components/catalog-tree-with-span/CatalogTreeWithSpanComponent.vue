<template>
    <div id="catalogTreeWithSpanComponent" class="animated" :class="{'fadeInLeft': isShowCatalogTree, 'fadeOutLeft': !isShowCatalogTree}">
        <catalog-tree-component id="catalogTreeComponent"></catalog-tree-component>
        <span class="click-span left-click-span el-icon-more" @click="changeCatalogTreeDisplayStatus"></span>
    </div>
</template>

<script src="./catalog-tree-with-span-component.js"></script>

<style src="./catalog-tree-with-span-component.css"></style>
