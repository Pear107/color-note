// components/custom-modal/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    caption: {
      type: String,
      value: 'Model'
    },
    content: {
      type: String,
      value: ''
    },
    height: {
      type: Number,
      value: 211
    },
    customContent:{
      type:Boolean,
      value:false
    },
    showCancel:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirm(){
      this.triggerEvent('parentConfirm')
    },
    cancel(){
      this.triggerEvent('parentCancel')
    }
  }
})
