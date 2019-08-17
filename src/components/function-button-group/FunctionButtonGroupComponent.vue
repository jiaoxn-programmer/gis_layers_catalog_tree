<template>
    <div>
        <div id="functionButtonGroupDiv">
            <el-button-group>
                <el-tooltip content="距离测量" placement="top">
                    <el-button id="measurementLengthButton" icon="el-icon-measurement-length" size="small" @click="measureLengthOnEsriView"></el-button>
                </el-tooltip>
                <el-tooltip content="面积测量" placement="top">
                    <el-button id="measurementAreaButton" icon="el-icon-measurement-area" size="small" @click="measureAreaOnEsriView"></el-button>
                </el-tooltip>
            </el-button-group>
        </div>
    </div>
</template>

<script src="./function-button-group-component.js"></script>

<style src="./function-button-group-component.css"></style>
