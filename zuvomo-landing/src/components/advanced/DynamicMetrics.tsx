'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { TrendingUp, DollarSign, Activity, Users, Clock, Target } from 'lucide-react'
import { useParallax } from '@/hooks/use-parallax'
import { usePerformance } from '@/hooks/use-performance'

// Different time periods for metrics
const timeFrames = ['24h', '7d', '30d', '1y'] as const
type TimeFrame = typeof timeFrames[number]

// Mock data generator for different time frames
const generateTimeSeriesData = (timeFrame: TimeFrame, baseValue: number) => {
  const points = {
    '24h': 24,
    '7d': 7,
    '30d': 30,
    '1y': 12
  }[timeFrame]

  return Array.from({ length: points }, (_, i) => ({
    time: i,
    value: baseValue + (Math.sin(i * 0.5) * baseValue * 0.1) + (Math.random() - 0.5) * baseValue * 0.05,
    volume: Math.random() * 100,
    change: (Math.random() - 0.5) * 10
  }))
}

// Metric definitions with different states
const metricsData = {
  volume: {
    icon: DollarSign,
    title: 'Daily Trading Volume',
    baseValue: 1200000000, // $1.2B
    suffix: '',
    prefix: '$',
    format: (value: number) => {
      if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`
      if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`
      return value.toLocaleString()
    },
    chartType: 'area',
    color: '#3B82F6',
    gradient: ['#3B82F6', '#60A5FA'],
    variations: {
      '24h': { multiplier: 1, change: +12.5 },
      '7d': { multiplier: 6.8, change: +8.2 },
      '30d': { multiplier: 28.4, change: +15.7 },
      '1y': { multiplier: 365.2, change: +24.3 }
    }
  },
  markets: {
    icon: Activity,
    title: 'Active Markets',
    baseValue: 500,
    suffix: '+',
    prefix: '',
    format: (value: number) => Math.floor(value).toString(),
    chartType: 'line',
    color: '#10B981',
    gradient: ['#10B981', '#34D399'],
    variations: {
      '24h': { multiplier: 1, change: +2.1 },
      '7d': { multiplier: 1.02, change: +4.2 },
      '30d': { multiplier: 1.15, change: +12.8 },
      '1y': { multiplier: 1.45, change: +35.2 }
    }
  },
  uptime: {
    icon: Clock,
    title: 'System Uptime',
    baseValue: 99.9,
    suffix: '%',
    prefix: '',
    format: (value: number) => value.toFixed(2),
    chartType: 'bar',
    color: '#8B5CF6',
    gradient: ['#8B5CF6', '#A78BFA'],
    variations: {
      '24h': { multiplier: 1, change: 0 },
      '7d': { multiplier: 1, change: -0.01 },
      '30d': { multiplier: 1, change: -0.05 },
      '1y': { multiplier: 1, change: -0.1 }
    }
  },
  latency: {
    icon: Target,
    title: 'Average Latency',
    baseValue: 0.15,
    suffix: 'ms',
    prefix: '<',
    format: (value: number) => value.toFixed(2),
    chartType: 'line',
    color: '#F59E0B',
    gradient: ['#F59E0B', '#FBBF24'],
    variations: {
      '24h': { multiplier: 1, change: -5.2 },
      '7d': { multiplier: 1.1, change: -3.1 },
      '30d': { multiplier: 1.05, change: -8.7 },
      '1y': { multiplier: 0.95, change: -12.4 }
    }
  },
  clients: {
    icon: Users,
    title: 'Connected Clients',
    baseValue: 150,
    suffix: '+',
    prefix: '',
    format: (value: number) => Math.floor(value).toString(),
    chartType: 'area',
    color: '#EF4444',
    gradient: ['#EF4444', '#F87171'],
    variations: {
      '24h': { multiplier: 1, change: +8.3 },
      '7d': { multiplier: 1.12, change: +15.6 },
      '30d': { multiplier: 1.34, change: +28.9 },
      '1y': { multiplier: 2.1, change: +87.4 }
    }
  },
  efficiency: {
    icon: TrendingUp,
    title: 'Execution Efficiency',
    baseValue: 98.7,
    suffix: '%',
    prefix: '',
    format: (value: number) => value.toFixed(1),
    chartType: 'bar',
    color: '#06B6D4',
    gradient: ['#06B6D4', '#22D3EE'],
    variations: {
      '24h': { multiplier: 1, change: +0.3 },
      '7d': { multiplier: 1.001, change: +0.5 },
      '30d': { multiplier: 1.002, change: +1.2 },
      '1y': { multiplier: 1.005, change: +2.8 }
    }
  }
}

// Animated number component with morphing digits
function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  format,
  duration = 800
}: {
  value: number
  prefix?: string
  suffix?: string
  format: (value: number) => string
  duration?: number
}) {
  const motionValue = useMotionValue(value)
  const springValue = useSpring(motionValue, { damping: 20, stiffness: 100 })
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return unsubscribe
  }, [springValue])

  return (
    <span className="font-mono">
      {prefix}{format(displayValue)}{suffix}
    </span>
  )
}

// Mini chart component for hover overlays
function MiniChart({
  data,
  type,
  color,
  gradient
}: {
  data: any[],
  type: string,
  color: string,
  gradient: string[]
}) {
  const chartHeight = 60

  // Ensure we have valid data and dimensions
  if (!data || data.length === 0) {
    return (
      <div
        className="w-full bg-gray-100 rounded animate-pulse"
        style={{ height: chartHeight }}
      />
    )
  }

  if (type === 'area') {
    return (
      <div style={{ width: '100%', height: chartHeight, minHeight: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%" minHeight={chartHeight}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradient[0]} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={gradient[1]} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#gradient-${color.replace('#', '')})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (type === 'bar') {
    return (
      <div style={{ width: '100%', height: chartHeight, minHeight: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%" minHeight={chartHeight}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <Bar
              dataKey="value"
              fill={color}
              radius={[2, 2, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: chartHeight, minHeight: chartHeight }}>
      <ResponsiveContainer width="100%" height="100%" minHeight={chartHeight}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// Individual metric card component
function MetricCard({
  metricKey,
  metric,
  isHovered,
  onHover,
  onLeave,
  timeFrame,
  onTimeFrameChange,
  performance
}: {
  metricKey: string
  metric: typeof metricsData.volume
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  timeFrame: TimeFrame
  onTimeFrameChange: (tf: TimeFrame) => void
  performance: ReturnType<typeof usePerformance>
}) {
  const [currentValue, setCurrentValue] = useState(metric.baseValue)
  const [chartData, setChartData] = useState(() =>
    generateTimeSeriesData(timeFrame, metric.baseValue)
  )
  const [change, setChange] = useState(0)

  useEffect(() => {
    const variation = metric.variations[timeFrame]
    const newValue = metric.baseValue * variation.multiplier
    setCurrentValue(newValue)
    setChange(variation.change)
    setChartData(generateTimeSeriesData(timeFrame, newValue))
  }, [timeFrame, metric])

  // Update values periodically when hovered (throttled for performance)
  useEffect(() => {
    if (!isHovered) return

    const interval = setInterval(() => {
      const variation = metric.variations[timeFrame]
      const baseValue = metric.baseValue * variation.multiplier
      const newValue = baseValue + (Math.random() - 0.5) * baseValue * 0.02
      setCurrentValue(newValue)

      // Update chart data less frequently to prevent overload
      if (Math.random() > 0.9) {
        setChartData(generateTimeSeriesData(timeFrame, newValue))
      }
    }, performance.updateFrequency) // Dynamic frequency based on device performance

    return () => clearInterval(interval)
  }, [isHovered, timeFrame, metric, performance.updateFrequency])

  return (
    <motion.div
      className="group relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-500 cursor-pointer overflow-hidden"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        y: -5
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
    >
      {/* Background gradient that appears on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-5"
        style={{
          background: `linear-gradient(135deg, ${metric.gradient[0]}, ${metric.gradient[1]})`
        }}
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon with color animation */}
      <motion.div
        className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-gray-100 group-hover:bg-opacity-0"
        animate={{
          backgroundColor: isHovered ? metric.color : '#F3F4F6',
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ color: isHovered ? '#FFFFFF' : metric.color }}
          transition={{ duration: 0.3 }}
        >
          <metric.icon className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {metric.title}
      </h3>

      {/* Value with animated number */}
      <div className="text-3xl font-bold text-gray-900 mb-2">
        <AnimatedNumber
          value={currentValue}
          prefix={metric.prefix}
          suffix={metric.suffix}
          format={metric.format}
        />
      </div>

      {/* Change indicator */}
      <motion.div
        className={`text-sm font-medium flex items-center space-x-1 mb-4 ${
          change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}
        animate={{ x: isHovered ? [0, 2, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <TrendingUp className={`w-4 h-4 ${change < 0 ? 'rotate-180' : ''}`} />
        <span>{change >= 0 ? '+' : ''}{change.toFixed(1)}%</span>
        <span className="text-gray-500">vs {timeFrame === '24h' ? 'yesterday' : 'last period'}</span>
      </motion.div>

      {/* Time frame selector */}
      <div className="flex space-x-1 mb-4">
        {timeFrames.map((tf) => (
          <motion.button
            key={tf}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              timeFrame === tf
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTimeFrameChange(tf)}
          >
            {tf}
          </motion.button>
        ))}
      </div>

      {/* Chart overlay that appears on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 pt-4 mt-4"
          >
            <div className="text-sm text-gray-600 mb-2">Trend ({timeFrame})</div>
            <MiniChart
              data={chartData}
              type={metric.chartType}
              color={metric.color}
              gradient={metric.gradient}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${metric.color}40`
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.95
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export function DynamicMetrics() {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const [globalTimeFrame, setGlobalTimeFrame] = useState<TimeFrame>('24h')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const parallaxRef = useParallax(15)
  const performance = usePerformance()

  const handleMetricHover = useCallback((metricKey: string) => {
    setHoveredMetric(metricKey)
  }, [])

  const handleMetricLeave = useCallback(() => {
    setHoveredMetric(null)
  }, [])

  const handleTimeFrameChange = useCallback((timeFrame: TimeFrame) => {
    setGlobalTimeFrame(timeFrame)
  }, [])

  return (
    <section className="py-24 bg-gradient-to-br from-navy-blue to-dark-blue relative overflow-hidden">
      {/* Animated background elements */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-light-blue rounded-full blur-3xl"
            animate={{
              x: hoveredMetric ? [0, 20, 0] : 0,
              y: hoveredMetric ? [0, -10, 0] : 0,
              scale: hoveredMetric ? [1, 1.1, 1] : 1
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary-blue rounded-full blur-2xl"
            animate={{
              x: hoveredMetric ? [0, -15, 0] : 0,
              y: hoveredMetric ? [0, 20, 0] : 0,
              scale: hoveredMetric ? [1, 0.9, 1] : 1
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Live Performance{' '}
            <span className="bg-gradient-to-r from-light-blue to-extra-light-blue bg-clip-text text-transparent">
              Metrics
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Real-time insights into our market making performance. Hover over any metric
            to explore detailed trends and historical data across different time frames.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Object.entries(metricsData).map(([key, metric], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1 }}
            >
              <MetricCard
                metricKey={key}
                metric={metric}
                isHovered={hoveredMetric === key}
                onHover={() => handleMetricHover(key)}
                onLeave={handleMetricLeave}
                timeFrame={globalTimeFrame}
                onTimeFrameChange={handleTimeFrameChange}
                performance={performance}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Real-time indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <motion.div
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white font-medium">Live Data</span>
            <span className="text-blue-200 text-sm">Updates every {performance.updateFrequency}ms</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}