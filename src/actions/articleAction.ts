import Taro from "@tarojs/taro";
import { ARTICLE_LIST } from "../constants/actionType";

export const sendList = article => {
  return {
    type: ARTICLE_LIST,
    article
  };
};

export const getList = (hasRefresh: boolean) => {
  return async (dispatch: any) => {
    Taro.showNavigationBarLoading();
    const resp = await Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/article",
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
