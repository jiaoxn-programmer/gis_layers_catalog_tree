<template>
    <div>
        <div id="functionButtonGroupDiv">
            <el-button-group>
                <el-tooltip content="测量" placement="top">
                    <el-button id="measurementButton" icon="el-icon-measurement" size="small" @click="measurementOnEsriView"></el-button>
                </el-tooltip>
            </el-button-group>
        </div>
    </div>
</template>

<script src="./function-button-group-component.js"></script>

<style src="./function-button-group-component.css"></style>
