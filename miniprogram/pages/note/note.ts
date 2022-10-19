// pages/note/write.ts
import { formatTime } from "../../utils/util";
import checkLogin from "../../behavior/checkLogin";
import CustomRequest from "../../utils/customRequest";
import { APIKey, SecretKey } from "../../config/index";
const plugin = requirePlugin("chatbot");
const app = getApp<IAppOption>();
type TData = {
  CustomBar: number;
  varieties: { name: string; color: string }[];
  variety: string;
  color: string;
  datetime: string;
  id: string;
  title: string;
  isShowVariety: boolean;
  openid: string;
  model: "edit" | "read";
};
type TProperty = {};
type TMethod = {
  onEditorReady: () => void;
  onEditorInput: (e: any) => void;
  getContents: (
    callback: Function
  ) => Promise<WechatMiniprogram.GetContentsSuccessCallbackResult | string>;
  setContents: (delta: any) => Promise<boolean>;
  insertText: (text: string) => Promise<boolean>;
  insertImage: (src: string) => Promise<boolean>;
  analyse: () => void;
  showVarieties: () => void;
  hideVarieties: () => void;
  selectVariety: (e: any) => void;
  save: () => void;
  createNote: () => void;
  readNote: () => void;
  scan: (e: any) => void;
  updateNote: () => void;
  deleteNote: () => void;
  addImage: () => void;
  share: () => void;
  getToken: () => Promise<string>;
  chooseImage: (
    minWidth?: number,
    minHeight?: number,
    maxWidth?: number,
    maxHeight?: number
  ) => Promise<string>;
  imageToBase64: (imageUrl: string) => Promise<string>;
  OCR: (base64: string, token: string) => Promise<Array<{ words: string }>>;
  getImageInfo: (
    imageUrl: string
  ) => Promise<WechatMiniprogram.GetImageInfoSuccessCallbackResult>;
  convertJpg: (imageUrl: string) => Promise<string>;
  canvasToFile: (canvas: WechatMiniprogram.Canvas) => Promise<string>;
};
type TCustomInstanceProperty = {
  checkLogin: () => boolean;
  editorCtx: WechatMiniprogram.EditorContext;
};
type TIsPage = true;
Component<TData, TProperty, TMethod, TCustomInstanceProperty, TIsPage>({
  behaviors: [checkLogin],
  data: {
    CustomBar: app.globalData.CustomBar,
    varieties: app.globalData.varieties,
    variety: "未分类",
    color: "",
    datetime: "",
    id: "",
    title: "",
    isShowVariety: false,
    openid: "",
    model: "read",
  },
  methods: {
    onLoad(options: any) {
      if (this.checkLogin()) {
        if (options?._id) {
          this.setData({
            model: "read",
          });
          this.readNote();
        } else {
          this.setData({
            model: "edit",
          });
          // this.createNote()
        }
        this.setData({
          datetime: formatTime(new Date()),
        });
        plugin.init({
          appid: "TWBy1YUYKJTgRLmVdWre06IutAQY6c",
          openid: this.data.openid, // 小程序的openid，必填项
          autoRecommendGuideList: true,
          success: () => {},
          fail: (error: any) => {
            console.log(error);
          },
          guideList: ["您好"],
          textToSpeech: true, //默认为ture打开状态
          background: "rgba(247,251,252,1)",
          guideCardHeight: 40,
          operateCardHeight: 145,
          history: true,
          navHeight: 0,
          robotHeader: "",
          userHeader: "",
          userName: "",
          anonymous: false, // 是否允许匿名用户登录，版本1.2.9后生效, 默认为false，设为ture时，未传递userName、userHeader两个字段时将弹出登录框
          hideMovableButton: false,
        });
      } else {
        wx.switchTab({
          url: "../mine/index",
        });
      }
    },
    onEditorReady() {
      const query = wx.createSelectorQuery();
      query
        .select("#editor")
        .context((res) => {
          this.editorCtx = res.context as WechatMiniprogram.EditorContext;
        })
        .exec();
    },
    onEditorInput(e: any) {},
    getContents() {
      return new Promise((resolve, reject) => {
        this.editorCtx.getContents({
          success: (res) => {
            resolve(res);
          },
          fail: (err) => {
            reject(err.errMsg);
          },
        });
      });
    },
    setContents(delta: any) {
      return new Promise((resolve, reject) => {
        this.editorCtx.setContents({
          delta: delta,
          success: () => {
            resolve(true);
          },
          fail: () => {
            reject(false);
          },
        });
      });
    },
    insertText(text: string) {
      return new Promise((resolve, reject) => {
        this.editorCtx.insertText({
          text: text,
          success: () => {
            resolve(true);
          },
          fail: () => {
            reject(false);
          },
        });
      });
    },
    insertImage(imageUrl) {
      console.log("hello world");
      return new Promise((resolve, reject) => {
        this.editorCtx.insertImage({
          src: imageUrl,
          success: () => {
            console.log("insert image success");
            resolve(true);
          },
          fail: () => {
            console.log("insert image fail");
            app.showToast(this, {
              content: "添加图片失败",
              icon: "error",
            });
            reject(false);
          },
        });
      });
    },
    analyse() {
      let txt: string = "";
      this.getContents((res: any) => {
        console.log(res.delta);
        res.delta.ops.forEach((item: any) => {
          if (typeof item.insert == "string" && item.insert.trim() != "") {
            if (txt == "") {
              txt = item.insert;
            } else {
              txt = txt + "，" + item.insert;
            }
          }
        });
        plugin.api.nlp("tokenize", { q: txt }).then(
          (res: any) => {
            console.log(txt);
            console.log("tokenize result : ", res);
          },
          (err: any) => {
            console.log(err);
          }
        );
      });
    },
    showVarieties() {
      this.setData({
        isShowVariety: true,
      });
    },
    hideVarieties() {
      this.setData({
        isShowVariety: false,
      });
    },
    selectVariety(e: any) {
      console.log(e.currentTarget.dataset);
      this.setData({
        variety: e.currentTarget.dataset.name,
        color: e.currentTarget.dataset.color,
      });
    },
    save() {},
    createNote() {
      const openid = this.data.openid;
      wx.cloud
        .callFunction({
          name: "createNote",
          data: {
            openid: openid,
          },
        })
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: Error) => {
          console.error("Error:", err);
        });
    },
    readNote() {},
    async scan() {
      const imageUrl = await this.chooseImage(15, 15, 4096, 4096);
      const base64 = await this.imageToBase64(imageUrl);
      const token = await this.getToken();
      const texts = await this.OCR(base64, token);
      texts.forEach((value) => {
        this.insertText(value.words);
      });
    },
    updateNote() {},
    deleteNote() {},
    async addImage() {
      const imageUrl = await this.chooseImage();
      await this.insertImage(imageUrl);
    },
    share() {},
    async getToken() {
      const url = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${APIKey}&client_secret=${SecretKey}`;
      const header: HEADER = {
        "Content-Type": "application/json;charset=UTF-8",
      };
      return new Promise(async (resolve, reject) => {
        try {
          const res: any = await CustomRequest({
            url,
            header,
          });
          if ((res.data.statusCode = 200)) {
            resolve(res.data.access_token);
          } else {
            app.showToast(this, {
              content: "网络错误",
              icon: "error",
            });
            reject("");
          }
        } catch (err: any) {
          app.showToast(this, {
            content: "网络错误",
            icon: "error",
          });
          reject("");
        }
      });
    },
    async chooseImage(
      minWidth = 100,
      minHeight = 100,
      maxWidth = 4096,
      maxHeight = 4096
    ) {
      return new Promise((resolve, reject) => {
        wx.chooseMedia({
          count: 1,
          mediaType: ["image"],
          sourceType: ["album", "camera"],
          camera: "back",
          success: async (res) => {
            const imageUrl = await this.convertJpg(
              res.tempFiles[0].tempFilePath
            );
            const imageInfo = await this.getImageInfo(imageUrl);
            if (imageInfo.width < minWidth || imageInfo.height < minHeight) {
              app.showToast(this, {
                content: "图片过小",
                icon: "error",
              });
              reject("");
            } else if (
              imageInfo.width > maxWidth ||
              imageInfo.height > maxHeight
            ) {
              app.showToast(this, {
                content: "图片过大",
                icon: "error",
              });
              reject("");
            } else {
              resolve(imageUrl);
            }
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
    },
    async imageToBase64(imageUrl) {
      return new Promise((resolve, reject) => {
        wx.getFileSystemManager().readFile({
          filePath: imageUrl,
          encoding: "base64",
          success: (res) => {
            resolve(res.data as string);
          },
          fail: (err: any) => {
            app.showToast(this, {
              content: "获取图片失败",
              icon: "error",
            });
            reject(err);
          },
        });
      });
    },
    async OCR(base64, token) {
      const url = `https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=${token}`;
      const header: HEADER = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const data = {
        image: base64,
      };
      return new Promise(async (resolve, reject) => {
        try {
          const res: any = await CustomRequest({
            url,
            header,
            data,
          });
          if ("words_result_num" in res.data) {
            if (res.data["words_result_num"] !== 0) {
              resolve(res.data["words_result"]);
            } else {
              app.showToast(this, {
                content: "没有获取到内容",
                icon: "error",
              });
              reject([]);
            }
          } else {
            app.showToast(this, {
              content: "解析失败",
              icon: "error",
            });
            reject([]);
          }
        } catch (err: any) {
          app.showToast(this, {
            content: "网络错误",
            icon: "error",
          });
        }
      });
    },
    async getImageInfo(imageUrl: string) {
      return new Promise((resolve: Function, reject: Function) => {
        wx.getImageInfo({
          src: imageUrl,
          success: (res) => {
            resolve(res);
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
    },
    async convertJpg(imageUrl) {
      return new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery();
        query
          .select("#canvas")
          .fields({ node: true, size: true })
          .exec(async (res) => {
            const canvas: WechatMiniprogram.Canvas = res[0].node;
            const ctx: WechatMiniprogram.RenderingContext = canvas.getContext(
              "2d"
            );
            const img = canvas.createImage();
            try {
              const imageInfo = await this.getImageInfo(imageUrl);
              if (imageInfo.type !== "jpeg") {
                img.src = imageInfo.path;
                // img.crossOrigin = "anonymous";
                img.onload = async () => {
                  canvas.width = img.width;
                  canvas.height = img.height;
                  // @ts-ignore
                  ctx.fillStyle = "#fff";
                  // @ts-ignore
                  ctx.fillRect(0, 0, img.width, img.height);
                  // @ts-ignore
                  ctx.drawImage(img, 0, 0, img.width, img.height);
                  try {
                    const imageUrl = await this.canvasToFile(canvas);
                    resolve(imageUrl);
                  } catch (err: any) {
                    reject(err);
                  }
                };
              } else {
                resolve(imageUrl);
              }
            } catch (err) {}
          });
      });
    },
    canvasToFile(canvas) {
      return new Promise((resolve: Function, reject: Function) => {
        wx.canvasToTempFilePath({
          canvas: canvas,
          canvasId: "canvas",
          fileType: "jpg",
          success: (res) => {
            resolve(res.tempFilePath);
          },
          fail: (err) => {
            reject(err.errMsg);
          },
        });
      });
    },
  },
});
export {};
