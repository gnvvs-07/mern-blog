// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-72983.firebaseapp.com",
  projectId: "mern-blog-72983",
  storageBucket: "mern-blog-72983.appspot.com",
  messagingSenderId: "703993370454",
  appId: "1:703993370454:web:e690038520acbc63efa8f7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
