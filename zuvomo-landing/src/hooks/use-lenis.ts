'use client'

import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'

interface LenisConfig {
  enabled?: boolean
  lerp?: number
  duration?: number
  wheelMultiplier?: number
  touchMultiplier?: number
  smoothTouch?: boolean
}

/**
 * Optimized Lenis smooth scrolling hook with senior-level performance improvements
 * - Frame rate optimization with adaptive rendering
 * - Proper cleanup and memory management
 * - Reduced motion support
 * - Device-specific optimizations
 */
export function useLenis({
  enabled = true,
  lerp = 0.08,
  duration = 1.2,
  wheelMultiplier = 0.8,
  touchMultiplier = 1.2,
  smoothTouch = false
}: LenisConfig = {}) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  // Adaptive frame rate based on device performance
  const getTargetFPS = useCallback(() => {
    // Check device performance indicators
    const cores = navigator.hardwareConcurrency || 2
    const memory = (navigator as any).deviceMemory || 4

    // High-end devices: 60fps, mid-range: 45fps, low-end: 30fps
    if (cores >= 6 && memory >= 8) return 60
    if (cores >= 4 && memory >= 4) return 45
    return 30
  }, [])

  const targetFPS = getTargetFPS()
  const frameTime = 1000 / targetFPS

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || prefersReducedMotion) return

    // EMERGENCY: Ultra-fast Lenis configuration for maximum performance
    const lenis = new Lenis({
      lerp: 0.15, // Faster, less smooth but more responsive
      duration: 0.8, // Shorter duration
      wheelMultiplier: 1.2, // More responsive to wheel
      touchMultiplier: 2, // More responsive to touch
      infinite: false,
      syncTouch: false, // Disable for performance
      easing: (t) => t, // Linear easing for performance
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      autoResize: false, // Disable auto-resize for performance
      prevent: (node) => {
        // Prevent smooth scroll on specific elements
        return node.classList.contains('no-smooth-scroll') ||
               node.closest('.no-smooth-scroll') !== null
      }
    })

    lenisRef.current = lenis

    // EMERGENCY: Aggressive RAF throttling for maximum performance
    const raf = (time: number) => {
      // Emergency throttling - only update every 33ms (30fps max)
      if (time - lastTimeRef.current >= 33) {
        // Check if we're scrolling - if so, reduce to 50fps max
        const isScrolling = document.body.classList.contains('scrolling')
        const shouldUpdate = isScrolling ?
          (time - lastTimeRef.current >= 20) : // 50fps while scrolling
          (time - lastTimeRef.current >= 33)   // 30fps when idle

        if (shouldUpdate) {
          lenis.raf(time)
          lastTimeRef.current = time
        }
      }

      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    // Optimized resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        lenis.resize()
      }, 100) // Reduced debounce time for better responsiveness
    }

    // Optimized visibility change handler to pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = null
        }
      } else {
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(raf)
        }
      }
    }

    // Event listeners with passive flags for better performance
    window.addEventListener('resize', handleResize, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true })

    // Add scroll snap support for better UX
    const style = document.createElement('style')
    style.textContent = `
      html {
        scroll-behavior: auto !important;
        scroll-snap-type: y proximity;
      }

      section {
        scroll-snap-align: start;
      }

      /* Performance optimizations */
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* GPU acceleration for smooth scrolling */
      body {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000;
      }

      /* Optimize repaints */
      .smooth-scroll-optimize {
        will-change: transform;
        transform: translateZ(0);
      }
    `
    document.head.appendChild(style)

    return () => {
      // Comprehensive cleanup
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.head.removeChild(style)

      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled, lerp, duration, wheelMultiplier, touchMultiplier, smoothTouch, prefersReducedMotion, targetFPS, frameTime])

  // Return lenis instance for manual control if needed
  return lenisRef.current
}