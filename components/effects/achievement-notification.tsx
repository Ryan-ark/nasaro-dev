"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolio } from "@/app/context/PortfolioContext"

interface AchievementNotificationProps {
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left"
}

const AchievementNotification = ({
  position = "bottom-right",
}: AchievementNotificationProps) => {
  const { achievements } = usePortfolio()
  const [shownAchievements, setShownAchievements] = useState<string[]>([])
  const [currentAchievement, setCurrentAchievement] = useState<{
    id: string
    title: string
    description: string
  } | null>(null)

  // Position styles
  const positionClasses = {
    "top-right": "top-4 right-4",
    "bottom-right": "bottom-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-left": "bottom-4 left-4",
  }

  // Check for newly unlocked achievements
  useEffect(() => {
    const unlockedAchievements = achievements.filter(
      (achievement) => achievement.unlocked && !shownAchievements.includes(achievement.id)
    )

    if (unlockedAchievements.length > 0) {
      const nextAchievement = unlockedAchievements[0]
      setCurrentAchievement({
        id: nextAchievement.id,
        title: nextAchievement.title,
        description: nextAchievement.description,
      })
      
      // Add to shown achievements after showing
      setTimeout(() => {
        setShownAchievements((prev) => [...prev, nextAchievement.id])
        setCurrentAchievement(null)
      }, 5000)
    }
  }, [achievements, shownAchievements])

  return (
    <AnimatePresence>
      {currentAchievement && (
        <motion.div
          className={`fixed z-50 ${positionClasses[position]}`}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="flex items-center gap-4 bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-md p-4 rounded-xl border border-purple-500/30 shadow-xl max-w-xs">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L12 8L16 10M16 10L20 12V20L16 20M16 10V20M16 20L12 18L8 20"></path>
              </svg>
            </div>
            <div>
              <motion.h4 
                className="text-white font-bold mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Achievement Unlocked! 🎉
              </motion.h4>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-purple-200 font-medium mb-0.5">
                  {currentAchievement.title}
                </p>
                <p className="text-blue-200 text-xs">
                  {currentAchievement.description}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AchievementNotification 