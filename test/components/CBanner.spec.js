import Banner from '../../packages/CBanner/index.vue'
import {mount} from "@vue/test-utils";

const {expect} = require('chai')




describe('Banner', () => {
  const wrapper1 = mount(Banner, {
    slots: {
      default: `<p>测试一下</p>`
    }
  })
  it('测试插槽 ', function () {
    expect(wrapper1.find('p')).to.be.ok
  });
  it('测试内容', function () {
    expect(wrapper1.html()).to.include('测试一下')
  });
  // const wrapper2=mount(Banner);
  // wrapper2.setProps({
  //   title:'title',
  //   isCanBack:true
  // });
  // it('测试props', function () {
  //   console.log(wrapper2.html())
  //   console.log(wrapper2.props())
  //   expect(wrapper2.find('.c_icon')).to.be.ok
  // });
})
