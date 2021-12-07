import { Chat, User } from '@grammyjs/types'
import { doc } from '@firebase/firestore'; // for creating a pointer to our Document
import { db } from './client';
import { setDoc } from 'firebase/firestore';

type Group = {
  id: number,
  users: number[],
  meta: {

  },
}



const createGroup = async ({ group }: {
  group: Chat,
}) => {

  const groupDoc = doc(db, `links/${group.id}`)
  const groupToCreate: Group = {
    id: group.id,
    users: [],
    meta: {
      ...group,
    }
  }
  await setDoc(groupDoc, groupToCreate)

}

export default createGroup;
// function that finds a url in a string