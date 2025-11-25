'use client'

import { useEffect, useRef, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { OrderBookGraphProps } from './types'

export function OrderBookGraph({ progress, currentStage, isVisible }: OrderBookGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const progressRef = useRef(0)

  const generateDataPoints = useCallback((spreadFactor: number) => {
    const points = []
    const baseSpread = 50 * spreadFactor
    const volatility = 20 * spreadFactor

    for (let i = 0; i < 12; i++) {
      const randomVariation = Math.sin(i * 0.8) * volatility
      const askPrice = 100 + baseSpread / 2 + randomVariation
      const bidPrice = 100 - baseSpread / 2 + randomVariation * 0.8

      points.push({
        x: i,
        ask: askPrice,
        bid: bidPrice,
        spread: askPrice - bidPrice
      })
    }
    return points
  }, [])

  const interpolatePoints = useCallback((startPoints: any[], endPoints: any[], t: number) => {
    return startPoints.map((start, i) => ({
      x: start.x,
      ask: start.ask + (endPoints[i].ask - start.ask) * t,
      bid: start.bid + (endPoints[i].bid - start.bid) * t,
      spread: start.spread + (endPoints[i].spread - start.spread) * t
    }))
  }, [])

  const drawGraph = useCallback((ctx: CanvasRenderingContext2D, points: any[], canvas: HTMLCanvasElement) => {
    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const graphWidth = width - padding * 2
    const graphHeight = height - padding * 2

    ctx.clearRect(0, 0, width, height)

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.lineWidth = 1
    const gridLines = 10
    for (let i = 0; i <= gridLines; i++) {
      const x = padding + (graphWidth / gridLines) * i
      const y = padding + (graphHeight / gridLines) * i

      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    const scaleX = graphWidth / (points.length - 1)
    const minValue = Math.min(...points.flatMap(p => [p.ask, p.bid])) - 10
    const maxValue = Math.max(...points.flatMap(p => [p.ask, p.bid])) + 10
    const scaleY = graphHeight / (maxValue - minValue)

    const drawLine = (values: number[], color: string, fillColor: string) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      ctx.beginPath()
      values.forEach((value, i) => {
        const x = padding + i * scaleX
        const y = padding + (maxValue - value) * scaleY
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      if (fillColor) {
        ctx.fillStyle = fillColor
        ctx.beginPath()
        values.forEach((value, i) => {
          const x = padding + i * scaleX
          const y = padding + (maxValue - value) * scaleY
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        ctx.lineTo(padding + (values.length - 1) * scaleX, height - padding)
        ctx.lineTo(padding, height - padding)
        ctx.closePath()
        ctx.fill()
      }

      ctx.fillStyle = color
      values.forEach((value, i) => {
        const x = padding + i * scaleX
        const y = padding + (maxValue - value) * scaleY
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const spreadValues = points.map((_, i) => {
      return (points[i].ask + points[i].bid) / 2
    })
    drawLine(spreadValues, 'rgba(148, 163, 184, 0.6)', '')

    drawLine(points.map(p => p.bid), '#10b981', 'rgba(16, 185, 129, 0.1)')
    drawLine(points.map(p => p.ask), '#f97316', 'rgba(249, 115, 22, 0.1)')
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isVisible) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const startPoints = generateDataPoints(1)
    const endPoints = generateDataPoints(0.3)

    const animate = () => {
      const targetProgress = progress
      progressRef.current += (targetProgress - progressRef.current) * 0.1

      const currentPoints = interpolatePoints(startPoints, endPoints, progressRef.current)
      drawGraph(ctx, currentPoints, canvas)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [progress, isVisible, generateDataPoints, interpolatePoints, drawGraph])

  const stageLabels = useMemo(() => {
    if (currentStage === 0 || progress < 0.1) return { main: 'BEFORE', sub: '' }
    if (currentStage === 3 || progress > 0.9) return { main: 'AFTER', sub: '' }
    return { main: 'TRANSITIONING', sub: '' }
  }, [currentStage, progress])

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-8 left-8 flex gap-4 z-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2 bg-orange-500 rounded-full text-white text-sm font-bold shadow-lg border-2 border-white/20"
          style={{
            boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)'
          }}
        >
          Ask
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-4 py-2 bg-gray-700 rounded-full text-white text-sm font-bold shadow-lg border-2 border-white/20"
          style={{
            boxShadow: '0 0 20px rgba(75, 85, 99, 0.5)'
          }}
        >
          Spread
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-4 py-2 bg-emerald-500 rounded-full text-white text-sm font-bold shadow-lg border-2 border-white/20"
          style={{
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
          }}
        >
          Bid
        </motion.div>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />

      <motion.div
        className="absolute bottom-8 right-8 text-white z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-black/70 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
          <div className="text-2xl font-bold tracking-wider text-white drop-shadow-lg">
            {stageLabels.main}
          </div>
          {stageLabels.sub && (
            <div className="text-sm text-gray-300 mt-1">
              {stageLabels.sub}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}