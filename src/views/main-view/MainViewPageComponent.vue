<template>
    <div>
        <header-bar-component id="headerBarComponent"></header-bar-component>
        <div id="esriViewComponentDiv">
            <esri-view-component ref="esriViewComponent" @esriViewLoaded="esriViewLoaded"></esri-view-component>
        </div>
        <catalog-tree-with-span-component v-if="isShowCatalogTree"></catalog-tree-with-span-component>
        <function-button-group-component id="functionButtonGroupComponent" v-if="isShowButtonGroup"></function-button-group-component>
        <statistical-result-component v-if="isShowStatisticalResult"></statistical-result-component>
    </div>
</template>

<script src="./main-view-page-component.js"></script>

<style src="./main-view-page-component.css"></style>
