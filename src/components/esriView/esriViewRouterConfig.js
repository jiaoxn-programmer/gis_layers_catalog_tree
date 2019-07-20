import EsriViewPage from '@/components/esriView/page/EsriViewPage'

/* 目录树模块配置 */
import catalogTreeRouterConfig from '@/components/catalogTree/catalogTreeRouterConfig.js'

export default {
    path: '/esri-view',
    name: 'EsriViewPage',
    component: EsriViewPage,
    children: [
        catalogTreeRouterConfig
    ]
}
