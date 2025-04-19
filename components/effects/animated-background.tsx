"use client"

import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to window size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = `rgba(${Math.floor(Math.random() * 70) + 25}, ${Math.floor(Math.random() * 50) + 20}, ${Math.floor(Math.random() * 150) + 100}, `
        this.alpha = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color + this.alpha + ")"
        ctx.fill()
      }
    }

    // Generate particles
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth * 0.04), 100)
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Create gradient spots
    const gradientSpots = [
      { x: canvas.width * 0.2, y: canvas.height * 0.2, radius: canvas.width * 0.2, color: "rgba(60, 4, 115, 0.15)" },
      { x: canvas.width * 0.8, y: canvas.height * 0.3, radius: canvas.width * 0.15, color: "rgba(76, 20, 160, 0.15)" },
      { x: canvas.width * 0.5, y: canvas.height * 0.8, radius: canvas.width * 0.25, color: "rgba(102, 51, 187, 0.1)" }
    ]

    // Animation loop
    let animationFrameId: number
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw gradient spots
      gradientSpots.forEach(spot => {
        const gradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.radius)
        gradient.addColorStop(0, spot.color)
        gradient.addColorStop(1, "rgba(10, 10, 20, 0)")
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      // Connect nearby particles with lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(150, 150, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.2
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef}
      className={cn(
        "fixed inset-0 -z-10 opacity-80",
        "pointer-events-none select-none"
      )}
    />
  )
}

export default AnimatedBackground 