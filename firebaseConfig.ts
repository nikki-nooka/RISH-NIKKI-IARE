// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC73Iy2oGCT5BnuUudzMpMYoEpkzttBM98",
  authDomain: "geosickai.firebaseapp.com",
  projectId: "geosickai",
  storageBucket: "geosickai.firebasestorage.app",
  messagingSenderId: "771437764519",
  appId: "1:771437764519:web:676d31051a1361c8b2a082",
  measurementId: "G-1D6BTCGW7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };