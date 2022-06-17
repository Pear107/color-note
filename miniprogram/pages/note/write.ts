// pages/note/write.ts
import { formatTime } from '../../utils/util';
import CustomPromise from '../../utils/customPromise';
import CustomRequest from '../../utils/customRequest';
interface EditorContext {
  [key: string]: any,
  // insertImage:insertImage,
  // scrollIntoView:scrollIntoView
}
let editorCtx: EditorContext = {}
const plugin = requirePlugin("chatbot");

const app = getApp()
Component({
  data: {
    CustomBar: app.globalData.CustomBar,
    varieties: [],
    variety:'未分类',
    oldVarietyId:0,
    varietyId:0,
    color:'',
    datetime: '',
    id:'',
    oldTitle:'',
    title:'',
    isShowVariety: false                                         
  },
  lifetimes: {
    attached() {
      this.setData({
        varieties:app.globalData.varieties
      })
      plugin.init({
        appid: "TWBy1YUYKJTgRLmVdWre06IutAQY6c",
        openid: wx.getStorageSync('openid'), // 小程序的openid，必填项
        autoRecommendGuideList: true,
        success: () => { },
        fail: (error: any) => {
          console.log(error)
        },
        guideList: ["您好"],
        textToSpeech: true, //默认为ture打开状态
        background: "rgba(247,251,252,1)",
        guideCardHeight: 40,
        operateCardHeight: 145,
        history: true,
        navHeight: 0,
        robotHeader: "",
        userHeader: "",
        userName: "",
        anonymous: false, // 是否允许匿名用户登录，版本1.2.9后生效, 默认为false，设为ture时，未传递userName、userHeader两个字段时将弹出登录框
        hideMovableButton: false,
      });
    }
  },
  pageLifetimes: {
    show() {
      console.log(wx.getStorageSync('token'))
      this.setData({
        datetime: formatTime(new Date())
      })
      wx.createSelectorQuery().select('#editor').context(function (res) {
        editorCtx = res.context as EditorContext
      }).exec()
    }
  },
  methods: {
    onLoad(options:any){
      this.setData({
        id:options.id
      })
      this.getNote()
    },
    insertImage() {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        success: function (res) {
          wx.getImageInfo({
            src: res.tempFilePaths[0],
            success(res) {
              const query = wx.createSelectorQuery()
              query.select('#canvas')
                .fields({ node: true, size: true })
                .exec((ress) => {
                  const canvas = ress[0].node
                  const ctx = canvas.getContext('2d')
                  const img = canvas.createImage()
                  let canvasWidth = res.width //图片原始长宽
                  let canvasHeight = res.height
                  canvasHeight = ~~(canvas.width / canvasWidth * canvasHeight)
                  canvas.height = canvasHeight
                  if (canvas.width * canvas.height < 1048576) {
                    img.src = res.path
                    img.onload = () => {
                      ctx.clearRect(0, 0, canvas.width, canvas.height)
                      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                      wx.canvasToTempFilePath({
                        canvas,
                        success: (resss) => {
                          editorCtx.insertImage({
                            src: resss.tempFilePath,
                            width: '100%'
                          })
                        }
                      })
                    }
                  } else {

                  }
                })
            }
          })
        }
      })
    },

    /**
     * 编辑器输入
     * @param e event 对象
     */
    onEditorInput(e: any) {
      if (e.detail.delta.ops[0].insert.image === undefined && e.detail.delta.ops[0].insert.trim() === '') {
        this.setData({
          empty: true,
          isSave: true
        })
      } else {
        this.setData({
          empty: false,
          isSave: false
        })
      }
    },

    /**
     * 获取编辑器内容
     * @param callback 回调函数
     */
    getContents(callback: Function) {
      editorCtx.getContents({
        success: function (res: any) {
          callback(res)
        }
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
      console.log('hello world')
      this.getContents((res: any) => {
        console.log(res)
      })
    },

    /**
     * 语义分析
     */
    async analyse() {
      let txt: string = ''
      this.getContents((res: any) => {
        console.log(res.delta)
        res.delta.ops.forEach((item: any) => {
          if (typeof item.insert == "string" && item.insert.trim() != '') {
            if (txt == '') {
              txt = item.insert
            } else {
              txt = txt + '，' + item.insert
            }
          }
        });
        plugin.api.nlp("tokenize", { q: txt }).then((res: any) => {
          console.log(txt)
          console.log("tokenize result : ", res);
        }, (err: any) => {
          console.log(err)
        });
      })
    },
    selectVarieties() {
      this.setData({
        isShowVariety: true
      })
    },
    hiddenVarieties() {
      this.setData({
        isShowVariety: false
      })
    },
    selectVariety(e:any){
      console.log(e.currentTarget.dataset)
      this.setData({
        variety:e.currentTarget.dataset.name,
        color:e.currentTarget.dataset.color,
        varietyId:e.currentTarget.dataset.id
      })
    },
    getNote(){
      const that=this
      CustomPromise.all([CustomRequest('GET',`/note/${this.data.id}`,{})]).then((res:any)=>{
        that.setContents(JSON.parse(res[0].delta))
        that.setData({
          title:res[0].info.NoteName,
          oldTitle:res[0].info.NoteName,
          varietyId:res[0].info.NoteBookId,
          oldVarietyId:res[0].info.NoteBookId
        })
        that.data.varieties.forEach((item:any)=>{
          if(item.NoteBookId===that.data.varietyId){
            that.setData({
              color:item.Color
            })
          }
        })
      },(err:any)=>{
        console.log(err)
      })
    },
    save() {
      const that = this
      new CustomPromise((resolve: Function, reject: Function) => {
        that.getContents((res: any) => {
          let l = res.delta.ops.length;
          let i = 0;
          while (i < l) {
            if (typeof res.delta.ops[i].insert == "object") {
              wx.uploadFile({
                filePath: res.delta.ops[i].insert.image,
                name: "image",
                url: 'https://newgym.cn/note/img/upload',
                success: (res) => {
                  console.log(res)
                }
              })
            }
            i++
          }
          resolve(res)
        })
      }).then((value: any) => {
        console.log(JSON.stringify(value.delta))
        let delta =JSON.stringify(value.delta)
        console.log(JSON.stringify(value.delta))
        return CustomRequest('PUT', `/note/update/delta/${that.data.id}`, { 
          delta
         })
      }, (error: any) => {
        console.log(error)
      }).then((res:any)=>{
        console.log(res)
        if(that.data.oldTitle!==that.data.title){
          return CustomRequest('PUT',`/note/update/name/${that.data.id}`,{
            "new_notename":that.data.title
          })
        }
        return 0;
      },(err:any)=>{
        console.log(err)
      }).then((res:any)=>{
        console.log('noteBookId')
        console.log(that.data.varietyId)
        console.log(res)
        if(that.data.oldVarietyId!==that.data.varietyId){
          return CustomRequest('PUT',`/note/update/notebook/${that.data.id}`,{
            "new_notebookid":that.data.varietyId
          })
        }
        return 0;
      },(err:any)=>{
        console.log(err)
      }).then((res: any) => {
        console.log(res)
        wx.showToast({
          title: '上传成功',
          icon: 'success', 
          duration: 500
        })
        setTimeout(() => {
          wx.navigateBack({

          })
        }, 500)
        that.setData({
          isSave: true
        })
      }, (error: any) => {
        console.log(error)
        wx.showToast({
          title: '上传失败',
          icon: 'error',
          duration: 500
        })
        that.setData({
          isSave: false
        })
      })
    }
  }
})
export default {}