// pages/variety/view.ts
const app=getApp()
import { formatTime } from '../../utils/util';
import CustomRequest from '../../utils/customRequest'
import CustomPromise from '../../utils/customPromise';
let editorCtx: EditorContext = {}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    CustomBar: app.globalData.CustomBar
  },

  /**
   * 组件的初始数据
   */
  data: {
    id:'',
    title:'',
    datetime:''
  },

  pageLifetimes:{
    show() {
      wx.createSelectorQuery().select('#editor').context(function (res) {
        editorCtx = res.context as EditorContext
      }).exec()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options:any){
      this.setData({
        id: options.id,
        title: options.name || "",
        datetime: formatTime(new Date(options.time))
      })
    },
    agree(){
      let id=this.data.id
      CustomRequest('POST',`/note/agree/${id}`).then((res:any)=>{
        console.log(res)
      },(err:any)=>{
        console.log(err)
      })
    },
    like(){
      let id=this.data.id
      CustomRequest('POST',`/note/like/${id}`).then((res:any)=>{
        console.log(res)
      },(err:any)=>{
        console.log(err)
      })
    },
    getNote() {
      const that = this
      CustomPromise.all([CustomRequest('GET', `/note/${this.data.id}`, {})]).then((res: any) => {
        console.log(res[0])
        that.setContents(JSON.parse(res[0].delta))
      }, (err: any) => {
        console.log(err)
      })
    },
    setContents(delta: any) {
      console.log(delta)
      editorCtx.setContents({
        delta: delta,
        success: (res: any) => {
          console.log(res)
        },
        fail: (err: any) => {
          console.log(err)
        },
      })
    },
  }
})

export default{}
