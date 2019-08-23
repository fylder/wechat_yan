import { combineReducers } from "redux"
import toy from "./toyReducer"
import user from "./userReducer"

export default combineReducers({
  user,
  toy
})
