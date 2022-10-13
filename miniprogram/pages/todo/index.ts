// pages/todo/index.ts
type TData = {}
type TProperty = {}
type TMethod = {}
type TCustomInstanceProperty = {}
type TIsPage = true
Component<TData, TProperty, TMethod, TCustomInstanceProperty, TIsPage>({
  data: {

  },
  pageLifetimes: {
    show(){
      console.log('show')
      if (typeof this.getTabBar === "function" && this.getTabBar()) {
        this.getTabBar().setData({
          tabIndex: 2,
        });
      }
    },
    hide(){
      console.log('hide')
    }
  }
})

export {}