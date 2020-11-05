import Taro from "@tarojs/taro";
import { ALBUM_LIST } from "../constants/actionType";

export const sendList = album => {
  return {
    type: ALBUM_LIST,
    album
  };
};

export const getList = (hasRefresh: boolean) => {
  return async (dispatch: any) => {
    Taro.showNavigationBarLoading();
    const resp = await Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/album/show",
      method: "POST",
      mode: "cors"
    });
    const time = hasRefresh ? 1000 : 0;
    setTimeout(() => {
      Taro.hideNavigationBarLoading();
      dispatch(sendList(resp.data));
    }, time);
  };
};
