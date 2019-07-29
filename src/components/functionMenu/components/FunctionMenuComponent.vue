<template>
    <el-menu default-active="activateMenuIndex" mode="horizontal" background-color="rgba(1, 6, 17, 0.8)"
    @select="handleSelect" text-color="#FFF" active-text-color="#FFD04B">
        <el-submenu index="1">
            <template slot="title">选择区域</template>
            <el-submenu index="1-1">
                <template slot="title">成都市</template>
                <el-menu-item index="1-1-1">青羊区</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="2">测量</el-menu-item>
        <el-submenu index="3">
            <template slot="title">地理查询</template>
            <el-menu-item index="3-1">框选查询</el-menu-item>
            <el-menu-item index="3-2">点击查询</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
import { EventBus } from '@/event-bus/event-bus.js'

export default {
    name: 'FunctionMenuComponent',
    data: function () {
        return {
            activateMenuIndex: '1'
        }
    },
    methods: {
        handleSelect (key, keyPath) {
            if (key === '2') {
                this.geographicSurevey()
            } else if (key === '3-1') {
                this.queryByExtent()
            } else if (key === '3-2') {
                this.queryByClick()
            } else if (key === '1-1-1') {
                this.zoomToSomeZone(key)
            }
        },
        /**
         * 缩放到指定区域
         * @param {String} zoneIndex 指定区域的索引值
         */
        zoomToSomeZone (zoneIndex) {
            EventBus.$emit('zoomToSomeZone', {
                top: 30.736937,
                bottom: 30.614261,
                left: 103.890247,
                right: 104.087962,
                wkid: 4326
            })
        },
        /**
         * 地理测量
         */
        geographicSurevey () {

        },
        /**
         * 框选查询
         */
        queryByExtent () {

        },
        /**
         * 点击查询
         */
        queryByClick () {

        }
    }
}
</script>

<style>
.el-menu-item:hover{
    background-color: rgba(255, 255, 255, 0.4) !important;
}
.el-menu-item.is-active {
    background-color: rgba(255, 255, 255, 0.4) !important;
}

.el-submenu__title:focus, .el-submenu__title:hover{
    outline: 0 !important;
    background: rgba(255, 255, 255, 0.4) !important;
}
</style>
