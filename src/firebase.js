// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaibWhws7jARcMOK_EXJl-rctLwRJTDYY",
  authDomain: "miniproject-6c667.firebaseapp.com",
  projectId: "miniproject-6c667",
  storageBucket: "miniproject-6c667.appspot.com",
  messagingSenderId: "870064418648",
  appId: "1:870064418648:web:a895dd29d7a196db2c7f2d",
  measurementId: "G-1ZVV4FMSF0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app