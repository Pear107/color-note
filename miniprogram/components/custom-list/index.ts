// components/custom-list/index.ts
import {keyValue} from '../../utils/interface';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData:{
      type:Array,
      value:[]
    },
    top:{
      type:Number,
      value:20
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigate(e:any){
      let u=e.currentTarget.dataset.url
      wx.navigateTo({
        url:u
      })
    }
  }
})
