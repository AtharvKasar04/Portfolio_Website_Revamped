import React from "react";
import ParticlesBackground from "./components/ParticlesBackground";
import Home from "./components/Home";
import "./assets/styles/App.css"
import WorkTimeline from "./components/WorkTimeline";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <ParticlesBackground />
      <div style={{ position: "relative", zIndex: 1, height: "fit-content" }}>
        <Navbar />
        <Home />
        <Projects />
        <WorkTimeline />
        <Skills />
        <Contact />
      </div>
    </div>
  );
};

export default App;
