// pages/mine/index.ts
import CustomPromise from '../../utils/customPromise';
import CustomRequest from '../../utils/customRequest';
const app = getApp<IAppOption>()
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
    nickName: app.store.nickName,
    avatarUrl: app.store.avatarUrl,
    boardData: [
      {
        key: '笔记',
        value: 0
      }, {
        key: '任务',
        value: 0
      },
      {
        key: '计划',
        value: 0
      }
    ],
    listData: [
      { text: '设置', route:'set' },
      { text: '日历', route:'calendar' },
      { text: '时间轴', route: 'timeline' },
      { text: '使用指南', route: 'handbook' },
      { text: '联系客服', route: 'connection' },
      { text: '意见反馈', route: 'feedback' },
      { text: '关于我们', route: 'about' },
    ]
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached() {

    }
  },

  /**
   * 组件页面生命周期
   */
  pageLifetimes: {
    show() {
      console.log('show')
    },
    hide() {
      console.log('hidden')
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 登录事件
     */
    login() {
      const ui = wx.getStorageSync('ui')
      if(!ui?.openid||!ui?.nickName||!ui?.avatarUrl){
        wx.clearStorage()
        const that = this
        wx.cloud.callFunction({
          name: 'login'
        }).then((res: any)=>{
          that.setData({
            nickName: res.result.nickName,
            avatarUrl:res.result.avatarUrl,
            openid: res.result.openid,
          })
          wx.setStorageSync('ui',{
            nickName: res.result.nickName,
            avatarUrl: res.result.avatarUrl,
            openid: res.result.openid,
          })
        }).catch((err)=>{
          console.error(err);
        })
      }
    },
    getLike() {
      CustomPromise.all([CustomRequest('GET', `/note/like/${wx.getStorageSync('openid')}`, {})]).then((res: any) => {
        this.setData({
          ['boardData[0].value']: res.data
        })
      }, (err: any) => {
        console.log(err)
      })
    },
    getAgree() {
      CustomPromise.all([CustomRequest('GET', `/note/agree/${wx.getStorageSync('openid')}`, {})]).then((res: any) => {
        this.setData({
          ['boardData[1].value']: res.data
        })
      }, (err: any) => {
        console.log(err)
      })
    },
    onShow() {
    },
    onHidden() {
    }
  }
})
