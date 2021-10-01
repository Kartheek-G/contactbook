import firebase from "firebase";
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgTO9gP2hTkzRXkMwed62bfNUgThDy0QU",
    authDomain: "contactsapp-3dd33.firebaseapp.com",
    projectId: "contactsapp-3dd33",
    storageBucket: "contactsapp-3dd33.appspot.com",
    messagingSenderId: "606233747607",
    appId: "1:606233747607:web:fab334fc784e39f9c989d2"
};
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db,
}