import Taro from "@tarojs/taro";
import { PHOTO_LIST } from "../constants/actionType";

export const sendList = (id: string, photoList) => {
  return {
    type: PHOTO_LIST,
    id,
    photoList
  };
};

//获取一个相册的照片信息
export const getList = (id: string) => {
  return async (dispatch: any) => {
    Taro.showNavigationBarLoading();
    const resp = await Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/picture/" + id,
      method: "GET",
      mode: "cors"
    });
    setTimeout(() => {
      Taro.hideNavigationBarLoading();
      dispatch(sendList(id, resp.data));
    }, 500);
  };
};
