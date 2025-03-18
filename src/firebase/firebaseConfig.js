import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue,update } from "firebase/database";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwUtdCi1Wz-meVdKagFZ2OXLyxAUsUiAc",
  authDomain: "code-box-ee11f.firebaseapp.com",
  databaseURL: "https://code-box-ee11f-default-rtdb.firebaseio.com",
  projectId: "code-box-ee11f",
  storageBucket: "code-box-ee11f.appspot.com",
  messagingSenderId: "956121181787",
  appId: "1:956121181787:web:7e2126bd435a4ad871597e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Get Auth instance
const auth = getAuth(app);

// Create Auth Providers for Google and Facebook
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider , db, ref, get, set, onValue ,update};