// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbvjF5dIXtN7AhjgSC3PiWIk7v8te7B_o",
  authDomain: "todoapp-b6579.firebaseapp.com",
  projectId: "todoapp-b6579",
  storageBucket: "todoapp-b6579.appspot.com",
  messagingSenderId: "154198277557",
  appId: "1:154198277557:web:f4bfdfc863cf5bade52dfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;