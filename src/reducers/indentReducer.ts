import { INDENT_ADD, INDENT_LIST, INDENT_PAY } from "../constants/actionType"

const STATE = {
  indentList: []
}

export default function indent(state = STATE, action) {
  switch (action.type) {
    case INDENT_LIST:
      return {
        ...state,
        id: action.id,
        indentList: action.indentList
      }
    case INDENT_ADD:
      let indentListTemp = state.indentList
      indentListTemp.unshift(action.indentItem)
      if (action.onResolved) action.onResolved() //执行完成,回调通知
      return {
        ...state,
        action: action.type,
        indentList: indentListTemp
      }
    case INDENT_PAY:
      return {
        ...state,
        id: action.id,
        username: action.username
      }
    default:
      return state
  }
}
