'use client'

import { useEffect, useRef } from 'react'

// Background Candlestick Chart Component
const BackgroundCandlesticks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Candlestick data
    const candlesticks: Array<{
      x: number
      height: number
      maxHeight: number
      speed: number
      baseHeight: number
    }> = []

    const numCandlesticks = 60
    const candleWidth = canvas.width / numCandlesticks

    // Initialize candlesticks with smaller, background-appropriate heights
    for (let i = 0; i < numCandlesticks; i++) {
      const baseHeight = 40 + Math.random() * 800
      candlesticks.push({
        x: i * candleWidth,
        height: baseHeight,
        maxHeight: baseHeight + Math.random() * 60,
        speed: 0.01 + Math.random() * 0.005,
        baseHeight: baseHeight + 100
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      time += 0.02

      candlesticks.forEach((candle, index) => {
        // Animate height with sine wave
        const heightVariation = Math.sin(time + index * 0.4) * 180
        candle.height = candle.baseHeight + heightVariation

        // Draw candlestick
        const x = candle.x + candleWidth * 0.1
        const width = candleWidth * 0.3
        const height = Math.max(80, candle.height)
        const y = canvas.height - height

        // Light emerald candlesticks for visibility on dark background
        // ctx.fillStyle = 'rgba(248, 130, 60,1)'
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(x, y, width* 1.6, height)

        // Brighter highlight for definition
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.fillRect(x, y, width * 0.3, height)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ filter: 'blur(0.5px)' }}
    />
  )
}

export function Hero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-[#2f3a63]">
      {/* Dark Teal Gradient Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-teal-900 to-slate-900" /> */}

      {/* Additional gradient overlay for depth */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-teal-900/30 via-transparent to-slate-900/20" /> */}

      {/* Background Candlesticks - positioned above gradients */}
      <div className="absolute inset-0 z-10">
        <BackgroundCandlesticks />
      </div>

      {/* Main Content - Split Layout */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[60vh] text-center">

          {/* Left Side - Main Text Content */}
          <div className="lg:col-span-12 space-y-6 md:space-y-8 items-center justify-center flex flex-col">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-[#2B91D6] leading-tight tracking-tight">
              TRUSTED {" "}
              <span className="text-[#f8673c]">
                CRYPTO
              </span>{' '}
              <span className="text-[#fff]">
                MARKET  {" "}
                <span className="text-[#f8673c]">
                  MAKERS
                </span>{' '}
                  </span>
              SINCE 2019
            </h1>

            <div className="max-w-2xl text-center items-center justify-center flex flex-col">
              <div className="h-1 w-16 bg-[#f8673c] mb-4 md:mb-6"></div>
              <p className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed">
                Zuvomo offers ethical market-making services,
                leveraging advanced algorithmic trading software
                integrated on 100+ exchanges for global market coverage.
              </p>
            </div>  
          </div>

          {/* Right Side - CTA Buttons */}
          <div className="lg:col-span-12 relative items-center justify-center flex">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto lg:justify-end lg:items-end justify-center items-center">
              <button
                className="w-full sm:w-auto inline-block bg-[#2B91D6] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-[#2380c0]"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in touch
                <span className="ml-2">→</span>
              </button>
              <button
                className="w-full sm:w-auto bg-white text-slate-900 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-[#2380c0] hover:bg-[#2B91D6] hover:text-white"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Services
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}