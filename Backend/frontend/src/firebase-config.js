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
  apiKey: "AIzaSyDNsubJqlp51Y6BUVRm1YlCF6YtK12T-mM",
  authDomain: "deepplant-5c85a.firebaseapp.com",
  databaseURL: "https://deepplant-5c85a-default-rtdb.firebaseio.com",
  projectId: "deepplant-5c85a",
  storageBucket: "deepplant-5c85a.appspot.com",
  messagingSenderId: "125931086830",
  appId: "1:125931086830:web:072f76835ce83a14f4a4ff",
  measurementId: "G-8E01LSBPD3"
};

const firebase=initializeApp(firebaseConfig);
const fireStore=getFirestore(firebase);
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// Initialize Firebase
export {fireStore};
export const auth = getAuth(app); // 코드 추가