import React, { useState } from "react";
import { app } from "./firebaseconfig";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import '../styles/login.css'
import GoogleButton from 'react-google-button'
import { notification, Space } from 'antd'

import appLogo from '../assets/Navlogo copy.jpg'

function Login() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [api, contextHolder] = notification.useNotification();


  const openNotificationWithIcon = (type, msg, des, placement) => {
    try {

      console.log("🚀 ~ file: Home.js:81 ~ openNotificationWithIcon ~ type:", type)
      api[type]({
        message: msg,
        description: des,
        placement
      });
    } catch (error) {
      console.log("🚀 ~ file: Home.js:90 ~ openNotificationWithIcon ~ error:", error)

    }
  };
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

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
      await openNotificationWithIcon('success', 'Success', 'login success', 'top')

      window.location.reload();
    } catch (error) {
      console.error(
        "🚀 ~ file: login.js:22 ~ signInWithGoogle ~ error:",
        error
      );
    }
  };
  const signin = async () => {
    try {
      let result = await signInWithEmailAndPassword(auth, email, password)
      console.log("🚀 ~ file: Login.js:49 ~ signin ~ result:", result)
      localStorage.setItem("email", result.user.email);
      await openNotificationWithIcon('success', 'Success', 'login success', 'top')
      window.location.reload();
    } catch (error) {
      let err = JSON.parse(JSON.stringify(error)).code.replace("auth/", '')
      setError(err)
      openNotificationWithIcon('error', 'Error', `${err}`, 'top')
      console.log("🚀 ~ file: Login.js:54 ~ signin ~ er:", err)
    }
  }
  const signup = async () => {
    try {
      console.log("🚀 ~ file: Login.js:55 ~ signup ~ signup:")
      let user = await createUserWithEmailAndPassword(auth, email, password)
      console.log("🚀 ~ file: Login.js:47 ~ signup ~ user:", user)
      openNotificationWithIcon('success', 'Success', 'Sign Up Success', 'top')
    } catch (error) {
      let err = JSON.parse(JSON.stringify(error)).code.replace("auth/", '')
      setError(err)
      openNotificationWithIcon('error', 'Error', `${err}`, 'top')
      console.log("🚀 ~ file: Login.js:54 ~ signin ~ er:", err)
    }
  }

  return (
    <>
      <div className="body">
        {contextHolder}

        <div className="login-page">
          <div className="login-card">
            <div className="logo"><img width={100} src={appLogo}></img>
              <div>Wizard Resume Builder</div>
            </div>
            <div className="header">
              <h6>please login to use platform</h6>
            </div>
            <div className="login-form">
              <div className="form-details">

                <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-details">

                <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />

              </div>

              {/* <div className="form-details-other">
                <div className="remember-me">
                  <input type="checkbox" id="Remember me" />
                  <label for="Remember me">Remember me</label>
                </div>
                <a href="">forget my password</a>
              </div> */}

              <button className="btn" onClick={signin}>sign in</button>
              <button className="btn" onClick={signup}>sign up</button>

            </div>

            <div className="social-media">
              <div>other sign-in platform</div>
              <div className="socialdiv">
                <GoogleButton type="light" onClick={signInWithGoogle} />
              </div>
            </div>
          </div>

        </div>

        {/* <div className="chat"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-hipchat" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17.802 17.292s.077 -.055 .2 -.149c1.843 -1.425 2.998 -3.49 2.998 -5.789c0 -4.286 -4.03 -7.764 -8.998 -7.764c-4.97 0 -9.002 3.478 -9.002 7.764c0 4.288 4.03 7.646 9 7.646c.424 0 1.12 -.028 2.088 -.084c1.262 .82 3.104 1.493 4.716 1.493c.499 0 .734 -.41 .414 -.828c-.486 -.596 -1.156 -1.551 -1.416 -2.29z" />
          <path d="M7.5 13.5c2.5 2.5 6.5 2.5 9 0" />
        </svg>
          <div>need help</div>
        </div> */}
        <div className="copyrights">
          <marquee>copyrights to suriya &copy; {year}</marquee>
        </div>
      </div>
    </>
  );
}
export default Login;
