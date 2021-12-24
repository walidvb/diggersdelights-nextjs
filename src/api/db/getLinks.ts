import { Link } from '../../..';
import { db } from './client';

const getLinks = async (slug: string) => {
  return new Promise<{ links: Link[]}>(async (resolve, reject) => {
    console.log('rproim', slug)
    db
      .collection('links')
      .where('group.slug', '==', slug)
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        const result = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          if(!data.meta){
            return
          }
          result.push(data)
        })
        resolve({ links: result });
      })
      .catch((error) => {
        reject({ error });
      });
  })
}

export default getLinks