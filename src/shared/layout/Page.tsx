
import React from 'react'
import { View } from 'react-native';
import tw from 'twrnc';
import { Group } from '../../..';
import GroupList from './GroupsList';

const Page = ({ groups, children }: { groups?: Group[], children: React.ReactNode}) => {

  return (
    <View style={tw`bg-gray-900 flex h-full px-4 flex-row`}>
      <GroupList groups={groups} />
      <div className="container mx-auto pb-16">
        { children}
      </div>
    </View>
  )
}

export default Page