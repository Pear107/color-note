// pages/note/write.ts
import { formatTime } from '../../utils/util';
import checkLogin from "../../behavior/checkLogin";
import CustomRequest from 'miniprogram/utils/customRequest';
interface EditorContext {
  [key: string]: any,
  // insertImage:insertImage,
  // scrollIntoView:scrollIntoView
}
let editorCtx: EditorContext = {}
const plugin = requirePlugin("chatbot");
const app = getApp<IAppOption>()
type TData = {
  CustomBar: number;
  varieties: { name: string; color: string; }[];
  variety: string;
  color: string;
  datetime: string;
  id: string;
  title: string;
  isShowVariety: boolean;
  openid: string;
  model: "edit" | "read";
}
type TProperty = {}
type TMethod = {
  onEditorInput: (e: any) => void;
  getContents: (callback: Function) => void;
  setContents: (delta: any) => void;
  analyse: () => void;
  showVarieties: () => void;
  hideVarieties: () => void;
  selectVariety: (e: any) => void;
  save: () => void;
  createNote: () => void;
  readNote: () => void;
  scan: (e: any) => void;
  updateNote: () => void;
  deleteNote: () => void;
  insertImage: () => void;
  share: () => void;
}
type TCustomInstanceProperty = {
  checkLogin: () => boolean;
}
type TIsPage = true
Component<TData, TProperty, TMethod, TCustomInstanceProperty, TIsPage>({
  behaviors: [checkLogin],
  data: {
    CustomBar: app.globalData.CustomBar,
    varieties: app.globalData.varieties,
    variety:'未分类',
    color:'',
    datetime: '',
    id:'',
    title:'',
    isShowVariety: false,
    openid: '',
    model: "read"
  },
  pageLifetimes: {
    show() {
      wx.createSelectorQuery().select('#editor').context(function (res) {
        editorCtx = res.context as EditorContext
      }).exec()
    }
  },
  methods: {
    onLoad(options:any){
      if(this.checkLogin()){
        if(options?._id){
          this.setData({
            model:"read"
          })
          this.readNote()
        }else{
          this.setData({
            model:"edit"
          })
          this.createNote()
        }
        this.setData({
          datetime: formatTime(new Date())
        })
        const url = 
        CustomRequest('POST', )
        plugin.init({
          appid: "TWBy1YUYKJTgRLmVdWre06IutAQY6c",
          openid: this.data.openid, // 小程序的openid，必填项
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
      }else{
        wx.switchTab({
          url: "../mine/index"
        })
      }
    },
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
    analyse() {
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
    showVarieties() {
      this.setData({
        isShowVariety: true
      })
    },
    hideVarieties() {
      this.setData({
        isShowVariety: false
      })
    },
    selectVariety(e:any){
      console.log(e.currentTarget.dataset)
      this.setData({
        variety:e.currentTarget.dataset.name,
        color:e.currentTarget.dataset.color
      })
    },
    save() {
    },
    createNote(){
      const openid = this.data.openid
      wx.cloud.callFunction({
        name: 'createNote',
        data: {
          openid: openid
        }
      }).then((res: any) => {
        console.log(res)
      }).catch((err: Error) => {
        console.error('Error:', err)
      })
    },
    readNote(){

    },
    scan(e: any){
      console.log(e)
    },
    updateNote(){

    },
    deleteNote(){

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
    share(){

    }
  }
})
export {}