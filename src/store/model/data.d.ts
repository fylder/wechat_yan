export interface Album {
  id: number;
  uid: number;
  name: string;
  cover: string;
  subject: string;
  describe: string;
  type?: string;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Picture {
  id: string;
  id_album: number;
  name: string;
  photo: string;
  subject?: string;
  describe?: string;
  createdAt: string;
  loaded: boolean | false; //用于判定是否加载
}

export interface SlogModel {
  id: number;
  uid: number;
  name: string;
  describe: string;
  slog: string;
  cover: string;
  type: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleModel {
  id: string;
  uid: string;
  cover: string;
  subject: string;
  describe: string;
  content: string;
  type: string;
  tags: string;
  createdAt: string;
}
