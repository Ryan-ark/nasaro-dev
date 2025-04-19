"use client"

import React, { useEffect, useRef } from "react"
import { usePortfolio } from "@/app/context/PortfolioContext"

interface SectionTrackerProps {
  sectionId: string
  threshold?: number
  children: React.ReactNode
}

const SectionTracker = ({
  sectionId,
  threshold = 0.3,
  children,
}: SectionTrackerProps) => {
  const { addVisitedSection } = usePortfolio()
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!sectionRef.current) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            addVisitedSection(sectionId)
            observer.unobserve(entry.target) // Stop observing once visited
          }
        })
      },
      { threshold }
    )
    
    observer.observe(sectionRef.current)
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [sectionId, threshold, addVisitedSection])
  
  return <div ref={sectionRef}>{children}</div>
}

export default SectionTracker 