import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABfi05WdAKEZCNTCRW1hgJBNKXnWHgClc",
  authDomain: "facetime-7c27e.firebaseapp.com",
  projectId: "facetime-7c27e",
  storageBucket: "facetime-7c27e.appspot.com",
  messagingSenderId: "356262691950",
  appId: "1:356262691950:web:7a2a99eb9bad22cbe9527f",
  measurementId: "G-F49W4Q71DW"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };

