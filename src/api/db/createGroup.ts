import { Chat } from '@grammyjs/types';
import slugify from 'slugify';
import { Group } from '../../..';
import { db } from './client';





const createGroup = async ({ group }: {
  group: Chat,
}) => {
  const id = group.type !== 'private' ? slugify(group.title) : `${group.id}`
  const groupDoc = db.collection('groups').doc(`${id}`);
  const groupToCreate: Group = {
    id: group.id,
    slug: id,
    meta: {
      ...group,
    },
    created_at: new Date().toISOString(),
  }
  await groupDoc.set(groupToCreate)
}

export default createGroup;
// function that finds a url in a string