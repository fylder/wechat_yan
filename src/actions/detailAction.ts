import { COMIC_DETAIL, COMIC_SHOW, COMIC_HIDE } from "../constants/actionType"

export const detail = (id: number, info: string) => {
  return {
    type: COMIC_DETAIL,
    id,
    info
  }
}

export const load = (open: boolean) => {
  if (open) {
    return { type: COMIC_SHOW, isLoading: open }
  } else {
    return { type: COMIC_HIDE, isLoading: open }
  }
}
