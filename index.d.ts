import { OembedData } from "oembed-parser"

type Group = {
  id: number,
  slug: string,
  meta: {
    title: string,
    usersCount?: number,
    linksCount: number,
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
    slug: string,
  },
  createdAt: string,
}

type RenderableLink = {
  media: {
    image_url: string,
    title: string
  },
  metadata: {
    createdAt: string
  }
}