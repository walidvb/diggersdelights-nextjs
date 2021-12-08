import { OembedData } from "oembed-parser"

type Group = {
  id: number,
  users: number[],
  meta: {

  },
  created_at: string,
}


type Link = {
  url: string,
  meta?: OembedData,
  user: {
    id: number,
    name: string,
  },
  group: number,
  createdAt: string,
}