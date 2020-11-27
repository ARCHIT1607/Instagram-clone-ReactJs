import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB2z7dWJQZncK6lYWTU7DSMmTkzzCAk2eU",
  authDomain: "instagram-clone-a8a6f.firebaseapp.com",
  databaseURL: "https://instagram-clone-a8a6f.firebaseio.com",
  projectId: "instagram-clone-a8a6f",
  storageBucket: "instagram-clone-a8a6f.appspot.com",
  messagingSenderId: "863201113594",
  appId: "1:863201113594:web:31660e62c441c5b82da043",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { auth, db, storage };
