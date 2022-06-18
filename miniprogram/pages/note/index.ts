// pages/note/index.ts
import CustomPromise from '../../utils/customPromise';
import CustomRequest from '../../utils/customRequest';
import {timeToNumber} from '../../utils/util'
const app=getApp()

Component({

  /**
   * 组件的初始数据
   */
  data: {
    CustomBar:app.globalData.CustomBar,
    noteList:[
    ],
    searchNoteList:[],
    search:''
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
      let name=e.currentTarget.dataset.name
      let time=e.currentTarget.dataset.time
      let bookid=e.currentTarget.dataset.NoteBookId
      wx.navigateTo({
        url:`../note/write?id=${id}&name=${name}&bookid=${bookid}&time=${time}`
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
        wx.showToast({
          title:'未登录',
          icon:'error'
        })
      }
    },
    getNoteList(){
      CustomPromise.all([CustomRequest('GET',`/note/notebook/0`,{})]).then((res:any)=>{
        this.setData({
          noteList:res[0].data.sort((a:any,b:any)=>{
            let at=new Date(a.LastUpdate)
            let bt=new Date(b.LastUpdate)
            console.log(timeToNumber(at)>timeToNumber(bt))
            if(timeToNumber(at)>timeToNumber(bt)){
              return -1
            }else{
              return 1
            }
          }),
          searchNoteList:res[0].data.sort((a:any,b:any)=>{
            let at=new Date(a.LastUpdate)
            let bt=new Date(b.LastUpdate)
            console.log(timeToNumber(at)>timeToNumber(bt))
            if(timeToNumber(at)>timeToNumber(bt)){
              return -1
            }else{
              return 1
            }
          })
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
    },
    onReady(){
      this.getNoteList()
    },
    onSearch(e:any){
      console.log(e.detail.value)
      if(e.detail.value.trim()!==''){
        this.setData({
          searchNoteList:this.data.noteList.filter((item:any)=>{
            console.log(item.NoteName)
            let t= e.detail.value.trim()
            return item.NoteName.includes(t)
          })
        })
      }else{
        this.setData({
          searchNoteList:this.data.noteList
        })
      }
    }
  }
})

export default{}