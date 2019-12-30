import { Picture } from "./AlbumModel";

//相册保存的数据类型
export class Photo {
  constructor() {
    this.id = "";
    this.pictures = [];
  }

  id: string;
  pictures: Array<Picture>;
}
