"use client"

import React from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"
import ScrollReveal from "../../effects/scroll-reveal"
import TiltCard from "../../effects/tilt-card"
import { motion } from "framer-motion"
import Image from "next/image"
import ImageWithFallback from "../../ui/image-with-fallback"

// Project data
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    image: "/img/project1.png",
    link: "https://example.com/project1",
    github: "https://github.com/username/project1",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team workspace features.",
    technologies: ["React", "Redux", "Firebase", "Material UI"],
    image: "/img/project2.png",
    link: "https://example.com/project2",
    github: "https://github.com/username/project2",
  },
  {
    id: 3,
    title: "Health & Fitness Tracker",
    description: "Mobile application for tracking workouts, nutrition, and personal health metrics with visualization.",
    technologies: ["React Native", "Expo", "Chart.js", "MongoDB"],
    image: "/img/project3.png",
    link: "https://example.com/project3",
    github: "https://github.com/username/project3",
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    description: "Administrative dashboard for managing social media accounts, scheduling posts, and analyzing engagement.",
    technologies: ["Vue.js", "Node.js", "Express", "Social APIs"],
    image: "/img/project4.png",
    link: "https://example.com/project4",
    github: "https://github.com/username/project4",
  },
]

const ProjectCard = ({ 
  project, 
  index
}: { 
  project: typeof projectsData[0]
  index: number
}) => {
  return (
    <ScrollReveal delay={0.1 * index} direction={index % 2 === 0 ? "left" : "right"}>
      <TiltCard
        className="h-full overflow-hidden rounded-2xl border border-n-6 bg-n-8"
        glareOpacity={0.2}
        perspective={1500}
      >
        <div className="relative h-full flex flex-col">
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              fallbackClassName="p-8 flex items-center justify-center"
            />
            
            {/* Overlay with links */}
            <div className="absolute inset-0 bg-gradient-to-t from-n-8/90 to-n-8/0 p-4 flex items-end justify-between opacity-0 hover:opacity-100 transition-opacity duration-300">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-n-1/10 backdrop-blur-sm text-xs font-medium text-n-1 hover:bg-n-1/20 transition-colors"
              >
                Live Demo
              </a>
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-n-1/10 backdrop-blur-sm text-xs font-medium text-n-1 hover:bg-n-1/20 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
          
          {/* Project Details */}
          <div className="p-6 flex flex-col flex-grow">
            <motion.h3 
              className="text-xl font-bold mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {project.title}
            </motion.h3>
            <motion.p 
              className="text-n-3 mb-4 text-sm flex-grow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {project.description}
            </motion.p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.technologies.map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  className="px-2 py-1 text-xs font-medium rounded-md bg-n-7 text-n-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 + techIndex * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(102, 51, 187, 0.2)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </ScrollReveal>
  )
}

const Projects = () => {
  return (
    <Section id="projects" crosses backgroundEffect>
      <div className="container">
        <div className="relative z-1">
          <ScrollReveal>
            <h2 className="h2 mb-6 text-center">Featured Projects</h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="body-1 mb-12 text-center text-n-3">
              Explore some of my recent work and personal projects
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Projects 