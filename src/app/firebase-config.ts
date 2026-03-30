import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC0kj__unp1XY0mYpyzxNX_e47iRBsn41c",
  authDomain: "portfolio-5a2d6.firebaseapp.com",
  databaseURL: "https://portfolio-5a2d6-default-rtdb.firebaseio.com",
  projectId: "portfolio-5a2d6",
  storageBucket: "portfolio-5a2d6.firebasestorage.app",
  messagingSenderId: "344377068290",
  appId: "1:344377068290:web:b91e93ce81ace5114dd01b",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
