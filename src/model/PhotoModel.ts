import { Picture } from "../store/model/data.d";

//相册保存的数据类型
// eslint-disable-next-line import/prefer-default-export
export class Photo {
  constructor() {
    this.id = "";
    this.pictures = [];
  }

  id: string;
  pictures: Array<Picture>;
}
