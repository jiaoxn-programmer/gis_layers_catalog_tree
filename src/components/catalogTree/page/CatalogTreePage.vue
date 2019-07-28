<template>
    <div>
        <div id="catalogTreeDiv" class="animated" :class="{'fadeInLeft': isShowTreeComponent, 'fadeOutLeft': !isShowTreeComponent}">
            <catalog-tree-component style="padding-right: 15px"></catalog-tree-component>
            <span class="click-span left-click-span el-icon-more" @click="handleLeftAnimate"></span>
        </div>
        <div id="functionMenuComponentDiv">
            <function-menu-component id="functionMenuComponent" style="padding-bottom: 15px"></function-menu-component>
            <span class="top-click-span el-icon-more" @click="handleTopAnimate"></span>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import CatalogTreeComponent from '@/components/catalogTree/components/CatalogTreeComponent'
import FunctionMenuComponent from '@/components/functionMenu/components/FunctionMenuComponent'

export default {
    name: 'CatalogTreePage',
    data: function () {
        return {
            isShowTreeComponent: true,
            isShowFunctionMenuComponent: true
        }
    },
    components: {
        'catalog-tree-component': CatalogTreeComponent,
        'function-menu-component': FunctionMenuComponent
    },
    methods: {
        handleLeftAnimate: function () {
            let treeContentDiv = document.getElementById('catalogTreeDiv')

            if (treeContentDiv.style.left === '' || treeContentDiv.style.left === '0px') {
                let treeContentDivWidth = treeContentDiv.offsetWidth
                treeContentDiv.style.left = (0 - treeContentDivWidth + 10).toString() + 'px'

                this.isShowTreeComponent = false
            } else {
                treeContentDiv.style.left = '0px'
                this.isShowTreeComponent = true
            }
        },
        handleTopAnimate: function () {
            let treeContentDiv = document.getElementById('functionMenuComponentDiv')
            let echartPieDiv = document.getElementById('functionMenuComponent')

            if (this.isShowFunctionMenuComponent) {
                let treeContentDivWidth = treeContentDiv.offsetWidth
                treeContentDiv.style.width = treeContentDivWidth.toString() + 'px'
                treeContentDiv.style.minHeight = '18px'

                echartPieDiv.style.display = 'none'

                this.isShowFunctionMenuComponent = false
            } else {
                echartPieDiv.style.display = 'block'
                this.isShowFunctionMenuComponent = true
            }
        }
    }
}
</script>

<style>
@keyframes fadeInLeft {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(100%, 50%, 0);
        transform: translate(-100%, -50%);
    }

    100% {
        opacity: 1;
        -webkit-transform: translate3d(0, -50%, 0);
        transform: translate(0, -50%);
    }
}

@keyframes fadeOutLeft {
    0% {
        opacity: 0;
        transform: translate3d(100%, -50%, 0);
    }

    100% {
        opacity: 1;
        transform: translate3d(0%, -50%, 0);
    }
}
</style>

<style scoped>
@import url('../../../assets/css/global.css');

/* 目录树组件最外侧Div */
#catalogTreeDiv {
    position: absolute;
    top: 50%;
    background-color: rgba(1, 6, 17, 0.8);
}

/* 功能菜单组件最外侧Div */
#functionMenuComponentDiv {
    position: absolute;
    left: 50%;
     -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: rgba(1, 6, 17, 0.6);
}

.left-click-span {
    right: -4px;
    -ms-transform: translateY(-50%) rotate(90deg);
    transform: translateY(-50%) rotate(90deg);
}

.top-click-span {
    position: absolute;
    color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    cursor: pointer;
    z-index: 9999;
    left: 50%;
    bottom: 0px;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
}
</style>
