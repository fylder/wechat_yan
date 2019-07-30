import { USER_DETAIL, USER_EXIT, USER_TOKEN } from "../constants/actionType"

export const saveToken = (accessToken: string) => {
  return {
    type: USER_TOKEN,
    accessToken
  }
}

export const detail = (id: string, username: string, avatar: string) => {
  return {
    type: USER_DETAIL,
    id,
    username,
    avatar
  }
}

export const exit = () => {
  return {
    type: USER_EXIT,
    id: "",
    username: "",
    avatar: ""
  }
}
