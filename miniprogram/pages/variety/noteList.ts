import CustomPromise from "../../utils/customPromise"
import CustomRequest from "../../utils/customRequest"

// pages/variety/noteList.ts
const app=getApp()
Component({
  data:{
    CustomBar: app.globalData.CustomBar,
    bgColor:'',
    name:'',
    id:'',
    noteList:[],
    isLoading:true,
    isCommunity:false
  },
  methods:{
    onLoad(options:any){
      this.setData({
        bgColor:options.bgColor,
        name:options.name,
        id:options.id,
        isCommunity:!!options.isCommunity
      })
    },
    onShow(){
      this.getNoteList()
    },
    getNoteList(){
      const that=this
      console.log(that.data.isCommunity)
      wx.showToast({
        title:'正在加载',
        icon:'loading'
      })
      if(that.data.isCommunity){
        CustomPromise.all([CustomRequest('GET',`/note/community`)]).then((res:any)=>{
          wx.hideToast({})
          that.setData({
            noteList:res[0].data,
            isLoading:false
          })
        },(err:any)=>{
          console.log(err)
          wx.hideToast({})
          that.setData({
            isLoading:false
          })
        })
      }else{
        CustomPromise.all([CustomRequest('GET',`/note/notebook/${that.data.id}`)]).then((res:any)=>{
          console.log(res[0].data)
          wx.hideToast({})
          that.setData({
            noteList:res[0].data,
            isLoading:false
          })
        },(err:any)=>{
          console.log(err)
          wx.hideToast({})
          this.setData({
            isLoading:false
          })
        })
      }
    },
    enterNote(e:any){
      let id=e.currentTarget.dataset.id
      let name=e.currentTarget.dataset.name
      let time=e.currentTarget.dataset.time
      if(this.data.isCommunity){
        wx.navigateTo({
          url:`./view?id=${id}&name=${name}&time=${time}`
        })
      }else{
        let bookid=e.currentTarget.dataset.bookid
        wx.navigateTo({
          url:`../note/write?id=${id}&name=${name}&bookid=${bookid}&time=${time}`
        })
      }
    }
  }
})
export default{}