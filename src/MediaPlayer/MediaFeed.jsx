import React from 'react'
import { useMediaContext } from "oembed-feed-player/createMediaContext"
import Media from 'oembed-feed-player/MediaPlayer';

export function MediaFeed({ 
  RenderMedia,
  className,
}) {
  const { queue } = useMediaContext()
  
  if ('function' !== typeof RenderMedia){
    return <React.Fragment>
      { queue.map((item) => <Media key={item.media.url} item={item} />)}
    </React.Fragment>
  }

  return <View tw={className}>
    {queue.map((item) => {
      return <RenderMedia
        key={item.media.url}
        item={item}
        renderPlayer={() => <Media key={item.media.url} item={item} />}
      />
    })}
  </View>
}