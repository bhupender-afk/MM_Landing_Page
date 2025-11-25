'use client'

import { motion } from 'framer-motion'
import type { ContentStage } from './types'

export const contentStages: ContentStage[] = [
  {
    id: 'improve',
    title: 'IMPROVE',
    subtitle: 'Market Depth',
    description: 'Improving liquidity depth in the order books.',
    graphState: 'before'
  },
  {
    id: 'lower',
    title: 'LOWER',
    subtitle: 'Spread Reduction',
    description: 'Lowering the spread between the bid & ask.',
    graphState: 'improving'
  },
  {
    id: 'faster',
    title: 'FASTER',
    subtitle: 'Execution Speed',
    description: 'Faster execution times for optimal trading.',
    graphState: 'improved'
  },
  {
    id: 'arbitrage',
    title: 'ARBITRAGE',
    subtitle: 'Cross-Market Opportunities',
    description: 'Arbitrage between pairs, exchanges and liquidity pools.',
    graphState: 'after'
  }
]

interface ContentStagesProps {
  currentStage: number
  stageProgress: number
}

export function ContentStages({ currentStage, stageProgress }: ContentStagesProps) {
  return (
    <div className="relative h-full flex flex-col justify-center px-12 lg:px-20">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent rounded-3xl blur-3xl" />
      {contentStages.map((stage, index) => {
        const isActive = index === currentStage
        const isPast = index < currentStage
        const isFuture = index > currentStage

        let opacity = 0
        let y = 20
        let scale = 0.95

        if (isActive) {
          opacity = 1
          y = 0
          scale = 1
        } else if (isPast) {
          opacity = Math.max(0, 0.2 - (currentStage - index) * 0.1)
          y = -30
          scale = 0.9
        } else if (isFuture && index === currentStage + 1) {
          opacity = Math.min(stageProgress * 0.7, 0.7)
          y = 30 - stageProgress * 20
          scale = 0.95 + stageProgress * 0.05
        }

        // Ensure first stage is always visible initially
        if (index === 0 && currentStage === 0) {
          opacity = 1
          y = 0
          scale = 1
        }

        return (
          <motion.div
            key={stage.id}
            className="absolute inset-0 flex flex-col justify-center"
            animate={{
              opacity,
              y,
              scale
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut'
            }}
            style={{
              pointerEvents: isActive ? 'auto' : 'none'
            }}
          >
            <div className="relative space-y-8">
              {/* Glass morphism background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl -m-8 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/5 rounded-3xl" />
              </div>

              <div className="relative z-10 p-8">
                <motion.h2
                  className="text-7xl lg:text-9xl font-black bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 40px rgba(16,185,129,0.3), 0 0 80px rgba(16,185,129,0.1)',
                    filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.2))'
                  }}
                  initial={{ opacity: 0, x: -40, scale: 0.9 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -40,
                    scale: isActive ? 1 : 0.9
                  }}
                  transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
                >
                  {stage.title}
                </motion.h2>

                <motion.h3
                  className="text-2xl lg:text-4xl font-semibold text-transparent bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 bg-clip-text"
                  style={{
                    textShadow: '0 0 20px rgba(16,185,129,0.4)',
                    filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.3))'
                  }}
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -30,
                    scale: isActive ? 1 : 0.95
                  }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
                >
                  {stage.subtitle}
                </motion.h3>

                <motion.p
                  className="text-xl lg:text-2xl text-gray-100 max-w-2xl font-medium leading-relaxed"
                  style={{
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}
                  initial={{ opacity: 0, x: -20, scale: 0.98 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -20,
                    scale: isActive ? 1 : 0.98
                  }}
                  transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
                >
                  {stage.description}
                </motion.p>

                {isActive && (
                  <motion.div
                    className="flex items-center gap-3 mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <div className="relative">
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
                      <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping opacity-40" />
                    </div>
                    <span className="text-sm text-emerald-300 uppercase tracking-wider font-semibold">
                      Live Optimization
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Modern progress indicator */}
      <div className="absolute bottom-12 left-8 flex gap-3">
        {contentStages.map((_, index) => (
          <motion.div
            key={index}
            className="relative h-1.5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10"
            initial={{ width: 24 }}
            animate={{
              width: index === currentStage ? 80 : 24,
              backgroundColor: index <= currentStage ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.1)'
            }}
            transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
          >
            {/* Progress fill */}
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{
                width: index < currentStage ? '100%' : index === currentStage ? `${stageProgress * 100}%` : '0%'
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Glow effect for active indicator */}
            {index === currentStage && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-sm opacity-60"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}