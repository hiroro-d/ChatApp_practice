// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAPIWAli8PZeVOY-79XVIQs4IuakY2XUn0",
  authDomain: "chatpractice-a27d8.firebaseapp.com",
  projectId: "chatpractice-a27d8",
  storageBucket: "chatpractice-a27d8.appspot.com",
  messagingSenderId: "656033758205",
  appId: "1:656033758205:web:152b84005e74156b7d3794"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth }