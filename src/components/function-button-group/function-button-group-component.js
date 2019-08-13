/**
 * @file FunctionButtonGroup组件对应的JS文件
 * @author JiaoXiangNing(2438822080@qq.com)
 */

export default {
    name: 'FunctionButtonGroup',
    methods: {
        /**
         * 测量按钮的点击函数
         */
        measurementOnEsriView: function () {
            this.$parent.handleFunctionButtonClick('measurement')
        }
    },
    data () {
        return {

        }
    }
}
