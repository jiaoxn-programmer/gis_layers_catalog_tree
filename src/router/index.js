import Vue from 'vue'
import Router from 'vue-router'
import EsriViewPage from '@/components/esriView/page/EsriViewPage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'EsriViewPage',
            component: EsriViewPage
        }
    ]
})
