"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface ParallaxBackgroundProps {
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  opacity?: number
  blur?: number
  imageSrc?: string
  children?: React.ReactNode
  className?: string
}

const ParallaxBackground = ({
  speed = 0.5,
  direction = "up",
  opacity = 0.3,
  blur = 4,
  imageSrc = "/img/grid.svg", // Default image
  children,
  className,
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)

  // Set initial values on client side
  useEffect(() => {
    if (!ref.current) return
    
    const setValues = () => {
      const element = ref.current
      if (element) {
        const rect = element.getBoundingClientRect()
        setElementTop(rect.top + window.scrollY)
        setClientHeight(window.innerHeight)
        setWindowHeight(window.innerHeight)
      }
    }
    
    // Set values immediately and on resize
    setValues()
    window.addEventListener("resize", setValues)
    
    return () => window.removeEventListener("resize", setValues)
  }, [ref])
  
  // Check if element is in view
  useEffect(() => {
    if (!ref.current) return
    
    const checkIfInView = () => {
      if (!ref.current) return
      const scrollY = window.scrollY
      const elementHeight = ref.current.offsetHeight
      
      if (scrollY + windowHeight >= elementTop && scrollY <= elementTop + elementHeight) {
        setIsInView(true)
      } else {
        setIsInView(false)
      }
    }
    
    window.addEventListener("scroll", checkIfInView)
    checkIfInView() // Check initially
    
    return () => window.removeEventListener("scroll", checkIfInView)
  }, [elementTop, windowHeight])
  
  // Calculate parallax values
  const { scrollY } = useScroll()
  
  // Create transforms for each direction
  const getTransforms = () => {
    if (direction === "up") {
      return { 
        y: useTransform(scrollY, [elementTop - clientHeight, elementTop + clientHeight], [100 * speed, -100 * speed]) 
      }
    }
    if (direction === "down") {
      return { 
        y: useTransform(scrollY, [elementTop - clientHeight, elementTop + clientHeight], [-100 * speed, 100 * speed]) 
      }
    }
    if (direction === "left") {
      return { 
        x: useTransform(scrollY, [elementTop - clientHeight, elementTop + clientHeight], [100 * speed, -100 * speed]) 
      }
    }
    if (direction === "right") {
      return { 
        x: useTransform(scrollY, [elementTop - clientHeight, elementTop + clientHeight], [-100 * speed, 100 * speed]) 
      }
    }
    return {}
  }

  const transforms = getTransforms()

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden ${className || ""}`}
      style={{ zIndex: 0 }}
    >
      {isInView && (
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          style={{ 
            filter: `blur(${blur}px)`,
            ...transforms
          }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            quality={90}
            className="object-cover"
          />
        </motion.div>
      )}
      {children}
    </div>
  )
}

export default ParallaxBackground 