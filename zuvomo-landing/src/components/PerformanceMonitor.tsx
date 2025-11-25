'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fps: number
  memoryUsed: number
  loadTime: number
  paintTime: number
}

/**
 * Development performance monitor (only shows in dev mode)
 * Senior-level performance tracking and optimization suggestions
 */
export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    let frameCount = 0
    let startTime = performance.now()
    let lastTime = startTime

    // FPS monitoring
    const updateFPS = () => {
      frameCount++
      const now = performance.now()
      const delta = now - lastTime

      if (delta >= 1000) {
        const fps = Math.round((frameCount * 1000) / delta)

        // Get memory usage (if available)
        const memoryInfo = (performance as any).memory
        const memoryUsed = memoryInfo ? Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024) : 0

        // Get paint timing
        const paintEntries = performance.getEntriesByType('paint')
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')
        const paintTime = firstPaint ? Math.round(firstPaint.startTime) : 0

        // Get load time
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
        const loadTime = navigationEntries[0] ? Math.round(navigationEntries[0].loadEventEnd - navigationEntries[0].fetchStart) : 0

        setMetrics({
          fps,
          memoryUsed,
          loadTime,
          paintTime
        })

        frameCount = 0
        lastTime = now
      }

      requestAnimationFrame(updateFPS)
    }

    updateFPS()

    // Toggle visibility with keyboard shortcut
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'p') {
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  if (!metrics || !isVisible || process.env.NODE_ENV !== 'development') {
    return null
  }

  const getPerformanceStatus = () => {
    if (metrics.fps < 30) return { color: 'text-red-500', status: 'Poor' }
    if (metrics.fps < 50) return { color: 'text-yellow-500', status: 'Fair' }
    return { color: 'text-green-500', status: 'Good' }
  }

  const performanceStatus = getPerformanceStatus()

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg font-mono text-xs z-50 backdrop-blur-sm">
      <div className="mb-2 text-center text-white/80">Performance Monitor</div>
      <div className="space-y-1 min-w-48">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={performanceStatus.color}>{metrics.fps} ({performanceStatus.status})</span>
        </div>
        <div className="flex justify-between">
          <span>Memory:</span>
          <span>{metrics.memoryUsed}MB</span>
        </div>
        <div className="flex justify-between">
          <span>Load Time:</span>
          <span>{metrics.loadTime}ms</span>
        </div>
        <div className="flex justify-between">
          <span>Paint Time:</span>
          <span>{metrics.paintTime}ms</span>
        </div>
      </div>
      <div className="mt-2 text-xs text-white/60 text-center">
        Press Ctrl+P to toggle
      </div>
      {metrics.fps < 30 && (
        <div className="mt-2 text-xs text-red-400">
          ⚠ Low FPS detected. Consider reducing animations.
        </div>
      )}
      {metrics.memoryUsed > 100 && (
        <div className="mt-2 text-xs text-yellow-400">
          ⚠ High memory usage. Check for memory leaks.
        </div>
      )}
    </div>
  )
}