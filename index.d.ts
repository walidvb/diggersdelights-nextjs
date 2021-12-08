type Group = {
  id: number,
  users: number[],
  meta: {

  },
  created_at: string,
}


type Link = {
  url: string,
  meta?: {
    title: string
    author_name: string
    author_url: string
    type: string
    height: number,
    width: number,
    version: string,
    provider_name: string
    provider_url: string
    thumbnail_height: number,
    thumbnail_width: number,
    thumbnail_url: string
    html: string,
  },
  user: {
    id: number,
    name: string,
  },
  group: number,
  createdAt: string,
}