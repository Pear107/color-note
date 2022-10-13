// pages/note/index.ts
import CustomPromise from '../../utils/customPromise';
import CustomRequest from '../../utils/customRequest';
import noteList from '../variety/noteList';
const app=getApp<IAppOption>()
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
    CustomBar:app.globalData.CustomBar,
    noteList:[
    ],
    isShowModal:false,
    isShowToast:false
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
      console.log('show')
      if (typeof this.getTabBar === "function" && this.getTabBar()) {
        this.getTabBar().setData({
          tabIndex: 1,
        });
      }
    },
    hide(){
      console.log('hidden')
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    enterNote(e:any){
    },
    deleteNote(){
    },
    addNote(){
    },
    confirm(){
    },
    cancel(){
    },
    getNoteList(){
    },
    show() {
      console.log('show')
    },
    hide() {
      console.log('hide')
    },
  }
})
export {}