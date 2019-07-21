<template>
    <div id="pieChartDiv">
        <v-chart :options='pie' @click="pieChartClick"></v-chart>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
    name: 'EChartPie',
    components: {
        'v-chart': ECharts
    },
    mounted () {
        this.pie = {
            title: {
                text: this.getEChartContent['titleText'],
                subtext: this.getEChartContent['titleSubText'],
                x: 'center',
                textStyle: {
                    color: 'white',
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
                {
                    name: this.getEChartContent['eChartName'],
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '60%'],
                    data: this.getEChartContent['eChartData'],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    },
    computed: {
        getEChartContent () {
            return this.eChartContentGetter
        },
        ...mapGetters('statisticsResult', {
            eChartContentGetter: 'eChartContent'
        })
    },
    data: function () {
        return {
            pie: {}
        }
    },
    methods: {
        pieChartClick (event) {
            let pieChartItemData = event.data

            this.eChartItemClickAction(pieChartItemData)
        },
        ...mapActions({
            eChartItemClickAction: 'statisticsResult/eChartItemClick'
        })
    }
}
</script>

<style scoped>
.echarts {
    width: 300px;
    height: 200px;
}
</style>
