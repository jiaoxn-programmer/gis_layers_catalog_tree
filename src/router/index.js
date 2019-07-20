import Vue from 'vue'
import Router from 'vue-router'

/* 模块路由配置 */
import esriViewRouterConfig from '@/components/esriView/esriViewRouterConfig.js'

Vue.use(Router)

export default new Router({
    routes: [
        esriViewRouterConfig
    ]
})
