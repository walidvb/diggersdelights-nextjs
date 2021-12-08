import { Link } from '../../..';
import { db } from './client';


const getLinks = async (groupID: number) => {
  return new Promise<{ links: Link[]}>(async (resolve, reject) => {
    console.log('rproim', groupID)
    db
      .collection('links')
      .where('group', '==', groupID)
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