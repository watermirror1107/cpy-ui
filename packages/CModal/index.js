import Modal from './index.vue';
import Vue from 'vue';

export default function CModal(config) {
    let modalInstance = null;
    let div = document.createElement('div');
    let el = document.createElement('div');
    let currentConfig = {...config, isVisible: true};
    div.appendChild(el);
    document.body.appendChild(div);
    if (config.cancel) {//兼容指令式的关闭弹窗
        let originFn = config.cancel
        currentConfig.cancel = function () {
            originFn()
            modalInstance.$destroy()
        }
    }else{
        currentConfig.cancel = function () {
            modalInstance.$destroy()
        }
    }
    modalInstance = new Vue({
        el: el,
        parent: config.parentContext,
        render(h) {
            return h(Modal, {props: currentConfig});
        },
        beforeDestroy() {
            div.parentNode.removeChild(div);//移除多余的dom元素
        }
    });
    return modalInstance
}
