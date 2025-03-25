import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../assets/styles/About.css";

const About: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false); // Reset animation when out of view
                    }
                });
            },
            { threshold: 0.3 }
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

    return (
        <div className="aboutContainer" id="about" ref={sectionRef}>
            <h2 className="aboutHeading">About Me</h2>

            <div className="aboutText">
                <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="aboutParagraph"
                >
                    Hey, I'm <span className="spanYellow"><strong>Atharv Kasar</strong>—a <strong>full-stack developer, AI enthusiast, and freelancer</strong></span> who loves building cool and meaningful tech.
                    I specialize in <strong>React, Node.js, TypeScript, and AI-powered solutions</strong>, constantly exploring new ways to push boundaries and create innovative projects.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, x: 50 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="aboutParagraph"
                >
                    I also take on <span className="spanYellow"><strong>freelance projects</strong></span>, helping businesses and individuals bring their ideas to life with clean, scalable, and efficient web applications.
                    Whether it's <strong>developing full-stack solutions, automating workflows, or optimizing performance</strong>, I enjoy solving real-world problems through tech.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                    className="aboutParagraph"
                >
                    When I'm not coding, I'm probably <strong>learning something new, working on side projects, or brainstorming startup ideas</strong>.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, x: 50 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                    className="aboutParagraph"
                >
                    Always open to exciting opportunities—let's connect and create something awesome!
                </motion.p>
            </div>
        </div>
    );
};

export default About;
