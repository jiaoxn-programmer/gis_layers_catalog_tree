<template>
    <div>
        <div id="catalogTreeDiv" class="animated" :class="{'fadeInLeft': isShowTreeComponent, 'fadeOutLeft': !isShowTreeComponent}">
            <catalog-tree-component style="padding-right: 15px"></catalog-tree-component>
            <span class="click-span left-click-span el-icon-more" @click="handleLeftAnimate"></span>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import CatalogTreeComponent from '@/components/catalogTree/components/CatalogTreeComponent'

export default {
    name: 'CatalogTreePage',
    data: function () {
        return {
            isShowTreeComponent: true
        }
    },
    components: {
        'catalog-tree-component': CatalogTreeComponent
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

.left-click-span {
    right: -4px;
    -ms-transform: translateY(-50%) rotate(90deg);
    transform: translateY(-50%) rotate(90deg);
}
</style>
