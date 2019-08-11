<template>
    <div>
        <LoadingComponent></LoadingComponent>
        <router-view/>
    </div>
</template>

<script>
import LoadingComponent from '@/components/loading/LoadingComponent'

export default {
    name: 'App',
    components: {
        LoadingComponent
    }
}
</script>

<style scoped>
body {
    margin: 0px !important;
}
</style>
