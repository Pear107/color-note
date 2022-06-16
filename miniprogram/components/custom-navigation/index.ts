// components/custom-navigation/index.ts
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showBack:{
      type:Boolean,
      value:false
    },
    backText:{
      type:String,
      value:''
    },
    titleText:{
      type:String,
      value:''
    },
    bgColor:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back:()=>{
      wx.navigateBack({
        
      })
    }
  }
})
