<template>
    <div id="pieChartDiv">
        <v-chart :options='pie' @click="pieChartClick"></v-chart>
    </div>
</template>

<script src='./echart-pie-component.js'></script>

<style scoped src='./echart-pie-component.css'></style>
