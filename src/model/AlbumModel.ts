export interface Album {
  id: number
  uid?: number
  name?: string
  cover: string
  subject?: string
  describe?: string
  type?: string
  tags?: string
  status: number
  createdAt: string
  updatedAt: string
}

export interface Picture {
  id: number
  id_album: number
  name: string
  photo: string
  subject?: string
  describe?: string
  status: number
  createdAt: string
  loaded: boolean | false
}
