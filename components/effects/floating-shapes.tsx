"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingShapeProps {
  variant?: "circle" | "square" | "triangle" | "hexagon"
  size?: "sm" | "md" | "lg"
  color?: "purple" | "blue" | "pink"
  top?: string
  left?: string
  right?: string
  bottom?: string
  duration?: number
  delay?: number
  blur?: boolean
  opacity?: number
  rotate?: boolean
}

const FloatingShape = ({
  variant = "circle",
  size = "md",
  color = "purple",
  top,
  left,
  right,
  bottom,
  duration = 10,
  delay = 0,
  blur = false,
  opacity = 0.5,
  rotate = true,
}: FloatingShapeProps) => {
  // Size mapping
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-24 h-24",
  }

  // Color mapping
  const colorMap = {
    purple: "bg-[rgba(102,51,187,0.3)] border-[rgba(128,81,204,0.4)]",
    blue: "bg-[rgba(61,90,254,0.3)] border-[rgba(100,130,255,0.4)]",
    pink: "bg-[rgba(234,51,187,0.3)] border-[rgba(244,91,207,0.4)]",
  }

  // Shape specific classes
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-md",
    triangle: "clip-path-triangle",
    hexagon: "clip-path-hexagon",
  }

  return (
    <motion.div
      className={cn(
        "absolute z-10 pointer-events-none mix-blend-screen backdrop-blur-sm",
        "border",
        sizeMap[size],
        colorMap[color],
        shapeClasses[variant],
        blur && "backdrop-blur-lg",
      )}
      style={{
        top,
        left,
        right,
        bottom,
        opacity,
      }}
      animate={{
        y: ["0%", "30%", "0%"],
        x: ['0%', '-20%', '10%', '0%'],
        rotate: rotate ? [0, 360] : 0,
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
        repeatType: "reverse",
      }}
    />
  )
}

const FloatingShapes = () => {
  return (
    <>
      {/* Top left area */}
      <FloatingShape 
        variant="circle" 
        size="md" 
        color="purple" 
        top="15%" 
        left="10%" 
        duration={15} 
      />
      <FloatingShape 
        variant="square" 
        size="sm" 
        color="blue" 
        top="25%" 
        left="20%" 
        duration={20} 
        delay={1.5} 
      />
      
      {/* Top right area */}
      <FloatingShape 
        variant="hexagon" 
        size="lg" 
        color="pink" 
        top="18%" 
        right="15%" 
        duration={25} 
        opacity={0.3} 
        blur 
      />
      
      {/* Middle area */}
      <FloatingShape 
        variant="triangle" 
        size="sm" 
        color="blue" 
        top="45%" 
        left="25%" 
        duration={18} 
        delay={2} 
      />
      <FloatingShape 
        variant="circle" 
        size="lg" 
        color="purple" 
        top="55%" 
        right="10%" 
        duration={22} 
        delay={1} 
        opacity={0.3} 
      />
      
      {/* Bottom area */}
      <FloatingShape 
        variant="square" 
        size="md" 
        color="pink" 
        bottom="15%" 
        left="15%" 
        duration={20} 
        delay={3} 
        rotate={false} 
      />
      <FloatingShape 
        variant="circle" 
        size="sm" 
        color="blue" 
        bottom="25%" 
        right="25%" 
        duration={15} 
        delay={2.5} 
      />
    </>
  )
}

export default FloatingShapes 