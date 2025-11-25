'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Dot } from 'recharts'
import { TrendingUp, Activity, BarChart3, Users } from 'lucide-react'

// Mock trading data
const generateTradingData = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    time: i,
    price: 100 + Math.sin(i * 0.1) * 10 + Math.random() * 5,
    volume: 50 + Math.random() * 100,
    bid: 99 + Math.sin(i * 0.1) * 10 + Math.random() * 3,
    ask: 101 + Math.sin(i * 0.1) * 10 + Math.random() * 3,
  }))
}

const steps = [
  {
    id: 1,
    title: 'Market Analysis',
    description: 'Our algorithms continuously analyze market conditions, order book depth, and price movements to identify optimal trading opportunities.',
    icon: BarChart3,
    highlight: 'analysis',
  },
  {
    id: 2,
    title: 'Order Placement',
    description: 'Smart order placement on both sides of the market, providing liquidity while maintaining tight spreads and minimizing risk.',
    icon: Activity,
    highlight: 'orders',
  },
  {
    id: 3,
    title: 'Dynamic Adjustment',
    description: 'Real-time adjustment of prices and quantities based on market volatility, ensuring optimal market making performance.',
    icon: TrendingUp,
    highlight: 'adjustment',
  },
  {
    id: 4,
    title: 'Profit Capture',
    description: 'Capturing the spread between bid and ask prices while providing essential liquidity to the market ecosystem.',
    icon: Users,
    highlight: 'profit',
  },
]

interface OrderBookEntry {
  price: number
  size: number
  side: 'bid' | 'ask'
}

