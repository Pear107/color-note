// pages/mine/index.ts
import { useInfoStore } from "../../store/index";
import checkLogin from "../../behavior/checkLogin";
import Log4j from "../../utils/log4j";
// 定义初始数据类型
type TData = {
  nickName: string;
  avatarUrl: string;
  boardData: Array<{ key: string; value: number }>;
  routeData: Array<RouteData>;
};
// 定义属性列表
type TProperty = {};
type TMethod = {
  login: () => void;
};
// 定义自定义属性，或者是 behavior 的属性
type TCustomInstanceProperty = {
  checkLogin: () => boolean;
};
// 定义是否是页面
type TIsPage = true;
Component<TData, TProperty, TMethod, TCustomInstanceProperty, TIsPage>({
  behaviors: [checkLogin],
  data: {
    nickName: "",
    avatarUrl: "",
    boardData: [
      {
        key: "笔记",
        value: 0,
      },
      {
        key: "任务",
        value: 0,
      },
      {
        key: "计划",
        value: 0,
      },
    ],
    routeData: [
      { key: 0, name: "设置", route: "set" },
      { key: 1, name: "日历", route: "calendar" },
      { key: 2, name: "时间轴", route: "timeline" },
      { key: 3, name: "使用指南", route: "handbook" },
      { key: 4, name: "联系客服", route: "connection" },
      { key: 5, name: "意见反馈", route: "feedback" },
      { key: 6, name: "关于我们", route: "about" },
    ],
  },
  lifetimes: {
    attached() {
      this.setData({
        nickName: useInfoStore.getData("nickName"),
        avatarUrl: useInfoStore.getData("avatarUrl"),
      });
      useInfoStore.addPage(this);
    },
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === "function" && this.getTabBar()) {
        this.getTabBar().setData({
          tabIndex: 3,
        });
      }
      Log4j.debug("he", {});
      Log4j.error("he", {});
      Log4j.info("he", {});
      Log4j.log("he", {});
      Log4j.warn("he", {});
    },
    hide() {},
  },
  methods: {
    login() {
      if (!this.checkLogin()) {
        const ui: UserInfo = wx.getStorageSync("ui");
        if (!ui.openid || !ui.nickName || !ui.avatarUrl) {
          wx.clearStorage();
          wx.cloud
            .callFunction({
              name: "login",
            })
            .then((res: any) => {
              console.log("success");
              useInfoStore.setData("nickName", res.result.nickName);
              useInfoStore.setData("avatarUrl", res.result.avatarUrl);
              wx.setStorageSync("ui", {
                nickName: res.result.nickName,
                avatarUrl: res.result.avatarUrl,
                openid: res.result.openid,
              });
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
    },
  },
});
export {};
