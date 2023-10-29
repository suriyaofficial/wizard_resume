import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login'
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Preview from './components/Preview';
import TemplateSelection from './Templates/TemplateLayouts';
import Templete2 from './components/Templete2';
import Developing from './Underdeveloping/Developing'



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
                <Route path="templates/temp1" element={<Preview />} />
                <Route path="templates/temp2" element={<Templete2 />} />
                <Route path="templates/temp3" element={<Developing />} />
                <Route path="templates/temp4" element={<Developing />} />
                <Route path="templates" element={<TemplateSelection />} />
                {/* <Route path="resume" element={<ResumeContent />} /> */}
                <Route path="about" element={<Aboutus />} />
              </Routes>
            </Router>

            {/* <GeneratePDF content={<Preview />} /> */}
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
