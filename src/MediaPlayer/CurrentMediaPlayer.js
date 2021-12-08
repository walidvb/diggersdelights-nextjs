import { useState } from 'react'

import { DateTime } from 'luxon'
import ReactPlayer from 'react-player'

import { useMediaContext } from "./createMediaContext"
import MediaControls from './MediaControls'
import Media from './MediaPlayer'
import { View } from 'react-native';
import tw from 'twrnc';

const DefaultDetails = ({ item }) => {
  const { metadata: { createdAt } } = item
  const renderedDate = DateTime.fromISO(createdAt).toLocaleString({ month: 'long', day: 'numeric' })
  return (
    <View>
      <View style={tw`italics text-gray-600`}>{renderedDate}</View>
      {item.media.title}
    </View>
  )
}

export const CurrentMediaPlayer = ({
  style,
  Details = DefaultDetails,
}) => {
  const { playing } = useMediaContext()
  const [hidden, setHidden] = useState(true)
  if(!playing.media){
    return null
  }
  const canRemoteControl = ReactPlayer.canPlay(playing.media.url)
  return (
    <View style={[tw`text-black`, style]}>
      <Media
        style={canRemoteControl && hidden && tw`absolute top-0 pointer-events-none opacity-0`}
        item={playing}
        lazy={false}
      />
      <MediaControls item={playing} style={tw`flex items-center gap-2`} />
      <Details item={playing} />
      <View
        style={tw`cursor-pointer text-xs text-gray-500 hover:underline mt-1`}
        onClick={() => setHidden(!hidden)}
      >
        {hidden ? 'show' : 'hide'}
        {' '}
        player
      </View>
    </View>
  )
}
