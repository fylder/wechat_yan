import { BOOK_DETAIL, BOOK_SHOW, BOOK_HIDE } from "../constants/actionType"

export const detail = (id: number, info: string) => {
  return {
    type: BOOK_DETAIL,
    id,
    info
  }
}

export const load = (open: boolean) => {
  if (open) {
    return { type: BOOK_SHOW, isLoading: open }
  } else {
    return { type: BOOK_HIDE, isLoading: open }
  }
}
