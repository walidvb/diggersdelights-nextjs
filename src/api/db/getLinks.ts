import { doc } from '@firebase/firestore';
import { db } from './client';
import { getDoc } from '@firebase/firestore';


const getLinks = async (groupID: number) => {
  console.log('getLinks');
  const groupRef = doc(db, 'groups', `${groupID}`)
  console.log('getRef');
  const docSnap = await getDoc(groupRef);
  console.log('gotSnap');

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export default getLinks