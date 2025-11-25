'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Emergency scroll performance hook
 * Disables all heavy animations while scrolling to ensure 60fps
 */
export function useScrollPerformance() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [performanceMode, setPerformanceMode] = useState<'auto' | 'high-performance'>('auto')
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const lastScrollTime = useRef(0)
  const frameDropCount = useRef(0)

  // Auto-detect performance issues and switch to high-performance mode
  const checkPerformance = useCallback(() => {
    const now = performance.now()
    const timeDiff = now - lastScrollTime.current

    if (timeDiff > 32 && isScrolling) { // More than 32ms = below 30fps
      frameDropCount.current++
      if (frameDropCount.current > 3) {
        setPerformanceMode('high-performance')
      }
    } else {
      frameDropCount.current = Math.max(0, frameDropCount.current - 1)
    }

    lastScrollTime.current = now
  }, [isScrolling])

  useEffect(() => {
    let isAnimatingScroll = false

    const handleScrollStart = () => {
      if (isAnimatingScroll) return
      isAnimatingScroll = true
      setIsScrolling(true)

      // Immediately disable expensive features
      document.body.classList.add('scrolling', 'high-performance-mode')

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }

    const handleScrollEnd = () => {
      scrollTimeoutRef.current = setTimeout(() => {
        isAnimatingScroll = false
        setIsScrolling(false)
        document.body.classList.remove('scrolling')

        // Only remove high-performance mode if we haven't detected issues
        if (performanceMode === 'auto') {
          document.body.classList.remove('high-performance-mode')
        }
      }, 100) // Very short delay
    }

    const handleScroll = () => {
      handleScrollStart()
      checkPerformance()
      handleScrollEnd()
    }

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Also listen for wheel events for immediate response
    window.addEventListener('wheel', handleScrollStart, { passive: true })
    window.addEventListener('touchmove', handleScrollStart, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleScrollStart)
      window.removeEventListener('touchmove', handleScrollStart)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      document.body.classList.remove('scrolling', 'high-performance-mode')
    }
  }, [checkPerformance, performanceMode])

  return {
    isScrolling,
    performanceMode,
    setPerformanceMode
  }
}