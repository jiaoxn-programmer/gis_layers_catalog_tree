<template>
    <div id="statisticsResultDiv">
        <echartPie></echartPie>
    </div>
</template>

<script>
import EChartPie from '../components/EChartPie'

export default {
    name: 'StatisticsResultPage',
    components: {
        'echartPie': EChartPie
    }
}
</script>

<style scoped>
#statisticsResultDiv {
    position: absolute;
    top: 50%;
    right: 0;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.4);
}
</style>
