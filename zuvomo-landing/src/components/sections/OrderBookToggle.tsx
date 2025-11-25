'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Enhanced data structure with realistic trading metrics
const orderBookData = {
  before: {
    bids: [
      { price: 50245.20, volume: 12.5, cumulative: 12.5 },
      { price: 50244.80, volume: 8.3, cumulative: 20.8 },
      { price: 50244.40, volume: 15.7, cumulative: 36.5 },
      { price: 50244.00, volume: 6.2, cumulative: 42.7 },
      { price: 50243.60, volume: 9.8, cumulative: 52.5 }
    ],
    asks: [
      { price: 50246.80, volume: 10.2, cumulative: 10.2 },
      { price: 50247.20, volume: 7.5, cumulative: 17.7 },
      { price: 50247.60, volume: 12.1, cumulative: 29.8 },
      { price: 50248.00, volume: 5.8, cumulative: 35.6 },
      { price: 50248.40, volume: 8.9, cumulative: 44.5 }
    ],
    metrics: {
      totalVolume: "$2.4M",
      avgTradeSize: "$1,200",
      dailyTransactions: "1,247",
      bidAskSpread: "0.85%",
      spreadAmount: "$4.20",
      tradeImpact1: "0.45%",
      tradeImpact5: "2.1%",
      largeOrderSlippage: "5.2%"
    },
    label: "Before Zuvomo - Low Liquidity",
    color: "bg-orange-500",
    borderColor: "border-orange-500/30"
  },
  after: {
    bids: [
      { price: 50245.40, volume: 45.8, cumulative: 45.8 },
      { price: 50245.20, volume: 38.2, cumulative: 84.0 },
      { price: 50245.00, volume: 52.6, cumulative: 136.6 },
      { price: 50244.80, volume: 28.9, cumulative: 165.5 },
      { price: 50244.60, volume: 35.4, cumulative: 200.9 }
    ],
    asks: [
      { price: 50246.00, volume: 42.3, cumulative: 42.3 },
      { price: 50246.20, volume: 35.7, cumulative: 78.0 },
      { price: 50246.40, volume: 48.1, cumulative: 126.1 },
      { price: 50246.60, volume: 25.8, cumulative: 151.9 },
      { price: 50246.80, volume: 31.2, cumulative: 183.1 }
    ],
    metrics: {
      totalVolume: "$8.7M",
      avgTradeSize: "$3,800",
      dailyTransactions: "4,832",
      bidAskSpread: "0.12%",
      spreadAmount: "$0.58",
      tradeImpact1: "0.08%",
      tradeImpact5: "0.34%",
      largeOrderSlippage: "0.9%"
    },
    label: "After Zuvomo - Deep Liquidity",
    color: "bg-emerald-500",
    borderColor: "border-emerald-500/30"
  }
}

