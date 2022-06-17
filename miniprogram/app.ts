// app.ts
interface IAppOption{
  globalData:{
    [key:string]:any
  }
}
App<IAppOption>({
  globalData: {
    StatusBar:0,
    Custom:0,
    CustomBar:0,
    nickName:'点击头像登录',
    avatarUrl:'',
    token:'',
    varieties:[
      
    ]
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取本地存储信息
    let token=wx.getStorageSync('token')
    let openid=wx.getStorageSync('openid')
    let nickName=wx.getStorageSync('nickName')
    let avatarUrl=wx.getStorageSync('avatarUrl')
    if(token&&openid&&nickName&&avatarUrl){
      this.globalData.nickName=nickName
      this.globalData.avatarUrl=avatarUrl
    }else{
      wx.clearStorageSync()
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
  /**
   * 监听小程序显示
   */
  onShow(){
  }
})