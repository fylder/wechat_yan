import { COMIC_DETAIL, COMIC_SHOW, COMIC_HIDE } from "../constants/actionType"

/**
 * 一个function对应一个action
 * @param state
 * @param action
 */
export function detail(state = {}, action) {
  switch (action.type) {
    case COMIC_DETAIL:
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
    case COMIC_SHOW:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case COMIC_HIDE:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}
