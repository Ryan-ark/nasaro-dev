"use client"

import React from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"
import ScrollReveal from "../../effects/scroll-reveal"
import TiltCard from "../../effects/tilt-card"
import { motion } from "framer-motion"
import Image from "next/image"
import ImageWithFallback from "../../ui/image-with-fallback"
import { FiCode, FiLayers, FiActivity, FiBarChart2 } from "react-icons/fi"

// Projects in development
const developmentMessage = {
  title: "Projects Coming Soon",
  description: "I'm currently working on several exciting projects that will be showcased here soon. My portfolio is under active development, and I'll be adding detailed case studies of my work in the near future.",
  statusText: "In Development"
}

// Empty project placeholders with "In Development" status
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart functionality, and secure payment processing.",
    technologies: ["Next.js", "TypeScript", "Laravel", "MySQL"],
    image: "/img/project1.png",
    status: "In Development",
    icon: <FiBarChart2 className="w-16 h-16" />
  },
  {
    id: 2,
    title: "Content Management System",
    description: "Custom CMS solution with flexible content modeling, user management, and robust admin interface.",
    technologies: ["React", "PHP", "WordPress", "TailwindCSS"],
    image: "/img/project2.png",
    status: "In Development",
    icon: <FiLayers className="w-16 h-16" />
  },
  {
    id: 3,
    title: "Personal Blog Platform",
    description: "Modern blogging platform with rich content editing, categories, and engagement features.",
    technologies: ["Vue.js", "Laravel", "MySQL", "Blade"],
    image: "/img/project3.png",
    status: "In Development",
    icon: <FiCode className="w-16 h-16" />
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Professional portfolio website with interactive elements, project showcase, and contact functionality.",
    technologies: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
    image: "/img/project4.png",
    status: "In Development",
    icon: <FiActivity className="w-16 h-16" />
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
          {/* Project Image or Placeholder */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-r from-purple-900/30 to-blue-900/30 flex items-center justify-center">
            <div className="text-color-1/80">
              {project.icon}
            </div>
            
            {/* Development Status Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full bg-color-1/20 backdrop-blur-sm text-xs font-medium text-white">
                {project.status}
              </span>
            </div>
          </div>
          
          {/* Project Details */}
          <div className="p-6 flex flex-col flex-grow text-center">
            <motion.h3 
              className="text-xl font-bold mb-2 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {project.title}
            </motion.h3>
            <motion.p 
              className="text-n-3 mb-4 text-sm flex-grow text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {project.description}
            </motion.p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mt-auto justify-center">
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
      <div className="container flex flex-col items-center justify-center">
        <div className="relative z-1 w-full flex flex-col items-center">
          <ScrollReveal>
            <h2 className="h2 mb-6 text-center">Projects</h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="body-1 mb-12 text-center mx-auto max-w-3xl px-4 py-8">
              <p className="text-n-3 mb-6 text-center mx-auto max-w-2xl">
                {developmentMessage.description}
              </p>
              <div className="inline-block px-6 py-3 rounded-full bg-color-1/20 text-sm font-medium text-white">
                {developmentMessage.statusText}
              </div>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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