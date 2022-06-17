// pages/note/index.ts
import CustomPromise from '../../utils/customPromise';
import CustomRequest from '../../utils/customRequest';
const app=getApp()

Component({

  /**
   * 组件的初始数据
   */
  data: {
    CustomBar:app.globalData.CustomBar,
    noteList:[
    ],
    isShowModal:false
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
    enterNote(e:any){
      let id=e.currentTarget.dataset.id
      wx.navigateTo({
        url:`../note/write?id=${id}`
      })
    },
    deleteNote(){
      this.setData({
        isShowModal:true
      })
    },
    addNote(){
      if(wx.getStorageSync('token')){
        CustomPromise.all([CustomRequest('POST','/note/upload',{})]).then((res:any)=>{
          wx.navigateTo({
            url:`../note/write?id=${res[0].data}`
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
        this.setData({
          noteList:res[0].data.reverse()
        })
      },(err:any)=>{
        console.log(err)
      })
    },
    onShow(){
      console.log('onShow')
    },
    onHidden(){
      console.log('onHidden')
      this.cancel()
    }
  }
})

export default{}