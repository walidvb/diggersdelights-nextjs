// @generated: @expo/next-adapter@2.1.52
import { MediaProvider, MediaQueue, CurrentMediaPlayer } from '../../src/MediaPlayer';
import { View } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { mapLinksToRenderable } from '../../src/api/helpers/mapLinksToRenderable';
import getLinks from '../../src/api/db/getLinks';

export default function App({ links }) {

  return (
    <View style={tw`bg-gray-900 md:bg-gray-300 flex h-full`}>
      <MediaProvider list={links}>
        <View style={[tw`pb-16 mx-auto`, {
          maxWidth: 1200,
        }]}>
          <MediaQueue
            withTimeSeparators
            type="grid"
          />
          <CurrentMediaPlayer style={[tw`bottom-1 right-1 border p-2 z-10 bg-white`, { position: 'fixed'}]} />
        </View>
      </MediaProvider>
    </View>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { slug } = params
  const { links } = await getLinks(slug) ;
  return { props: { links: mapLinksToRenderable(links) } };
}