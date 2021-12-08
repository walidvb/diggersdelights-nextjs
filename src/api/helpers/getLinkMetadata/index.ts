import {
  extract, OembedData
} from 'oembed-parser'

export default async function getLinkMetadata (url: string): Promise<OembedData> {
  const data = await extract(url)
  return data
}