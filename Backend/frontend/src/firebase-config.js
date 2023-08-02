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
  apiKey: "AIzaSyC5jW9_1rq1VlBapU4kZqLf1OG40autdRo",
  authDomain: "deepplant-e0416.firebaseapp.com",
  projectId: "deepplant-e0416",
  storageBucket: "deepplant-e0416.appspot.com",
  messagingSenderId: "214163390785",
  appId: "1:214163390785:web:635f7ebc63fa7b4c66e1c0",
  measurementId: "G-RFHBPXMFMV"
};

const firebase=initializeApp(firebaseConfig);
const fireStore=getFirestore(firebase);
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// Initialize Firebase
export {fireStore};
export const auth = getAuth(app); // 코드 추가
//export default firebase;