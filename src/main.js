import Vue from 'vue'
import App from './App.vue'
import cpyUI from '../lib/cpy-ui.min'
import '../lib/cpy-ui.min.css'
import '../mock/index.js'

Vue.config.productionTip = false
Vue.use(cpyUI)
console.log(Vue.options.components)//全局注册的组件都在这

new Vue({
    render: h => h(App)
}).$mount('#app')
