// pages/variety/index.ts
const app = getApp()
import CustomPromise from '../../utils/customPromise'
import CustomRequest from '../../utils/customRequest'
Component({
  /**
   * 组件的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    varieties: [],
    varietyId: '',
    isShowModal: false,
    isShowDelete: false,
    colorIndex: 0,
    oldColorIndex: 0,
    newVarietyName: '',
    oldVarietyName: '',
    modalStatus: 0,
    colorArray: ["#b68ed4","#f6416c","#b99192","#b5c07b","#dd8270","#ff9b6a"]
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {

    }
  },

  /**
   * 组件页面生命周期
   */
  pageLifetimes: {
    show() {
      this.getVarieties()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addVariety() {
      if (wx.getStorageSync('token')) {
        this.setData({
          modalStatus: 0,
          isShowModal: true
        })
      } else {

      }
    },
    setColor(e: any) {
      let index = e.target.dataset.index * 1
      this.setData({
        colorIndex: index
      })
    },
    confirm() {
      const that = this
      if (!this.data.isShowDelete) {
        if (that.data.newVarietyName.trim() === '') {
          return
        }
        if (this.data.modalStatus === 0) {
          CustomPromise.all([CustomRequest('POST', '/notebook/create', {
            'notebook_name': this.data.newVarietyName,
            'color': this.data.colorArray[this.data.colorIndex]
          })]).then((res: any) => {
            console.log(res)
            that.cancel()
            that.getVarieties()
            console.log('setData')
          }, (err: any) => {
            console.log(err)
            if(err.code===401){
              wx.showToast({
                title:'笔记本名称重复',
                icon:'error'
              })
            }else{
              wx.showToast({
                title:'创建失败',
                icon:'error'
              })
            }
            that.cancel()
          })
          return
        }
        if (that.data.newVarietyName !== that.data.oldVarietyName) {
          console.log(that.data.newVarietyName)
          CustomPromise.all([CustomRequest('PUT', `/notebook/update/name/${that.data.varietyId}`, { 'new_name': that.data.newVarietyName })]).then((res: any) => {
            console.log(res)
            that.getVarieties()
          }, (err: any) => {
            console.log(err)
          })
        }
        if (that.data.colorIndex !== that.data.oldColorIndex) {
          console.log(that.data.colorArray[that.data.colorIndex])
          CustomPromise.all([CustomRequest('PUT', `/notebook/update/color/${that.data.varietyId}`, { 'new_color': that.data.colorArray[that.data.colorIndex] })]).then((res: any) => {
            console.log(res)
            that.getVarieties()
          }, (err: any) => {
            console.log(err)
          })
        }
      } else {
        CustomPromise.all([CustomRequest('DELETE', `/notebook/delete/${that.data.varietyId}`)]).then((res: any) => {
          console.log(res)
          that.getVarieties()
        }, (err: any) => {
          console.log(err)
        })
      }
      that.cancel()
    },
    cancel() {
      this.setData({
        newVarietyName: '',
        colorIndex: 0,
        isShowModal: false,
        isShowDelete: false
      })
    },
    enterVariety(e: any) {
      console.log(e.currentTarget.dataset)
      if (wx.getStorageSync('token')) {
        let c: color = e.currentTarget.dataset.color
        let id: string = e.currentTarget.dataset.id
        let n: string = e.currentTarget.dataset.name
        let i: string = e.currentTarget.dataset.iscommunity
        wx.navigateTo({
          url: `../variety/noteList?bgColor=${c}&id=${id}&name=${n}&isCommunity=${i}`
        })
      } else {
      }
    },
    editVariety(e: any) {
      let c: color = e.currentTarget.dataset.color
      let n: string = e.currentTarget.dataset.name
      let id: string = e.currentTarget.dataset.id
      let i = this.data.colorArray.indexOf(c)
      this.setData({
        colorIndex: i,
        oldColorIndex: i,
        modalStatus: 1,
        newVarietyName: n,
        oldVarietyName: n,
        varietyId: id,
        isShowModal: true
      })
    },
    getVarieties() {
      CustomPromise.all([CustomRequest('GET', '/notebook/', {})]).then((res: any) => {
        console.log(res)
        this.setData({
          varieties: res[0].data
        })
        app.globalData.varieties = res[0].data
        console.log(this.data.varieties)
      }, (err: any) => {
        console.log(err)
      })
    },
    showDelete() {
      this.setData({
        newVarietyName: '',
        colorIndex: 0,
        isShowModal: false,
        isShowDelete: true
      })
    },
    onShow() {
      console.log('onShow')
    },
    onHidden() {
      console.log('onHidden')
      this.cancel()
    },
    onReady(){
      this.getVarieties()
    }
  }
})

export default {}