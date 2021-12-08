import { Link } from '../../..';
import { db } from './client';

import { collection } from 'firebase/firestore';
import { where } from '@firebase/firestore';
import { query } from '@firebase/firestore';
import { getDocs } from '@firebase/firestore';
import { Link } from '../../../';


const getLinks = async (groupID: number) => {
  return new Promise<{ links: Link[]}>(async (resolve, reject) => {
    console.log('rproim', groupID)
    db
      .collection('links')
      .where('group.id', '==', groupID)
      .get()
      .then((querySnapshot) => {
        const result = []
        console.log("resutl", querySnapshot)
        querySnapshot.forEach((doc) => {
          result.push(doc.data())
          console.log(doc.data())
        })
        resolve({ links: result });
      })
      .catch((error) => {
        reject({ error });
      });
  })
}

export default getLinks