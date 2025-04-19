"use client"

import React from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"
import ScrollReveal from "../../effects/scroll-reveal"
import { motion } from "framer-motion"

const skillsData = [
  {
    category: "Web Development",
    icon: "🌐",
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "TailwindCSS", "Redux", "Laravel", "PHP", "MySQL"]
  },
  {
    category: "Mobile Development",
    icon: "📱",
    skills: ["React Native", "Expo.dev", "Android Studio", "Java", "Kotlin", "Mobile UI/UX", "Push Notifications", "App Store Deployment"]
  },
  {
    category: "CMS Development",
    icon: "🔌",
    skills: ["WordPress", "Elementor", "WooCommerce", "Custom Themes", "Custom Plugins", "ACF", "Gutenberg", "E-commerce"]
  },
  {
    category: "Tools & Others",
    icon: "🛠️",
    skills: ["Git", "GitHub", "Docker", "AWS", "CI/CD", "Figma", "Adobe XD", "RESTful APIs", "GraphQL", "Firebase"]
  }
]

const SkillItem = ({ skill, index }: { skill: string; index: number }) => {
  return (
    <motion.div 
      className="group relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 0.3 + (index * 0.05), 
        duration: 0.3,
        type: "spring", 
        stiffness: 100 
      }}
    >
      <motion.div 
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-color-1/20 to-color-5/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        whileHover={{ scale: 1.2 }}
      />
      <motion.div 
        className="relative flex h-9 items-center justify-center rounded-lg bg-n-7 px-2 md:px-3 text-center text-n-1/90 backdrop-blur-sm transition-all duration-300 hover:bg-n-6 w-full"
        whileHover={{ 
          scale: 1.03,
          color: "rgba(255, 255, 255, 1)",
          backgroundColor: "rgba(102, 51, 187, 0.15)" 
        }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="truncate text-xs md:text-sm">{skill}</span>
      </motion.div>
    </motion.div>
  )
}

const SkillCard = ({ category, skills, index, icon }: { 
  category: string; 
  skills: string[]; 
  index: number;
  icon: string;
}) => {
  return (
    <ScrollReveal delay={0.1 * index} direction={index % 2 === 0 ? "left" : "right"}>
      <motion.div 
        className="rounded-2xl border border-n-6 bg-gradient-to-br from-n-8 to-n-7 p-6 md:p-8 transition-all duration-300 hover:border-n-5/50 h-full w-full"
        whileHover={{ 
          boxShadow: "0 15px 30px -10px rgba(102, 51, 187, 0.15)",
          translateY: -8
        }}
      >
        <motion.div 
          className="flex items-center mb-6 space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="text-3xl">{icon}</span>
          <h3 className="h4 bg-gradient-to-r from-purple-400 via-color-5 to-blue-400 bg-clip-text text-transparent">
            {category}
          </h3>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
          {skills.map((skill, skillIndex) => (
            <SkillItem key={skillIndex} skill={skill} index={skillIndex} />
          ))}
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

const Skills = () => {
  return (
    <Section id="skills" crosses backgroundEffect backgroundDirection="left">
      <div className="container px-4 sm:px-6 lg:px-8 w-full mx-auto">
        <div className="relative z-1">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center mb-10">
              <div className="inline-block rounded-full bg-n-6 px-4 py-1.5 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-n-1/50">Tech Stack</span>
              </div>
              <h2 className="h2 mb-6 bg-gradient-to-r from-color-1 via-color-5 to-color-2 bg-clip-text text-transparent">Skills & Technologies</h2>
              <p className="body-1 text-n-3 mx-auto max-w-2xl">
                My technical expertise across various development domains
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2 xl:gap-10">
            {skillsData.map((category, index) => (
              <SkillCard
                key={index}
                category={category.category}
                skills={category.skills}
                icon={category.icon}
                index={index}
              />
            ))}
          </div>
          
          <motion.div 
            className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-color-1/10 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div 
            className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-color-5/10 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
        </div>
      </div>
    </Section>
  )
}

export default Skills 