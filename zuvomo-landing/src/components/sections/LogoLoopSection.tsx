'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'

// Exchange and trading platform logos for infinite scroll
const exchangeLogos = [
  { name: 'Binance', color: '#F3BA2F' },
  { name: 'Coinbase', color: '#0052FF' },
  { name: 'Kraken', color: '#5741D9' },
  { name: 'KuCoin', color: '#00D4AA' },
  { name: 'Bitfinex', color: '#5A3A7E' },
  { name: 'Huobi', color: '#2B8AD4' },
  { name: 'OKX', color: '#000000' },
  { name: 'FTX', color: '#5FCADE' },
  { name: 'Uniswap', color: '#FF007A' },
  { name: 'Sushiswap', color: '#0E0F23' },
  { name: 'PancakeSwap', color: '#D1884F' },
  { name: 'Curve', color: '#40649F' }
]

// Trading icons for floating animations
const tradingIcons = [
  { icon: '📈', name: 'Trending Up', delay: 0 },
  { icon: '📊', name: 'Chart', delay: 0.5 },
  { icon: '💰', name: 'Money', delay: 1 },
  { icon: '🚀', name: 'Rocket', delay: 1.5 },
  { icon: '💎', name: 'Diamond', delay: 2 },
  { icon: '⚡', name: 'Lightning', delay: 2.5 },
  { icon: '🎯', name: 'Target', delay: 3 },
  { icon: '🔥', name: 'Fire', delay: 3.5 }
]

export const LogoLoopSection = memo(function LogoLoopSection() {
  // Create duplicated arrays for seamless infinite scroll
  const duplicatedLogos = [...exchangeLogos, ...exchangeLogos]

  return (
    <section className="relative py-16 bg-gradient-to-br from-[#2f3a63]/50 via-[#2f3a63]/30 to-[#2f3a63]/50 overflow-hidden">
      {/* Floating Trading Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        {tradingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 600,
              rotate: 0,
              scale: 0.5
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [null, Math.random() * 600, Math.random() * 600],
              rotate: [0, 180, 360],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear"
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Integrated Across Leading Exchanges
          </h3>
          <p className="text-white/60 max-w-2xl mx-auto">
            Seamlessly connected to major trading platforms worldwide
          </p>
        </motion.div>

        {/* First Row - Moving Right */}
        <div className="relative mb-8 overflow-hidden">
          <motion.div
            className="flex gap-8 items-center"
            animate={{
              x: [-1000, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ width: 'fit-content' }}
          >
            {duplicatedLogos.slice(0, 8).map((logo, index) => (
              <motion.div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 group"
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div className="w-32 h-20 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center hover:border-[#f8673c]/50 transition-all duration-300">
                  <div
                    className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300"
                    style={{ color: logo.color }}
                  >
                    {logo.name.substring(0, 3)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Moving Left */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 items-center"
            animate={{
              x: [0, -1000]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ width: 'fit-content' }}
          >
            {duplicatedLogos.slice(4).map((logo, index) => (
              <motion.div
                key={`${logo.name}-reverse-${index}`}
                className="flex-shrink-0 group"
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div className="w-32 h-20 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center hover:border-[#2B91D6]/50 transition-all duration-300">
                  <div
                    className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300"
                    style={{ color: logo.color }}
                  >
                    {logo.name.substring(0, 3)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '15ms', label: 'Avg Latency', color: '#2B91D6' },
              { value: '150+', label: 'Trading Pairs', color: '#f8673c' },
              { value: '24/7', label: 'Operations', color: '#2B91D6' },
              { value: '99.9%', label: 'Reliability', color: '#f8673c' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="text-3xl lg:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
})