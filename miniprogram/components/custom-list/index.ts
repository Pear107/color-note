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
    height:{
      type:String,
      value:'auto'
    },
    path:{
      type:String,
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
    push(e:any){
      const ui = wx.getStorageSync('ui')
      if(ui?.nickName&&ui?.avatarUrl&&ui?.openid){
        wx.navigateTo({
          url:`/pages/${this.data.path}/${e.currentTarget.dataset.route}`,
        })
      }else{
        wx.showModal({
          title:'请登录',
          showCancel: false,
        })
      }
    }
  }
})
