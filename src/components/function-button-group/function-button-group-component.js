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
        }
    },
    data () {
        return {

        }
    }
}
