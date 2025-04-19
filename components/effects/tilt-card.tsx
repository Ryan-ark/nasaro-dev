"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltAmount?: number
  glareOpacity?: number
  perspective?: number
  scale?: number
  disabled?: boolean
  glareColor?: string
}

const TiltCard = ({
  children,
  className,
  tiltAmount = 10,
  glareOpacity = 0.2,
  perspective = 1000,
  scale = 1.02,
  disabled = false,
  glareColor = "rgba(255, 255, 255, 0.5)",
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current || !isMounted) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    
    // Calculate center point of the card
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calculate the mouse position relative to the center
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    // Convert to percentage (-1 to 1) and limit the tilt
    const tiltX = (mouseY / (rect.height / 2)) * tiltAmount
    const tiltY = -(mouseX / (rect.width / 2)) * tiltAmount
    
    // Calculate glare position (in percentage)
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100
    
    setTiltValues({ x: tiltX, y: tiltY })
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovering(true)
    }
  }

  const handleMouseLeave = () => {
    if (!disabled) {
      setIsHovering(false)
      setTiltValues({ x: 0, y: 0 })
      setGlarePosition({ x: 50, y: 50 })
    }
  }

  if (!isMounted) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: tiltValues.x,
        rotateY: tiltValues.y,
        scale: isHovering ? scale : 1,
      }}
      transition={{
        rotateX: { type: "spring", stiffness: 300, damping: 30 },
        rotateY: { type: "spring", stiffness: 300, damping: 30 },
        scale: { type: "spring", stiffness: 500, damping: 30 },
      }}
    >
      {children}
      
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor}, rgba(0,0,0,0))`,
          mixBlendMode: "overlay",
          opacity: isHovering ? glareOpacity : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

export default TiltCard 