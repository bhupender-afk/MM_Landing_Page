'use client'

import { useEffect, useRef, useCallback } from 'react'

interface ScrollCallbacks {
  onScroll?: (scrollY: number, direction: 'up' | 'down') => void
  onScrollStart?: () => void
  onScrollEnd?: () => void
}

/**
 * High-performance scroll hook with debouncing and RAF optimization
 * Senior-level implementation with memory management and performance optimizations
 */
export function useOptimizedScroll({ onScroll, onScrollStart, onScrollEnd }: ScrollCallbacks = {}) {
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const rafRef = useRef<number | undefined>(undefined)
  const lastScrollYRef = useRef(0)
  const isScrollingRef = useRef(false)
  const lastCallTimeRef = useRef(0)

  // Throttle scroll callbacks to 60fps max
  const throttledCallback = useCallback((scrollY: number, direction: 'up' | 'down') => {
    const now = performance.now()
    const throttleTime = 16.67 // ~60fps

    if (now - lastCallTimeRef.current >= throttleTime) {
      onScroll?.(scrollY, direction)
      lastCallTimeRef.current = now
    }
  }, [onScroll])

  const handleScroll = useCallback(() => {
    // Cancel previous RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
      const direction = currentScrollY > lastScrollYRef.current ? 'down' : 'up'

      // Call scroll start only once
      if (!isScrollingRef.current && onScrollStart) {
        onScrollStart()
        isScrollingRef.current = true
      }

      // Throttled scroll callback
      throttledCallback(currentScrollY, direction)
      lastScrollYRef.current = currentScrollY

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set scroll end timeout
      scrollTimeoutRef.current = setTimeout(() => {
        if (isScrollingRef.current && onScrollEnd) {
          onScrollEnd()
          isScrollingRef.current = false
        }
      }, 150) // Debounced scroll end
    })
  }, [throttledCallback, onScrollStart, onScrollEnd])

  useEffect(() => {
    // Passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)

      // Cleanup RAF and timeouts
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll])

  // Return current scroll position for external use
  return {
    scrollY: lastScrollYRef.current,
    isScrolling: isScrollingRef.current
  }
}