<template>
    <div class="animated fadeInUp">
        <div id="functionButtonGroupDiv">
            <el-button-group>
                <el-tooltip content="距离测量" placement="top">
                    <el-button id="measurementLengthButton" icon="el-icon-measurement-length" size="small" @click="measureLengthOnEsriView"></el-button>
                </el-tooltip>
                <el-tooltip content="面积测量" placement="top">
                    <el-button id="measurementAreaButton" icon="el-icon-measurement-area" size="small" @click="measureAreaOnEsriView"></el-button>
                </el-tooltip>
                <el-tooltip content="框选统计" placement="top">
                    <el-button id="frameSelectionButton" icon="el-icon-frame-selection" size="small" @click="frameSelectionStatisticsOnEsriView"></el-button>
                </el-tooltip>
                <el-tooltip content="区域查询" placement="top">
                    <el-button id="regionalQueryButton" icon="el-icon-regional-query" size="small" @click="regionalQueryOnEsriView"></el-button>
                </el-tooltip>
                <el-tooltip content="打印地图" placement="top">
                    <el-button id="printButton" icon="el-icon-print" size="small" @click="printOnEsriView"></el-button>
                </el-tooltip>
                <el-tooltip content="上传文件" placement="top">
                    <el-button id="uploadButton" icon="el-icon-upload" size="small" @click="uploadOnEsriView"></el-button>
                </el-tooltip>
            </el-button-group>
        </div>
    </div>
</template>

<script src="./function-button-group-component.js"></script>

<style src="./function-button-group-component.css"></style>
