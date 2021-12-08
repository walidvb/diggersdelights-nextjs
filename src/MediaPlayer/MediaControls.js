import { Pause, Play } from "./icons";
import { useMemo } from 'react';
import { useItemState } from "./createMediaContext";
import ReactPlayer from 'react-player';
import tw from 'twrnc';
import { View } from 'react-native';


const VALUE_FACTOR = 100
const MediaControls = ({ 
  item,
  style,
  noProgress,
  noControl,
}) => {
  const { 
    progress = 0,
    media: { url }
  } = item
  const { isPlaying, play, pause, seekTo } = useItemState(item)

  // id is needed to style the progress bar
  const id = useMemo(() => `input-${Math.floor(Math.random() * 2000)}`, []);

  const renderButton = () => {
    if(noControl){
      return
    }
    if(isPlaying){
      return <View onClick={() => pause()} style={style} >
        <Pause style={tw`h-12 w-12`} />
      </View>
    }
    return <View onClick={() => play(item)} style={style} >
      <Play style={tw`h-12 w-12`} />
    </View>
  }
  const renderProgress = () => {
    if(noProgress){
      return
    }
    return <View style={tw`w-full break-all ml-4`}>
      <style dangerouslySetInnerHTML={{
        __html: `
        #${id}::-webkit-slider-runnable-track{
          background-size: ${progress / VALUE_FACTOR * 100}% 100%;
        }
      ` }}>
      </style>
      <input
        id={id}
        value={progress}
        type="range"
        min={0}
        style={tw`w-full`}
        max={100}
        onChange={({ target: { value } }) => seekTo({ seekTo: parseInt(value) / 100 })}
        tabIndex={1}
      />
    </View>
  }
  if (!ReactPlayer.canPlay(url)){
    return <View style={[tw`italic text-xs text-center text-red-500 bg-white p-2`, style]}>
      <View style={tw`text-4xl`}>⚠</View>
      automatic playing of this media is not supported
    </View>
  }
  return <View style={[tw`flex flex-row items-center`,style]}>
    {renderButton()}
    {renderProgress()}
  </View>;
};

export default MediaControls