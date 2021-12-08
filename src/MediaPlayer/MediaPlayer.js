import { useState, useRef, useEffect, useMemo } from 'react';
import ReactPlayer from 'react-player';
import { useMediaContext, useItemState } from './createMediaContext';


const LazyMedia = ({ image, onClick }) => (
  <div>
    <div onClick={onClick}
      className="relative cursor-pointer aspect-w-16 aspect-h-9"
    >
      <YoutubePlayIcon />
      <img className="w-full" src={image} />
    </div>
  </div>
)

const Media = ({ 
  item, 
  lazy = true,
  className,
}) => {
  const { next, playing } = useMediaContext()
  const player = useRef()
  const [displayThumb, setDisplayThumb] = useState(lazy)
  const { isPlaying, play, pause, progressed } = useItemState(item)

  const { media, seekedTo } = item
  const { url, image_url, embed_url } = media
  
  useEffect(() => { if(isPlaying){ setDisplayThumb(false) } }, [isPlaying])
  useEffect(() => {
    if (!player.current || !seekedTo){
      return
    }
    player.current.seekTo(seekedTo)
  }, [isPlaying, seekedTo, player])

  if (!ReactPlayer.canPlay(url)) {
    if(embed_url){
      return <div className={className}>
        <iframe
          style={{
            border: 0, 
            width: "350px", 
            height: "125px"
          }}
         src={embed_url}
         seamless 
         />

      </div>
    }
  }


  if (displayThumb && image_url) {
    return <LazyMedia className={className} image={image_url} onClick={() => play(item)} />
  }

  return <div className={className}>
    <ReactPlayer
      url={url}
      ref={player}
      onPlay={play}
      onPause={pause}
      onEnded={() => {
        console.log('mahaha')
        next()
      }}
      onProgress={({ played }) => progressed({ progress: played * 100 })}
      controls
      playing={isPlaying && playing.isPlaying}
      />
    </div>
};

export default Media

const RE_YOUTUBE = /(?:v=|youtu\.be\/|list=)([\w-]{10,12})/;
function getThumb(url) {
  let video_id = null;
  const match = RE_YOUTUBE.exec(url);
  if (match) {
    video_id = match[1];
  }

  if (video_id) {
    return `http://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
  }
}


const YoutubePlayIcon = ({ className }) => {
  return <div className="absolute inset-0 flex items-center justify-center  ">
    <svg className="w-24" xmlns="http://www.w3.org/2000/svg" version="1.1" id="YouTube_Icon" x="0px" y="0px" viewBox="0 0 1024 721" enableBackground="new 0 0 1024 721" >
      <path id="Triangle" fill="#FFFFFF" d="M407,493l276-143L407,206V493z" />
      <path id="The_Sharpness" opacity="0.12" fillRule="evenodd" clipRule="evenodd" d="M407,206l242,161.6l34-17.6L407,206z" />
      <g id="Lozenge">
        <g>
          <path fill="#282928" d="M1013,156.3c0,0-10-70.4-40.6-101.4C933.6,14.2,890,14,870.1,11.6C727.1,1.3,512.7,1.3,512.7,1.3h-0.4    c0,0-214.4,0-357.4,10.3C135,14,91.4,14.2,52.6,54.9C22,85.9,12,156.3,12,156.3S1.8,238.9,1.8,321.6v77.5    C1.8,481.8,12,564.4,12,564.4s10,70.4,40.6,101.4c38.9,40.7,89.9,39.4,112.6,43.7c81.7,7.8,347.3,10.3,347.3,10.3    s214.6-0.3,357.6-10.7c20-2.4,63.5-2.6,102.3-43.3c30.6-31,40.6-101.4,40.6-101.4s10.2-82.7,10.2-165.3v-77.5    C1023.2,238.9,1013,156.3,1013,156.3z M407,493l0-287l276,144L407,493z" />
        </g>
      </g>
    </svg>
  </div>
}