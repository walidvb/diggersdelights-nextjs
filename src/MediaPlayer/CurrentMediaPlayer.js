import { useState } from 'react'

import { DateTime } from 'luxon'
import ReactPlayer from 'react-player'

import { useMediaContext } from "./createMediaContext"
import MediaControls from './MediaControls'
import Media from './MediaPlayer'

const DefaultDetails = ({ item }) => {
  const { metadata: { createdAt } } = item
  const renderedDate = DateTime.fromISO(createdAt).toLocaleString({ month: 'long', day: 'numeric' })
  return (
    <div>
      <div className="italics text-gray-600">{renderedDate}</div>
      {item.media.title}
    </div>
  )
}

export const CurrentMediaPlayer = ({
  className,
  Details = DefaultDetails,
}) => {
  const { playing } = useMediaContext()
  const [hidden, setHidden] = useState(true)
  if(!playing.media){
    return null
  }
  const canRemoteControl = ReactPlayer.canPlay(playing.media.url)
  return (
    <div className={`text-black ${className}`}>
      <Media
        className={[canRemoteControl && hidden && "absolute top-0 pointer-events-none opacity-0"].join(' ')}
        item={playing}
        lazy={false}
      />
      <MediaControls item={playing} className="flex items-center gap-2" />
      <Details item={playing} />
      <div
        className="cursor-pointer text-xs text-gray-500 hover:underline mt-1"
        onClick={() => setHidden(!hidden)}
      >
        {hidden ? 'show' : 'hide'}
        {' '}
        player
      </div>
    </div>
  )
}
