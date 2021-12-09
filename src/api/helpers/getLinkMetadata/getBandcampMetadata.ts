import { OembedData } from 'oembed-parser';

export const getBandcampMetadata = async (url: string): Promise<OembedData> => {
  const ogs = require('open-graph-scraper');
  const options = { url };
  const { error, result, response } = await ogs(options);
  if(error){
    throw error
  }
  if(!/bandcamp/u.test(result.twitterSite)){
    throw new Error(`Not a bandcamp url: ${url}`)
  }
  console.log(result)
  return {
    title: result.ogTitle,
    provider_name: 'bandcamp',
    provider_url: 'https://bandcamp.com',
    thumbnail_url: result.ogImage.url,
    // @ts-ignore
    width: result.ogImage.width,
    height: result.ogImage.height,
    type: 'video',
    version: '1.0',
    html: `<iframe src="${result.twitterPlayer.url}" style="border:0; width: 400px; height: 307px;" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
  };
};
