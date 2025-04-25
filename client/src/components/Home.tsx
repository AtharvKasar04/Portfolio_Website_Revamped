import "../assets/styles/Home.css";
import "../assets/fonts/fonts.css";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import myImg from "../assets/images/IMG_7547.jpg";
import { FaLinkedin } from "react-icons/fa";
import { PiXLogoBold } from "react-icons/pi";

const Home: React.FC = () => {
  const typedElement = useRef<HTMLSpanElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!typedElement.current) return;

    const options = {
      strings: [
        "ReactJS Development",
        "JavaScript Programming",
        "Full Stack Development",
        "Open Source",
        "Artificial Intelligence",
      ],
      typeSpeed: 60,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.5 } // 30% of the section should be visible before triggering
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`main fade-in ${isVisible ? "visible" : ""}`}
      id="home-main"
    >
      <div className="container" id="home">
        <div className="textFields">
          <h2>Hey,</h2>
          <h2>I'm Atharv Kasar</h2>
          <h4>Full Stack Web Developer</h4>
          <h5>
            - I'm interested in <span id="typedText" ref={typedElement}></span>
          </h5>

          <div className="bottom">
            <a href="/resume.pdf" download>
              <button id="resumeBtn">Resume</button>
            </a>

            <button id="aboutBtn" onClick={() => scrollToSection("about")}>
              About Me
            </button>

            <div className="iconButtons">
              <a
                href="https://www.linkedin.com/in/atharv-kasar-03aa34258/"
                id="linkedinLogo"
                target="_blank"
              >
                <FaLinkedin />
              </a>

              <a href="https://x.com/ATHARVKASAR6" target="_blank" id="xLogo">
                <PiXLogoBold />
              </a>
            </div>
            
          </div>
        </div>

        <div className="imageDiv">
          <img src={myImg} alt="img" draggable="false" />
        </div>
      </div>
    </div>
  );
};

export default Home;
