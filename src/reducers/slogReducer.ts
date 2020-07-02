import { SLOG_LIST } from "../constants/actionType";
/**
 * 一个function对应一个action
 * @param state
 * @param action
 */
export default function slog(state = { slog: [] }, action) {
  switch (action.type) {
    case SLOG_LIST:
      return {
        ...state,
        slog: action.slog,
        action: SLOG_LIST
      };
    default:
      return state;
  }
}
