// components/custom-toast/index.ts
type Icon = 'success' | 'error'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status: {
      type: String,
      value: 'success'
    },
    icon: {
      type: String,
      value: 'success',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    icons: {
      'success': 'https://newgym.cn/color-note/success.png',
      'error': 'https://newgym.cn/color-note/error.png'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
