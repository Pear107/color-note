// app.ts
// 在 typings/types/index.d.ts 定义数据
App<IAppOption>({
  store: {
    nickName: '点击头像登录',
    avatarUrl: '../../assets/images/default.png',
    openid: '',
  },
  globalData: {
    StatusBar: 0,
    Custom: null,
    CustomBar: 0,
    varieties: [
      {
        "name": "生活",
        "color": "#c88f23"
      }, {
        "name": "工作",
        "color": "#b99192"
      }, {
        "name": "学习",
        "color": "#b5c07b"
      }, {
        "name": "后端",
        "color": "#dd8270"
      }, {
        "name": "前端",
        "color": "#bccdbb"
      }
    ]
  },
  onLaunch() {
    wx.cloud.init({
      env: "cloud1-9g66jwmi49ddef02",
      traceUser: true
    })

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取 openid
    const ui = wx.getStorageSync('ui')
    if(ui?.nickName && ui?.avatarUrl && ui?.openid){
      this.store.nickName = ui.nickName
      this.store.avatarUrl = ui.avatarUrl
      this.store.openid = ui.openid
    }else{
      wx.clearStorage()
    }

    // 获取系统信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })

  },
  showModal(that: any, options: CustomModal){
    that.selectComponent('#modal').showModal(options??{})
  },
  hiddenModal(that){
    that.selectComponent('#modal').hiddenModal()
  },
  showToast(that: any, options: CustomToast){
    that.selectComponent('#toast').showToast(options??{})
  },
  hiddenToast(that){
    that.selectComponent('#toast').hiddenToast()
  }
})