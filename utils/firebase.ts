// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoJlWg9Y6zjW5ysqt3JXYj8-zFv4ismvU",
  authDomain: "driverhub-01.firebaseapp.com",
  databaseURL: "https://driverhub-01-default-rtdb.firebaseio.com",
  projectId: "driverhub-01",
  storageBucket: "driverhub-01.appspot.com",
  messagingSenderId: "39079208663",
  appId: "1:39079208663:web:bf7f8e99303750e7277292",
  measurementId: "G-Y62TDMFKQV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
