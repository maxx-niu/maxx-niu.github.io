import React from 'react';
import Navbar from './Navbar';
import Cursor from './Cursor';
import "./App.css";
import {motion} from "framer-motion";
import { useRef } from "react";

import Home  from './pages/Home';
import AboutMe from './pages/AboutMe';
import Projects from './pages/Projects';
import Contact from './pages/Contact'


//import { ScrollContainer } from 'react-scroll-motion';

const App = () => {

  const appDiv = useRef(null);

  const removeTransform = () => {
    // to remove transform property so cursor works properly
    appDiv.current.style.transform = "none";
  }

  return (
    <>
      <motion.div
        initial={{ x:"0" }}
        animate={{ x:"100%", transition: { duration: 2, type: "spring", stiffness:"30" } }}
        className="privacy-screen"
      />
      <motion.div 
        initial={{ x:"-100%" }}
        animate={{ x: 0, transition: { duration: 1.5, type: "spring", stiffness:"30"} }}
        onAnimationComplete={removeTransform}
        ref={appDiv}
        id="app-container"
      >
        <Navbar></Navbar>
        <Cursor></Cursor>
          <div className="big-container">
            <Home></Home>
            <AboutMe></AboutMe>
            <Projects></Projects>
            <Contact></Contact>
          </div>
      </motion.div>
      {/* ^ might have to do some prop passing here into the cursor */}
    </>
  );
}

export default App;
