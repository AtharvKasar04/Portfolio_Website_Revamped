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
    duration: "Jan 2024 - March 2025",
    title: "Software Developer",
    company: "HummingByte Technologies Pvt. Ltd.",
    description: "Worked on full-stack development. ReactJS, NodeJS, ExpresJS, MySQL",
  },
  {
    duration: "Sep 2024 - Present",
    title: "Freelance Developer",
    company: "Self-Employed",
    description: "Built custom web applications for clients, improving business functions and digital presence.",
  },
  {
    duration: "Jan 2025 - Present",
    title: "Intern - Web Developer",
    company: "PaanPhool",
    description: "Assisted in building React-based web applications from scratch with custom features and Email list functionality with NodeJS.",
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

      <Timeline className="timelineComponent">
        {workExperience.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <TimelineItem className="timelineItem">
              {/* Left Side - Duration */}
              <TimelineOppositeContent>
                <Typography variant="h6" fontWeight="bold" className="timelineDuration">
                  {job.duration}
                </Typography>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot sx={{ backgroundColor: "#FFD600", width: 18, height: 18 }} />
                {index !== workExperience.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              {/* Right Side - Job Details */}
              <TimelineContent>
                <Typography variant="h6" fontWeight="bold" className="experienceTitle">
                  {job.title}
                </Typography>
                <Typography variant="h6" sx={{ fontStyle: "italic", color: "#ccc" }} className="jobCompany">
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
