// pages/note/write.ts
import { formatTime } from '../../utils/util';
import CustomPromise from '../../utils/customPromise';
import CustomRequest from '../../utils/customRequest';

let editorCtx: EditorContext = {}

const app = getApp()
Component({
  data: {
    CustomBar: app.globalData.CustomBar,
    varieties: [],
    variety: '未分类',
    oldVarietyId: 0,
    varietyId: 0,
    bgColor: '#353535',
    datetime: '',
    id: '',
    oldTitle: '',
    title: '',
    isShowVariety: false,
    isShowModal: false,
    isSave: true,
    editorCtx:{}
  },
  lifetimes: {
    attached() {
      this.setData({
        varieties: app.globalData.varieties
      })
    }
  },
  methods: {
    onLoad(options: any) {
      this.setData({
        id: options.id,
        title: options.name || "",
        oldTitle: options.name || "",
        varietyId: options.bookid || 0,
        oldVarietyId: options.bookid || 0
      })
      if (options.time) {
        this.setData({
          datetime: formatTime(new Date(options.time))
        })
      } else {
        this.setData({
          datetime: formatTime(new Date())
        })
      }
      this.data.varieties.forEach((item: any) => {
        if (item.NoteBookId === options.bookid * 1) {
          this.setData({
            bgColor: item.Color,
            variety: item.NoteBookName
          })
        }
      })
      const that=this
      wx.createSelectorQuery().select('#editor').context(function (res) {
        editorCtx = res.context as EditorContext
        that.getNote()
      }).exec()
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
      this.setData({
        isSave: false
      })
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
    getNote(){
      CustomPromise.all([CustomRequest('GET', `/note/${this.data.id}`, {})]).then((res: any) => { 
        editorCtx.setContents({
          html: res[0].delta,
          success: (res: any) => {
            console.log(res)
          },
          fail: (err: any) => {
            console.log(err)
          },
        })
      }, (err: any) => {
        console.log(err)
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
    selectVariety(e: any) {
      console.log(e.currentTarget.dataset)
      this.setData({
        variety: e.currentTarget.dataset.name,
        bgColor: e.currentTarget.dataset.color,
        varietyId: e.currentTarget.dataset.id
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
        let delta = value.html
        return CustomRequest('PUT', `/note/update/delta/${that.data.id}`, {
          delta
        })
      }, (error: any) => {
        console.log(error)
      }).then((res: any) => {
        console.log(res)
        if (that.data.oldTitle !== that.data.title) {
          return CustomRequest('PUT', `/note/update/name/${that.data.id}`, {
            "new_notename": that.data.title
          })
        }
        return 0;
      }, (err: any) => {
        console.log(err)
      }).then((res: any) => {
        console.log('noteBookId')
        console.log(that.data.varietyId)
        console.log(res)
        if (that.data.oldVarietyId !== that.data.varietyId) {
          return CustomRequest('PUT', `/note/update/notebook/${that.data.id}`, {
            "new_notebookid": that.data.varietyId
          })
        }
        return 0;
      }, (err: any) => {
        console.log(err)
      }).then((res: any) => {
        console.log(res)
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        })
        that.setData({
          isSave: true
        })
      }, (error: any) => {
        console.log(error)
        wx.showToast({
          title: '保存失败',
          icon: 'error'
        })
        that.setData({
          isSave: false
        })
      })
    },
    delete() {
      console.log('delete')
      this.setData({
        isShowModal: true
      })
    },
    confirm() {
      let id = this.data.id
      CustomRequest('DELETE', `/note/delete/${id}`).then((res: any) => {
        console.log(res)
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
        wx.navigateBack({

        })
      }, (err: any) => {
        console.log(err)
        wx.showToast({
          title: '删除失败',
          icon: 'error'
        })
      })
      this.setData({
        isShowModal: false
      })
    },
    cancel() {
      this.setData({
        isShowModal: false
      })
    },
    publish() {
      if (!this.data.isSave) {
        wx.showToast({
          title: '请先保存',
          icon: 'error'
        })
      } else {
        const that = this
        new CustomPromise((resolve: Function, reject: Function) => {
          that.getContents((res: any) => {
            if (res.text.length < 50) {
              wx.showToast({
                title: '字数过少',
                icon: 'error'
              })
              reject()
            } else {
              resolve()
            }
          })
        }).then((res: any) => {
          console.log(res)
          let id = this.data.id
          return CustomRequest('POST', `/note/release/${id}`)
        }, (err: any) => {
          console.log(err)
        }).then((res: any) => {
          if (res.code === 200) {
            wx.showToast({
              title: '发布成功',
              icon: 'success'
            })
          }
        }, (err: any) => {
          console.log(err)
        })
      }
    }
  }
})
export default {}