const TradingChart = ({
  data,
  activeStep,
  animationProgress
}: {
  data: any[],
  activeStep: number,
  animationProgress: number
}) => {
  const [orderBook, setOrderBook] = useState<OrderBookEntry[]>([])
  const [currentPrice, setCurrentPrice] = useState(100)

  useEffect(() => {
    // Generate order book based on active step
    const generateOrderBook = () => {
      const book: OrderBookEntry[] = []
      const basePrice = data[data.length - 1]?.price || 100

      // Generate bids (buy orders)
      for (let i = 0; i < 5; i++) {
        book.push({
          price: basePrice - (i + 1) * 0.1,
          size: 50 + Math.random() * 100,
          side: 'bid'
        })
      }

      // Generate asks (sell orders)
      for (let i = 0; i < 5; i++) {
        book.push({
          price: basePrice + (i + 1) * 0.1,
          size: 50 + Math.random() * 100,
          side: 'ask'
        })
      }

      return book
    }

    // Animate order book updates based on step - throttled for performance
    const interval = setInterval(() => {
      setOrderBook(generateOrderBook())
      setCurrentPrice(data[data.length - 1]?.price || 100)
    }, activeStep === 2 ? 2000 : 3000) // Reduced frequency for performance

    return () => clearInterval(interval)
  }, [activeStep, data])

  const CustomDot = (props: any) => {
    const { cx, cy, payload, index } = props
    if (index === data.length - 1 && activeStep === 1) {
      return <Dot cx={cx} cy={cy} r={6} fill="#3B82F6" stroke="#ffffff" strokeWidth={2} />
    }
    return null
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6 h-full min-h-[500px] relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-10 grid-rows-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border border-gray-600" />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className="text-white font-semibold text-lg">BTC/USDT</h3>
          <motion.div
            className="text-green-400 text-2xl font-mono"
            animate={{
              scale: activeStep === 3 ? [1, 1.1, 1] : 1,
              color: activeStep === 4 ? "#10B981" : "#22C55E"
            }}
            transition={{ duration: 0.5 }}
          >
            ${currentPrice.toFixed(2)}
          </motion.div>
        </div>
        <div className="text-right">
          <div className="text-gray-400 text-sm">24h Volume</div>
          <div className="text-white font-mono">$1.2B</div>
        </div>
      </div>

      {/* Main chart */}
      <div className="h-64 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#6B7280' }}
            />
            <YAxis
              domain={['dataMin - 5', 'dataMax + 5']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#6B7280' }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              activeDot={CustomDot}
            />

            {/* Show bid/ask lines when in order step */}
            {activeStep === 2 && (
              <>
                <ReferenceLine
                  y={currentPrice - 0.5}
                  stroke="#EF4444"
                  strokeDasharray="5 5"
                  label={{ value: "Bid", position: "insideTopLeft", fill: "#EF4444" }}
                />
                <ReferenceLine
                  y={currentPrice + 0.5}
                  stroke="#10B981"
                  strokeDasharray="5 5"
                  label={{ value: "Ask", position: "insideTopLeft", fill: "#10B981" }}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Order Book */}
      {activeStep >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 grid grid-cols-2 gap-4 relative z-10"
        >
          {/* Bids */}
          <div>
            <h4 className="text-red-400 text-sm font-semibold mb-2">Bids</h4>
            <div className="space-y-1">
              {orderBook.filter(entry => entry.side === 'bid').slice(0, 3).map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex justify-between text-xs font-mono"
                >
                  <span className="text-red-400">{entry.price.toFixed(2)}</span>
                  <span className="text-gray-400">{entry.size.toFixed(0)}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Asks */}
          <div>
            <h4 className="text-green-400 text-sm font-semibold mb-2">Asks</h4>
            <div className="space-y-1">
              {orderBook.filter(entry => entry.side === 'ask').slice(0, 3).map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex justify-between text-xs font-mono"
                >
                  <span className="text-green-400">{entry.price.toFixed(2)}</span>
                  <span className="text-gray-400">{entry.size.toFixed(0)}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating indicators based on active step */}
      {activeStep === 1 && (
        <motion.div
          className="absolute top-20 right-20 bg-blue-500/20 rounded-full p-3"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BarChart3 className="w-6 h-6 text-blue-400" />
        </motion.div>
      )}

      {activeStep === 3 && (
        <motion.div
          className="absolute bottom-20 left-20 flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded"
              animate={{
                height: [20, 40, 20],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}

export function TradingVisualization() {
  const [activeStep, setActiveStep] = useState(0)
  const [tradingData, setTradingData] = useState(generateTradingData())
  const [animationProgress, setAnimationProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  // Intersection Observer for performance optimization
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isInView || !isVisible) return

    // Auto-step progression - throttled for performance
    const stepInterval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 6000) // Increased from 4s to 6s

    // Data update interval - throttled for performance
    const dataInterval = setInterval(() => {
      setTradingData(generateTradingData())
    }, 3000) // Reduced from 1s to 3s

    return () => {
      clearInterval(stepInterval)
      clearInterval(dataInterval)
    }
  }, [isInView, isVisible])

  useEffect(() => {
    // Animate progress bar
    setAnimationProgress(0)
    const progressInterval = setInterval(() => {
      setAnimationProgress(prev => {
        if (prev >= 100) {
          return 100
        }
        return prev + 1.67 // 100% in 6 seconds (adjusted for new step duration)
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [activeStep])

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How Market Making{' '}
            <span className="bg-gradient-to-r from-primary-blue to-light-blue bg-clip-text text-transparent">
              Actually Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Watch our advanced algorithms in action as they provide liquidity, optimize spreads,
            and enhance price discovery in real-time trading environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                  activeStep === index
                    ? 'border-primary-blue bg-white shadow-xl scale-105'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => setActiveStep(index)}
                whileHover={{ scale: activeStep === index ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Progress bar */}
                {activeStep === index && (
                  <motion.div
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary-blue to-light-blue rounded-t-2xl"
                    initial={{ width: 0 }}
                    animate={{ width: `${animationProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                )}

                <div className="flex items-start space-x-4">
                  <motion.div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeStep === index
                        ? 'bg-primary-blue text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                    animate={{
                      scale: activeStep === index ? [1, 1.1, 1] : 1,
                      rotate: activeStep === index ? [0, 5, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="w-6 h-6" />
                  </motion.div>

                  <div className="flex-grow">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      activeStep === index ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`leading-relaxed ${
                      activeStep === index ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>

                  {/* Step number */}
                  <div className={`text-2xl font-bold ${
                    activeStep === index ? 'text-primary-blue' : 'text-gray-300'
                  }`}>
                    {step.id}
                  </div>
                </div>

                {/* Active step decoration */}
                {activeStep === index && (
                  <motion.div
                    className="absolute -left-3 top-1/2 w-6 h-6 bg-primary-blue rounded-full"
                    initial={{ scale: 0, x: 10 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Interactive Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="sticky top-24"
          >
            <TradingChart
              data={tradingData}
              activeStep={activeStep}
              animationProgress={animationProgress}
            />
          </motion.div>
        </div>

        {/* Auto-play indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
            <motion.div
              className="w-2 h-2 bg-primary-blue rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-sm text-gray-600">Auto-playing demonstration</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}