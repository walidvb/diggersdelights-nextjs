import {
  extract
} from 'oembed-parser'

export default async function getLinkMetadata (url: string) {
  const data = await extract(url)
  return data
}