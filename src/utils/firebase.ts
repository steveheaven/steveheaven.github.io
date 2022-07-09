import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "peer-paint-ffb42.firebaseapp.com",
  // The value of `databaseURL` depends on the location of the database
  databaseURL:
    "https://peer-paint-ffb42-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "peer-paint-ffb42",
  //   storageBucket: "PROJECT_ID.appspot.com",
  //   messagingSenderId: "SENDER_ID",
  //   appId: "APP_ID",
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  //   measurementId: "G-MEASUREMENT_ID",
  // The value of `databaseURL` depends on the location of the database
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
