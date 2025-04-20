"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"

interface PortfolioContextType {
  progress: number
  sectionsVisited: string[]
  interactionsCount: number
  cursorPosition: { x: number; y: number }
  addVisitedSection: (sectionId: string) => void
  incrementInteractions: () => void
  achievementUnlocked: (id: string) => boolean
  unlockAchievement: (id: string) => void
  achievements: { id: string; title: string; description: string; unlocked: boolean }[]
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState(0)
  const [sectionsVisited, setSectionsVisited] = useState<string[]>([])
  const [interactionsCount, setInteractionsCount] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [achievements, setAchievements] = useState([
    { id: "codefest", title: "Codefest Champion", description: "4-Times Champion in Codefest at STI College Surigao", unlocked: true },
    { id: "edp_specialist", title: "EDP Specialist", description: "Achieved 95.57% rating in DICT Electronic Data Processing Specialist Eligibility Examination", unlocked: true },
  ])

  // Memoize functions to prevent recreation on every render
  const achievementUnlocked = useCallback((id: string) => {
    return achievements.find(a => a.id === id)?.unlocked || false
  }, [achievements])

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === id ? { ...achievement, unlocked: true } : achievement
      )
    )
  }, [])

  const addVisitedSection = useCallback((sectionId: string) => {
    if (!sectionsVisited.includes(sectionId)) {
      setSectionsVisited(prev => [...prev, sectionId])
    }
  }, [sectionsVisited])

  const incrementInteractions = useCallback(() => {
    setInteractionsCount(prev => prev + 1)
  }, [])

  // Update cursor position with throttling to prevent excessive updates
  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          setCursorPosition({ x: e.clientX, y: e.clientY })
          throttleTimeout = null
        }, 10)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (throttleTimeout) clearTimeout(throttleTimeout)
    }
  }, [])

  // Track scroll position and calculate progress with throttling
  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout | null = null;
    
    const handleScroll = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          const scrollTop = window.scrollY
          const docHeight = document.body.offsetHeight
          const winHeight = window.innerHeight
          const scrollPercent = scrollTop / (docHeight - winHeight)
          setProgress(Math.min(scrollPercent * 100, 100))
          
          throttleTimeout = null
        }, 100)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (throttleTimeout) clearTimeout(throttleTimeout)
    }
  }, [])

  return (
    <PortfolioContext.Provider
      value={{
        progress,
        sectionsVisited,
        interactionsCount,
        cursorPosition,
        addVisitedSection,
        incrementInteractions,
        achievementUnlocked,
        unlockAchievement,
        achievements
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
} 