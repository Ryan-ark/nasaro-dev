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
    { id: "codefest", title: "Codefest Champion", description: "3-Time Champion in Codefest at STI College Surigao", unlocked: true },
    { id: "edp_specialist", title: "EDP Specialist", description: "Achieved 95.57% rating in DICT Electronic Data Processing Specialist Eligibility Examination", unlocked: true },
    { id: "visit_all", title: "Explorer", description: "Visit all sections of this portfolio", unlocked: false },
    { id: "interact_10", title: "Curious Mind", description: "Interact 10+ times with the portfolio", unlocked: false },
    { id: "easter_egg", title: "Detective", description: "Find the hidden easter egg", unlocked: false },
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
  }, [achievements, unlockAchievement])

  // Check for "visit_all" achievement
  useEffect(() => {
    const visitAllAchievement = achievements.find(a => a.id === "visit_all")
    if (visitAllAchievement && !visitAllAchievement.unlocked) {
      const requiredSections = ["hero", "about", "education", "skills", "projects", "experience", "contact"]
      if (requiredSections.every(section => sectionsVisited.includes(section))) {
        unlockAchievement("visit_all")
      }
    }
  }, [sectionsVisited, achievements, unlockAchievement])

  // Check for "interact_10" achievement
  useEffect(() => {
    const interactAchievement = achievements.find(a => a.id === "interact_10")
    if (interactAchievement && !interactAchievement.unlocked && interactionsCount >= 10) {
      unlockAchievement("interact_10")
    }
  }, [interactionsCount, achievements, unlockAchievement])

  // Check for "easter_egg" achievement
  useEffect(() => {
    const easterEggAchievement = achievements.find(a => a.id === "easter_egg")
    if (easterEggAchievement && !easterEggAchievement.unlocked && sectionsVisited.includes("easter_egg")) {
      unlockAchievement("easter_egg")
    }
  }, [sectionsVisited, achievements, unlockAchievement])

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