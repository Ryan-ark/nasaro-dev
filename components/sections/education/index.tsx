"use client"

import React from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"
import Image from "next/image"

const educationData = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    period: "2012 - 2016",
    description: "Specialized in Software Engineering with focus on web and mobile development. Graduated with honors.",
    logoUrl: "/assets/education/university.svg"
  },
  {
    degree: "Advanced Diploma in Web Development",
    institution: "Digital Academy",
    period: "2011 - 2012",
    description: "Intensive program covering front-end and back-end technologies, responsive design, and modern frameworks.",
    logoUrl: "/assets/education/academy.svg"
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
              <div 
                key={index}
                className={cn(
                  "relative mb-12 rounded-3xl border border-n-6 bg-n-8 p-8 md:p-10",
                  "before:absolute before:inset-0 before:left-0 before:top-0 before:h-px before:w-full before:bg-gradient-to-r before:from-transparent before:via-n-3 before:to-transparent before:opacity-20",
                  index === educationData.length - 1 ? "" : "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-gradient-to-r after:from-transparent after:via-n-3 after:to-transparent after:opacity-20"
                )}
              >
                <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                  <div className="flex-shrink-0">
                    <div className="flex size-16 items-center justify-center rounded-full bg-n-7">
                      <Image
                        src={edu.logoUrl}
                        width={32}
                        height={32}
                        alt={edu.institution}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <h3 className="h4 text-n-1">{edu.degree}</h3>
                      <div className="rounded-full bg-n-6 px-4 py-1 text-center text-sm font-medium text-n-1">
                        {edu.period}
                      </div>
                    </div>
                    <p className="mb-4 font-medium text-n-2">{edu.institution}</p>
                    <p className="text-n-3">{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Education 