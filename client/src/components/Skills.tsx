import "../assets/styles/Skills.css";

const mySkills: string[] = [
  "ReactJS",
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

const Skills: React.FC = () => {
  return (
    <div className="skillsMainComponent" id="skills">
      <h2 className="skillsHeading">Skills</h2>
      <div className="myTechnology">
        {mySkills.map((tech, index) => (
          <span className="myTechItem" key={index}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
