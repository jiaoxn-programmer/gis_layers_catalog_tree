import Vue from 'vue'
import Vuex from 'vuex'

// 引入模块的vuex要素
import esriViewVuexConfig from './esri-view/index'
import catalogTreeVuexConfig from './catalog-tree/index'
import loadingVuexConfig from './loading/index'
import statisticalResultConfig from './statistical-result/index'
import functionMenuConfig from './function-menu/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        esriViewVuex: esriViewVuexConfig,
        catalogTreeVuex: catalogTreeVuexConfig,
        loadingVuex: loadingVuexConfig,
        statisticalResult: statisticalResultConfig,
        functionMenuVuex: functionMenuConfig
    }
})
