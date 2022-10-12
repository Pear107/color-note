// components/custom-modal/index.ts
interface TData {
  isShow: boolean;
  state: "confirm" | "cancel";
  caption: string;
  content: string;
  confirm: () => void;
  cancel: () => void;
  showContent: boolean;
  showCancel: boolean;
  customContent: boolean;
}
// 用 interface 会报错缺少索引签名
type TProperty = {
  height: {
    type: NumberConstructor;
    value?: number;
  };
  customContent: {
    type: BooleanConstructor;
    value?: boolean;
  };
};
// 用 interface 会报错缺少索引签名
type TMethod = {
  confirm: () => void;
  cancel: () => void;
  showModal: (options: CustomModal) => void;
  hiddenModal: () => void;
};
type TCustomInstanceProperty = {};
type TIsPage = false;
Component<TData, TProperty, TMethod, TCustomInstanceProperty, TIsPage>({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: Number,
      value: 211,
    },
    customContent: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    isShow: false,
    state: "confirm",
    caption: "",
    content: "",
    showContent: true,
    showCancel: true,
    customContent: false,
    confirm: () => {},
    cancel: () => {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirm() {
      // this.triggerEvent("parentConfirm");
      this.data.confirm();
      this.hiddenModal();
    },
    cancel() {
      // this.triggerEvent("parentCancel");
      this.data.cancel();
      this.hiddenModal();
    },
    showModal(options: CustomModal) {
      const isShow = !this.data.isShow;
      const {
        caption = "标题",
        content = "",
        confrim = () => {},
        cancel = () => {},
        showContent = true,
        showCancel = true,
        customContent = false,
      } = options;
      this.setData({
        isShow: isShow,
        caption: caption,
        content: content,
        confirm: confrim,
        cancel: cancel,
        showContent: showContent,
        showCancel: showCancel,
        customContent: customContent,
      });
    },
    hiddenModal() {
      const isShow = !this.data.isShow;
      this.setData({
        isShow: isShow,
        caption: "",
        content: "",
        confirm: () => {},
        cancel: () => {},
        showContent: true,
        showCancel: true,
        customContent: false,
      });
    },
  },
});
export {};