// pages/mine/feedback.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    feedback:'',
    isShowModal:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    input(e:any){
      this.setData({
        feedback:e.detail.value.trim()
      })
    },
    submit(){
      if(this.data.feedback.length<15){
        console.log('h')
        this.setData({
          isShowModal:true
        })
      }else{
        wx.showToast({
          title:'反馈成功',
          icon:'success',
          duration:500
        }),
        setTimeout(()=>{
          wx.navigateBack()
        },500)
      }
    },
    confirm(){
      this.setData({
        isShowModal:false
      })
    }
  }
})
