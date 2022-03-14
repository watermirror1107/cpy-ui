import Vue from 'vue'
import App from './App.vue'
import cpyUI from '../lib/cpy-ui.min'
import '../lib/cpy-ui.min.css'
import '../mock/index.js'
Vue.config.productionTip = false
Vue.use(cpyUI)
new Vue({
    render: h => h(App)
}).$mount('#app')
