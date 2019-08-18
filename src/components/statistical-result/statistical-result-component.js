/**
 * @file 统计结果组件对应的JS文件
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import EChartPieComponent from '@/components/echart-pie/EChartPieComponent'

export default {
    name: 'StatisticalResultComponent',
    components: {
        'echart-pie-component': EChartPieComponent
    },
    data () {
        return {
            isShowEChartPie: true
        }
    },
    methods: {
        /**
         * 切换统计结果组件的显示状态
         */
        changeStatisticalResultDisplayStatus: function () {
            this.isShowEChartPie = !this.isShowEChartPie
        }
    }
}
