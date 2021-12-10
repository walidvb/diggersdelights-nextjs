import { Group } from "../../..";
import { Pressable, Text, View } from 'react-native';
import Link from 'next/link';
import tw from 'twrnc';

const GroupItem = ({ group }: { group: Group }) => {
  return <Link href={group.slug}>
    <a>
      <Pressable>
        {({ hovered, pressed }) => {

          return <View style={tw`hovered:bg-gray-200 `}>
            <Text style={tw`text-white text-xl`}>{group.meta.title}</Text>
          </View>
        }}
      </Pressable>
    </a>
  </Link>
}

const GroupList = ({ groups }: { groups: Group[]}) => {
  return <View style={tw`mr-4 px-4`}>
    {groups.map(group => <GroupItem key={group.id} group={group} />)}
  </View>
}

export default GroupList;