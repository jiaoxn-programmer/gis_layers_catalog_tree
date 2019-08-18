<template>
    <div id="statisticalResultComponentDiv" class="animated" :class="{'fadeInDown': isShowEChartPie, 'fadeOutUp': !isShowEChartPie}">
       <echart-pie-component></echart-pie-component>
       <span class="top-click-span el-icon-more" @click="changeStatisticalResultDisplayStatus"></span>
    </div>
</template>

<script src='./statistical-result-component.js'></script>

<style src='./statistical-result-component.css'></style>
