// pages/variety/view.ts
const app = getApp()
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
    id: '',
    title: '',
    datetime: '',
    like:0,
    agree:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options: any) {
      this.setData({
        id: options.id,
        title: options.name || "",
        datetime: formatTime(new Date(options.time))
      })
      const that=this
      wx.createSelectorQuery().select('#editor').context(function (res) {
        editorCtx = res.context as EditorContext
        that.getNote()
      }).exec()
      this.getLike()
      this.getAgree()
    },
    agree() {
      const that=this
      let id = this.data.id
      CustomRequest('POST', `/note/agree/${id}`).then((res: any) => {
        console.log(res)
        if(res.description==='agree successful'){
          wx.showToast({
            title:'点赞成功',
            icon:'success'
          })
        }else{
          wx.showToast({
            title:'取消点赞成功',
            icon:'success'
          })
        }
        that.getAgree()
      }, (err: any) => {
        console.log(err)
      })
    },
    like() {
      const that=this
      let id = this.data.id
      CustomRequest('POST', `/note/like/${id}`).then((res: any) => {
        console.log(res)
        if(res.description==='like up successful'){
          wx.showToast({
            title:'喜欢成功',
            icon:'success'
          })
        }else{
          wx.showToast({
            title:'取消喜欢成功',
            icon:'success'
          })
        }
        that.getLike()
      }, (err: any) => {
        console.log(err)
      })
    },
    getNote() {
      const that = this
      CustomPromise.all([CustomRequest('GET', `/note/${this.data.id}`, {})]).then((res: any) => {
        console.log(res[0])
        that.setContents(res[0].delta)
      }, (err: any) => {
        console.log(err)
      })
    },
    setContents(delta: any) {
      editorCtx.setContents({
        html: delta,
        success: (res: any) => {
          console.log(res)
        },
        fail: (err: any) => {
          console.log(err)
        },
      })
    },
    getLike() {
      const that=this
      let id=this.data.id
      CustomPromise.all([CustomRequest('GET', `/note/like/${id}`, {})]).then((res: any) => {
        that.setData({
          like: res[0].data
        })
      }, (err: any) => {
        console.log(err)
      })
    },
    getAgree() {
      const that=this
      let id=this.data.id
      CustomPromise.all([CustomRequest('GET', `/note/agree/${id}`, {})]).then((res: any) => {
        that.setData({
          agree: res[0].data
        })
      }, (err: any) => {
        console.log(err)
      })
    },
  }
})

export default {}
