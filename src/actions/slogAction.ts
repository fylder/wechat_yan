import Taro from "@tarojs/taro";
import { SLOG_LIST } from "../constants/actionType";

export const sendList = slog => {
  return {
    type: SLOG_LIST,
    slog
  };
};

export const getList = (hasRefresh: boolean) => {
  return async (dispatch: any) => {
    Taro.showNavigationBarLoading();
    const resp = await Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/slog/show",
      method: "GET",
      mode: "cors"
    });
    const time = hasRefresh ? 1000 : 0;
    setTimeout(() => {
      Taro.hideNavigationBarLoading();
      dispatch(sendList(resp.data));
    }, time);
  };
};
