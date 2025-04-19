"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { usePortfolio } from "@/app/context/PortfolioContext"

interface CursorEffectProps {
  color?: string
  size?: number
  trailEffect?: boolean
}

const CursorEffect = ({
  color = "rgb(102, 51, 187)",
  size = 20,
  trailEffect = true,
}: CursorEffectProps) => {
  // Try to use the context, but handle case where it's not available
  let incrementInteractions: () => void;
  try {
    const { incrementInteractions: contextIncrement } = usePortfolio();
    incrementInteractions = contextIncrement;
  } catch (error) {
    // Fallback for when context is not available
    incrementInteractions = () => {}; 
  }

  const [isPointer, setIsPointer] = useState(false)
  const [clickEffect, setClickEffect] = useState(false)
  const [trailElements, setTrailElements] = useState<{ x: number; y: number; id: string }[]>([])
  
  // Use useRef for cursor position to avoid re-renders
  const cursorPositionRef = useRef({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  
  // Use a ref to keep track of unique IDs
  const idCounterRef = useRef(0)
  
  // Handle mouse movement with throttling to prevent too many updates
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    
    const handleMouseMove = (e: MouseEvent) => {
      // Update the ref immediately (doesn't trigger re-render)
      cursorPositionRef.current = { x: e.clientX, y: e.clientY }
      
      // Only update state (and cause re-render) after a small delay
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          setCursorPosition(cursorPositionRef.current)
          timeoutId = null
        }, 10) // Small throttle to prevent excessive updates
      }
      
      // Check if cursor is over a clickable element
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY)
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement)
        setIsPointer(computedStyle.cursor === 'pointer')
      }
    }
    
    // Only add event listener on client side
    if (typeof window !== 'undefined') {
      window.addEventListener("mousemove", handleMouseMove)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        if (timeoutId) clearTimeout(timeoutId)
      }
    }
  }, []) // Empty dependency array - only run on mount/unmount
  
  // Handle click effect
  useEffect(() => {
    const handleClick = () => {
      incrementInteractions()
      setClickEffect(true)
      setTimeout(() => setClickEffect(false), 500)
    }
    
    // Only add event listener on client side
    if (typeof window !== 'undefined') {
      window.addEventListener("click", handleClick)
      return () => window.removeEventListener("click", handleClick)
    }
  }, [incrementInteractions])
  
  // Create trail effect with throttling
  useEffect(() => {
    if (!trailEffect || typeof window === 'undefined') return
    
    const intervalId = setInterval(() => {
      const { x, y } = cursorPositionRef.current
      if (x === 0 && y === 0) return // Skip initial position
      
      setTrailElements(prev => {
        // Add new position to the start of the array with a guaranteed unique ID
        idCounterRef.current += 1
        const newElement = { 
          x, 
          y, 
          id: `${Date.now()}-${idCounterRef.current}` 
        }
        const newArray = [newElement, ...prev.slice(0, 5)] // Keep only 6 elements
        return newArray
      })
    }, 100) // Add a new trail element every 100ms
    
    return () => clearInterval(intervalId)
  }, [trailEffect]) // Only re-run if trailEffect changes
  
  // Hide cursor on touch devices or during SSR
  const [isClientSide, setIsClientSide] = useState(false)
  useEffect(() => {
    setIsClientSide(true)
  }, [])
  
  if (!isClientSide) {
    return null // Don't render during SSR
  }
  
  // Don't render on touch devices
  if (typeof navigator !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null
  }
  
  return (
    <>
      {/* Trail elements */}
      {trailEffect && trailElements.map((element, index) => (
        <motion.div
          key={element.id}
          className="fixed pointer-events-none"
          initial={{ opacity: 0.8 - index * 0.15 }}
          animate={{
            opacity: 0,
            scale: 0.5,
          }}
          transition={{ duration: 0.5 }}
          style={{
            left: element.x,
            top: element.y,
            width: size * 0.8,
            height: size * 0.8,
            backgroundColor: color,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9998,
          }}
        />
      ))}
      
      {/* Main cursor element */}
      <motion.div
        className="fixed pointer-events-none mix-blend-difference"
        animate={{
          x: cursorPosition.x,
          y: cursorPosition.y,
          scale: clickEffect ? 0.5 : isPointer ? 1.5 : 1,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          duration: 0.05,
        }}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color,
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
      />
      
      {/* Click ripple effect */}
      {clickEffect && (
        <motion.div
          className="fixed pointer-events-none"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 3 }}
          transition={{ duration: 0.5 }}
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            width: size,
            height: size,
            border: `2px solid ${color}`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9997,
          }}
        />
      )}
    </>
  )
}

export default CursorEffect