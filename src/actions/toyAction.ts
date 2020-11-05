import Taro from "@tarojs/taro";
import { TOY_LIST } from "../constants/actionType";

export const sendList = album => {
  return {
    type: TOY_LIST,
    album
  };
};

export const getList = (hasRefresh: boolean) => {
  return async (dispatch: any) => {
    Taro.showNavigationBarLoading();
    const resp = await Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/album/type",
      method: "POST",
      mode: "cors",
      data: {
        type: "toy"
      }
    });
    const time = hasRefresh ? 1000 : 0;
    setTimeout(() => {
      Taro.hideNavigationBarLoading();
      dispatch(sendList(resp.data));
    }, time);
  };
};
