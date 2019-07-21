<template>
    <div>
        <HeaderBarComponent></HeaderBarComponent>
        <LoadingComponent></LoadingComponent>
        <router-view/>
    </div>
</template>

<script>
import HeaderBarComponent from '@/common/HeaderBarComponent'
import LoadingComponent from '@/common/LoadingComponent'

export default {
    name: 'App',
    components: {
        HeaderBarComponent,
        LoadingComponent
    }
}
</script>

<style scoped>
body {
    margin: 0px !important;
}
</style>
