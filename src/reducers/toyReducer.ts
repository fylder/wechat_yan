import { TOY_LIST } from "../constants/actionType"
/**
 * 一个function对应一个action
 * @param state
 * @param action
 */
export default function toy(state = {}, action) {
  switch (action.type) {
    case TOY_LIST:
      return {
        ...state,
        // album: "response.data"
        album: action.album
      }
    default:
      return state
  }
}
