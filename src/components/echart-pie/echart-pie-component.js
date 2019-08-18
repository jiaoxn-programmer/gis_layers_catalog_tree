/**
 * @file EChart组件对应的JS文件
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import { mapGetters, mapActions } from 'vuex'

import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

import { EventBus } from '@/event-bus/event-bus.js'

export default {
    name: 'EChartPie',
    components: {
        'v-chart': ECharts
    },
    mounted () {
        this.initializeEChart()
    },
    computed: {
        ...mapGetters('statisticalResult', {
            eChartContentGetter: 'eChartContent'
        })
    },
    data: function () {
        return {
            pie: {}
        }
    },
    methods: {
        /**
         * 初始化当前组件
         */
        initializeEChart () {
            this.pie = {
                title: {
                    text: this.eChartContentGetter['titleText'],
                    subtext: this.eChartContentGetter['titleSubText'],
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
                        name: this.eChartContentGetter['eChartName'],
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '60%'],
                        data: this.eChartContentGetter['eChartData'],
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
        pieChartClick (event) {
            let pieChartItemData = event.data

            this.eChartItemClickAction(pieChartItemData)
        },
        ...mapActions({
            eChartItemClickAction: 'statisticalResult/eChartItemClick'
        })
    }
}
