import Taro from "@tarojs/taro"
import { TOY_LIST } from "../constants/actionType"

export const sendList = album => {
  return {
    type: TOY_LIST,
    album
  }
}

export const getList = () => {
  return async (dispatch: any) => {
    const resp = await Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/album/type",
      method: "POST",
      data: {
        type: "toy"
      }
    })
    dispatch(sendList(resp.data))
  }
}
