import { Chat, User } from '@grammyjs/types';
import { Link } from '../../..';
import getLinkMetadata from '../helpers/getLinkMetadata';
import { db } from './client';
import admin from 'firebase-admin';
import slugify from 'slugify';
import { slugifyGroup } from '../../shared/helpers/slugifyGroup';

const updateGroup = async (user: User, group: Chat, linksCountIncrement) => {
  const groupSlug = slugifyGroup(group)
  console.log('updating: ', groupSlug, JSON.stringify(group))
  const groupDoc = db.collection('groups').doc(groupSlug)
  const usersCollection = groupDoc.collection('users')
  const userDoc = usersCollection.doc(`${user.username}`)
  console.log("user, ", user)
  await userDoc.set(user)
  console.log("added user, updating group:", groupDoc)
  await groupDoc.update({
    linksCount: admin.firestore.FieldValue.increment(linksCountIncrement),
  })
  console.log('updated group')
}

const createLink = async ({ user, urls, group, messageID }: {
  user: User,
  urls: string[],
  group: Chat,
  messageID: number
}) => {
  const groupSlug = slugifyGroup(group)
  urls.forEach(async (url, i) => {
    const linkID = `${groupSlug}-${messageID}${i ? `-${i}` : ''}`
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
    await db.collection('links').doc(linkID).set(link)
  })
  await updateGroup(user, group, urls.length)
}

export default createLink;
// function that finds a url in a string