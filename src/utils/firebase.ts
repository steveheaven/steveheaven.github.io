import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "peer-paint-ffb42.firebaseapp.com",
  databaseURL:
    "https://peer-paint-ffb42-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "peer-paint-ffb42",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
