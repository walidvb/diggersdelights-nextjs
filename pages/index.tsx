// @generated: @expo/next-adapter@2.1.52
import { MediaProvider, MediaQueue, CurrentMediaPlayer } from '../src/MediaPlayer';
import { View } from 'react-native';
import tw from 'twrnc';

export default function App() {
  return (
    <MediaProvider list={[{
      media: {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        image_url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        title: 'Rick Astley - Never Gonna Give You Up',
        description: 'Rick Astley - Never Gonna Give You Up',
      },
      metadata: {
        createdAt: '2020-01-01T00:00:00.000Z',
      }
    }

    ]}>
      <View style={tw`pb-16 container mx-auto`}>
        <MediaQueue
          withTimeSeparators
          type="grid"
        />
        <CurrentMediaPlayer style={[tw`bottom-1 right-1 border p-2 z-10 bg-white`, { position: 'fixed'}]} />
      </View>
    </MediaProvider>
  );
}
