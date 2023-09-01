import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBhVPNrrgzR8CirOCUwN0GHYPIq58xXRtM",
    authDomain: "resume-cd48a.firebaseapp.com",
    projectId: "resume-cd48a",
    storageBucket: "resume-cd48a.appspot.com",
    messagingSenderId: "316475064419",
    appId: "1:316475064419:web:841ee166f8c3b7a594b856",
    measurementId: "G-XFV7860VXT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);

