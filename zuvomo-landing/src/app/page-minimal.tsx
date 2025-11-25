'use client'

import { useEffect, memo } from 'react'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/sections/Hero'
import { useLenis } from '@/hooks/use-lenis'
import { PerformanceMonitor } from '@/components/PerformanceMonitor'

// ONLY USING: Navigation and Hero components for minimal performance test
const MemoizedNavigation = memo(Navigation)
const MemoizedHero = memo(Hero)

export default function MinimalPage() {
  // EMERGENCY: Disable Lenis for native browser scroll (maximum performance)
  useLenis({
    enabled: false, // Disable completely for native browser scroll
    lerp: 0,
    duration: 0,
    wheelMultiplier: 0,
    touchMultiplier: 0,
    smoothTouch: false
  })

  useEffect(() => {
    // Batch DOM updates
    const updateMetadata = () => {
      document.title = 'Zuvomo | Professional Market Making Services'
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Advanced algorithmic trading solutions and liquidity provision across centralized and decentralized exchanges. Professional market making services that enhance market depth and reduce spreads.')
      }
    }

    // Use setTimeout to defer non-critical operations
    setTimeout(updateMetadata, 0)

    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload hero image
      const heroImage = new Image()
      heroImage.src = '/assets/zuvomo_01.png'

      // Preload any critical fonts or assets
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    }

    preloadCriticalResources()
  }, [])

  return (
    <main className="font-sans">
      {/* MINIMAL TEST: Only Navigation and Hero - Testing Basic Performance */}
      <MemoizedNavigation />
      <MemoizedHero />

      {/* Development performance monitor - kept for testing */}
      <PerformanceMonitor />
    </main>
  )
}