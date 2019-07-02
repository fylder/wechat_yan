import { BOOK_DETAIL, BOOK_SHOW, BOOK_HIDE } from "../constants/actionType"

/**
 * 一个function对应一个action
 * @param state
 * @param action
 */
export function detail(state = {}, action) {
  switch (action.type) {
    case BOOK_DETAIL:
      return {
        ...state,
        id: action.id,
        info: action.info
      }
    default:
      return state
  }
}

export function load(state = {}, action) {
  switch (action.type) {
    case BOOK_SHOW:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case BOOK_HIDE:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}
