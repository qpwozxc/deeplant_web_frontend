// Import the functions you need from the SDKs you need
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 코드 추가
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-j0eZP9204FKLKhEinlmii4Eb28EQnJY",
  authDomain: "fir-auth-46a73.firebaseapp.com",
  projectId: "fir-auth-46a73",
  storageBucket: "fir-auth-46a73.appspot.com",
  messagingSenderId: "474836584253",
  appId: "1:474836584253:web:7f46c9586034063c9ca754",
  measurementId: "G-NMH6KPMHHD"
};

const firebase=initializeApp(firebaseConfig);
const fireStore=getFirestore(firebase);
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// Initialize Firebase
export {fireStore};
export const auth = getAuth(app); // 코드 추가
