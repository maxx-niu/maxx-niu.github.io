import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, FileText } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import "./Home.css";
import Resume from "../assets/Resume - Maximus Niu - Jan 30 2025.pdf";

const Home = () => {
  const [loopNumber, setLoopNumber] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const wordsToRotate = ["Designer", "Creator", "Developer", "Gym Bro"];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(200);
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNumber % wordsToRotate.length;
    let fullText = wordsToRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);
    setText(updatedText);
    if (isDeleting) {
      setDelta(100);
    }
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta((prevDelta) => period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNumber(loopNumber + 1);
      setDelta(200);
    }
  };

  return (
    <motion.div className="container" id="home">
      <div className="banner">
        <span className="tagline">Welcome</span>
        <h1>{`Hi! I'm Max,`}</h1>
        <h1>
          <span className="txt-rotate">
            <span className="wrap">{text}</span>
          </span>
        </h1>
        <p>I study Computer Engineering at Waterloo.</p>
        <a href={Resume} target="_blank" rel="noreferrer">
          <button>
            <FileText size={25} />
            Resume
          </button>
        </a>
        <a href="https://github.com/maxx-niu" target="_blank" rel="noreferrer">
          <button>
            <Github size={25} />
          </button>
        </a>
        <a
          href="https://www.linkedin.com/in/max-n/"
          target="_blank"
          rel="noreferrer"
        >
          <button>
            <Linkedin size={25} />
          </button>
        </a>
      </div>
      <a href="#about-me" className="scroll-down-btn">
        <div className="scroll-down"></div>
      </a>
    </motion.div>
  );
};

export default Home;
