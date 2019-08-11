<template>
    <div>
        <div>
            <div class="inputDiv">
                <el-input v-model="filterText" placeholder="输入关键字进行查询"></el-input>
            </div>
            <el-tree :data="catalogTreeData" :props="defaultProps" :accordion="true" ref="tree"
            :highlight-current="true" :filter-node-method="filterNode" @node-click="handleNodeClick">
            </el-tree>
        </div>
    </div>
</template>

<script src="./catalog-tree-component.js"></script>

<style src="./catalog-tree-component.css"></style>
