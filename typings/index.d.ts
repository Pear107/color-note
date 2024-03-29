/// <reference path="./types/index.d.ts" />

type GlobalData = {
  [key: string]: any;
  userInfo?: WechatMiniprogram.UserInfo;
  StatusBar: number;
  Custom: WechatMiniprogram.ClientRect | null;
  CustomBar: number;
  varieties: Array<{name: string, color: string}>;
}

type UserInfo = {
  [key: string]: string;
  nickName: string;
  avatarUrl: string;
  openid: string;
}

interface IAppOption {
  globalData: GlobalData;
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
  showModal: (that: any, options: CustomModal) => void;
  hiddenModal: (that: any) => void;
  showToast: (that: any, options: CustomToast) => void;
  hiddenToast: (that: any) => void;
}