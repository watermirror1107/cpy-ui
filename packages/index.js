//先导入UI字体库
import './font/font_2142578_45182ujwnjc.js'//等UI补全图标后删除
import './font/font_2631791_umj4vo54h.js'//等UI补全图标后删除
import './font/font_3379171_qn91vchjwn.js'//new
//导入第三方UI库
import '../ant-design-vue/index'
import CModal from "./CModal/index.js";
const components = []
//导入组件
const req = require.context('./', true, /\.vue$/);
req.keys().forEach((item) => {
    const exports = req(item).default;
    components.push(exports);
});

function install(Vue) {
    if (!install.installed) {
        install.installed = true
        components.forEach(component => Vue.component(component.name, component))
        Vue.prototype.$CModal=CModal
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export default {
    install,
    version: '0.3.8'
}
