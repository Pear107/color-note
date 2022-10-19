// components/custom-toast/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isShowToast: false,
    icon: "success",
    icons: {
      "success": "passed",
      "error": "closed"
    },
    content: "success",
    timer: NaN,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showToast(options: CustomToast) {
      const { icon = 'success', duration = 2000, content = "success" } = options;
      const timer = setTimeout(() => {
        this.hiddenToast()
      }, duration)
      this.setData({
        isShowToast: true,
        icon: icon,
        content: content,
        timer: timer
      })
    },
    hiddenToast(){
      if(this.data.timer){
        clearTimeout(this.data.timer)
      }
      this.setData({
        isShowToast: false,
        icon: 'success',
        content: 'success',
        timer: NaN
      })
    }
  },
});
