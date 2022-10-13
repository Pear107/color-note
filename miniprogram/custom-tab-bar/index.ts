// custom-tab-bar/index.ts
Component({
  data: {
    tabIndex: 3,
    list: [
      {
        "selectedIconPath": "../assets/images/tabBar/variety_active.png",
        "iconPath": "../assets/images/tabBar/variety.png",
        "pagePath": "../variety/index"
      },
      {
        "selectedIconPath": "../assets/images/tabBar/note_active.png",
        "iconPath": "../assets/images/tabBar/note.png",
        "pagePath": "../note/index"
      },
      {
        "selectedIconPath": "../assets/images/tabBar/todo_active.png",
        "iconPath": "../assets/images/tabBar/todo.png",
        "pagePath": "../todo/index"
      },
      {
        "selectedIconPath": "../assets/images/tabBar/mine_active.png",
        "iconPath": "../assets/images/tabBar/mine.png",
        "pagePath": "../mine/index"
      }
    ]
  },
  methods: {
    switchTab(e: any){
      const index: number = e.currentTarget.dataset.index
      const url = this.data.list[index].pagePath
      wx.switchTab({url})
      this.setData({
        tabIndex: index
      })
      console.log(index)
    }
  }
})
