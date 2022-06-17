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
        that.setData({
          isLoading:false
        })
      }else{
        CustomPromise.all([CustomRequest('GET',`/note/notebook/${that.data.id}`,{})]).then((res:any)=>{
          console.log(res[0].data)
          wx.hideToast({})
          that.setData({
            noteList:res[0].data,
            isLoading:false
          })
        },(err:any)=>{
          this.setData({
            isLoading:false
          })
        })
      }
    },
    enterNote(){
      wx.navigateTo({
        url:'./view'
      })
    }
  }
})
export default{}