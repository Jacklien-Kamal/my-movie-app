// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmKj4aB6vKMx5SBluf45yGaw4dCn9ey88",
  authDomain: "tod-movies-site.firebaseapp.com",
  projectId: "tod-movies-site",
  storageBucket: "tod-movies-site.appspot.com",
  messagingSenderId: "840046543029",
  appId: "1:840046543029:web:bc765955f13dc231e47efc",
  measurementId: "G-N77R9W2MPM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };