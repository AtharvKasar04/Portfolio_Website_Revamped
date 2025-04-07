import ProjectLeftAligned from "./ProjectLeftAligned";
import ProjectRightAligned from "./ProjectRightAligned";
import "../assets/styles/Projects.css"

import MaharashtraFarmsImg from "../assets/images/MaharashtraFarms.png";
import PaanPhoolImg from "../assets/images/PaanPhool.png";
import DiscordBot from "../assets/images/DiscordBot.png";
import LocalStorageWrapper from "../assets/images/localStorageWrapper.png";
import SpotSeeker from "../assets/images/SpotSeeker.jpg";

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
        name: "SpotSeeker - Realtime Parking Spot detection using Arduino UNO and ESP8266",
        description: "A Real-Time parking spot detection system with displaying the number of spots available on a React based web-app. It uses IR sensors to detect the parking spot and relays the data to Arduino UNO and then ESP8266 also making the use of ThingSpeak IoT for the API usage for React dashboard.",
        techStack: ['ReactJS', 'Arduino', 'ESP8266 (NodeMCU)', 'ThingSpeak IoT', 'IoT Sensors'],
        image: SpotSeeker,
        githubLink: "",
        deployment: ""
    },
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
    {
        name: "NPM Package - LocalStorage Wrapper",
        description: "A lightweight NPM package that simplifies working with local storage by wrapping essential functions like get, set, and remove. While the project was simple, it helped me understand the process of creating and publishing an NPM package, writing Jest tests for validation, and documenting the package for ease of use",
        techStack: ['JavaScript', 'Jest', 'npm'],
        image: LocalStorageWrapper,
        githubLink: "https://github.com/AtharvKasar04/localStorage-wrapper.git",
        deployment: "https://www.npmjs.com/package/b-local-storage-wrapper"
    }
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
