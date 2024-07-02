import { initializeApp } from "firebase/app";

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
