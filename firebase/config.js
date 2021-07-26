import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID

} from "@env";


// const firebaseConfig = {
//     apiKey: "AIzaSyAE3i5qBqEtNeg_8Tt-74CRzrm-m4Qj2as",
//     authDomain: "grumble-22dd9.firebaseapp.com",
//     databaseURL: "https://grumble-22dd9-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "grumble-22dd9",
//     storageBucket: "grumble-22dd9.appspot.com",
//     messagingSenderId: "809373431196",
//     appId: "1:809373431196:web:460d6643d16652e4a68459",
//     measurementId: "G-0H802THTGE"
// };

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebaseApp;