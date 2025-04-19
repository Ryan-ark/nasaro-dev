"use client"

import React from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { FiAward } from "react-icons/fi"
import ScrollReveal from "../../effects/scroll-reveal"

// Development message
const developmentMessage = {
  title: "Certificates Coming Soon",
  description: "I'm currently organizing my certifications and qualifications. This section will be updated soon with detailed information about my professional training and achievements.",
  statusText: "In Development"
}

// Placeholder certificates data
const certificatesData = [
  {
    title: "Codefest Champion",
    issuer: "STI College Surigao",
    date: "2023",
    description: "3-Time Champion in Codefest, showcasing exceptional programming and problem-solving skills.",
    status: "In Development",
    logoUrl: "/assets/certificates/award.svg"
  },
  {
    title: "EDP Specialist",
    issuer: "DICT Caraga",
    date: "2022",
    description: "Achieved 95.57% rating in the DICT Electronic Data Processing Specialist Eligibility Examination.",
    status: "In Development",
    logoUrl: "/assets/certificates/cert.svg"
  },
  {
    title: "Information Technology Training",
    issuer: "STI College",
    date: "2021",
    description: "Various specialized training in web development, programming, and software engineering.",
    status: "In Development",
    logoUrl: "/assets/certificates/education.svg"
  },
  {
    title: "WordPress Development",
    issuer: "Online Course",
    date: "2020",
    description: "Comprehensive training in WordPress theme development, plugin creation, and site customization.",
    status: "In Development",
    logoUrl: "/assets/certificates/wordpress.svg"
  }
]

const Certificates = () => {
  return (
    <Section id="certificates" crosses>
      <div className="container flex flex-col items-center justify-center">
        <div className="relative z-1 w-full flex flex-col items-center">
          <ScrollReveal>
            <h2 className="h2 mb-6 text-center">Certificates & Qualifications</h2>
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
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full">
            {certificatesData.map((cert, index) => (
              <ScrollReveal key={index} delay={0.1 * index} direction={index % 2 === 0 ? "left" : "right"}>
                <div 
                  className="rounded-2xl border border-n-6 bg-n-8 p-6 transition-all duration-300 hover:border-n-5/50"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-n-7">
                      <FiAward className="w-6 h-6 text-color-1/80" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="h5 mb-1">{cert.title}</h3>
                      <div className="flex flex-wrap items-center text-sm text-n-3">
                        <span>{cert.issuer}</span>
                        <span className="mx-2">•</span>
                        <span>{cert.date}</span>
                      </div>
                    </div>
                    <div className="rounded-full bg-color-1/20 px-3 py-1 text-xs font-medium text-white">
                      {cert.status}
                    </div>
                  </div>
                  <p className="text-n-3">{cert.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Certificates 