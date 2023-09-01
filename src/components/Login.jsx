import React from "react";
import { app, db } from "./firebaseconfig";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();

  const signInWithGoogle = async () => {
    console.log(
      "🚀 ~ file: login.js:27 ~ signInWithGoogle ~ signInWithGoogle:"
    );
    try {
      let result = await signInWithPopup(auth, provider);
      console.log(
        "🚀 ~ file: login.js:15 ~ signInWithGoogle ~ result:",
        result
      );
      localStorage.setItem("email", result.user.email);
      window.location.reload();
    } catch (error) {
      console.error(
        "🚀 ~ file: login.js:22 ~ signInWithGoogle ~ error:",
        error
      );
    }
  };

  return (
    <>
      <div>Login</div>
      <button onClick={signInWithGoogle} className="login-with-google-btn">
        sign in
      </button>
    </>
  );
}

export default Login;
