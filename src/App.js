import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login'
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Aboutus from './components/Aboutus';



function App() {
  const signInValidate = localStorage.getItem("email")
  console.log("🚀 ~ file: App.js:10 ~ App ~ signInValidate:", signInValidate)
  return (
    <>  {
      signInValidate !== null ?
        (
          <>

            <Router>

              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="about" element={<Aboutus />} />
              </Routes>
            </Router>

          </>
        ) : (<>
          <Router>

            <Login />
          </Router>

        </>)}
    </>
  );
}

export default App;
