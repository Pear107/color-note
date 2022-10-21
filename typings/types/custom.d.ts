type METHOD =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "OPTIONS"
  | "HEAD"
  | "TRACE"
  | "CONNECT";
type ContentType =
  | "application/json;charset=UTF-8"
  | "application/x-www-form-urlencoded";
interface HEADER {
  "Content-Type"?: ContentType;
}
interface REQUEST {
  url: string;
  method?: METHOD;
  header?: HEADER;
  data?: any;
}
type Color = "#c88f23" | "#b99192" | "#b5c07b" | "#dd8270" | "#bccdbb";
type Log4jType =
  | "debug"
  | "error"
  | "group"
  | "groupEnd"
  | "info"
  | "log"
  | "table"
  | "warn";
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
