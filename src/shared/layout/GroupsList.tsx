import { Group } from "../../..";
import { Text, View } from 'react-native';
import { useRouter } from 'next/router'

import Link from 'next/link';
import tw from 'twrnc';

const GroupItem = ({ group }: { group: Group }) => {
  const router = useRouter()
  const { slug } = router.query
  const isActive = slug === group.slug
  return <Link href={group.slug}>
    <a>
      <div className={`hover:bg-primary rounded-sm ${isActive && 'bg-primary'}`}>
          <Text style={tw`text-white p-2`}>{group.meta.title}</Text>
        </div>
    </a>
  </Link>
}

const GroupList = ({ groups }: { groups: Group[]}) => {
  return <View style={tw`mr-4 px-4`}>
    <Text style={tw`mt-8 mb-4 ml-2 text-white`}>All Groups</Text>
    {groups.map(group => <GroupItem key={group.id} group={group} />)}
  </View>
}

export default GroupList;