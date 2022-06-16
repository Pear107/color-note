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
    noteList:[
      // {
      //   img:'https://newgym.cn/color-note/docker.png',
      //   text:'testtesttet',
      //   name:'刀妹'
      // },
      // {
      //   img:'https://newgym.cn/color-note/docker.png',
      //   text:'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
      //   name:'刀妹'
      // },
      // {
      //   img:'https://newgym.cn/color-note/docker.png',
      //   text:'testtesttesttesttesttesttesttesttest',
      //   name:'刀妹'
      // },
      // {
      //   img:'https://newgym.cn/color-note/docker.png',
      //   text:'testtesttesttesttesttesttesttesttest',
      //   name:'刀妹刀妹刀妹刀妹刀妹刀妹'
      // },
      // {
      //   img:'https://newgym.cn/color-note/tushe.png',
      //   text:'testtesttesttesttesttesttesttesttest',
      //   name:'刀妹'
      // },{
      //   img:'',
      //   text:'https://newgym.cn/color-note/docker.pnghttps://newgym.cn/color-note/docker.png',
      //   name:'刀妹'
      // }
    ]
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
        console.log(res)
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