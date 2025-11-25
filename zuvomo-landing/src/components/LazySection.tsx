'use client'

import { lazy, Suspense, memo, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface LazySectionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

/**
 * High-performance lazy loading wrapper with intersection observer
 * Implements viewport-based loading with proper cleanup
 */
const LazySectionInner = memo(function LazySectionInner({
  children,
  fallback = <LazySkeleton />,
  className = '',
  threshold = 0.1,
  rootMargin = '100px'
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || hasLoaded) return

    // Performance-optimized intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
          // Disconnect after first intersection for better performance
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
        // Use document instead of null for better performance
        root: null
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, hasLoaded])

  return (
    <div
      ref={elementRef}
      className={`lazy-section ${className}`}
      style={{
        minHeight: isVisible ? 'auto' : '200px', // Prevent layout shift
        containIntrinsicSize: '100% 200px', // CSS containment hint
        contain: 'layout style paint'
      }}
    >
      {isVisible ? children : fallback}
    </div>
  )
})

/**
 * Optimized skeleton loader with CSS animations for better performance
 */
const LazySkeleton = memo(function LazySkeleton() {
  return (
    <motion.div
      className="animate-pulse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 2s infinite'
      }}
    >
      <div className="h-48 bg-gray-200 rounded-lg" />
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  )
})

export { LazySectionInner as LazySection }

// Lazy load heavy components
export const LazyTradingVisualization = lazy(() =>
  import('@/components/advanced/TradingVisualization').then(module => ({
    default: module.TradingVisualization
  }))
)

export const LazyDynamicMetrics = lazy(() =>
  import('@/components/advanced/DynamicMetrics').then(module => ({
    default: module.DynamicMetrics
  }))
)

export const LazyFloatingParticles = lazy(() =>
  import('@/components/advanced/FloatingParticles').then(module => ({
    default: module.FloatingParticles
  }))
)

/**
 * HOC for wrapping components with lazy loading and suspense
 */
export function withLazyLoading<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  fallback?: React.ReactNode
) {
  return memo(function LazyWrappedComponent(props: T) {
    return (
      <Suspense fallback={fallback || <LazySkeleton />}>
        <Component {...props} />
      </Suspense>
    )
  })
}