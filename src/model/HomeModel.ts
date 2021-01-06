import { Album, SwipeModel } from "src/store/model/data";

// eslint-disable-next-line import/prefer-default-export
export class HomeModel {
  constructor() {
    this.home = "";
    this.swipe = [];
    this.album = [];
  }

  home: string;
  swipe: Array<SwipeModel>;
  album: Array<Album>;
}
