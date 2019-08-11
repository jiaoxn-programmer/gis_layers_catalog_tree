<template>
    <div>
        <header-bar-component id="headerBarComponent"></header-bar-component>
        <div id="esriViewComponentDiv">
            <esri-view-component ref="esriViewComponent" @esriViewLoaded="esriViewLoaded"></esri-view-component>
        </div>
        <!-- <div id="catalogTreeDiv" >
        </div> -->
        <catalog-tree-with-span-component v-if="isShowCatalogTree"></catalog-tree-with-span-component>
    </div>
</template>

<script src="./main-view-page-component.js"></script>

<style src="./main-view-page-component.css"></style>
