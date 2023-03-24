//先导入UI字体库
import './font/font_3379171_aznauuqpx0g.js'//对应iconfont项目里面的ECP-3.0
import './font/font_2142578_oihzpgeg849' //对应iconfont项目ECP-portal
import './font/font_2631791_umj4vo54h' //未知
//以旧的覆盖新的，新的名字一般不一样，不会被覆盖
//导入第三方UI库
import '../ant-design-vue/index'

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
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    version: '0.2.33'
}
