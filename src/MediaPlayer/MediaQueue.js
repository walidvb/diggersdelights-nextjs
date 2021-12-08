import React from 'react'

import { DateTime, Interval } from 'luxon'

import { useItemState, useMediaContext } from './createMediaContext'
import MediaControls from './MediaControls'
import { View } from 'react-native';
import tw from 'twrnc';

const ItemMini = ({ item, className }) => {
  const { media: { title, image_url }, metadata: { createdAt } } = item
  const { isPlaying } = useItemState(item)
  const renderedDate = DateTime.fromISO(createdAt).toLocaleString({ month: 'long', day: 'numeric' })
  return (
    <View tw={`flex items-center group ${className}`}>
      <View style={[tw`relative w-12 h-12 bg-center bg-cover flex-shrink-0 mr-2`, { backgroundImage: `url(${image_url})` }]} >
        <MediaControls
          style={tw`absolute object-center group-hover:opacity-100 ${!isPlaying && 'opacity-0'}`}
          noProgress
          item={item}
        />
      </View>
      <View>
        <View style={tw`text-gray-600 text-xs italic`}>
          {renderedDate}
        </View>
        <View tw={`mr-2 text-sm ${isPlaying && 'font-bold'}`}>
          { title }
        </View>
      </View>
    </View>
  )
}

const Squares = ({ item }) => {
  const { isPlaying, play } = useItemState(item)
  const { media: { image_url, title }, metadata: { createdAt } } = item
  const renderedDate = DateTime.fromISO(createdAt).toLocaleString({ month: 'long', day: 'numeric' })
  return (
    <View>
      <View style={tw`relative group cursor-pointer`} onClick={() => play(item)}>
        <img src={image_url} className="max-w-full h-auto" />
        <MediaControls
          style={tw`absolute text-blue-600 object-center top-1/2 
            left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 
            ${!isPlaying && 'opacity-0'}
          `}
          noProgress
          item={item}
        />
      </View>
      <View style={tw`text-gray-600 text-xs italic`}>
        {renderedDate}
      </View>
      <View tw={`mr-2 text-sm ${isPlaying && 'font-bold'}`}>
        {title}
      </View>
    </View>
  )
}

const GridDateSeparator = ({ timestamp }) => {
  const [, copy] = timestamp
  return (
    <View style={tw`w-[100%] pt-2 mt-4 mb-2 border-t border-blue-500 text-xl`}>
      {copy}
    </View>
  )
}

const DateSeparator = ({ timestamp }) => (
  <View style={tw`text-gray-600 pt-4 pb-1 px-1`}>
    {timestamp[1]}
  </View>
)

const now = DateTime.now()

const wrapperStyles = {
  grid: 'flex-row flex-wrap gap-x-4 gap-y-6',
  queue: 'divide-gray-400 mr-4 divide-y flex-shrink w-72 border border-gray-500',
}

export function MediaQueue({
  type = 'grid',
  RenderMedia = type === 'grid' ? Squares : ItemMini,
  RenderDateSeparator = type === 'grid' ? GridDateSeparator : DateSeparator,
  withTimeSeparators,
}){
  const { queue } = useMediaContext()

  const intervals = [
    [0, 'Today'],
    [1, 'Last Week'],
    [7, 'Last 2 Weeks'],
    [30, 'Last Month'],
    [90, 'Last 3 Months'],
    [180, 'Last 6 Months'],
    [365, 'Previous Year'],
  ]

  return (
    <View style={tw`${wrapperStyles[type]}`}>
      {queue.map((item) => {
        const interval = Interval.fromDateTimes(DateTime.fromISO(item.metadata.createdAt), now).length('days')
        const displayTime = intervals.find((stamp) => interval >= stamp[0])
        if(displayTime){
          intervals.splice(0, 1)
        }
        return (
          <React.Fragment key={item.media.url}>
            {withTimeSeparators && displayTime && <RenderDateSeparator timestamp={displayTime} />}
            <RenderMedia
              item={item}
            />
          </React.Fragment>
        )
      })}
    </View>
  )
}
