/**
 * @file 项目路由配置文件
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import Vue from 'vue'
import Router from 'vue-router'

/* 模块路由配置 */
import mainViewRouterConfig from './main-view/main-view-router-config'

Vue.use(Router)

export default new Router({
    routes: [
        mainViewRouterConfig
    ]
})
