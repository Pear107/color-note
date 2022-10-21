// pages/mine/set.ts
import { useInfoStore } from "../../store/index";
import WeCropper from "../../miniprogram_modules/we-cropper/dist/we-cropper";
import { Options } from "../../miniprogram_modules/we-cropper/types/options";
import IWeCropper from "../../miniprogram_modules/we-cropper/types/we-cropper";
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
};
type TProperty = {};
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
  imageToBase64: (imageUrl: string) => Promise<string>;
  getImageInfo: (
    imageUrl: string
  ) => Promise<WechatMiniprogram.GetImageInfoSuccessCallbackResult>;
  canvasToFile: (canvasId: string, quality: number) => Promise<string>;
};
// 定义自定义属性
type TCustomInstanceProperty = {
  wecropper: IWeCropper;
};
type TIsPage = false;
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
    attached() {
      const ui = wx.getStorageSync("ui");
      this.setData({
        ui: ui,
      });
      this.setData({
        avatarUrl: useInfoStore.getData("avatarUrl"),
        nickName: useInfoStore.getData("nickName"),
      });
      useInfoStore.addPage(this);
      const selectIndex = this.data.avatar.findIndex((value: string) => {
        return value === this.data.avatarUrl;
      });
      this.setData({
        selectIndex: selectIndex,
      });

      // 实例化 WeCropper
      const cropperOpt = this.data.cropperOpt;
      this.wecropper = (new WeCropper(
        cropperOpt as Options.ConstructorOption
      ) as unknown) as IWeCropper;
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
    },
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
        count: 1,
        mediaType: ["image"],
        sourceType: ["album", "camera"],
        camera: "back",
        success(res) {
          const image = res.tempFiles[0];
          that.wecropper?.pushOrign(image.tempFilePath);
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
      this.wecropper?.getCropperImage(async (imageUrl: string) => {
        if (imageUrl) {
          const avatarUrl = await this.imageToBase64(imageUrl);
          console.log(avatarUrl);
          this.setData({
            clip: false,
            isShowAvatar: false,
            avatarUrl: avatarUrl,
            selectIndex: 7,
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
    async confirm() {
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
          try{
            await wx.cloud.callFunction({name: ''})
            app.showToast(this, {});
            wx.setStorageSync("ui", {
              openid: this.data.ui.openid,
              nickName: data.nickName ?? this.data.ui.nickName,
              avatarUrl: data.avatarUrl ?? this.data.ui.avatarUrl,
            });
            useInfoStore.setData("nickName", this.data.nickName);
            useInfoStore.setData("avatarUrl", this.data.avatarUrl);
            wx.navigateBack({});
          }catch(err){
            console.log(err.errMsg)
            app.showToast(this, {
              icon: "error",
              content: "error",
            });
          }
        }
      }
    },
    imageToBase64(imageUrl) {
      return new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery().in(this);
        query
          .select("#canvas")
          .fields({
            node: true,
            size: true,
          })
          .exec(async (res) => {
            const dom = res[0];
            const imageInfo = await this.getImageInfo(imageUrl);
            if (dom.node === null) {
              const canvas: WechatMiniprogram.Canvas = dom.node;
              const ctx: WechatMiniprogram.RenderingContext = canvas.getContext(
                "2d"
              );
              console.log(ctx);
              const img = canvas.createImage();
              img.src = imageUrl;
              // img.crossOrigin = "anonymous";
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                // @ts-ignore
                ctx.drawImage(img, 0, 0, img.width, img.height);
                if (imageInfo.type === "jpeg") {
                  const avatarUrl = canvas.toDataURL("image/jpeg", 1);
                  resolve(avatarUrl);
                } else {
                  const avatarUrl = canvas.toDataURL("image/jpeg", 0.92);
                  resolve(avatarUrl);
                }
              };
              img.onerror = () => {
                reject("");
              };
            } else {
              const ctx: WechatMiniprogram.CanvasContext = wx.createCanvasContext(
                "canvas",
                this
              );
              const quality = imageInfo.type === 'jpeg' ? 1 : 0.92
              ctx.clearRect(0, 0, 100, 100);
              ctx.drawImage(imageUrl, 0, 0, 100, 100);
              ctx.draw(false, async () => {
                const imageUrl = await this.canvasToFile("canvas", quality)
                wx.getFileSystemManager().readFile({
                  filePath: imageUrl,
                  encoding: "base64",
                  success: (res) => {
                    const base64 = `data:image/jpeg;base64,${res.data}`
                    resolve(base64);
                  },
                  fail: (err) => {
                    app.showToast(this, {
                      content: "获取图片失败",
                      icon: "error",
                    });
                    reject(err.errMsg);
                  },
                });
              });
            }
          });
      });
    },
    getImageInfo(imageUrl: string) {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: imageUrl,
          success: (res) => {
            resolve(res);
          },
          fail: (err) => {
            reject(err.errMsg);
          },
        });
      });
    },
    canvasToFile(canvasId: string, quality: number){
      return new Promise((resolve, reject) => {
        wx.canvasToTempFilePath({
          canvasId: canvasId,
          fileType: "jpg",
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          quality: quality,
          success: (res) => {
            resolve(res.tempFilePath);
          },
          fail: (err) => {
            reject(err.errMsg);
          },
        });
      })
    }
  },
});
export {};
