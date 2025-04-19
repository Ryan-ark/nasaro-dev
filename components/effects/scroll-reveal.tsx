"use client"

import React, { useRef, useEffect, useState, ReactNode } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  width?: "fit-content" | "100%"
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  className?: string
}

const ScrollReveal = ({
  children,
  width = "fit-content",
  delay = 0,
  direction = "up",
  duration = 0.5,
  className = "",
}: ScrollRevealProps) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Define the different animation variants based on direction
  const getVariants = () => {
    const distance = 50
    
    const variants = {
      hidden: {
        opacity: 0,
        y: direction === "up" ? distance : direction === "down" ? -distance : 0,
        x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    }
    
    // No animation on server-side
    if (!isClient) {
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    }
    
    return variants
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      style={{ width }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal 