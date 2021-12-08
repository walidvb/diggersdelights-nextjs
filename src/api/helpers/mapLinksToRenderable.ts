import { Link, RenderableLink } from "../../.."

export const mapLinksToRenderable = (links: Link[]): RenderableLink[] => {
  return links.map(link => ({
    media: {
      image_url: link.meta.thumbnail_url,
      title: link.meta.title,
      ...link.meta,
      url: link.url,
    },
    metadata: {
      createdAt: link.createdAt || null,
      user: link.user,
    }
  }))
}