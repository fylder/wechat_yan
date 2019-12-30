import { PHOTO_LIST } from "../constants/actionType";
import { Photo } from "../model/PhotoModel";

/**
 * 一个function对应一个action
 * @param state
 * @param action
 */
export default function photo(state = { photos: new Array<Photo>() }, action) {
  switch (action.type) {
    case PHOTO_LIST:
      let photos: Array<Photo> = state.photos;
      photos.push({
        id: action.id,
        pictures: action.photoList
      });
      return {
        ...state,
        photos
      };
    default:
      return state;
  }
}
