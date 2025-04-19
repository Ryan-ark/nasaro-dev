"use client"

import React, { useRef } from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { images, heroIcons } from "@/constants"
import Button from "../../atoms/button"
import { BackgroundCircles, BottomLine, Gradient } from "../../design/hero"
import { ScrollParallax } from "react-just-parallax"
import { motion, type HTMLMotionProps } from "framer-motion"
import FloatingShapes from "../../effects/floating-shapes"
import Notification from "./notification"
import ImageWithFallback from "../../ui/image-with-fallback"

// Declare the proper types for motion components
type MotionDivProps = HTMLMotionProps<"div">
type MotionSpanProps = HTMLMotionProps<"span">

const AnimatedText = ({ text }: { text: string }) => {
  const words = text.split(' ')
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }
  
  return (
    <div className="overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <div key={index} className="mr-2 inline-block">
            <motion.div
              variants={child}
            >
              {word}
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

type Props = {}

const Hero = (props: Props) => {
  const parallaxRef = useRef(null)
  return (
    <Section
      className={cn("pt-[12rem] -mt-[5.25rem]")}
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <FloatingShapes />
        
        <div className="relative z-1 mx-auto mb-16 max-w-[62rem] text-center md:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="h1 mb-6">
              Hi, I'm{" "}
              <span className="relative inline-block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Ryan Elico
                  <ImageWithFallback
                    src={images.curve}
                    className="absolute left-0 top-full w-full xl:-mt-2"
                    width={624}
                    height={28}
                    alt="curve"
                  />
                </motion.div>
              </span>
            </h1>
          </motion.div>
          
          <div className="mb-6 text-n-2 lg:mb-8">
            <AnimatedText text="Junior Software Developer and Web Developer specializing in WordPress development, responsive design, and user-friendly web solutions. I focus on creating scalable, accessible applications that deliver seamless user experiences." />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Button href="#contact" className="w-full">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                </motion.span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <Button href="#projects" white className="w-full">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </div>

        <div className={cn("relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24")}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div
              className={cn("relative z-1 rounded-2xl p-0.5 bg-conic-gradient")}
            >
              <div className={cn("relative bg-n-8 rounded-[1rem]")}>
                <div className={cn("h-[1.4rem] bg-n-10 rounded-t-[0.9rem]")} />
                <div
                  className={cn(
                    "aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]",
                  )}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ 
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 5
                    }}
                  >
                    <ImageWithFallback
                      src={images.robot}
                      width={1024}
                      height={490}
                      className="w-full object-cover"
                      alt="Ryan Elico - Junior Software Developer"
                    />
                  </motion.div>
                </div>
              </div>

              <Gradient />
            </div>
            <div className="absolute left-1/2 top-[-54%] w-[234%] -translate-x-1/2 md:top-[-46%] md:w-[138%] lg:top-[-104%]">
              <ImageWithFallback
                src={images.heroBackground}
                width={1440}
                height={1880}
                className="w-full animate-pulse-slow"
                alt="hero background"
              />
            </div>

            <BackgroundCircles parallaxRef={parallaxRef} />
          </motion.div>
        </div>

        <ScrollParallax isAbsolutelyPositioned>
          <div className="relative z-10 hidden lg:block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <CompanyLogos className="animate-float" />
            </motion.div>
          </div>
        </ScrollParallax>
      </div>
      <BottomLine />
    </Section>
  )
}

export default Hero

const CompanyLogos = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-wrap justify-center gap-4", className)}>
      <div className="flex items-center justify-center rounded-xl bg-n-7/50 px-6 py-3 backdrop-blur-sm">
        <span className="text-sm font-medium text-n-1/80">WordPress</span>
      </div>
      <div className="flex items-center justify-center rounded-xl bg-n-7/50 px-6 py-3 backdrop-blur-sm">
        <span className="text-sm font-medium text-n-1/80">Laravel</span>
      </div>
      <div className="flex items-center justify-center rounded-xl bg-n-7/50 px-6 py-3 backdrop-blur-sm">
        <span className="text-sm font-medium text-n-1/80">React</span>
      </div>
      <div className="flex items-center justify-center rounded-xl bg-n-7/50 px-6 py-3 backdrop-blur-sm">
        <span className="text-sm font-medium text-n-1/80">Vue.js</span>
      </div>
    </div>
  )
}
