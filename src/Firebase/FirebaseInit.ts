// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4gtT71Yjugpd87MY6m-wsfMHNZNQl7Ro",
  authDomain: "fillarole.firebaseapp.com",
  projectId: "fillarole",
  storageBucket: "fillarole.appspot.com",
  messagingSenderId: "989221292801",
  appId: "1:989221292801:web:83b0f1488c370525232900",
  measurementId: "G-ZMYNBCNQ21"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const database = getFirestore(firebaseApp);

export { firebaseApp, firebaseAnalytics, auth, database };