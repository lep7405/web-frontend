// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLzaw2OBiXbVTOcz-qkse1ccpoGY8b8Og",
  authDomain: "august-period-428606-m8.firebaseapp.com",
  projectId: "august-period-428606-m8",
  storageBucket: "august-period-428606-m8.appspot.com",
  messagingSenderId: "474396101385",
  appId: "1:474396101385:web:0c9452f1b35a2b35c561d8",
  measurementId: "G-N5X25S5RZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };