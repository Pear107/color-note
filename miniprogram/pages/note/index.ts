// pages/note/index.ts
const app = getApp<IAppOption>();
import checkLogin from "../../behavior/checkLogin";
type TData = {
  CustomBar: number;
  notes: Array<Notes>;
  openid: string;
};
type TProperty = {};
type TMethod = {
  readNotes: () => void;
  createNote: () => void;
  readNote: () => void;
  deleteNote: () => void;
};
type TCustomInstanceProperty = {
  checkLogin: () => boolean;
};
type TIsPage = true;
Component<TData, TProperty, TMethod, TCustomInstanceProperty, TIsPage>({
  behaviors: [checkLogin],
  data: {
    CustomBar: app.globalData.CustomBar,
    notes: [],
    openid: '',
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === "function" && this.getTabBar()) {
        this.getTabBar().setData({
          tabIndex: 1,
        });
      }
      if(this.checkLogin()){
        this.readNotes()
      }
    },
    hide() {
      console.log("hidden");
    },
  },
  methods: {
    readNotes(){
      const that = this
      wx.cloud.callFunction({
        name: 'readNotes',
        data: {
          openid: that.data.openid
        }
      }).then((res: any) => {
        // console.log(res.result)
        that.setData({
          notes: res.result.data
        })
      }).catch((err: Error) => {
        console.error(err)
      })
    },
    createNote(){
      wx.navigateTo({
        url: "./note",
      });
    },
    readNote(){

    },
    deleteNote: () => {},
  },
});
export {};
