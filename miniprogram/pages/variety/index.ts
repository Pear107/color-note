// pages/variety/index.ts
const app = getApp<IAppOption>()
type TData = {}
type TProperty = {}
type TMethod = {}
type TCustomInstanceProperty = {}
type TIsPage = true
Component<TData, TProperty, TMethod, TCustomInstanceProperty, TIsPage>({
  /**
   * 组件的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    varieties: [],
    varietyId:'',
    showModal: false,
    colorIndex: 0,
    oldColorIndex:0,
    newVarietyName: '',
    oldVarietyName:'',
    modalStatus: 0,
    colorArray:["#c88f23","#b99192","#b5c07b","#dd8270","#bccdbb"]
  },

  /**
   * 组件生命周期
   */
  lifetimes:{
    attached(){
      
    }
  },

  /**
   * 组件页面生命周期
   */
  pageLifetimes:{
    show(){
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addVariety() {
    },
    setColor(e: any) {
    },
    confirm() {
    },
    cancel() {
    },
    enterVariety(e: any) {
    },
    editVariety(e: any) {
    },
    getVarieties(){
    },
    show(){
    },
    hide(){
    }
  }
})

export {}