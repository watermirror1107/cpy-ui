import CBanner from './CBanner/index.vue'
import CButton from './CButton/index.vue'

const components = [
    CBanner,
    CButton
]


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
    version:'0.1.2'
}
