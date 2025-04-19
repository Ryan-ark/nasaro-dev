"use client"

import React from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"
import Image from "next/image"
import ScrollReveal from "../../effects/scroll-reveal"

const educationData = [
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "STI COLLEGE SURIGAO",
    period: "2021 - 2025",
    description: "Currently pursuing a Bachelor's degree in Information Technology with recognition as a Dean Lister, expected to graduate as Magna Cum Laude.",
    logoUrl: "/assets/education/university.svg",
    shortLogo: "STI"
  },
  {
    degree: "Information and Communication Technology",
    institution: "STI COLLEGE SURIGAO",
    period: "2019 - 2021",
    description: "Completed with High Honors, focusing on fundamentals of information and communication technology.",
    logoUrl: "/assets/education/academy.svg",
    shortLogo: "STI"
  }
]

const Education = () => {
  return (
    <Section id="education" crosses>
      <div className="container">
        <div className="relative z-1">
          <h2 className="h2 mb-6 text-center">Education</h2>
          <p className="body-1 mb-12 text-center text-n-3">
            My academic journey and educational background
          </p>
          
          <div className="mx-auto max-w-4xl">
            {educationData.map((edu, index) => (
              <ScrollReveal key={index} delay={0.1 * index} direction={index % 2 === 0 ? "left" : "right"}>
                <div 
                  className={cn(
                    "relative mb-12 rounded-3xl border border-n-6 bg-n-8 overflow-hidden",
                    "before:absolute before:inset-0 before:left-0 before:top-0 before:h-px before:w-full before:bg-gradient-to-r before:from-transparent before:via-n-3 before:to-transparent before:opacity-20",
                    index === educationData.length - 1 ? "" : "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-gradient-to-r after:from-transparent after:via-n-3 after:to-transparent after:opacity-20"
                  )}
                >
                  <div className="flex items-stretch">
                    {/* Left logo column */}
                    <div className="flex-shrink-0 w-16 md:w-24 flex flex-col items-center justify-center px-2 py-4 bg-n-7 text-center">
                      <div className="text-xs text-n-3 uppercase tracking-wider">{edu.shortLogo}</div>
                      <div className="text-xs text-n-3 uppercase tracking-wider">COL</div>
                      <div className="text-xs text-n-3 uppercase tracking-wider">SUR</div>
                    </div>
                    
                    {/* Main content */}
                    <div className="flex-grow p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <h3 className="h4 text-n-1">{edu.degree}</h3>
                        <div className="rounded-full bg-n-6 px-4 py-1 text-center text-sm font-medium text-n-1 whitespace-nowrap">
                          {edu.period}
                        </div>
                      </div>
                      
                      <p className="mb-4 font-medium text-n-2">{edu.institution}</p>
                      <p className="text-n-3">{edu.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Education 