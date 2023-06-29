// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdPo_kY40qI8j_jmsuy45kps1KEnYhLuU",
  authDomain: "carbon-532ae.firebaseapp.com",
  projectId: "carbon-532ae",
  storageBucket: "carbon-532ae.appspot.com",
  messagingSenderId: "43534038309",
  appId: "1:43534038309:web:818510ba47cf35970996cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;