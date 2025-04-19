"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePortfolio } from "@/app/context/PortfolioContext"

interface KonamiSequence {
  sequence: string[]
  currentIndex: number
}

const EasterEgg = () => {
  const { achievements, achievementUnlocked, unlockAchievement } = usePortfolio()
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [konamiState, setKonamiState] = useState<KonamiSequence>({
    sequence: ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"],
    currentIndex: 0
  })
  
  useEffect(() => {
    // Check if the easter egg has already been found
    if (achievementUnlocked("easter_egg")) {
      return
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const expectedKey = konamiState.sequence[konamiState.currentIndex]
      
      if (e.key === expectedKey) {
        // Progress in the sequence
        if (konamiState.currentIndex === konamiState.sequence.length - 1) {
          // Complete sequence - unlock the Easter egg
          triggerEasterEgg()
        } else {
          // Move to next key in sequence
          setKonamiState(prev => ({
            ...prev,
            currentIndex: prev.currentIndex + 1
          }))
        }
      } else {
        // Reset if incorrect key pressed
        setKonamiState(prev => ({
          ...prev,
          currentIndex: 0
        }))
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [konamiState, achievementUnlocked])
  
  const triggerEasterEgg = () => {
    // Show the Easter egg animation
    setShowEasterEgg(true)
    
    // Unlock the achievement
    unlockAchievement("easter_egg")
    
    // Hide after animation completes
    setTimeout(() => {
      setShowEasterEgg(false)
    }, 5000)
  }
  
  return (
    <AnimatePresence>
      {showEasterEgg && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-n-8/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative bg-gradient-to-r from-purple-900 to-blue-900 p-10 rounded-xl max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: [0, 2, -2, 0],
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              duration: 0.5,
              rotate: {
                repeat: 5,
                duration: 0.3
              }
            }}
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
              <motion.div
                className="text-6xl"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                🎮
              </motion.div>
            </div>
            
            <motion.h3
              className="text-2xl font-bold text-white mb-4 text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Konami Code Discovered!
            </motion.h3>
            
            <motion.p
              className="text-center text-purple-200 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              You've unlocked the hidden Easter egg achievement. Well done, gamer!
            </motion.p>
            
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg inline-block">
                <code className="text-sm text-blue-200">
                  ↑ ↑ ↓ ↓ ← → ← → B A
                </code>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EasterEgg 