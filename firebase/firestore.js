import firebase from 'firebase';
import 'firebase/firestore';
import app from './config';

const db = firebase.firestore(app);

db.settings({ experimentalForceLongPolling: true });

export default db;