import { Chat, User } from '@grammyjs/types';
import { Link } from '../../..';
import getLinkMetadata from '../helpers/getLinkMetadata';
import { db } from './client';
import admin from 'firebase-admin';
import slugify from 'slugify';

const updateGroup = async (user: User, group: Chat, linksCountIncrement) => {
  const groupDoc = db.collection('groups').doc(`${group.id}`)
  const usersCollection = groupDoc.collection('users')
  const userDoc = usersCollection.doc(`${user.username}`)
  console.log("user, ", user, userDoc)
  await userDoc.set(user)
  console.log("added user")
  // await userDoc.set(user)
  await groupDoc.update({
    linksCount: admin.firestore.FieldValue.increment(linksCountIncrement),
  })
  console.log('updated group')
}

const createLink = async ({ user, urls, group }: {
  user: User,
  urls: string[],
  group: Chat,
}) => {
  await updateGroup(user, group, urls.length)
  const groupSlug = group.type !== 'private' ? slugify(group.title) : `${group.id}`
  urls.forEach(async (url) => {
    const meta = await getLinkMetadata(url)
    const link: Link = {
      url,
      group: {
        id: group.id,
        name: group.type === 'group' && group.title,
        slug: groupSlug,
      },
      user: {
        name: user.username,
        firstName: user.first_name,
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