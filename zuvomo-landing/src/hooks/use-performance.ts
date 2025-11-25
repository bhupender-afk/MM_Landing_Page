'use client'

import { useState, useEffect } from 'react'

interface PerformanceSettings {
  reducedMotion: boolean
  lowPower: boolean
  particleCount: number
  animationSpeed: number
  updateFrequency: number
}

export function usePerformance() {
  const [settings, setSettings] = useState<PerformanceSettings>({
    reducedMotion: false,
    lowPower: false,
    particleCount: 25,
    animationSpeed: 1,
    updateFrequency: 2000
  })

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Detect low-end devices based on hardware characteristics
    const detectLowPowerDevice = () => {
      // Check for hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 1

      // Check for memory (if available)
      const memory = (navigator as any).deviceMemory || 4

      // Check for connection speed
      const connection = (navigator as any).connection
      const slowConnection = connection && (
        connection.effectiveType === 'slow-2g' ||
        connection.effectiveType === '2g' ||
        connection.effectiveType === '3g'
      )

      // Consider device low-power if:
      // - Less than 4 CPU cores, or
      // - Less than 4GB RAM, or
      // - Slow network connection
      return cores < 4 || memory < 4 || slowConnection
    }

    const updateSettings = () => {
      const reducedMotion = mediaQuery.matches
      const lowPower = detectLowPowerDevice()

      setSettings({
        reducedMotion,
        lowPower,
        particleCount: lowPower ? 10 : reducedMotion ? 15 : 25,
        animationSpeed: reducedMotion ? 0 : lowPower ? 0.5 : 1,
        updateFrequency: lowPower ? 5000 : reducedMotion ? 4000 : 2000
      })
    }

    updateSettings()

    // Listen for changes in motion preference
    mediaQuery.addEventListener('change', updateSettings)

    // Listen for network changes
    const connection = (navigator as any).connection
    if (connection) {
      connection.addEventListener('change', updateSettings)
    }

    return () => {
      mediaQuery.removeEventListener('change', updateSettings)
      if (connection) {
        connection.removeEventListener('change', updateSettings)
      }
    }
  }, [])

  return settings
}