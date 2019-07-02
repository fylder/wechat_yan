import { combineReducers } from "redux"
import cart from "./cartReducer"
import { detail, load } from "./detailReducer"
import indent from "./indentReducer"
import user from "./userReducer"

export default combineReducers({
  user,
  detail,
  load,
  cart,
  indent
})
