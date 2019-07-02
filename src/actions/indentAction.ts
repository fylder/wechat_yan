import { INDENT_ADD, INDENT_LIST, INDENT_PAY } from "../constants/actionType"
import { IndentModel } from "./model/indentModel"

export const query = () => {
  return {
    type: INDENT_LIST,
    indentList: []
  }
}

export const add = (indent: IndentModel, onResolved) => {
  return {
    type: INDENT_ADD,
    indentItem: indent,
    onResolved
  }
}

export const pay = (id: string) => {
  return {
    type: INDENT_PAY,
    id
  }
}
