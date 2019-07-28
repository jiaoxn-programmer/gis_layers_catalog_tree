<template>
    <div>
        <div id="statisticsResultDiv">
            <echartPie id="echartPieDiv"></echartPie>
            <span class="click-span bottom-click-span el-icon-more" @click="handleBottomAnimate"></span>
        </div>
    </div>
</template>

<script>
import EChartPie from '../components/EChartPie'

export default {
    name: 'StatisticsResultPage',
    data: function () {
        return {
            isShowStatisticResultComponent: true
        }
    },
    components: {
        'echartPie': EChartPie
    },
    methods: {
        handleBottomAnimate: function () {
            let treeContentDiv = document.getElementById('statisticsResultDiv')
            let echartPieDiv = document.getElementById('echartPieDiv')

            if (this.isShowStatisticResultComponent) {
                let treeContentDivWidth = treeContentDiv.offsetWidth
                treeContentDiv.style.width = treeContentDivWidth.toString() + 'px'
                treeContentDiv.style.minHeight = '18px'

                echartPieDiv.style.display = 'none'

                this.isShowStatisticResultComponent = false
            } else {
                echartPieDiv.style.display = 'block'
                this.isShowStatisticResultComponent = true
            }
        }
    }
}
</script>

<style scoped>
@import url('../../../assets/css/global.css');

#statisticsResultDiv {
    position: absolute;
    left: 50%;
    bottom: 16px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.4);
}

#echartPieDiv {
    padding-top: 15px
}

.bottom-click-span {
    top: 0px;
    left: 50%;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
}
</style>
