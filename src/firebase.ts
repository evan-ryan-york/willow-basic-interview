// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFvGlJFiPOo1ZgSQRwlXC7B6N9TAE1bGY",
  authDomain: "upwork-dev-site.firebaseapp.com",
  databaseURL: "https://upwork-dev-site-default-rtdb.firebaseio.com",
  projectId: "upwork-dev-site",
  storageBucket: "upwork-dev-site.appspot.com",
  messagingSenderId: "316362458785",
  appId: "1:316362458785:web:8925759c514f9adb7712e0",
  measurementId: "G-3Q13PVL3S6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
