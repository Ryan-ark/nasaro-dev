"use client"

import React from "react"
import Section from "../../layout/section"
import { motion } from "framer-motion"
import { usePortfolio } from "@/app/context/PortfolioContext"
import ScrollReveal from "../../effects/scroll-reveal"
import TiltCard from "../../effects/tilt-card"
import { cn } from "@/lib/utils"

const AchievementCard = ({
  title,
  description,
  unlocked,
  index,
}: {
  title: string
  description: string
  unlocked: boolean
  index: number
}) => {
  return (
    <ScrollReveal delay={0.1 * index}>
      <TiltCard
        className={cn(
          "h-full rounded-2xl border p-6 transition-all duration-500",
          unlocked
            ? "border-purple-500/50 bg-gradient-to-b from-purple-900/30 to-n-8"
            : "border-n-6 bg-n-8/80 opacity-70"
        )}
        tiltAmount={5}
        glareOpacity={0.1}
      >
        <div className={cn("relative z-10")}>
          <div className="mb-4 flex justify-between items-center">
            <motion.div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full",
                unlocked
                  ? "bg-gradient-to-r from-purple-500 to-blue-500"
                  : "bg-n-7"
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
            >
              {unlocked ? (
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
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
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
                  className="text-n-3"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              )}
            </motion.div>
            {unlocked && (
              <motion.div 
                className="text-xs font-medium px-3 py-1 rounded-full bg-purple-500/20 text-purple-300"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                Unlocked!
              </motion.div>
            )}
          </div>
          
          <motion.h3
            className={cn(
              "mb-2 text-lg font-bold",
              unlocked ? "text-white" : "text-n-3"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {title}
          </motion.h3>
          
          <motion.p
            className={cn(
              "text-sm",
              unlocked ? "text-n-2" : "text-n-4"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            {description}
          </motion.p>
        </div>
      </TiltCard>
    </ScrollReveal>
  )
}

const Achievements = () => {
  const { achievements } = usePortfolio()
  
  return (
    <Section id="achievements" crosses>
      <div className="container">
        <div className="relative z-1">
          <ScrollReveal>
            <h2 className="h2 mb-6 text-center">Achievements</h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="body-1 mb-12 text-center text-n-3">
              Recognition and accomplishments in my development journey
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                unlocked={achievement.unlocked}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Achievements 