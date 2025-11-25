'use client'

import React, { useState, useEffect, useRef, JSXElementConstructor } from 'react'
import { motion, useInView } from 'framer-motion'

export interface ShuffleProps {
  text: string
  className?: string
  style?: React.CSSProperties
  shuffleDirection?: 'left' | 'right'
  duration?: number
  ease?: string
  threshold?: number
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  textAlign?: React.CSSProperties['textAlign']
  onShuffleComplete?: () => void
  shuffleTimes?: number
  animationMode?: 'random' | 'evenodd'
  stagger?: number
  colorFrom?: string
  colorTo?: string
  triggerOnce?: boolean
  triggerOnHover?: boolean
  respectReducedMotion?: boolean
}

const ShuffleText: React.FC<ShuffleProps> = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  ease = 'power3.out',
  threshold = 0.1,
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  stagger = 0.03,
  colorFrom,
  colorTo,
  triggerOnce = true,
  triggerOnHover = true,
  respectReducedMotion = true,
}) => {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const inView = useInView(ref, {
    amount: threshold,
    once: triggerOnce
  })

  // Check for reduced motion preference
  const prefersReducedMotion = respectReducedMotion &&
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

  useEffect(() => {
    if (inView && !prefersReducedMotion) {
      setIsVisible(true)
      // Call completion callback after animation duration
      const timer = setTimeout(() => {
        onShuffleComplete?.()
      }, duration * 1000 + (text.length * stagger * 1000))
      return () => clearTimeout(timer)
    } else if (prefersReducedMotion) {
      // Show immediately if reduced motion is preferred
      setIsVisible(true)
      onShuffleComplete?.()
    }
  }, [inView, duration, stagger, text.length, onShuffleComplete, prefersReducedMotion])

  // Generate random characters for shuffle effect
  const generateRandomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    return chars[Math.floor(Math.random() * chars.length)]
  }

  // Convert ease string to framer motion compatible easing
  const getFramerEasing = (easeStr: string) => {
    switch (easeStr) {
      case 'power3.out':
        return [0.25, 0.46, 0.45, 0.94]
      case 'power2.out':
        return [0.25, 0.46, 0.45, 0.84]
      case 'back.out':
        return [0.175, 0.885, 0.32, 1.275]
      default:
        return [0.25, 0.46, 0.45, 0.94]
    }
  }

  // Split text into characters
  const characters = text.split('')

  // Animation variants for characters
  const charVariants = {
    hidden: {
      opacity: 0,
      x: shuffleDirection === 'right' ? -20 : 20,
      scale: 0.8,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration,
        ease: getFramerEasing(ease),
        delay: animationMode === 'evenodd'
          ? (i % 2 === 0 ? i * stagger : (i * stagger) + (duration * 0.7))
          : i * stagger,
      },
    }),
  }

  // Shuffle animation variants
  const shuffleVariants = {
    shuffle: {
      opacity: [0, 1, 1, 1],
      scale: [0.8, 1.1, 1],
      transition: {
        duration: duration * 0.6,
        times: [0, 0.2, 0.8, 1],
        ease: getFramerEasing(ease),
      },
    },
  }

  const handleHover = () => {
    if (triggerOnHover && !isHovered) {
      setIsHovered(true)
      // Reset hover state after animation
      setTimeout(() => setIsHovered(false), duration * 1000)
    }
  }

  const baseClasses = 'inline-block whitespace-normal break-words will-change-transform'
  const sizeClasses = 'text-4xl lg:text-6xl xl:text-7xl font-bold leading-none'
  const combinedClasses = `${baseClasses} ${sizeClasses} ${className}`.trim()

  const commonStyle: React.CSSProperties = {
    textAlign,
    fontFamily: 'var(--font-ubuntu), system-ui, sans-serif',
    fontWeight: 700,
    color: colorFrom || 'inherit',
    ...style,
  }

  const Tag = tag as keyof React.JSX.IntrinsicElements

  if (prefersReducedMotion) {
    return React.createElement(
      Tag,
      {
        ref: ref as any,
        className: combinedClasses,
        style: { ...commonStyle, color: colorTo || colorFrom || 'inherit' }
      },
      text
    )
  }

  return React.createElement(
    Tag,
    {
      ref: ref as any,
      className: combinedClasses,
      style: commonStyle,
      onMouseEnter: handleHover
    },
    characters.map((char, index) => (
      <motion.span
        key={`${char}-${index}`}
        className="inline-block"
        variants={charVariants}
        initial="hidden"
        animate={isVisible || isHovered ? "visible" : "hidden"}
        custom={index}
        style={{
          color: isVisible ? (colorTo || 'inherit') : (colorFrom || 'inherit'),
        }}
      >
        {char === ' ' ? '\u00A0' : (
          <motion.span
            className="inline-block"
            variants={shuffleVariants}
            animate={isVisible || isHovered ? "shuffle" : ""}
          >
            {char}
          </motion.span>
        )}
      </motion.span>
    ))
  )
}

export default ShuffleText