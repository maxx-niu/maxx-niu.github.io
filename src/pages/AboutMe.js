import React from 'react';
import {motion} from "framer-motion";
import {SiHtml5, SiCss3, SiJavascript, SiC, SiCplusplus,
SiPython, SiJava, SiReact, SiAmazondynamodb, SiAmazons3, 
SiNodedotjs, SiGit, SiAngularjs, SiFigma, SiAdobeillustrator,
SiAdobephotoshop, SiAdobepremierepro, SiWordpress} from "react-icons/si";
import {AiOutlineConsoleSql, AiOutlineApi, AiOutlineFunction} from "react-icons/ai";
import {BsCpu, BsGraphUp} from "react-icons/bs";
import {GrMysql} from "react-icons/gr";
import "./AboutMe.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import portraitGoogle from "../assets/Bio_Portrait_Google.jpg";
import UWLogo from "../assets/Waterloo_Engineering_Logo_vert_rev_rgb.png";

const AboutMe = () => {
  const languages = ["HTML", "CSS", "JS", "C", "C++", "Python", "SQL", "Java", "Verilog", "MATLAB"];
  const libraries_Frameworks = ["React", "DynamoDB", "API Gateway", "AWS Lambda", "S3", "NodeJS", "Git", "MySQL", "Angular", "WordPress"];
  const other = ["Figma", "Illustrator", "Photoshop", "Premiere"];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
  };

  const languagesIcons = [
    <SiHtml5 size={"2.5rem"}></SiHtml5>, <SiCss3 size={"2.5rem"}></SiCss3>, <SiJavascript size={"2.5rem"}></SiJavascript>,
    <SiC size={"2.5rem"}></SiC>, <SiCplusplus size={"2.5rem"}></SiCplusplus>, <SiPython size={"2.5rem"}></SiPython>, 
    <AiOutlineConsoleSql size={"2.5rem"}></AiOutlineConsoleSql>, <SiJava size={"2.5rem"}></SiJava>,
    <BsCpu size={"2.5rem"}></BsCpu>, <BsGraphUp size={"2.5rem"}></BsGraphUp>
  ];

  const libraries_FrameworksIcons = [
    <SiReact size={"2.5rem"}></SiReact>, <SiAmazondynamodb size={"2.5rem"}></SiAmazondynamodb>, <AiOutlineApi size={"2.5rem"}></AiOutlineApi>,
    <AiOutlineFunction size={"2.5rem"}></AiOutlineFunction>, <SiAmazons3 size={"2.5rem"}></SiAmazons3>, <SiNodedotjs size={"2.5rem"}></SiNodedotjs>,
    <SiGit size={"2.5rem"}></SiGit>, <GrMysql size={"2.5rem"}></GrMysql>, <SiAngularjs size={"2.5rem"}></SiAngularjs>, <SiWordpress size={"2.5rem"}></SiWordpress>
  ];

  const otherIcons = [
    <SiFigma size={"2.5rem"}></SiFigma>, <SiAdobeillustrator size={"2.5rem"}></SiAdobeillustrator>,
    <SiAdobephotoshop size={"2.5rem"}></SiAdobephotoshop>, <SiAdobepremierepro size={"2.5rem"}></SiAdobepremierepro>
  ];

  return (
    <motion.div
        className="container" id="about-me"
        >
        <section id="portfolio">
          <h1>About Me</h1>
          <h3>Skills</h3>
          <div className="experience-container">
            <div className="languages">
              <h3>Programming Languages</h3>
              <div className="experience-content">
                <Slider className="skill-slider" {...settings}>
                  {languages.map((language, i) => {
                    return (<div key={i} className="item">
                        {languagesIcons[i]}
                        <h5>{language}</h5>
                      </div>);
                  })}
                </Slider>
              </div>
            </div>
            <div className="frameworks-libraries">
              <h3>Frameworks, Libraries and Tech</h3>
              <div className="experience-content">
                <Slider className="skill-slider" {...settings}>
                  {libraries_Frameworks.map((language, i) => {
                    return (<div key={i} className="item">
                        {libraries_FrameworksIcons[i]}
                        <h5>{language}</h5>
                      </div>);
                  })}
                </Slider>
              </div>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="experience-container2">
              <div className="other">
                <h3>Other</h3>
                <div className="experience-content">
                  <Slider className="skill-slider" {...settings}>
                  {other.map((language, i) => {
                    return (<div key={i} className="item">
                        {otherIcons[i]}
                        <h5>{language}</h5>
                      </div>);
                  })}
                </Slider>
                </div>
              </div>
            </div>
            <div className="bio-container">
            <div className="bio">
                <h3>Bio</h3>
                <p>
                My full name is actually Maximus, but everyone just calls me Max for short. I'm currently
                finishing up my 3rd year studying Computer Engineering here at uWaterloo.
                I have a strong passion for making aesthetic websites with React, as well as general programming. 
                I've recently started learning about machine learning with Python, and currently learning
                about computer networking, compilers and databases in school.
                </p>
                <p>
                  I love watching and discussing TV and anime shows, as well as gaming. I'm super
                  into working out and lifting weights in my spare time, so I often stop by the PAC on 
                  Waterloo campus. Feel free to say hi if you ever meet me - I can give you some 
                  fitness tips!
                </p>
            </div>
            <div className="bio-image">
                <img src={portraitGoogle} alt="portrait" />
            </div>
          </div>
          <div className="education-container">
            <div className="education-item">
              <h3>Education</h3>
              <h4>BASc Honors Computer Engineering | University of Waterloo</h4>
              <h5>Sept. 2019 - Present</h5>
              <h5>Notable Courses: Algorithms and Data Structures, Systems Programming and Concurrency, Real-time OS, Computer Networks, Databases, Compilers</h5>
            </div>
            <div className="education-item-img">
              <img src={UWLogo} alt="UW Engineering Logo" />
            </div>
          </div>
        </section>
    </motion.div>
  )
}

export default AboutMe