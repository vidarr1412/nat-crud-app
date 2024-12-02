// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQr5SKY6MtfKprSX4WRA3P3PKwMS9lun0",
  authDomain: "lab2-e10b6.firebaseapp.com",
  projectId: "lab2-e10b6",
  storageBucket: "lab2-e10b6.firebasestorage.app",
  messagingSenderId: "753047238404",
  appId: "1:753047238404:web:59a169382103621f450251",
  measurementId: "G-J0SMB6VN3K"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Initialize Firestore
const db = getFirestore(app);

export { db, collection, getDocs };