import { Chat, User } from '@grammyjs/types';
import { Link } from '../../..';
import getLinkMetadata from '../helpers/getLinkMetadata';
import { db } from './client';
import admin from 'firebase-admin';

const updateGroup = async (user: User, group: Chat, newLinksCount) => {
  const groupDoc = db.collection('groups').doc(`${group.id}`)
  const usersCollection = groupDoc.collection('users')
  const userDoc = usersCollection.doc(`${user.id}`)
  await userDoc.set(user)
  await groupDoc.update({
    linksCount: admin.firestore.FieldValue.increment(newLinksCount),
  })
  console.log('updated group')
}

const createLink = async ({ user, urls, group }: {
  user: User,
  urls: string[],
  group: Chat,
}) => {
  await updateGroup(user, group, urls.length)
  urls.forEach(async (url) => {
    const meta = await getLinkMetadata(url)
    const link: Link = {
      url,
      group: group.id,
      user: {
        name: user.username,
        id: user.id,
      },
      createdAt: new Date().toISOString(),
      meta,
    }
    db.collection('links').add(link)
  })
}

export default createLink;
// function that finds a url in a string