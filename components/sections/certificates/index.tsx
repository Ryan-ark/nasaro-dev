"use client"

import React from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"
import Image from "next/image"

const certificatesData = [
  {
    title: "Next.js Advanced Development",
    issuer: "Vercel",
    date: "2023",
    description: "Advanced course on server components, data fetching, and optimizing Next.js applications for production.",
    logoUrl: "/assets/certificates/nextjs.svg"
  },
  {
    title: "Laravel Expert Certification",
    issuer: "Laravel Academy",
    date: "2022",
    description: "Comprehensive certification covering Laravel best practices, advanced patterns, and enterprise application development.",
    logoUrl: "/assets/certificates/laravel.svg"
  },
  {
    title: "React Native & Expo Masterclass",
    issuer: "Mobile Dev Institute",
    date: "2021",
    description: "In-depth training on building cross-platform mobile applications using React Native and Expo toolkit.",
    logoUrl: "/assets/certificates/expo.svg"
  },
  {
    title: "WordPress Development Expert",
    issuer: "WordPress Professional Association",
    date: "2020",
    description: "Certification in custom WordPress theme development, plugin creation, and advanced site customization.",
    logoUrl: "/assets/certificates/wordpress.svg"
  }
]

const Certificates = () => {
  return (
    <Section id="certificates" crosses>
      <div className="container">
        <div className="relative z-1">
          <h2 className="h2 mb-6 text-center">Certificates & Qualifications</h2>
          <p className="body-1 mb-12 text-center text-n-3">
            Professional certifications and specialized training I've completed
          </p>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {certificatesData.map((cert, index) => (
              <div 
                key={index}
                className="rounded-2xl border border-n-6 bg-n-8 p-6 transition-all duration-300 hover:border-n-5/50"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-n-7">
                    <Image
                      src={cert.logoUrl}
                      width={24}
                      height={24}
                      alt={cert.issuer}
                    />
                  </div>
                  <div>
                    <h3 className="h5 mb-1">{cert.title}</h3>
                    <p className="flex items-center text-sm text-n-3">
                      <span>{cert.issuer}</span>
                      <span className="mx-2">•</span>
                      <span>{cert.date}</span>
                    </p>
                  </div>
                </div>
                <p className="text-n-3">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Certificates 