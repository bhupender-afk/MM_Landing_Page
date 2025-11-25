'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register and configure GSAP with performance optimizations
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  // Global GSAP performance settings
  gsap.config({
    force3D: true, // Force hardware acceleration
    nullTargetWarn: false,
    autoSleep: 60, // Auto-sleep inactive animations after 60 seconds
  })

  // ScrollTrigger performance optimizations
  ScrollTrigger.config({
    limitCallbacks: true, // Reduce callback frequency
    ignoreMobileResize: true, // Ignore mobile resize events for better performance
  })
}

interface ParallaxOptions {
  amplitude?: number
  trigger?: string
  reduceMotion?: boolean
  disabled?: boolean
}

/**
 * Highly optimized parallax hook with senior-level performance improvements
 * - Hardware acceleration with force3D and will-change
 * - Proper cleanup and memory management
 * - Reduced motion support
 * - GPU layer optimization
 */
export function useParallax(amplitude: number = 50, trigger?: string) {
  const ref = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const cleanup = useCallback(() => {
    // Comprehensive cleanup to prevent memory leaks
    if (tweenRef.current) {
      tweenRef.current.kill()
      tweenRef.current = null
    }
    if (triggerRef.current) {
      triggerRef.current.kill()
      triggerRef.current = null
    }

    // Reset element styles and remove will-change
    const element = ref.current
    if (element) {
      element.style.willChange = 'auto'
      element.style.transform = ''
      element.style.backfaceVisibility = ''
      element.style.perspective = ''
    }
  }, [])

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return

    const element = ref.current

    // Apply performance optimizations
    element.style.willChange = 'transform' // Optimize for transform changes
    element.style.backfaceVisibility = 'hidden' // Reduce repaints
    element.style.perspective = '1000px' // Create stacking context
    element.style.contain = 'layout style paint' // CSS containment

    // Create optimized parallax animation
    tweenRef.current = gsap.to(element, {
      y: amplitude,
      ease: 'none',
      force3D: true, // Force hardware acceleration
      transformOrigin: '50% 50%', // Optimize transform origin
    })

    // Create ScrollTrigger with performance settings
    triggerRef.current = ScrollTrigger.create({
      trigger: trigger || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1, // Add slight lag for smoother performance
      animation: tweenRef.current,
      invalidateOnRefresh: true,
      refreshPriority: -1, // Lower priority for better performance
      onToggle: (self) => {
        // Dynamic will-change optimization
        if (self.isActive) {
          element.style.willChange = 'transform'
        } else {
          // Remove will-change when not scrolling for better memory usage
          setTimeout(() => {
            if (element && !self.isActive) {
              element.style.willChange = 'auto'
            }
          }, 100)
        }
      }
    })

    return cleanup
  }, [amplitude, trigger, prefersReducedMotion, cleanup])

  // Cleanup on unmount
  useEffect(() => {
    return cleanup
  }, [cleanup])

  return ref
}

/**
 * Advanced parallax hook with more control options
 */
export function useAdvancedParallax(options: {
  yPercent?: number
  scale?: number
  rotation?: number
  opacity?: number
  duration?: number
  ease?: string
  trigger?: string
  start?: string
  end?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const {
      yPercent = 0,
      scale = 1,
      rotation = 0,
      opacity = 1,
      ease = 'none',
      trigger,
      start = 'top bottom',
      end = 'bottom top',
    } = options

    const parallaxTween = gsap.to(element, {
      yPercent,
      scale,
      rotation,
      opacity,
      ease,
      scrollTrigger: {
        trigger: trigger || element,
        start,
        end,
        scrub: true,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      parallaxTween.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element || st.trigger === trigger) {
          st.kill()
        }
      })
    }
  }, [options])

  return ref
}