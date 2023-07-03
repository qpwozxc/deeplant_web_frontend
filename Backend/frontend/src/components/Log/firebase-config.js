// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 코드 추가

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase
export const auth = getAuth(app); // 코드 추가