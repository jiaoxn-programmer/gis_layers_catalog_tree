import Vue from 'vue'
import Vuex from 'vuex'

// 引入模块的vuex要素
import esriViewVuexConfig from './esriView/index'
import catalogTreeVuexConfig from './catalog-tree/index'
import loadingVuexConfig from './loading/index'
import statisticsResultConfig from './statisticsResult/index'
import functionMenuConfig from './functionMenu/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        esriViewVuex: esriViewVuexConfig,
        catalogTreeVuex: catalogTreeVuexConfig,
        loadingVuex: loadingVuexConfig,
        statisticsResult: statisticsResultConfig,
        functionMenuVuex: functionMenuConfig
    }
})
