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
    varietyId:'',
    showModal: false,
    colorIndex: 0,
    oldColorIndex:0,
    newVarietyName: '',
    oldVarietyName:'',
    modalStatus: 0,
    colorArray:["#c88f23","#b99192","#b5c07b","#dd8270","#bccdbb"]
  },

  /**
   * 组件生命周期
   */
  lifetimes:{
    attached(){
      
    }
  },

  /**
   * 组件页面生命周期
   */
  pageLifetimes:{
    show(){
      this.getVarieties()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addVariety() {
      if(wx.getStorageSync('token')){
        this.setData({
          modalStatus: 0,
          showModal: true
        })
      }else{

      }
    },
    setColor(e: any) {
      let index = e.target.dataset.index * 1
      this.setData({
        colorIndex: index
      })
    },
    confirm() {
      const that=this
      if(that.data.newVarietyName.trim()===''){
        return
      }
      if(this.data.modalStatus===0){
        CustomPromise.all([CustomRequest('POST','/notebook/create',{
          'notebook_name':this.data.newVarietyName,
          'color':this.data.colorArray[this.data.colorIndex]
        })]).then((res:any)=>{
          console.log(res)
          that.cancel()
          that.getVarieties()
          console.log('setData')
        },(err:any)=>{
          console.log(err)
          that.cancel()
        })
        return
      }
      if(that.data.newVarietyName!==that.data.oldVarietyName){
        console.log(that.data.newVarietyName)
        CustomPromise.all([CustomRequest('PUT',`/notebook/update/name/${that.data.varietyId}`,{'new_name':that.data.newVarietyName})]).then((res:any)=>{
          console.log(res)
          that.getVarieties()
        },(err:any)=>{
          console.log(err)
        })
      }
      if(that.data.colorIndex!==that.data.oldColorIndex){
        console.log(that.data.colorArray[that.data.colorIndex])
        CustomPromise.all([CustomRequest('PUT',`/notebook/update/color/${that.data.varietyId}`,{'new_color':that.data.colorArray[that.data.colorIndex]})]).then((res:any)=>{
          console.log(res)
          that.getVarieties()
        },(err:any)=>{
          console.log(err)
        })
      }
      
      that.cancel()
    },
    cancel() {
      this.setData({
        newVarietyName: '',
        colorIndex: 0,
        showModal: false
      })
    },
    enterVariety(e: any) {
      console.log(e.currentTarget.dataset)
      if (wx.getStorageSync('token')) {
        let c: color = e.currentTarget.dataset.color
        let id:string=e.currentTarget.dataset.id
        let n:string=e.currentTarget.dataset.name
        let i:string=e.currentTarget.dataset.iscommunity
        wx.navigateTo({
          url: `../variety/noteList?bgColor=${c}&id=${id}&name=${n}&isCommunity=${i}`
        })
      } else {
      }
    },
    editVariety(e: any) {
      console.log(e.currentTarget.dataset)
      let c: color = e.currentTarget.dataset.color
      let n: string = e.currentTarget.dataset.name
      let id:string = e.currentTarget.dataset.id
      let i = this.data.colorArray.indexOf(c)
      this.setData({
        colorIndex: i,
        oldColorIndex:i,
        modalStatus: 1,
        newVarietyName: n,
        oldVarietyName:n,
        varietyId:id,
        showModal: true
      })
    },
    getVarieties(){
      CustomPromise.all([CustomRequest('GET', '/notebook/', {})]).then((res: any) => {
        console.log(res)
        this.setData({
          varieties:res[0].data
        })
        app.globalData.varieties=res[0].data
        console.log(this.data.varieties)
      }, (err: any) => {
        console.log(err)
      })
    },
    onShow(){
      console.log('onShow')
    },
    onHidden(){
      console.log('onHidden')
      this.cancel()
    }
  }
})

export default {}