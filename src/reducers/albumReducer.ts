import { ALBUM_LIST } from "../constants/actionType";
/**
 * 一个function对应一个action
 * @param state
 * @param action
 */
export default function album(state = { album: [] }, action) {
  switch (action.type) {
    case ALBUM_LIST:
      console.log(`reducer:${ALBUM_LIST}`);
      return {
        ...state,
        album: action.album
      };
    default:
      return state;
  }
}
