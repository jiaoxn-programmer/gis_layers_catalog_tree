<template>
    <div id="loadingDiv" v-if='isShowLoadingGetter'></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'LoadingComponent',
    computed: {
        ...mapGetters({
            isShowLoadingGetter: 'loadingVuex/isShowLoading'
        })
    }
}
</script>

<style scoped>
#loadingDiv {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
}
</style>
