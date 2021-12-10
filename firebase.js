// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeLRxlVGP59SAwsAYJqxikuZhnNGNsmGw",
  authDomain: "afeezgl.firebaseapp.com",
  projectId: "afeezgl",
  storageBucket: "afeezgl.appspot.com",
  messagingSenderId: "648841958083",
  appId: "1:648841958083:web:553727a49142ff69ce0876",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { storage, provider };
export default db;
