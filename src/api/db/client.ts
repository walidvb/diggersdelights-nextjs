import admin from 'firebase-admin';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

try{
  // Your web app's Firebase configuration
  const firebaseConfig = admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  });

  admin.initializeApp({
    credential: firebaseConfig,
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase admin initialization error', error.stack);
  }
}

const db = admin.firestore();


export { db }
