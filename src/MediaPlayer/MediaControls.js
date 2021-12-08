import { Pause, Play } from "./icons";
import { useMemo } from 'react';
import { useMediaContext, useItemState } from "./createMediaContext";
import ReactPlayer from 'react-player';

const VALUE_FACTOR = 100
const MediaControls = ({ 
  item,
  className,
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
      return <div onClick={() => pause()} className={``} >
        <Pause className={`h-12 w-12`} />
      </div>
    }
    return <div onClick={() => play(item)} className={``} >
      <Play className={`h-12 w-12`} />
    </div>
  }
  const renderProgress = () => {
    if(noProgress){
      return
    }
    return <div className="w-full break-all ml-4">
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
        className="w-full"
        max={100}
        onChange={({ target: { value } }) => seekTo({ seekTo: parseInt(value) / 100 })}
        tabIndex={1}
      />
    </div>
  }
  if (!ReactPlayer.canPlay(url)){
    return <div className={`italic text-xs text-center ${className} text-red-500 bg-white p-2`}>
      <div className="text-4xl">⚠</div>
      automatic playing of this media is not supported
    </div>
  }
  return <div className={`flex items-center ${className}`}>
    {renderButton()}
    {renderProgress()}
  </div>;
};

export default MediaControls