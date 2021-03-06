import { Chat, User } from '@grammyjs/types';
import { Link } from '../../..';
import { slugifyGroup } from '../../shared/helpers/slugifyGroup';
import getLinkMetadata from '../helpers/getLinkMetadata';
import { db } from './client';

const updateGroup = async (user: User, group: Chat, linksCountIncrement) => {
  const groupSlug = slugifyGroup(group)
  console.log('updating: ', groupSlug, JSON.stringify(group))
  const groupRef = db.collection('groups').doc(groupSlug)
  const usersCollection = groupRef.collection('users')
  const userDoc = usersCollection.doc(`${user.username || user.id}`)
  console.log("user, ", user)
  await userDoc.set(user)
  console.log("added user, updating group:", groupRef)
  const groupSnapshot = await groupRef.get()
  const groupDoc = await groupSnapshot.data()
  await groupRef.set({
    ...groupDoc,
    meta: {
      ...groupDoc.meta,
      linksCount: groupDoc.meta.linksCount + linksCountIncrement,
    }
  })
  console.log('updated group')
}

const createLink = async ({ user, urls, group, messageID, text }: {
  user: User,
  urls: string[],
  group: Chat,
  messageID: number,
  text: string,
}) => {
  const groupSlug = slugifyGroup(group)
  urls.forEach(async (url, i) => {
    const linkID = `${groupSlug}-${messageID}${i ? `-${i}` : ''}`
    const meta = await getLinkMetadata(url)
    const link: Link = {
      url,
      message: {
        id: messageID,
        text,
      },
      group: {
        id: group.id,
        name: group.type === 'group' && group.title,
        slug: groupSlug,
      },
      user: {
        name: user.username || `${user.first_name}${user.last_name}`,
        firstName: user.first_name || 'Anonymous',
        lastName: user.last_name || 'Anonymous',
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