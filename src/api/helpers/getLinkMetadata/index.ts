import {
  extract, OembedData
} from 'oembed-parser'
import { getBandcampMetadata } from './getBandcampMetadata';

export default async function getLinkMetadata (url: string): Promise<OembedData> {
  try{
    const data = await extract(url)
    console.log("lnkk metadata:",  data)
    return data
  } catch (err){
    if (!/No provider found with given url/u.test(err.message)) {
      throw err
    }
    return getBandcampMetadata(url)
  }
}