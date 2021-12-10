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
  message: {
    id: number,
    text: string,
  },
  user: {
    id: number,
    name: string,
    firstName: string,
    lastName: string,
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