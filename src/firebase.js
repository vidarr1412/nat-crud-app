// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXiJB4wWDem8b_1tAvKXH0MFaZkdFk6Ik",
  authDomain: "nat-app-86f70.firebaseapp.com",
  projectId: "nat-app-86f70",
  storageBucket: "nat-app-86f70.appspot.com",
  messagingSenderId: "678948330413",
  appId: "1:678948330413:web:98e05a1349d5389669df24",
  measurementId: "G-1NZWHSEDNF"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Initialize Firestore
const db = getFirestore(app);

export { db, collection, getDocs };