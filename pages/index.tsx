// @generated: @expo/next-adapter@2.1.52
import Link from 'next/link';
import { View } from 'react-native';
import tw from 'twrnc';
import getGroups from '../src/api/db/getGroups';

export default function App({ groups }) {

  return (
    <View style={[tw`mx-auto`, { maxWidth: 800 }]}>
      <h1>Welcome back!</h1>
      {groups.map(group => (<Link key={group.id} href={`groups/${group.slug}`}>
        <a>{group.meta.title}</a>
      </Link>))}
    </View>
    
  );
}


export const getServerSideProps = async ({ params }) => {
  const { groups } = await getGroups()
  return { props: { groups } };
}