import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "habeshan-pod.firebaseapp.com",
  projectId: "habeshan-pod",
  storageBucket: "habeshan-pod.appspot.com",
  messagingSenderId: "749713656656",
  appId: "1:749713656656:web:339c81ff848af67f813a55",
  measurementId: "G-JL5JCV6H3P",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
