import * as React from "react";
import { motion, useInView } from "framer-motion";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Typography, Box } from "@mui/material";

import "../assets/styles/WorkTimeline.css";

interface WorkExperience {
  duration: string;
  title: string;
  company: string;
  description: string;
}

const workExperience: WorkExperience[] = [
  {
    duration: "Jan 2024 - Present",
    title: "Software Developer",
    company: "Tech Innovations Ltd.",
    description: "Working on full-stack development using MERN stack and microservices.",
  },
  {
    duration: "Aug 2022 - Dec 2023",
    title: "Freelance Developer",
    company: "Self-Employed",
    description: "Built custom web applications for clients, improving business automation.",
  },
  {
    duration: "May 2021 - July 2022",
    title: "Intern - Web Developer",
    company: "Startup X",
    description: "Assisted in building React-based web applications with Firebase backend.",
  },
];

const WorkTimeline: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <Box
      sx={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "auto",
        color: "white",
      }}
      id="work"
      className="timelineBox"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Typography variant="h2" textAlign="center" mb={5} className="workExperienceHeading">
          Work Experience
        </Typography>
      </motion.div>

      <Timeline>
        {workExperience.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <TimelineItem>
              {/* Left Side - Duration */}
              <TimelineOppositeContent>
                <Typography variant="h6" fontWeight="bold">
                  {job.duration}
                </Typography>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot sx={{ backgroundColor: "#FFD600", width: 20, height: 20 }} />
                {index !== workExperience.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              {/* Right Side - Job Details */}
              <TimelineContent>
                <Typography variant="h5" fontWeight="bold">
                  {job.title}
                </Typography>
                <Typography variant="h6" sx={{ fontStyle: "italic", color: "#ccc" }}>
                  {job.company}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }} className="timelineDescription">
                  {job.description}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </motion.div>
        ))}
      </Timeline>
    </Box>
  );
};

export default WorkTimeline;
