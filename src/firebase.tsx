import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// api keys that give a refrence to our firebase account
// firestore rules wont allow not signed in users to read or write data
// also it disables users to see or write to other users data
const config = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

// initialize firebase
firebase.initializeApp(config);

// export auth and database
const db = firebase.firestore();
const auth = firebase.auth();

export { auth };
export default db;
