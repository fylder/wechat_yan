import Taro from "@tarojs/taro";
import { ALBUM_LIST } from "../constants/actionType";

export const sendList = album => {
  return {
    type: ALBUM_LIST,
    album
  };
};

export const getList = () => {
  return async (dispatch: any) => {
    const resp = await Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/album",
      method: "GET"
    });
    dispatch(sendList(resp.data));
  };
};