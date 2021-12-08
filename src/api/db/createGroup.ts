import { Chat } from '@grammyjs/types';
import { Group } from '../../..';
import { db } from './client';





const createGroup = async ({ group }: {
  group: Chat,
}) => {

  const groupDoc = db.collection('links').doc(`${group.id}`)
  const groupToCreate: Group = {
    id: group.id,
    users: [],
    meta: {
      ...group,
    },
    created_at: new Date().toISOString(),
  }
  await groupDoc.set(groupToCreate)
}

export default createGroup;
// function that finds a url in a string