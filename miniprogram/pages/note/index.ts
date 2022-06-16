// pages/note/index.ts
import CustomPromise from '../../utils/customPromise';
import CustomRequest from '../../utils/customRequest';
import noteList from '../variety/noteList';
const app=getApp()

Component({

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
      this.getNoteList()
    },
    hide(){
      console.log('hidden')
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    enterNote(){
      wx.navigateTo({
        url:'../note/write'
      })
    },
    deleteNote(){
      console.log('hello world')
      this.setData({
        isShowModal:true
      })
    },
    addNote(){
      if(wx.getStorageSync('token')){
        CustomPromise.all([CustomRequest('POST','/note/upload',{})]).then((res:any)=>{
          console.log(res)
          wx.navigateTo({
            url:'../note/write'
          })
        },(err:any)=>{
          console.log(err)
        })
      }else{

      }
    },
    confirm(){
      this.setData({
        isShowModal:false
      })
    },
    cancel(){
      this.setData({
        isShowModal:false
      })
    },
    getNoteList(){
      CustomPromise.all([CustomRequest('GET',`/note/notebook/0`,{})]).then((res:any)=>{
        console.log(res)
        this.setData({
          noteList:res[0].data
        })
        console.log(noteList)
      },(err:any)=>{
        console.log(err)
      })
    },
    showToast(){
      this.setData({
        isShowToast:true
      })
      setTimeout(()=>{
        this.setData({
          isShowToast:false
        })
      },1000)
    },
    hiddenToast(){
      this.setData({
        isShowToast:false
      })
    },
    onShow(){
      console.log('onShow')
    },
    onHidden(){
      console.log('onHidden')
      this.cancel()
      this.hiddenToast()
    }
  }
})

export default{}