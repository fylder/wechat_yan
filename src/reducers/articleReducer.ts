import { ARTICLE_LIST } from "../constants/actionType";
/**
 * 一个function对应一个action
 * @param state
 * @param action
 */
export default function article(state = { article: [] }, action) {
  switch (action.type) {
    case ARTICLE_LIST:
      return {
        ...state,
        article: action.article,
        action: ARTICLE_LIST
      };
    default:
      return state;
  }
}