export function OrderBookToggle() {
  const [isAfter, setIsAfter] = useState(false)
  const [autoToggle, setAutoToggle] = useState(true)
  const currentData = isAfter ? orderBookData.after : orderBookData.before

  const handleToggle = () => {
    setIsAfter(!isAfter)
    setAutoToggle(false) // Stop auto-toggle when user manually clicks
  }

  // Auto-toggle effect to demonstrate the improvement
  useEffect(() => {
    if (!autoToggle) return

    const interval = setInterval(() => {
      setIsAfter(prev => !prev)
    }, 4000) // Toggle every 4 seconds

    return () => clearInterval(interval)
  }, [autoToggle])

  // Calculate max volume for scaling
  const maxVolume = Math.max(
    ...currentData.bids.map(bid => bid.volume),
    ...currentData.asks.map(ask => ask.volume)
  )

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Market Making Impact
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              See how Zuvomo transforms market liquidity with deeper order books and reduced slippage
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Volume Metrics */}
            <motion.div
              className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 ${currentData.borderColor} transition-all duration-500`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 text-xl">📊</span>
                </div>
                <h3 className="text-white font-semibold text-lg">Volume</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Volume</span>
                  <span className="text-white font-mono font-bold">{currentData.metrics.totalVolume}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Avg Trade</span>
                  <span className="text-white font-mono">{currentData.metrics.avgTradeSize}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Daily Trades</span>
                  <span className="text-white font-mono">{currentData.metrics.dailyTransactions}</span>
                </div>
              </div>
            </motion.div>

            {/* Spread Metrics */}
            <motion.div
              className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 ${currentData.borderColor} transition-all duration-500`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-400 text-xl">📏</span>
                </div>
                <h3 className="text-white font-semibold text-lg">Spread</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Bid-Ask Spread</span>
                  <span className="text-white font-mono font-bold">{currentData.metrics.bidAskSpread}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Spread Amount</span>
                  <span className="text-white font-mono">{currentData.metrics.spreadAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Improvement</span>
                  <span className={`font-mono font-bold ${isAfter ? 'text-emerald-400' : 'text-orange-400'}`}>
                    {isAfter ? '86% Better' : 'Baseline'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Slippage Metrics */}
            <motion.div
              className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 ${currentData.borderColor} transition-all duration-500`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-red-400 text-xl">🎯</span>
                </div>
                <h3 className="text-white font-semibold text-lg">Slippage</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">1% Trade Impact</span>
                  <span className="text-white font-mono font-bold">{currentData.metrics.tradeImpact1}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">5% Trade Impact</span>
                  <span className="text-white font-mono">{currentData.metrics.tradeImpact5}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Large Orders</span>
                  <span className="text-white font-mono">{currentData.metrics.largeOrderSlippage}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Order Book */}
          <div
            className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 cursor-pointer hover:bg-slate-800/70 transition-colors duration-300"
            onClick={handleToggle}
          >
            {/* Click hint and auto-toggle indicator */}
            <div className="absolute top-4 right-4 text-gray-400 text-sm opacity-70 flex items-center gap-2">
              {autoToggle && (
                <div className="flex items-center gap-1 mr-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-xs">Auto-demo</span>
                </div>
              )}
              <span>Click to toggle</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>

            {/* Order Book Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-emerald-500 rounded-lg text-white font-semibold flex items-center gap-2">
                  <span>📈</span> Bids
                </div>
                <div className="text-white/60 text-sm">
                  Best: <span className="font-mono text-white">${currentData.bids[0].price.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-white/40 text-xs mb-1">SPREAD</div>
                <div className="text-white font-mono text-sm bg-slate-700/50 px-3 py-1 rounded">
                  {currentData.metrics.spreadAmount}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-white/60 text-sm">
                  Best: <span className="font-mono text-white">${currentData.asks[0].price.toLocaleString()}</span>
                </div>
                <div className="px-4 py-2 bg-orange-500 rounded-lg text-white font-semibold flex items-center gap-2">
                  <span>📉</span> Asks
                </div>
              </div>
            </div>

            {/* Order Book Chart */}
            <div className="relative h-80 flex items-center">
              {/* Center divider line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-500 z-10 transform -translate-x-0.5" />

              {/* Bids (Left side - Green) */}
              <div className="flex-1 h-full flex flex-col justify-center space-y-1 pr-4">
                {currentData.bids.map((bid, index) => (
                  <div key={`bid-${index}`} className="flex items-center justify-end group">
                    {/* Price and Volume Labels */}
                    <div className="flex items-center gap-4 mr-3 min-w-[140px]">
                      <span className="text-white/60 font-mono text-sm">${bid.price.toLocaleString()}</span>
                      <span className="text-emerald-400 font-mono text-sm">{bid.volume.toFixed(1)}</span>
                    </div>
                    {/* Volume Bar */}
                    <motion.div
                      className="bg-gradient-to-l from-emerald-500 to-emerald-400 h-10 rounded-l-lg relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(bid.volume / maxVolume) * 100}%`,
                        transition: { duration: 0.8, delay: index * 0.1 }
                      }}
                      layout
                    >
                      {/* Depth indicator */}
                      <div
                        className="absolute right-0 top-0 h-full bg-emerald-300/30"
                        style={{ width: `${Math.min(100, (bid.cumulative / 200) * 100)}%` }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Asks (Right side - Orange) */}
              <div className="flex-1 h-full flex flex-col justify-center space-y-1 pl-4">
                {currentData.asks.map((ask, index) => (
                  <div key={`ask-${index}`} className="flex items-center justify-start group">
                    {/* Volume Bar */}
                    <motion.div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-10 rounded-r-lg relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(ask.volume / maxVolume) * 100}%`,
                        transition: { duration: 0.8, delay: index * 0.1 }
                      }}
                      layout
                    >
                      {/* Depth indicator */}
                      <div
                        className="absolute left-0 top-0 h-full bg-red-300/30"
                        style={{ width: `${Math.min(100, (ask.cumulative / 200) * 100)}%` }}
                      />
                    </motion.div>
                    {/* Price and Volume Labels */}
                    <div className="flex items-center gap-4 ml-3 min-w-[140px]">
                      <span className="text-orange-400 font-mono text-sm">{ask.volume.toFixed(1)}</span>
                      <span className="text-white/60 font-mono text-sm">${ask.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* State Label */}
            <motion.div
              className="mt-8 flex justify-center"
              key={currentData.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`flex items-center gap-3 px-6 py-3 ${currentData.color} rounded-xl text-white font-semibold shadow-lg`}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                {currentData.label}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}