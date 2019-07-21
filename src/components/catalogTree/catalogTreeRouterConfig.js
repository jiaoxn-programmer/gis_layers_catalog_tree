import CatalogTreePage from '@/components/catalogTree/page/CatalogTreePage'

/* 统计结果模块配置 */
import statisticsResultRouterConfig from '@/components/statisticsResult/statisticsResultRouterConfig.js'

export default {
    path: 'catalog',
    name: 'CatalogTreePage',
    component: CatalogTreePage,
    children: [
        statisticsResultRouterConfig
    ]
}
