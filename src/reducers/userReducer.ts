import { USER_DETAIL, USER_EXIT } from "../constants/actionType"

export default function user(state = {}, action) {
  switch (action.type) {
    case USER_DETAIL:
      return {
        ...state,
        id: action.id,
        username: action.username,
        avatar: action.avatar
      }
    case USER_EXIT:
      return {
        ...state,
        id: action.id,
        username: action.username,
        avatar: action.avatar
      }
    default:
      return state
  }
}
