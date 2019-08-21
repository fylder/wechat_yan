import { combineReducers } from "redux"
import { detail, load } from "./detailReducer"
import toy from "./toyReducer"
import user from "./userReducer"

export default combineReducers({
  user,
  detail,
  load,
  toy
})
