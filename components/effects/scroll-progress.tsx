"use client"

import React from "react"
import { motion } from "framer-motion"
import { usePortfolio } from "@/app/context/PortfolioContext"
import { cn } from "@/lib/utils"

interface ScrollProgressProps {
  position?: "top" | "left" | "right" | "bottom"
  thickness?: number
  color?: string
  showPercentage?: boolean
  className?: string
}

const ScrollProgress = ({
  position = "top",
  thickness = 4,
  color = "rgb(102, 51, 187)",
  showPercentage = true,
  className,
}: ScrollProgressProps) => {
  const { progress } = usePortfolio()

  // Get styles based on position
  const getPositionStyles = () => {
    const isHorizontal = position === "top" || position === "bottom"
    const positionStyles = {
      top: position === "top" ? 0 : "auto",
      bottom: position === "bottom" ? 0 : "auto",
      left: position === "left" ? 0 : "auto",
      right: position === "right" ? 0 : "auto",
      width: isHorizontal ? "100%" : `${thickness}px`,
      height: isHorizontal ? `${thickness}px` : "100%",
    }

    const progressStyles = {
      width: isHorizontal ? `${progress}%` : "100%",
      height: isHorizontal ? "100%" : `${progress}%`,
      transformOrigin: position === "bottom" ? "bottom" : position === "right" ? "right" : "top left",
    }

    return { positionStyles, progressStyles }
  }

  const { positionStyles, progressStyles } = getPositionStyles()

  // Calculate position for percentage text
  const getPercentagePosition = () => {
    if (position === "top") return { top: `${thickness + 4}px`, right: "20px" }
    if (position === "bottom") return { bottom: `${thickness + 4}px`, right: "20px" }
    if (position === "left") return { left: `${thickness + 4}px`, top: "20px" }
    return { right: `${thickness + 4}px`, top: "20px" }
  }

  return (
    <div
      className={cn("fixed z-50", className)}
      style={{
        ...positionStyles,
        pointerEvents: "none",
      }}
    >
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-blue-500"
        style={{
          ...progressStyles,
          background: color,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {showPercentage && (
        <motion.div
          className="fixed bg-n-8/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium z-60 border border-n-6"
          style={{
            ...getPercentagePosition(),
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </div>
  )
}

export default ScrollProgress 