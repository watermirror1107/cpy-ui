import Button from '../../src/components/Button.vue'
import {mount} from "@vue/test-utils";

const {expect} = require('chai')




describe('Banner', () => {
  const wrapper = mount(Button, {
    slots: {
      default: `<p>这是个按钮</p>`
    }
  })
  it('测试插槽 ', function () {
    expect(wrapper.contains('p')).to.be.ok
  });
  it('测试内容', function () {
    expect(wrapper.html()).to.include('测试一下')
  });
})
