"use client"

import React, { useState } from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"
import { Gradient } from "../../design/about"
import ScrollReveal from "../../effects/scroll-reveal"
import { motion } from "framer-motion"
import FloatingShapes from "../../effects/floating-shapes"

const tabs = [
  { id: "about", label: "About Me" },
  { id: "philosophy", label: "Philosophy" },
  { id: "interests", label: "Interests" }
]

const tabContent = {
  about: (
    <>
      <p className="mb-6 text-lg leading-relaxed text-left">
        I'm Ryan Elico, a passionate Software Engineer with a deep enthusiasm for crafting elegant solutions to complex problems. With a strong foundation in modern web technologies and a keen eye for detail, I strive to create applications that are not only functional but also provide exceptional user experiences.
      </p>
      <p className="text-lg leading-relaxed text-left">
        My journey in software development began with a curiosity about how digital tools shape our world. Over the years, I've honed my skills in various technologies, always staying at the forefront of industry trends and best practices. I believe in writing clean, maintainable code that can evolve with changing requirements.
      </p>
    </>
  ),
  philosophy: (
    <>
      <p className="mb-6 text-lg leading-relaxed text-left">
        I approach software development with a user-centered mindset. I believe that technology should be accessible, intuitive, and genuinely helpful. Every line of code I write aims to solve real problems and enhance the user's journey.
      </p>
      <p className="text-lg leading-relaxed text-left">
        My development philosophy embraces continuous learning and adaptation. I value collaborative environments where ideas are shared openly, and feedback is welcomed. I'm committed to writing clean, well-documented code and leveraging best practices to create sustainable solutions.
      </p>
    </>
  ),
  interests: (
    <>
      <p className="mb-6 text-lg leading-relaxed text-left">
        When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I'm constantly seeking opportunities to grow and collaborate on innovative projects that push the boundaries of what's possible.
      </p>
      <p className="text-lg leading-relaxed text-left">
        Beyond tech, I enjoy photography, hiking in nature, and discovering new music. These diverse interests feed my creativity and problem-solving approach, bringing fresh perspectives to my development work. I believe in maintaining a healthy work-life balance to fuel sustainable innovation.
      </p>
    </>
  )
}

const About = () => {
  const [activeTab, setActiveTab] = useState("about")

  return (
    <Section id="about" crosses>
      <div className="container flex flex-col items-center justify-center">
        <div className="relative z-1 w-full flex flex-col items-center">
          <ScrollReveal>
            <h2 className="h2 mb-6 text-center">About Me</h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="mb-10 flex flex-wrap justify-center gap-4">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                    activeTab === tab.id 
                      ? "bg-color-1 text-n-8 shadow-[0_0_15px_rgba(102,51,187,0.5)]" 
                      : "bg-n-7 text-n-1/80 hover:bg-n-6"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
          
          <div className="relative overflow-hidden rounded-2xl border border-n-6 bg-n-8/50 p-6 backdrop-blur-sm md:p-10">
            <div className="absolute top-0 left-0 -z-10 h-full w-full">
              <div className="absolute inset-0 bg-n-8/75" />
            </div>
            
            <ScrollReveal delay={0.2}>
              <div className="mx-auto max-w-[50rem]">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-n-3"
                >
                  {tabContent[activeTab as keyof typeof tabContent]}
                </motion.div>
                
                <motion.div
                  className="mt-10 flex flex-wrap justify-center gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-lg bg-color-1 px-6 py-3 text-sm font-medium text-n-8 transition-all hover:bg-color-1/90"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(102,51,187,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get in Touch
                  </motion.a>
                  <motion.a
                    href="/assets/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-n-6 bg-n-7 px-6 py-3 text-sm font-medium text-n-1 transition-all hover:bg-n-6"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Resume
                  </motion.a>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <Gradient />
      </div>
    </Section>
  )
}

export default About 