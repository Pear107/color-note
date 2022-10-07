type color="#c88f23"|"#b99192"|"#b5c07b"|"#dd8270"|"#bccdbb"
type UI = {
  nickName: string,
  avatarUrl: string,
  openid: string
}
interface CustomModal {
  caption: string;
  content?: string;
  confrim: () => void;
  cancel?: () => void;
  showContent?: boolean;
  showCancel?: boolean;
  customContent?: boolean;
}
interface CustomToast {
  icon?: "success" | "error";
  duration?: 2000;
  content?: string;
}