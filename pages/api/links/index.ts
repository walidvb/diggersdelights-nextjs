import { doc } from '@firebase/firestore';
import { db } from '../../../src/api/db/client';
import { getDoc } from '@firebase/firestore';
import { collection } from 'firebase/firestore';
import { query } from '@firebase/firestore';
import { where } from '@firebase/firestore';
import { getDocs } from '@firebase/firestore';


const getLinks = async (req, res) => {
  const groupID: number = -676856925
  console.log('getLinks');
  const linksRef = collection(db, 'links')
  const q = query(linksRef, where('group', '==', groupID))
  console.log('gotSnap');

  const querySnapshot = await getDocs(q);
  const links = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    links.push(doc.data())
  });

  res.send({ links });
}

export default getLinks