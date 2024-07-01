import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import dotevn from "dotenv";
// const {

// }

dotevn.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// console.log(`firebaseConfig : ${Object.values(firebaseConfig)}`);

// let firebaseApp: any;
// let firestoreDB;

// export const initializeFirebaseApp = () => {
//   try {
//     firebaseApp = initializeApp(firebaseConfig);
//     firestoreDB = getFirestore();
//     console.log(`Connected to database !`);
//     return firebaseApp;
//   } catch (error) {
//     console.error(`Failed when connecting to database: ----> ${firebaseApp}`);
//   }
// };

// Initialize Firebase
const alt_firebaseApp = initializeApp(firebaseConfig);
// const firebaseAnalytics = getAnalytics(alt_firebaseApp);

export const musicUserAccountDatabase = getFirestore(alt_firebaseApp);
export const accountStorage = getStorage(alt_firebaseApp);

// module.exports = {
//   musicUserAccountDatabase,
//   accountStorage,
// };
