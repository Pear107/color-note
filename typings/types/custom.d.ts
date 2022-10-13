type color = "#c88f23" | "#b99192" | "#b5c07b" | "#dd8270" | "#bccdbb";
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
interface RouteData {
  key: number;
  name: string;
  route: string;
}
interface Notes {
  _id: string;
  openid: string;
  title: string;
  content: string;
  time: string;
}