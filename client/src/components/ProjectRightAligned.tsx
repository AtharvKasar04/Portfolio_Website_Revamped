import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "../assets/styles/ProjectLeftAligned.css";
import "../assets/styles/ProjectRightAligned.css";

interface ProjectProps {
  name: string;
  description: string;
  techStack: string[];
  image: string;
  githubLink: string;
  deployment: string;
}

const ProjectRightAligned: React.FC<ProjectProps> = ({ name, description, techStack, image, githubLink, deployment }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold: 0.4 } // Trigger when 20% of the component is in view
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      className="projectRightAlignedContainer"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
    >
      <motion.div
        className="right-"
        variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { delay: 0.2 } } }}
      >
        <h2 className="projectTitle">{name}</h2>
        <p className="projectDescription">{description}</p>
        <div className="projectTechStack">
          {techStack.map((technology, index) => (
            <motion.span
              key={index}
              className="projectTechStackItem"
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0, transition: { delay: 0.4 + index * 0.1 } }
              }}
            >
              {technology}
            </motion.span>
          ))}
        </div>
        <div className="projectActionButtons">
          <motion.a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { delay: 0.6 } } }}
          >
            <button className="githubButton">Github &lt;&gt;</button>
          </motion.a>
          <motion.a
            href={deployment}
            target="_blank"
            rel="noopener noreferrer"
            variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { delay: 0.8 } } }}
          >
            <button className="deploymentButton">Deployment</button>
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        className="left-rightAligned"
        variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { delay: 0.2 } } }}
      >
        <img src={image} draggable="false" alt="Project Image" />
      </motion.div>
    </motion.div>
  );
};

export default ProjectRightAligned;
