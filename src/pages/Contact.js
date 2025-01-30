import React, {useRef} from "react";
import emailjs from '@emailjs/browser';
import {motion} from "framer-motion";
import "./Contact.css";
import Footer from "./Footer";


const Contact = () => {
  const form = useRef(null);
  const name = useRef(null);
  const email = useRef(null);
  const message = useRef(null);

  const checkValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const sendEmail = (e) => {
    e.preventDefault();
    if(!name.current.value || !email.current.value || !message.current.value || !checkValidEmail(email.current.value)){
      if(name.current.value === "") {
        name.current.style.border = "2px solid rgba(255, 0, 0, 0.8)";
      }
      else {
        name.current.style.border = "2px solid rgba(255, 255, 255, 0.5)";
      }
      if(email.current.value === "" || !checkValidEmail(email.current.value)) {
        email.current.style.border = "2px solid rgba(255, 0, 0, 0.8)";
      }
      else {
         email.current.style.border = "2px solid rgba(255, 255, 255, 0.5)";
      }
      if(message.current.value === "") {
        message.current.style.border = "2px solid rgba(255, 0, 0, 0.8)";
      }
      else {
        message.current.style.border = "2px solid rgba(255, 255, 255, 0.5)";
      }
    }
    else {
      // emailjs.sendForm('service_9k9u05a', 'template_0jyyggr', form.current, 'rJI4MdOfNI_vANp3x') //PLEASE MAKE AN ENV VAR
      emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY)
        .then((result) => {
            e.target.reset();
            name.current.style.border = "2px solid rgba(255, 255, 255, 0.5)";
            email.current.style.border = "2px solid rgba(255, 255, 255, 0.5)";
            message.current.style.border = "2px solid rgba(255, 255, 255, 0.5)";
        }, (error) => {
            console.log(error.text);
        });
    }

  };

  return (
    <>
    <div id="contact-me">
    <section className="contact">
      <div className="contact-container">
        <h2>Contact Me</h2>
        <div className="contact-form">
          <form ref={form} onSubmit={sendEmail}>
            <div className="input-box">
              <input type="text" name="user_name" ref={name} placeholder="Name*"/>
              {/* <span>Name*</span> */}
            </div>
            <div className="input-box">
              <input type="text" name="user_email" ref={email} placeholder="Email*"/>
              {/* <span>Email*</span> */}
            </div>
            <div className="input-box">
              <textarea name="message" rows="7" ref={message} placeholder="Message*"/>
              {/* <span>Message*</span> */}
            </div>
            <input type="submit" value="Send" className="send"/>
          </form>
        </div>
      </div>
      <div className="spacer"></div>
    </section>
    </div>
    <Footer></Footer>
    </>
  );

}

export default Contact;