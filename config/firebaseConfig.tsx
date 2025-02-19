// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDkfeFhw5JgvC4j97-QRFUoFcOKEM9xes",
  authDomain: "project-2025-7ab39.firebaseapp.com",
  projectId: "project-2025-7ab39",
  storageBucket: "project-2025-7ab39.firebasestorage.app",
  messagingSenderId: "573341894808",
  appId: "1:573341894808:web:7a9452af4c3dbd6b0c68ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// That will help us to persist authentication data 
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);