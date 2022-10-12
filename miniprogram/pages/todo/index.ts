// pages/todo/index.ts
type TData = {}
type TProperty = {}
type TMethod = {
  show: () => void;
  hide: () => void;
}
type TCustomInstanceProperty = {}
type TIsPage = true
Component<TData, TProperty, TMethod, TCustomInstanceProperty, TIsPage>({
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    show(){
      console.log('show')
    },
    hide(){
      console.log('hide')
    }
  }
})

export {}