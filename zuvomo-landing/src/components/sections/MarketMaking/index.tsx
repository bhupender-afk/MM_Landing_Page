'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { OrderBookGraph } from './OrderBookGraph'
import { ContentStages, contentStages } from './ContentStages'
import type { MarketMakingProps } from './types'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function MarketMaking({ className = '' }: MarketMakingProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  // State management
  const [currentStage, setCurrentStage] = useState(0)
  const [stageProgress, setStageProgress] = useState(0)
  const [graphProgress, setGraphProgress] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure client-side only rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  // Combine refs properly
  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node as HTMLDivElement
    inViewRef(node)
  }, [inViewRef])


  // Initialize ScrollTrigger
  useEffect(() => {
    if (!isClient || !sectionRef.current || !containerRef.current) return

    // Clean up any existing ScrollTrigger
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill()
    }

    const totalStages = contentStages.length
    let hasInitialized = false

    // Create ScrollTrigger for this section
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      pin: containerRef.current,
      pinSpacing: false,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (!hasInitialized) {
          hasInitialized = true
          setIsInitialized(true)
        }

        const progress = Math.min(Math.max(self.progress, 0), 1)
        const stageIndex = Math.min(
          Math.floor(progress * totalStages),
          totalStages - 1
        )
        const stageLocalProgress = (progress * totalStages) % 1

        setCurrentStage(stageIndex)
        setStageProgress(stageLocalProgress)
        setGraphProgress(progress)

        console.log(`Progress: ${progress.toFixed(2)}, Stage: ${stageIndex}`)
      },
      onEnter: () => {
        console.log('Entering MarketMaking section')
        // Initialize instead of reset to avoid re-render loop
        setCurrentStage(0)
        setStageProgress(0)
        setGraphProgress(0)
      },
      onLeave: () => {
        console.log('Leaving MarketMaking section')
      },
      onEnterBack: () => {
        console.log('Entering back MarketMaking section')
        // Initialize instead of reset to avoid re-render loop
        setCurrentStage(0)
        setStageProgress(0)
        setGraphProgress(0)
      },
      onLeaveBack: () => {
        console.log('Leaving back MarketMaking section')
      }
    })

    // Refresh ScrollTrigger
    ScrollTrigger.refresh()

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
    }
  }, [isClient]) // Removed resetState and isInitialized from deps to prevent infinite loop

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Manual stage testing (for debugging)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '4') {
        const stage = parseInt(e.key) - 1
        console.log('Manual stage change to:', stage)
        setCurrentStage(stage)
        setStageProgress(0.5)
        setGraphProgress(stage / (contentStages.length - 1))
      }
      if (e.key === 'r' || e.key === 'R') {
        // Reset section
        setCurrentStage(0)
        setStageProgress(0)
        setGraphProgress(0)
        ScrollTrigger.refresh()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Show loading state during hydration
  if (!isClient) {
    return (
      <section className={`relative ${className} h-screen flex items-center justify-center bg-slate-900`}>
        <div className="text-white text-lg">Loading visualization...</div>
      </section>
    )
  }

  return (
    <section
      ref={setRefs}
      className={`relative ${className}`}
      style={{ height: '300vh' }} // Increased height for proper scroll distance
      suppressHydrationWarning={true}
    >
      <div
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
      >
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5" />

        {/* Static background pattern to avoid hydration issues */}
        <div className="absolute inset-0 overflow-hidden">
          {isClient && isInitialized && [...Array(15)].map((_, i) => {
            const staticLeft = (i * 23 + 13) % 100
            const staticTop = (i * 37 + 27) % 100
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-30"
                style={{
                  left: `${staticLeft}%`,
                  top: `${staticTop}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            )
          })}
        </div>

        <div className="relative h-full w-full grid grid-cols-1 lg:grid-cols-2 z-10">
          {/* Content Side */}
          <div className="relative z-20 flex items-center">
            <ContentStages
              currentStage={currentStage}
              stageProgress={stageProgress}
            />
          </div>

          {/* Graph Side */}
          <div className="relative flex items-center justify-center p-8">
            <motion.div
              className="w-full max-w-2xl h-[600px] relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: isClient && inView && isInitialized ? 1 : 0,
                scale: isClient && inView && isInitialized ? 1 : 0.9
              }}
              transition={{ duration: 0.8 }}
            >
              {/* Glass morphism container */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 rounded-3xl" />
              </div>

              <div className="relative h-full p-6">
                <OrderBookGraph
                  progress={graphProgress}
                  currentStage={currentStage}
                  isVisible={isClient && inView && isInitialized}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Modern status indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isClient && isInitialized ? 0.9 : 0,
            y: 0
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col items-center gap-3 bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl">
            <div className="text-center">
              <span className="text-sm text-white font-semibold tracking-wider">
                Market Making Visualization ({currentStage + 1}/4)
              </span>
              <div className="text-xs text-emerald-400 mt-1 font-medium">
                Stage: {contentStages[currentStage]?.title || 'Loading...'}
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2">
              {contentStages.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full"
                  animate={{
                    backgroundColor: index <= currentStage ? '#10b981' : '#374151',
                    scale: index === currentStage ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            <div className="text-xs text-gray-400 text-center mt-1">
              Progress: {Math.round(graphProgress * 100)}% • Press R to reset • Keys 1-4 for manual control
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MarketMaking