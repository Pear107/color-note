type TData = {};
type TCustom = {
  toVariety(): void;
  toNote(): void;
  toTodo(): void;
  toMine(): void;
};
Page<TData, TCustom>({
  /**
   * 组件的初始数据
   */
  data: {
    tabIndex: 3,
    child: ["#variety", "#note", "#todo", "#mine"],
    list: [
      {
        iconPath: "../../assets/images/tabBar/variety.png",
        selectedIconPath: "../../assets/images/tabBar/variety_active.png",
        text: "分类",
      },
      {
        iconPath: "../../assets/images/tabBar/note.png",
        selectedIconPath: "../../assets/images/tabBar/note_active.png",
        text: "笔记",
      },
      {
        iconPath: "../../assets/images/tabBar/todo.png",
        selectedIconPath: "../../assets/images/tabBar/todo_active.png",
        text: "任务",
      },
      {
        iconPath: "../../assets/images/tabBar/mine.png",
        selectedIconPath: "../../assets/images/tabBar/mine_active.png",
        text: "我的",
      },
    ],
  },

  toVariety() {
    this.selectComponent("#note").hide();
    this.selectComponent("#todo").hide();
    this.selectComponent("#mine").hide();
    this.setData({
      tabIndex: 0,
    });
    this.selectComponent("#variety").show();
  },
  toNote() {
    this.selectComponent("#variety").hide();
    this.selectComponent("#todo").hide();
    this.selectComponent("#mine").hide();
    this.setData({
      tabIndex: 1,
    });
    this.selectComponent("#note").show();
  },
  toTodo() {
    this.selectComponent("#variety").hide();
    this.selectComponent("#note").hide();
    this.selectComponent("#mine").hide();
    this.setData({
      tabIndex: 2,
    });
    this.selectComponent("#todo").show();
  },
  toMine() {
    this.selectComponent("#variety").hide();
    this.selectComponent("#note").hide();
    this.selectComponent("#todo").hide();
    this.setData({
      tabIndex: 3,
    });
    this.selectComponent("#mine").show();
  },
});
export {};
