// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics} from "firebase/analytics";
import {
  getFirestore,collection,getDocs
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLPxysXFntasQjzZYKD1WwQp4tZzYSbH8",
  authDomain: "fir-auth-f302a.firebaseapp.com",
  projectId: "fir-auth-f302a",
  storageBucket: "fir-auth-f302a.appspot.com",
  messagingSenderId: "153716658036",
  appId: "1:153716658036:web:a243eba938d8c5ef87a621",
  measurementId: "G-LQEDDXZNYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const colRef = collection(db,'notes')
export  default app;
