export default Behavior({
  methods: {
    checkLogin() {
      const ui: UserInfo = wx.getStorageSync("ui") ?? {};
      if (ui?.openid && ui?.nickName && ui?.nickName) {
        return true;
      }else{
        wx.clearStorageSync();
        return false;
      }
    },
  },
});
