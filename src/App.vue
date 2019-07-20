<template>
    <div>
        <HeaderBarComponent></HeaderBarComponent>
        <router-view/>
    </div>
</template>

<script>
import HeaderBarComponent from '@/common/HeaderBarComponent'

export default {
    name: 'App',
    components: {
        HeaderBarComponent
    }
}
</script>

<style scoped>
body {
    margin: 0px !important;
}
</style>
