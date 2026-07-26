import React from 'react';
import { FaExternalLinkAlt, FaCode } from 'react-icons/fa';

const ProjectCard = ({ title, tools, description, link, color }: any) => (
  <div className={`bg-white border-4 border-black rounded-3xl  p-6 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all relative overflow-hidden`}>
    
    <div className={`absolute top-0 left-0 right-0 h-4 ${color} border-b-4 border-black`}></div>
    
    <div className="mt-4 flex justify-between items-start mb-4">
        <div>
            <h3 className="text-2xl font-shrikhand">{title}</h3>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 border border-black rounded-md ml-1 animate-pulse">
                LIVE PROJECT
            </span>
        </div>
        <a href={link} target="_blank" rel="noreferrer" className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <FaExternalLinkAlt />
        </a>
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
        {tools.map((t: string) => (
            <span key={t} className="bg-gray-100 border border-black px-2 py-1 text-xs font-bold font-mono rounded-md">
                {t}
            </span>
        ))}
    </div>

    <ul className="list-disc list-inside space-y-2 text-sm font-medium border-t-2 border-black pt-4">
        {description.map((point: string, i: number) => (
            <li key={i}>{point}</li>
        ))}
    </ul>
  </div>
);

const Projects = () => {
    const projects = [
      {
        title: "Interview-Ai",
        color: "bg-custom-purple", 
        tools: ["Node.js", "Express", "React", "MongoDB","JWT","Puppeteer", "Gemini API"],
        link: "https://interview-ai-frontend-woad.vercel.app/", 
        description: [
          "Developed a full-stack AI interview platform that generates personalized interview plans by analyzing resumes and job descriptions.",
          "Integrated Google Gemini API to generate ATS scores, interview questions, learning roadmaps, and AI-powered resume optimization",
          "Implemented secure JWT authentication, resume uploads, interview history, and protected REST APIs using Express and MongoDB.",
          "Built an ATS-friendly PDF resume generator with Puppeteer, featuring professional formatting, clickable hyperlinks, and one-click downloads."
        ]
      },
      {
        title: "Gemini-2.0",
        color: "bg-custom-pink",
        tools: ["React", "Gemini API", "JavaScript", "CSS"],
        link: "https://gemini-clone-one-khaki.vercel.app/",
        description: [
          "Built a responsive AI chatbot using React with Google Gemini API for real-time AI conversations",
          "Implemented typing effects, loading animations, and chat history for an engaging user experience.",
          "Designed a modern responsive UI with reusable React components and efficient state management.",
          "Optimized performance to provide fast, seamless, and intuitive AI interactions across devices."
        ]
      }
    ];

  return (
    <section id="projects" className="py-10 px-4 mx-auto max-w-7xl  bg-custom-yellow border-2 border-b-4 border-r-4 border-black rounded-3xl shadow-neo">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-custom-green px-8 py-3 rounded-full border-4 border-black shadow-neo">
            <h2 className="text-3xl font-shrikhand text-white">PROJECTS</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
};

export default Projects;