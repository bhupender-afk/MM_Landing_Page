'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useParallax } from '@/hooks/use-parallax'

const metrics = [
  {
    value: 50,
    suffix: 'B+',
    prefix: '$',
    label: 'Trading Volume',
    description: 'Total volume facilitated across all markets'
  },
  {
    value: 500,
    suffix: '+',
    prefix: '',
    label: 'Active Markets',
    description: 'Cryptocurrency pairs with active market making'
  },
  {
    value: 99.9,
    suffix: '%',
    prefix: '',
    label: 'Uptime',
    description: 'System reliability and availability'
  },
  {
    value: 15,
    suffix: '+',
    prefix: '',
    label: 'Exchanges',
    description: 'Partner exchanges across CEX and DEX'
  },
  {
    value: 0.1,
    suffix: 'ms',
    prefix: '<',
    label: 'Latency',
    description: 'Average order execution time'
  },
  {
    value: 150,
    suffix: '+',
    prefix: '',
    label: 'Projects Served',
    description: 'Successful partnerships and integrations'
  }
]

function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      setDisplayValue(latest)
    })
  }, [springValue])

  const formatValue = (val: number) => {
    if (suffix === '%') {
      return val.toFixed(1)
    }
    if (suffix === 'ms') {
      return val.toFixed(1)
    }
    if (suffix.includes('B')) {
      return Math.floor(val).toString()
    }
    return Math.floor(val).toString()
  }

  return (
    <span ref={ref}>
      {prefix}{formatValue(displayValue)}{suffix}
    </span>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
}

export function Metrics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const parallaxRef = useParallax(15)

  return (
    <section className="py-24 bg-gradient-to-br from-navy-blue to-dark-blue relative overflow-hidden">
      {/* Background Elements */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-light-blue rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary-blue rounded-full blur-2xl" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-black mb-6"
          >
            Our{' '}
            <span className="bg-gradient-to-r from-light-blue to-blue bg-clip-text text-blue-500">
              Impact
            </span>{' '}
            by the Numbers
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-blue-400 max-w-3xl mx-auto leading-relaxed"
          >
            Measurable results that demonstrate our commitment to excellence
            and the value we bring to our partners and the broader ecosystem.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-black mb-3 font-mono">
                    <AnimatedCounter
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      duration={2.5}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">
                    {metric.label}
                  </h3>
                  <p className="text-blue-400/80 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Achievements */}
        <motion.div
          variants={itemVariants}
          className="mt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="text-center lg:text-left"
            >
              <h3 className="text-2xl font-semibold text-black mb-4">
                Industry Recognition
              </h3>
              <ul className="space-y-3 text-blue-400">
                <li className="flex items-center justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-light-blue rounded-full mr-3" />
                  Top-tier market maker across multiple asset classes
                </li>
                <li className="flex items-center justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-light-blue rounded-full mr-3" />
                  Recognized for innovation in DeFi market making
                </li>
                <li className="flex items-center justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-light-blue rounded-full mr-3" />
                  Strategic partnerships with leading exchanges
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center lg:text-left"
            >
              <h3 className="text-2xl font-semibold text-black mb-4">
                Operational Excellence
              </h3>
              <ul className="space-y-3 text-blue-400">
                <li className="flex items-center justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-light-blue rounded-full mr-3" />
                  24/7 global market coverage and support
                </li>
                <li className="flex items-center justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-light-blue rounded-full mr-3" />
                  Institutional-grade security and compliance
                </li>
                <li className="flex items-center justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-light-blue rounded-full mr-3" />
                  Continuous technology advancement and optimization
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}