import Banner from '../../src/components/Banner.vue'
import {mount} from "@vue/test-utils";

const {expect} = require('chai')




describe('Banner', () => {
  const wrapper = mount(Banner, {
    slots: {
      default: `<p>测试一下</p>`
    }
  })
  it('测试插槽 ', function () {
    expect(wrapper.contains('p')).to.be.ok
  });
  it('测试内容', function () {
    expect(wrapper.html()).to.include('测试一下')
  });
})
