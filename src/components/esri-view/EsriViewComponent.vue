<template>
    <div>
        <div id="esriViewDiv">
            <div id="switchBtnDiv">
                <input id="switchBtn" type="button" v-model="switchBtnText"
                class="esri-component esri-widget-button esri-widget esri-interactive"
                @click="switchBetween2DAnd3D"
                />
            </div>
        </div>
    </div>
</template>

<script src='./esri-view-component.js'></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src='./esri-view-component.css'></style>
