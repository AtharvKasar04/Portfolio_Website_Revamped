import ProjectLeftAligned from "./ProjectLeftAligned";
import ProjectRightAligned from "./ProjectRightAligned";
import "../assets/styles/Projects.css"

import MaharashtraFarmsImg from "../assets/images/MaharashtraFarms.png";
import PaanPhoolImg from "../assets/images/PaanPhool.png";
import DiscordBot from "../assets/images/DiscordBot.png";

interface Project {
    name: string;
    description: string;
    techStack: string[];
    image: string;
    githubLink: string;
    deployment: string;
}

const projects: Project[] = [
    {
        name: "Freelance Work - Subscription Based Fruits & Veggies ordering website",
        description: "A website designed and developed for ordering fruits and vegetables on a subscription basis with payment integrations and admin panel for full control.",
        techStack: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB'],
        image: MaharashtraFarmsImg,
        githubLink: "",
        deployment: "https://maharashtrafarms.com"
    },
    {
        name: "Freelance Work - Plant Rental Startup's website",
        description: "A startup based in Nashik which offers a Plant Rental Service on a Monthly subscription basis.",
        techStack: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'MySQL'],
        image: PaanPhoolImg,
        githubLink: "",
        deployment: ""
    },
    {
        name: "Minot - A Discord Bot feature Games, Music integration",
        description: "A Discord Bot",
        techStack: ['DiscordJS', 'NodeJS'],
        image: DiscordBot,
        githubLink: "",
        deployment: ""
    },
]

const Projects: React.FC = () => {
    return (
        <div className="projectMainContainer" id="profile">
            <h2 className="projectHeading">
                My Projects
            </h2>

            <div className="projectsSection">
                {projects.map((project, index) => (
                    index % 2 === 0 ? (
                        <ProjectLeftAligned key={index} {...project} />
                    ) : (
                        <ProjectRightAligned key={index} {...project} />
                    )
                ))}
            </div>
        </div>
    )
}

export default Projects
