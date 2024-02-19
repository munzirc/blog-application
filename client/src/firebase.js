// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-28bfe.firebaseapp.com",
  projectId: "mern-blog-28bfe",
  storageBucket: "mern-blog-28bfe.appspot.com",
  messagingSenderId: "605307291816",
  appId: "1:605307291816:web:84827f1058491b50d09a9d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);