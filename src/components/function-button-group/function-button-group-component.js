/**
 * @file FunctionButtonGroup组件对应的JS文件
 * @author JiaoXiangNing(2438822080@qq.com)
 */

export default {
    name: 'FunctionButtonGroup',
    methods: {
        /**
         * 距离测量按钮的点击函数
         */
        measureLengthOnEsriView: function () {
            this.$parent.handleFunctionButtonClick('lengthMeasurement')
        },
        /**
         * 面积测量按钮的点击函数
         */
        measureAreaOnEsriView: function () {
            this.$parent.handleFunctionButtonClick('areaMeasurement')
        },
        /**
         * 框选统计按钮的点击函数
         */
        frameSelectionStatisticsOnEsriView: function () {
            this.$parent.handleFunctionButtonClick('frameSelectionStatistics')
        },
        /**
         * 区域查询按钮的点击函数
         */
        regionalQueryOnEsriView: function () {
            this.$parent.handleFunctionButtonClick('regionalQuery')
        },
        /**
         * 打印地图按钮的点击函数
         */
        printOnEsriView: function () {
            this.$parent.handleFunctionButtonClick('print')
        },
        /**
         * 上传文件按钮的点击函数
         */
        uploadOnEsriView: function () {
            this.$parent.handleFunctionButtonClick('upload')
        }
    },
    data () {
        return {

        }
    }
}
