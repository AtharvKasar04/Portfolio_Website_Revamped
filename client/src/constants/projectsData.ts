import SpotSeeker from "../assets/images/SpotSeeker.jpg";
import LocalStorageWrapper from "../assets/images/localStorageWrapper.png";
import tradingExpectancyCalculator from "../assets/images/tradingExpectancyCalculator.png";
import athexDashboard from "../assets/images/athex-dashboard.png";
import BacktestingEngine from "../assets/images/BacktestingEngine.jpg";
import fedlensImg from "../assets/images/fedlens01.png";
import fedlensImg2 from "../assets/images/fedlens02.png";

export interface ProjectData {
  id: string;
  name: string;
  type: string;
  images?: string[];
  image?: string;
  description: string;
  approach?: string;
  howItWorks?: string;
  techStack: string[];
  github: string;
  live: string;
  hasDetails?: boolean;
}

export const projects: ProjectData[] = [
  { 
    id: "fedlens",
    name: "FedLens: Monetary Policy Intelligence", 
    type: "Evidence-grounded intelligence system", 
    images: [fedlensImg, fedlensImg2], 
    description: "An evidence-grounded monetary-policy intelligence system designed to track, analyze, and grade the Federal Reserve's communications alongside real-world economic data. It combines FOMC press releases with real-time FRED macroeconomic data to detect narrative divergences, which are instances where the Fed's verbal assessment contradicts the actual trajectory of the economy. The system serves this data via a Next.js dashboard featuring interactive time-series visualizations, precise text-diffing, and a hallucination-free RAG engine for querying historical data.",
    approach: "Instead of relying on unstructured text summaries, the system uses the Instructor library coupled with Pydantic Models to constrain the LLM, forcing it to extract exactly 6 dimensions (Overall Stance, Inflation, Labor Market, Economic Growth, Financial Conditions, Forward Guidance). It then acts as an objective judge, cross-referencing these claims against actual FRED data trends.",
    howItWorks: "1. Ingestion: Scrapes FOMC statements and fetches real-time economic data from FRED.\n2. AI Grading: Instructor forces the LLM to return a strict JSON schema grading 6 different dimensions.\n3. Semantic Diffing: difflib computes exact character differences between consecutive meetings (visualized like a GitHub PR).\n4. Divergence Detection: The AI cross-references the Fed's graded claims against the actual FRED data trend to flag contradictions.\n5. RAG Engine: Text is chunked, embedded using text-embedding-3-small, and stored in pgvector for hallucination-free querying.",
    techStack: ["Next.js", "Python", "FastAPI", "PostgreSQL", "pgvector", "OpenAI", "RAG"],
    github: "https://github.com/AtharvKasar04/fedlens",
    live: "",
    hasDetails: true
  },
  { 
    id: "athex-analytics",
    name: "Athex Analytics: Prop Firm Dashboard", 
    type: "Unified prop firm tracking and analytics SaaS", 
    image: athexDashboard, 
    description: "A full-stack SaaS that helps traders track, manage, and analyze multiple prop firm accounts in one unified dashboard to solve the fragmented tracking problem traders face when managing accounts across different proprietary trading firms.",
    techStack: ["React", "TypeScript", "Node.js", "MongoDB"],
    github: "",
    live: "https://athex-six.vercel.app",
    hasDetails: false
  },
  { 
    id: "quantitative-backtesting-engine",
    name: "Quantitative Backtesting Engine", 
    type: "Institutional-grade strategy simulation engine", 
    image: BacktestingEngine, 
    description: "A high-performance Python backtesting engine built with Pandas and PyArrow for evaluating quantitative trading strategies and processing large financial datasets, engineered from scratch to provide a robust, scalable infrastructure for data validation and strategy simulation.",
    techStack: ["Python", "Pandas", "PyArrow", "FastAPI", "Plotly"],
    github: "",
    live: "",
    hasDetails: false
  },
  { 
    id: "trading-expectancy-calculator",
    name: "Trading Expectancy Calculator", 
    type: "Monte Carlo equity curve and edge modeling tool", 
    image: tradingExpectancyCalculator, 
    description: "A data-driven tool for traders to calculate strategy expectancy, model real-world equity growth, and visualize performance using Monte Carlo simulations to test their edge.",
    techStack: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
    github: "https://github.com/AtharvKasar04/trading-expectancy",
    live: "https://trading-expectancy.vercel.app/",
    hasDetails: false
  },
  { 
    id: "spotseeker",
    name: "SpotSeeker: Smart IoT Parking", 
    type: "Real-time hardware sensor parking availability dashboard", 
    image: SpotSeeker, 
    description: "A smart real-time parking spot detection system leveraging IR sensors, microcontrollers, and IoT APIs to display available spots on a React-based web dashboard.",
    techStack: ["ReactJS", "Arduino", "ESP8266 (NodeMCU)", "ThingSpeak IoT", "Sensors"],
    github: "",
    live: "",
    hasDetails: false
  },
  { 
    id: "ls-wrapper",
    name: "LS-Wrapper: NPM Utility", 
    type: "Lightweight open-source browser storage manager library", 
    image: LocalStorageWrapper, 
    description: "A lightweight NPM library simplifying browser local storage management with wrapped get, set, and remove functions, built to master the process of creating and publishing open-source NPM packages.",
    techStack: ["JavaScript", "Jest", "NPM"],
    github: "https://github.com/AtharvKasar04/localStorage-wrapper.git",
    live: "https://www.npmjs.com/package/b-local-storage-wrapper",
    hasDetails: false
  },
];
