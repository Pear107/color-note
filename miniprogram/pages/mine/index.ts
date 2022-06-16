// pages/mine/index.ts
const app = getApp()
import CustomPromise from '../../utils/customPromise';
import CustomRequest from '../../utils/customRequest';
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
    nickName: '',
    avatarUrl: '',
    boardData: [
      {
        key: '喜欢',
        value: 0
      }, {
        key: '点赞',
        value: 0
      },
      {
        key: '笔记',
        value: 0
      }
    ],
    listData: [
      {
        text: '反馈问题'
      },
      { text: '关于我们' }
    ]
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached() {
      console.log('attached')
      this.getLike()
      this.getAgree()
      this.setData({
        nickName: app.globalData.nickName,
        avatarUrl: app.globalData.avatarUrl
      })
    }
  },

  /**
   * 组件页面生命周期
   */
  pageLifetimes:{
    show(){
      console.log('show')
    },
    hide(){
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
      const that = this
      new CustomPromise((resolve: Function, reject: Function) => {
        if (this.data.avatarUrl === '') {
          resolve()
        } else {
          reject()
        }
      }).then(() => {
        return new CustomPromise((resolve: Function, reject: Function) => {
          wx.getUserProfile({
            desc: "获取微信名和头像",
            lang: 'zh_CN',
            success: (res: any) => {
              resolve(res.rawData)
            },
            fail: (err: any) => {
              reject(err)
            }
          })
        })
      }, () => {
        console.log('已登录')
      }).then((rawData: string) => {
        return new CustomPromise((resolve: Function, reject: Function) => {
          wx.login({
            success: (res) => {
              console.log(res)
              if (res.errMsg === "login:ok") {
                wx.setStorageSync('nickName', JSON.parse(rawData).nickName)
                wx.setStorageSync('avatarUrl', JSON.parse(rawData).avatarUrl)
                resolve(res.code)
              } else {
                reject("登录失败")
              }
            },
            fail: ((err) => {
              reject(err)
            })
          })
        })
      }, (err: any) => {
        console.log(err)
      }).then((code: string) => {
        console.log('code 在这里')
        console.log(code)
        return CustomRequest('POST', `/user/signup`, { code })
      }, (err: any) => {
        console.log(err)
      }).then((value: any) => {
        console.log(value)
        wx.setStorageSync('token', value.token)
        wx.setStorageSync('openid', value.openid)
        that.setData({
          nickName: wx.getStorageSync('nickName'),
          avatarUrl: wx.getStorageSync('avatarUrl')
        })
      }, (err: any) => {
        wx.clearStorageSync()
        console.log(err)
      })
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
    onShow(){
      console.log('onShow')
    },
    onHidden(){
      console.log('onHidden')
    }
  }
})
