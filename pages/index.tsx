// @generated: @expo/next-adapter@2.1.52
import Link from 'next/link';
import { View } from 'react-native';
import tw from 'twrnc';
import getGroups from '../src/api/db/getGroups';
import Page from '../src/shared/layout/Page';
import { Text } from 'react-native';

export default function App({ groups }) {

  return (
    <Page groups={groups}>
        <View style={tw`items-center pt-16`}>
          <Text style={tw`text-4xl text-white mb-2`}>
            Welcome to Diggers Delights version X!
          </Text>
          <Text style={tw`text-xl text-white`}>
            Maybe the last one.
          </Text>
        </View>
    </Page>
    
  );
}


export const getServerSideProps = async ({ params }) => {
  const { groups } = await getGroups()
  return { props: { groups } };
}