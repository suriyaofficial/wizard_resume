import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    // apiKey: "AIzaSyBhVPNrrgzR8CirOCUwN0GHYPIq58xXRtM",
    // authDomain: "resume-cd48a.firebaseapp.com",
    // projectId: "resume-cd48a",
    // storageBucket: "resume-cd48a.appspot.com",
    // messagingSenderId: "316475064419",
    // appId: "1:316475064419:web:841ee166f8c3b7a594b856",
    // measurementId: "G-XFV7860VXT"
    apiKey: "AIzaSyDSob8HdpAv0UT9AwLu8P7Q4Czwan2_t6Q",
    authDomain: "wizard-resume-builder.firebaseapp.com",
    projectId: "wizard-resume-builder",
    storageBucket: "wizard-resume-builder.appspot.com",
    messagingSenderId: "10995854652",
    appId: "1:10995854652:web:ae9ab84d0341a6a55e0239",
    measurementId: "G-BN6LGRBF4B"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
