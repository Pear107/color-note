Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabIndex:1,
    child:['#variety','#note','#mine'],
    list: [{
      iconPath: "https://newgym.cn/color-note/variety.png",
      selectedIconPath: "https://newgym.cn/color-note/variety_active.png",
      text: "分类"
    }, {
      iconPath: "https://newgym.cn/color-note/note.png",
      selectedIconPath: "https://newgym.cn/color-note/note_active.png",
      text: "笔记"
    },{
      iconPath: "https://newgym.cn/color-note/mine.png",
      selectedIconPath: "https://newgym.cn/color-note/mine_active.png",
      text: "我的"
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toVariety(){
      this.selectComponent('#note').onHidden()
      this.selectComponent('#mine').onHidden()
      this.setData({
        tabIndex:0
      })
      this.selectComponent('#variety').onShow()
    },
    toNote(){
      this.selectComponent('#variety').onHidden()
      this.selectComponent('#mine').onHidden()
      this.setData({
        tabIndex:1
      })
      this.selectComponent('#note').onShow()
    },
    toMine(){
      this.selectComponent('#variety').onHidden()
      this.selectComponent('#note').onHidden()
      this.setData({
        tabIndex:2
      })
      this.selectComponent('#mine').onShow()
    },
    onReady(){
      this.selectComponent('#note').onReady()
      this.selectComponent('#variety').onReady()
    }
  }
})