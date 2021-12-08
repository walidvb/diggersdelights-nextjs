import { Chat, User } from '@grammyjs/types'
import { collection, increment } from "@firebase/firestore";
import { db } from './client';
import { addDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import getLinkMetadata from '../helpers/getLinkMetadata';
import { Link } from '../../..';

const updateGroup = async (user: User, group: Chat, newLinksCount) => {
  const groupDoc = doc(db, 'groups', `${group.id}`)
  const usersCollection = collection(groupDoc, 'users')
  const userDoc = doc(usersCollection, `${user.id}`)
  await setDoc(userDoc, user)
  await updateDoc(groupDoc, {
    linksCount: increment(newLinksCount),
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
    addDoc(collection(db, 'links'), link)
  })
}

export default createLink;
// function that finds a url in a string