import Taro from "@tarojs/taro";
import { SLOG_LIST } from "../constants/actionType";

export const sendList = slog => {
  return {
    type: SLOG_LIST,
    slog
  };
};

export const getList = () => {
  return async (dispatch: any) => {
    Taro.showNavigationBarLoading();
    const resp = await Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/slog/show",
      method: "GET",
      mode: "cors"
    });
    Taro.hideNavigationBarLoading();
    dispatch(sendList(resp.data));
  };
};

export const refreshList = () => {
  return async (dispatch: any) => {
    Taro.showNavigationBarLoading();
    const resp = await Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/slog/show",
      method: "GET",
      mode: "cors"
    });
    setTimeout(() => {
      Taro.hideNavigationBarLoading();
      dispatch(sendList(resp.data));
    }, 1000);
  };
};
