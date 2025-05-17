import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "../assets/styles/Skills.css";

const mySkills: string[] = [
  "ReactJS",
  "Angular",
  "NodeJS",
  "ExpressJS",
  "MongoDB",
  "TypeScript",
  "Python",
  "C/C++",
  "MySQL",
  "Arduino",
  "Git/Github",
];

const skillVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Skills: React.FC = () => {
  const controls = useAnimation();
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden"); // Reset animation when out of view
        }
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, [controls]);

  return (
    <motion.div
      className="skillsMainComponent"
      id="skills"
      ref={skillsRef}
      initial="hidden"
      animate={controls}
    >
      <motion.h2
        className="skillsHeading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      >
        Skills
      </motion.h2>

      <motion.div className="myTechnology">
        {mySkills.map((tech, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }} // ✅ Hover effect now works!
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              className="myTechItem"
              variants={skillVariants}
              custom={index}
            >
              {tech}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Skills;
