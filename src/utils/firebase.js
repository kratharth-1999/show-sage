// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "showsage-374e8.firebaseapp.com",
    projectId: "showsage-374e8",
    storageBucket: "showsage-374e8.firebasestorage.app",
    messagingSenderId: "953008573880",
    appId: "1:953008573880:web:447323695dff857960134d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
