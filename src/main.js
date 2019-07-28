// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* 引用Vuex */
import store from './store'

/* 引用animate.css */
import animated from 'animate.css'

/* 引用ElementUI */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

/* 使用ElementUI */
Vue.use(ElementUI)

/* 使用animate.css */
Vue.use(animated)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
