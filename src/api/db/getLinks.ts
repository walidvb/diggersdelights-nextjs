import { doc } from '@firebase/firestore';
import { db } from './client';
import { getDoc } from '@firebase/firestore';
import { Link } from '..';
import { collection } from 'firebase/firestore';
import { where } from '@firebase/firestore';
import { query } from '@firebase/firestore';
import { getDocs } from '@firebase/firestore';


const getLinks = async (groupID: number) => {
  return new Promise<{ links: Link[]}>(async (resolve, reject) => {
    const linksRef = collection(db, 'links')
    const q = query(linksRef, where('group', '==', groupID))

    const querySnapshot = await getDocs(q);
    const links = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      links.push(doc.data())
    });

    resolve({ links });
  })
}

export default getLinks