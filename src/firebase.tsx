import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// api keys that give a refrence to our firebase account
// firestore rules wont allow not signed in users to read or write data
// also it disables users to see or write to other users data
const config = {
  apiKey: 'AIzaSyAuPDsjJODwFE-O4iPBpUGaYP1q2BMmfHk',
  authDomain: 'simpleproductivity-bac4e.firebaseapp.com',
  projectId: 'simpleproductivity-bac4e',
  storageBucket: 'simpleproductivity-bac4e.appspot.com',
  messagingSenderId: '92258693469',
  appId: '1:92258693469:web:8d6453b0ef660339c578b4',
  measurementId: 'G-PQ6RV7XGEY',
};

// initialize firebase
firebase.initializeApp(config);

// export auth and database
const db = firebase.firestore();
const auth = firebase.auth();

export { auth };
export default db;
