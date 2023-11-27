import { Group } from '../../..';
import { Text, View } from 'react-native';
import { useRouter } from 'next/router';

import tw from 'twrnc';
import Link from 'next/link';

const GroupItem = ({ group }: { group: Group }) => {
  const router = useRouter();
  const { slug } = router.query;
  const isActive = slug === group.slug;
  return (
    // @ts-ignore
    <Link href={`/groups/[slug]?slug=${group.slug}`}>
      <div
        className={`hover:bg-primary p-2 rounded-sm ${
          isActive && 'bg-primary'
        } flex-col flex`}
      >
        <Text style={tw`text-white`}>{group.meta.title}</Text>
        <Text style={tw`text-gray-400 text-xs`}>
          {group.meta.linksCount} links shared
        </Text>
      </div>
    </Link>
  );
};

const GroupList = ({ groups }: { groups: Group[] }) => {
  return (
    <View style={tw`mr-12 px-4 min-w-[200px]`}>
      <Text style={tw`mt-8 mb-4 ml-2 text-white`}>All Groups</Text>
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </View>
  );
};

export default GroupList;
