import Wex from "../utils/wex";

const useInfo: UserInfo = {
  nickName: "",
  avatarUrl: "",
  openid: "",
};
const useInfoStore = new Wex<UserInfo>(useInfo);
export {
  useInfoStore
};
