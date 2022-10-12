// pages/mine/set.ts
import WeCropper from "../../miniprogram_modules/we-cropper/dist/we-cropper";
import { Options } from "../../miniprogram_modules/we-cropper/types/options";
import IWeCropper from "../../miniprogram_modules/we-cropper/types/we-cropper";
import { useInfoStore } from "../../store/index";
const app = getApp<IAppOption>();
const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = width;
type TData = {
  ui: UserInfo;
  avatar: Array<string>;
  isShowAvatar: boolean;
  selectIndex: number;
  cropperOpt: {
    [key: string]: any;
  };
  clip: boolean;
  avatarUrl: string;
  nickName: string;
}
type TProperty = {}
type TMethod = {
  setAvatar: () => void;
  selectAvatar: (e: any) => void;
  customAvatar: () => void;
  rollBackAvatar: () => void;
  inputNickName: (e: any) => void;
  rollBackName: () => void;
  touchStart: (e: any) => void;
  touchMove: (e: any) => void;
  touchEnd: (e: any) => void;
  getCropperImage: () => void;
  cancelCropperImage: () => void;
  confirm: () => void;
}
// 定义自定义属性
type TCustomInstanceProperty = {
  wecropper: IWeCropper | null;
}
type TIsPage = false
Component<TData, TProperty, TMethod, TCustomInstanceProperty, TIsPage>({
  data: {
    ui: {
      avatarUrl: "",
      nickName: "",
      openid: "",
    },
    avatar: [
      "../../assets/images/avatar/cat.png",
      "../../assets/images/avatar/eagle.png",
      "../../assets/images/avatar/fish.png",
      "../../assets/images/avatar/fox.png",
      "../../assets/images/avatar/lion.png",
      "../../assets/images/avatar/pig.png",
      "../../assets/images/avatar/sheep.png",
    ],
    avatarUrl: "",
    nickName: "",
    isShowAvatar: false,
    selectIndex: 0,
    cropperOpt: {
      id: "copper",
      targetId: "targetCropper",
      pixelRatio: device.pixelRatio,
      width: width,
      height: height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 200) / 2,
        y: (width - 200) / 2,
        width: 200,
        height: 200,
      },
    },
    clip: false,
  },
  lifetimes: {
    attached(){
      const ui = wx.getStorageSync("ui");
      this.setData({
        ui: ui,
      });
      this.setData({
        avatarUrl: useInfoStore.getData('avatarUrl'),
        nickName: useInfoStore.getData('nickName'),
      });
      useInfoStore.addPage(this)
      const selectIndex = this.data.avatar.findIndex((value: string) => {
        return value === this.data.avatarUrl;
      });
      this.setData({
        selectIndex: selectIndex,
      });
  
      // 实例化 WeCropper
      const cropperOpt = this.data.cropperOpt as Options.ConstructorOption;
      this.wecropper = (new WeCropper(cropperOpt) as unknown) as IWeCropper;
      this.wecropper
        .on("ready", () => {
          console.log(`wecropper is ready for work`);
        })
        .on("beforeImageLoad", () => {
          wx.showToast({
            title: "上传中",
            icon: "loading",
            duration: 2000,
          });
        })
        .on("imageLoad", () => {
          wx.hideToast({});
        });
    }
  },
  methods: {
    setAvatar() {
      const isShowAvatar = this.data.isShowAvatar;
      this.setData({
        isShowAvatar: !isShowAvatar,
      });
    },
    selectAvatar(e: any) {
      const selectIndex = e.currentTarget.dataset.index;
      this.setData({
        selectIndex: selectIndex,
        avatarUrl: this.data.avatar[selectIndex],
      });
    },
    customAvatar() {
      const that = this;
      wx.chooseMedia({
        mediaType: ["image"],
        count: 1,
        success(res) {
          // console.log(res.tempFiles[0])
          const src = res.tempFiles[0].tempFilePath;
          that.wecropper?.pushOrign(src);
          that.setData({
            clip: true,
          });
        },
      });
    },
    rollBackAvatar() {
      const avatarUrl = this.data.ui.avatarUrl;
      this.setData({
        avatarUrl: avatarUrl,
        isShowAvatar: false,
      });
    },
    inputNickName(e: any) {
      console.log("value", e.detail.value);
      const nickName = e.detail.value;
      this.setData({
        nickName: nickName,
      });
    },
    rollBackName() {
      const nickName = this.data.ui.nickName;
      this.setData({
        nickName: nickName,
      });
    },
    touchStart(e: any) {
      this.wecropper?.touchStart(e);
    },
    touchMove(e: any) {
      this.wecropper?.touchMove(e);
    },
    touchEnd(e: any) {
      this.wecropper?.touchEnd(e);
    },
    getCropperImage() {
      this.wecropper?.getCropperImage((tempFilePath: string) => {
        // tempFilePath 为裁剪后的图片临时路径
        if (tempFilePath) {
          // 预览图片
          // wx.previewImage({
          //   current: '',
          //   urls: [tempFilePath]
          // })
          const query = wx.createSelectorQuery();
          query
            .select("#canvas")
            .fields({
              node: true,
              size: true,
            })
            .exec((res) => {
              const canvas = res[0].node;
              const ctx = canvas.getContext("2d");
              const img = canvas.createImage();
              img.src = tempFilePath;
              img.crossOrigin = "anonymous";
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const avatarUrl = canvas.toDataURL("image/png");
                this.setData({
                  clip: false,
                  isShowAvatar: false,
                  avatarUrl: avatarUrl,
                  selectIndex: 7,
                });
              };
            });
        } else {
          console.log("获取图片地址失败，请稍后重试");
        }
      });
    },
    cancelCropperImage() {
      this.setData({
        clip: false,
      });
    },
    confirm() {
      if (this.data.nickName.trim() === "") {
        app.showModal(this, {
          caption: "错误",
          content: "昵称不能为空",
          confrim: () => {},
          showCancel: false,
        });
      } else {
        const data: {
          avatarUrl: string | undefined;
          nickName: string | undefined;
          openid: string;
        } = {
          avatarUrl: undefined,
          nickName: undefined,
          openid: this.data.ui.openid,
        };
        if (
          this.data.ui.avatarUrl !== this.data.avatarUrl ||
          this.data.ui.nickName !== this.data.nickName
        ) {
          if (this.data.ui.nickName !== this.data.nickName) {
            data.nickName = this.data.nickName;
          }
          if (this.data.ui.avatarUrl !== this.data.avatarUrl) {
            data.avatarUrl = this.data.avatarUrl;
          }
          wx.cloud
            .callFunction({
              name: "setUserInfo",
              data: data,
            })
            .then((res) => {
              // console.log(res);
              app.showToast(this, {});
              wx.setStorageSync("ui", {
                openid: this.data.ui.openid,
                nickName: data.nickName ?? this.data.ui.nickName,
                avatarUrl: data.avatarUrl ?? this.data.ui.avatarUrl,
              });
              // console.log(wx.getStorageSync("ui"));
              useInfoStore.setData('nickName', this.data.nickName)
              useInfoStore.setData('avatarUrl', this.data.avatarUrl)
              wx.navigateBack({});
            })
            .catch((err) => {
              console.log(err);
              app.showToast(this, {
                icon: "error",
                content: "error",
              });
            });
        }
      }
    },
  }
});
export {};
