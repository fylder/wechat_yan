import { combineReducers } from "redux";
import album from "./albumReducer";
import photo from "./photoReducer";
import toy from "./toyReducer";
import user from "./userReducer";

export default combineReducers({
  user,
  toy,
  album,
  photo
});
