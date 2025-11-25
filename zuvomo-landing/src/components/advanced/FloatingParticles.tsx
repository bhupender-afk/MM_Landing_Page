'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { usePerformance } from '@/hooks/use-performance'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  type: 'data' | 'trade' | 'connection'
}

// Generate particles representing different data types
const generateParticles = (count: number, width: number, height: number): Particle[] => {
  const colors = ['#3B82F6', '#60A5FA', '#DBEAFE', '#10B981', '#F59E0B']
  const types: Array<'data' | 'trade' | 'connection'> = ['data', 'trade', 'connection']

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 8 + 2,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    type: types[Math.floor(Math.random() * types.length)]
  }))
}

// Particle component with different shapes based on type
const ParticleElement = ({ particle, mousePosition }: {
  particle: Particle,
  mousePosition: { x: number, y: number }
}) => {
  // Calculate distance to mouse for interaction effect
  const distance = Math.sqrt(
    Math.pow(particle.x - mousePosition.x, 2) +
    Math.pow(particle.y - mousePosition.y, 2)
  )
  const interactionRadius = 150
  const influence = Math.max(0, 1 - distance / interactionRadius)

  const getShape = () => {
    switch (particle.type) {
      case 'data':
        return (
          <motion.div
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity + influence * 0.3,
              transform: `scale(${1 + influence * 0.5})`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        )
      case 'trade':
        return (
          <motion.div
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity + influence * 0.3,
              borderRadius: '50%',
              transform: `scale(${1 + influence * 0.5})`,
            }}
            animate={{
              opacity: [particle.opacity, particle.opacity + 0.3, particle.opacity],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )
      case 'connection':
        return (
          <motion.div
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size * 1.5,
              height: particle.size * 0.3,
              backgroundColor: particle.color,
              opacity: particle.opacity + influence * 0.3,
              borderRadius: particle.size,
              transform: `scale(${1 + influence * 0.5}) rotate(${Math.atan2(particle.speedY, particle.speedX) * 180 / Math.PI}deg)`,
            }}
          />
        )
      default:
        return null
    }
  }

  return getShape()
}

// Connection lines between nearby particles
const ConnectionLines = ({
  particles,
  mousePosition
}: {
  particles: Particle[],
  mousePosition: { x: number, y: number }
}) => {
  const connections: Array<{ from: Particle, to: Particle, distance: number }> = []
  const maxDistance = 120

  // Find nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const distance = Math.sqrt(
        Math.pow(particles[i].x - particles[j].x, 2) +
        Math.pow(particles[i].y - particles[j].y, 2)
      )

      if (distance < maxDistance) {
        connections.push({
          from: particles[i],
          to: particles[j],
          distance
        })
      }
    }
  }

  return (
    <svg className="absolute inset-0 pointer-events-none">
      {connections.map((connection, index) => {
        const opacity = (1 - connection.distance / maxDistance) * 0.3
        return (
          <motion.line
            key={index}
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            stroke="#3B82F6"
            strokeWidth="1"
            strokeOpacity={opacity}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )
      })}
    </svg>
  )
}

export const FloatingParticles = React.memo(function FloatingParticles({
  count = 50,
  showConnections = true,
  interactive = true
}: {
  count?: number
  showConnections?: boolean
  interactive?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const forceRedraw = useRef(0)
  const [isVisible, setIsVisible] = useState(false)
  const lastUpdateTime = useRef(0)
  const performance = usePerformance()

  // Intersection Observer for performance
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current || !isVisible) return

    const rect = containerRef.current.getBoundingClientRect()
    particlesRef.current = generateParticles(count, rect.width, rect.height)

    // Optimized animation loop with adaptive frame rate
    const animate = (time: number) => {
      if (!containerRef.current || !isVisible) return

      // Adaptive frame rate based on performance
      const targetFPS = performance.lowPower ? 30 : 60
      const frameTime = 1000 / targetFPS

      if (time - lastUpdateTime.current < frameTime) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastUpdateTime.current = time
      const rect = containerRef.current.getBoundingClientRect()

      // Batch DOM operations and minimize calculations
      const updatedParticles = particlesRef.current.map(particle => {
        let { x, y, speedX, speedY } = particle

        // Update position with optimized calculations
        x += speedX
        y += speedY

        // Bounce off walls with simplified boundary checks
        if (x <= 0 || x >= rect.width) {
          speedX = -speedX
          x = x <= 0 ? 0 : rect.width
        }
        if (y <= 0 || y >= rect.height) {
          speedY = -speedY
          y = y <= 0 ? 0 : rect.height
        }

        // Simplified mouse interaction for better performance
        if (interactive && !performance.lowPower) {
          const dx = x - mousePositionRef.current.x
          const dy = y - mousePositionRef.current.y
          const distanceSquared = dx * dx + dy * dy // Avoid sqrt for performance
          const interactionRadiusSquared = 10000 // 100^2

          if (distanceSquared < interactionRadiusSquared && distanceSquared > 0) {
            const distance = Math.sqrt(distanceSquared)
            const force = (100 - distance) / 100 * 0.015
            speedX += (dx / distance) * force
            speedY += (dy / distance) * force
          }
        }

        // Optimized friction and random movement
        const friction = 0.99
        speedX = speedX * friction + (Math.random() - 0.5) * 0.008
        speedY = speedY * friction + (Math.random() - 0.5) * 0.008

        // Clamp speeds
        speedX = Math.max(-0.8, Math.min(0.8, speedX))
        speedY = Math.max(-0.8, Math.min(0.8, speedY))

        return {
          ...particle,
          x,
          y,
          speedX,
          speedY
        }
      })

      particlesRef.current = updatedParticles

      // Throttled re-render for better performance
      if (time - forceRedraw.current > 33) { // ~30fps render updates
        forceRedraw.current++
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [count, interactive, isVisible])

  // Mouse tracking with throttling
  useEffect(() => {
    if (!interactive) return

    let throttleTimer: NodeJS.Timeout | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || throttleTimer) return

      throttleTimer = setTimeout(() => {
        throttleTimer = null
      }, 16) // Throttle to ~60fps

      const rect = containerRef.current.getBoundingClientRect()
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleMouseLeave = () => {
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true })
      container.addEventListener('mouseleave', handleMouseLeave, { passive: true })

      return () => {
        if (throttleTimer) {
          clearTimeout(throttleTimer)
        }
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [interactive])

  return (
    <div
      ref={containerRef}
      className="floating-particles absolute inset-0 overflow-hidden pointer-events-none gpu-accelerated"
      style={{
        zIndex: 1,
        willChange: isVisible ? 'transform' : 'auto',
        contain: 'layout style paint'
      }}
    >
      {/* Particles with optimized rendering */}
      {isVisible && particlesRef.current.map((particle) => (
        <ParticleElement
          key={`${particle.id}-${Math.floor(forceRedraw.current / 2)}`} // Reduced key changes
          particle={particle}
          mousePosition={mousePositionRef.current}
        />
      ))}

      {/* Connection lines - only render if enabled and performing well */}
      {showConnections && !performance.lowPower && (
        <ConnectionLines
          particles={particlesRef.current}
          mousePosition={mousePositionRef.current}
        />
      )}

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none" />
    </div>
  )
})