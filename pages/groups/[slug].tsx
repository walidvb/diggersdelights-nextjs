// @generated: @expo/next-adapter@2.1.52
import { MediaProvider, MediaQueue, CurrentMediaPlayer } from '../../src/MediaPlayer';
import { View } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { mapLinksToRenderable } from '../../src/api/helpers/mapLinksToRenderable';
import getLinks from '../../src/api/db/getLinks';
import getGroups from '../../src/api/db/getGroups';
import Page from '../../src/shared/layout/Page';

export default function App({ links, groups }) {

  return (
    <Page groups={groups}>
      <MediaProvider list={links}>
        <MediaQueue
          withTimeSeparators
          type="grid"
        />
        <CurrentMediaPlayer style={[tw`bottom-1 right-1 border p-2 z-10 bg-white`, { position: 'fixed'}]} />
      </MediaProvider>
    </Page>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { slug } = params
  const { links } = await getLinks(slug) ;
  const { groups } = await getGroups()
  return { props: { links: mapLinksToRenderable(links), groups } };
}