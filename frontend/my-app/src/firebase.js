// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABjxu7LB8yA9s-4Gx7eAzyrkmM-PzfnLs",
  authDomain: "carbon-3e286.firebaseapp.com",
  projectId: "carbon-3e286",
  storageBucket: "carbon-3e286.appspot.com",
  messagingSenderId: "236782156041",
  appId: "1:236782156041:web:8162078c78014646de7bd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;