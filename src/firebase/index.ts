// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLauU7Fb742UJ7w2syWd4xBvUQzL2P0z4",
  authDomain: "the-beer-club.firebaseapp.com",
  projectId: "the-beer-club",
  storageBucket: "the-beer-club.appspot.com",
  messagingSenderId: "330247303412",
  appId: "1:330247303412:web:09dd13f114a0114de2eea1",
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://the-beer-club-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);