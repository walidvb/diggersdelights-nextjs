import React from 'react'

import { DateTime } from 'luxon'

import { useItemState, useMediaContext } from './createMediaContext'
import MediaControls from './MediaControls'
import { Image, View, Text } from 'react-native';
import tw from 'twrnc';
import { useSectionnedByDate } from './useSectionnedByDate';

const ItemMini = ({ item, className }) => {
  const { media: { title, image_url }, metadata: { createdAt } } = item
  const { isPlaying } = useItemState(item)
  const renderedDate = DateTime.fromISO(createdAt).toLocaleString({ month: 'long', day: 'numeric' })
  return (
    <View style={tw`flex items-center group ${className}`}>
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
        <View style={tw`mr-2 text-sm ${isPlaying && 'font-bold'}`}>
          { title }
        </View>
      </View>
    </View>
  )
}

const Squares = ({ item }) => {
  const { isPlaying, play } = useItemState(item)
  console.log(item)
  const { media: { image_url, title }, metadata: { createdAt,  user: { firstName } }, } = item
  const renderedDate = DateTime.fromISO(createdAt).toLocaleString({ month: 'long', day: 'numeric' })
  return (
    <View style={tw`lg:max-w-1/5 max-w-1/2`}>
      <View style={tw`relative group cursor-pointer`} onClick={() => play(item)}>
        <img src={image_url} style={tw`max-w-full h-auto`} />
        <MediaControls
          style={tw`absolute text-blue-600 object-center top-1/2 
            left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 
            ${!isPlaying && 'opacity-0'}
          `}
          noProgress
          item={item}
        />
      </View>
      <Text style={tw`text-gray-600 text-xs italic`}>
        {renderedDate}
        <Text style={tw`text-gray-600 text-xs italic`}>
          &nbsp;by {firstName}
        </Text>
      </Text>
      <View style={tw`mr-2 text-sm ${isPlaying && 'font-bold'}`}>
        <Text style={tw`text-white text-lg ${isPlaying && 'font-bold'}`}>
          {title}
        </Text>

      </View>
    </View>
  )
}

const GridDateSeparator = ({ timestamp }) => {
  const [, copy] = timestamp
  return (
    <Text style={tw`w-[100%] pt-2 mt-4 mb-2 border-t text-white border-blue-500 text-xl`}>
      {copy}
    </Text>
  )
}

const DateSeparator = ({ timestamp }) => (
  <Text style={tw`text-gray-600 pt-4 pb-1 px-1`}>
    {timestamp[1]}
  </Text>
)


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
  const sections = useSectionnedByDate(queue)
  return (
    <View style={tw`${wrapperStyles[type]}`}>
      {
        sections.map((section, index) => {
          const {title, data} = section
          return <React.Fragment key={title}>
            {withTimeSeparators && title && <RenderDateSeparator timestamp={title} />}
             {data.map(item => <RenderMedia
             key={item.id}
              item={item}
            />)}
          </React.Fragment>
        })
      }
    </View>
  )
}
