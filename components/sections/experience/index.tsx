"use client"

import React from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"

const experienceData = [
  {
    title: "Junior Software Developer",
    company: "Arkdesign B.V.",
    period: "2024 - PRESENT",
    responsibilities: [
      "Develop and maintain software applications to meet company requirements",
      "Collaborate with cross-functional teams to design, test, and deploy new features",
      "Troubleshoot and debug issues to improve application performance and reliability"
    ]
  },
  {
    title: "Web Developer",
    company: "Arkdesign B.V.",
    period: "2023 - 2024",
    responsibilities: [
      "Designed, developed, and maintained responsive websites and web applications",
      "Optimized website performance and implemented best practices for user experience",
      "Collaborated with designers and backend developers to ensure seamless functionality"
    ]
  },
  {
    title: "Computer Laboratory Assistant",
    company: "STI College Surigao",
    period: "2022 - 2023",
    responsibilities: [
      "Assisted students and faculty with technical support in the computer laboratory",
      "Maintained and troubleshot computer hardware, software, and network issues",
      "Provided technical assistance and guidance to students during practical sessions"
    ]
  }
]

const Experience = () => {
  return (
    <Section id="experience" crosses>
      <div className="container">
        <div className="relative z-1">
          <h2 className="h2 mb-6 text-center">Work Experience</h2>
          <p className="body-1 mb-12 text-center text-n-3">
            My professional journey in software and web development
          </p>
          
          <div className="mx-auto max-w-4xl">
            {experienceData.map((job, index) => (
              <div 
                key={index}
                className={cn(
                  "relative mb-12 rounded-3xl border border-n-6 bg-n-8 p-8 md:p-10",
                  "before:absolute before:inset-0 before:left-0 before:top-0 before:h-px before:w-full before:bg-gradient-to-r before:from-transparent before:via-n-3 before:to-transparent before:opacity-20",
                  index === experienceData.length - 1 ? "" : "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-gradient-to-r after:from-transparent after:via-n-3 after:to-transparent after:opacity-20"
                )}
              >
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="h4 mb-1 text-n-1">{job.title}</h3>
                    <p className="text-n-3">{job.company}</p>
                  </div>
                  <div className="rounded-full bg-n-6 px-4 py-1 text-center text-sm font-medium text-n-1">
                    {job.period}
                  </div>
                </div>
                
                <ul className="list-disc pl-6 text-n-3">
                  {job.responsibilities.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Experience 