import { doc } from '@firebase/firestore';
import { db } from '../../../src/api/db/client';
import { getDoc } from '@firebase/firestore';
import { collection } from 'firebase/firestore';
import { query } from '@firebase/firestore';
import { where } from '@firebase/firestore';
import { getDocs } from '@firebase/firestore';


export default async function(req, res){
  const groupID: number = parseInt(req.query.groupID) || -676856925
  db
    .collection('links')
    .where('group', '==', groupID)
    .get()
    .then((querySnapshot) => {
      const result = []
      querySnapshot.forEach((doc) => {
        result.push(doc.data())
      })
      res.json({ links: result });
    })
    .catch((error) => {
      res.json({ error });
    });
}
