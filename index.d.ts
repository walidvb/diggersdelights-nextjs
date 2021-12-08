import { OembedData } from "oembed-parser"

type Group = {
  id: number,
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
    firstName: string,
  },
  group: {
    id: number,
    name?: string,
  },
  createdAt: string,
}