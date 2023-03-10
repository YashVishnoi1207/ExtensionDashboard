import firebase from 'firebase/app' 
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
import {sendPasswordResetEmail, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSiuCZYBaIarReUHWuigHwWtXyvead8JA",
  authDomain: "chromeextension-2adfb.firebaseapp.com",
  databaseURL: "https://chromeextension-2adfb-default-rtdb.firebaseio.com",
  projectId: "chromeextension-2adfb",
  storageBucket: "chromeextension-2adfb.appspot.com",
  messagingSenderId: "500003993423",
  appId: "1:500003993423:web:00524dd1d09ebcef7d773a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);



const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // const q = query(collection(db, "users"), where("uid", "==", user.uid));
      //   const docs = await getDocs(q);
      // const user = res.user;
      // await addDoc(collection(db, "users"), {
      //   uid: user.uid,
      //   name,
      //   authProvider: "local",
      //   email,
      // });
    
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};


const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {auth,db,logInWithEmailAndPassword,signInWithEmailAndPassword,registerWithEmailAndPassword,sendPasswordReset,sendPasswordResetEmail,logout};
