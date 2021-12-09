import { Group } from '../../..';
import { db } from './client';

const getGroups = async () => {
  return new Promise<{ groups: Group[] }>(async (resolve, reject) => {
    db
      .collection('groups')
      .where('linksCount', '>', 0)
      .get()
      .then((querySnapshot) => {
        const result = []
        querySnapshot.forEach((doc) => {
          result.push(doc.data())
        })
        resolve({ groups: result });
      })
      .catch((error) => {
        reject({ error });
      });
  })
}

export default getGroups