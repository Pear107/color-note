type TData = {
  openid: string;
};
type TProperty = {};
type TMethod = {
  checkLogin: () => boolean;
};
type TCustomInstanceProperty = {};
export default Behavior<TData, TProperty, TMethod, TCustomInstanceProperty>({
  data: {
    openid: "",
  },
  methods: {
    checkLogin() {
      const ui: UserInfo = wx.getStorageSync("ui") ?? {};
      if (ui?.openid && ui?.nickName && ui?.nickName) {
        if (this.data.openid !== ui.openid) {
          this.setData({
            openid: ui.openid,
          });
        }
        return true;
      } else {
        wx.clearStorageSync();
        return false;
      }
    },
  },
});
export {};
