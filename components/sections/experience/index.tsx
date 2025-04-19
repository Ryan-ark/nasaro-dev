"use client"

import React from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"

const experienceData = [
  {
    title: "Senior Full Stack Developer",
    company: "TechSphere Solutions",
    period: "2021 - Present",
    responsibilities: [
      "Lead development of client projects using Next.js, React, and TypeScript, resulting in 30% faster load times",
      "Architected and implemented RESTful APIs with Laravel for enterprise clients, handling 500k+ daily requests",
      "Mentored junior developers in modern web development practices and code review processes",
      "Implemented CI/CD pipelines that reduced deployment time by 40% and improved code quality"
    ]
  },
  {
    title: "Mobile App Developer",
    company: "InnovateMobile",
    period: "2019 - 2021",
    responsibilities: [
      "Developed and deployed cross-platform mobile applications using React Native and Expo.dev",
      "Created native Android applications using Kotlin and Android Studio for clients with specific platform requirements",
      "Implemented push notification systems, offline-first functionality, and secure authentication flows",
      "Optimized app performance leading to 45% reduction in load times and improved user engagement metrics"
    ]
  },
  {
    title: "WordPress & CMS Specialist",
    company: "Digital Craft Agency",
    period: "2017 - 2019",
    responsibilities: [
      "Designed and developed custom WordPress themes and plugins for e-commerce and corporate clients",
      "Built WooCommerce online stores with custom product types, payment gateways, and shipping integrations",
      "Implemented advanced Elementor customizations and created reusable component libraries",
      "Optimized WordPress sites for performance and SEO, resulting in 35% increase in organic traffic"
    ]
  },
  {
    title: "Web Developer",
    company: "CreativeTech Studio",
    period: "2015 - 2017",
    responsibilities: [
      "Developed responsive websites and web applications using modern JavaScript frameworks",
      "Built custom themes and plugins for content management systems including WordPress and Drupal",
      "Collaborated with design team to implement pixel-perfect UI/UX from mockups",
      "Maintained and optimized existing client websites across various hosting environments"
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
            My professional journey across web, mobile, and CMS development
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