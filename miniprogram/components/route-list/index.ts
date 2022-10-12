// components/custom-list/index.ts
type TData = {}
type TProperty = {
  routeData: {
    type: ArrayConstructor;
    value?: Array<RouteData>
  };
  height: {
    type: StringConstructor;
    value?: string;
  };
  path: {
    type: StringConstructor;
    value?: string;
  };
}
type TMethod = {
  navigateTo: (e: any) => void;
}
type TCustomInstanceProperty = {}
type TIsPage = false
Component<TData, TProperty, TMethod, TCustomInstanceProperty, TIsPage>({
  /**
   * 组件的属性列表
   */
  properties: {
    routeData: {
      type: Array,
      value: []
    },
    height: {
      type: String,
      value: 'auto'
    },
    path: {
      type: String,
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
    navigateTo(e: any) {
      const ui = wx.getStorageSync('ui')
      if (ui?.nickName && ui?.avatarUrl && ui?.openid) {
        wx.navigateTo({
          url: `/pages/${this.data.path}/${e.currentTarget.dataset.route}`,
        })
      } else {
        wx.showModal({
          title: '请登录',
          showCancel: false,
        })
      }
    }
  }
})
export { }