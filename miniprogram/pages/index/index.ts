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
    tabIndex:3,
    child:['#variety','#note', '#todo','#mine'],
    list: [{
      iconPath: "../../assets/images/tabBar/variety.png",
      selectedIconPath: "../../assets/images/tabBar/variety_active.png",
      text: "分类"
    }, {
      iconPath: "../../assets/images/tabBar/note.png",
      selectedIconPath: "../../assets/images/tabBar/note_active.png",
      text: "笔记"
    },{
      iconPath: "../../assets/images/tabBar/todo.png",
      selectedIconPath: "../../assets/images/tabBar/todo_active.png",
      text: "任务"
    },{
      iconPath: "../../assets/images/tabBar/mine.png",
      selectedIconPath: "../../assets/images/tabBar/mine_active.png",
      text: "我的"
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toVariety(){
      this.selectComponent('#note').onHidden()
      this.selectComponent('#todo').onHidden()
      this.selectComponent('#mine').onHidden()
      this.setData({
        tabIndex:0
      })
      this.selectComponent('#variety').onShow()
    },
    toNote(){
      this.selectComponent('#variety').onHidden()
      this.selectComponent('#todo').onHidden()
      this.selectComponent('#mine').onHidden()
      this.setData({
        tabIndex:1
      })
      this.selectComponent('#note').onShow()
    },
    toTodo(){
      this.selectComponent('#variety').onHidden()
      this.selectComponent('#note').onHidden()
      this.selectComponent('#mine').onHidden()
      this.setData({
        tabIndex:2
      })
      this.selectComponent('#todo').onShow()
    },
    toMine(){
      this.selectComponent('#variety').onHidden()
      this.selectComponent('#note').onHidden()
      this.selectComponent('#todo').onHidden()
      this.setData({
        tabIndex:3
      })
      this.selectComponent('#mine').onShow()
    }
  }
})