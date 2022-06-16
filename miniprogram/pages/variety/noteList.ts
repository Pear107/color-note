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
    noteList:[]
  },
  methods:{
    onLoad(options:any){
      this.setData({
        bgColor:options.bgColor,
        name:options.name,
        id:options.id
      })
      this.getNoteList()
    },
    getNoteList(){
      const that=this
      CustomPromise.all([CustomRequest('GET',`/note/notebook/${that.data.id}`,{})]).then((res:any)=>{
        console.log(res[0].data)
        that.setData({
          noteList:res[0].data
        })
      },(err:any)=>{

      })
    },
    enterNote(){
      wx.navigateTo({
        url:'./view'
      })
    }
  }
})
export default{}