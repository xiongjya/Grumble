import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAZFpiwO84iQX6l29d6vbAI1hBBlYe9pJA",
    authDomain: "grumble-d300e.firebaseapp.com",
    databaseURL: "https://grumble-d300e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "grumble-d300e",
    storageBucket: "grumble-d300e.appspot.com",
    messagingSenderId: "655611758211",
    appId: "1:655611758211:web:f1d9eaf6f9b07cc39ffdb6",
    measurementId: "G-00G76DRW6X"
};

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebaseApp;