import firebase from 'firebase';
import 'firebase/firestore';
import app from './config';

const db = firebase.firestore(app);

export default db;