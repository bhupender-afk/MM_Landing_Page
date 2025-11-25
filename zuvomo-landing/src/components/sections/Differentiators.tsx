'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useParallax } from '@/hooks/use-parallax'
import { CheckCircle, Clock, Award, Users, Lightbulb, Target } from 'lucide-react'

const differentiators = [
  {
    icon: Clock,
    title: 'Ultra-Low Latency',
    description: 'Sub-millisecond execution times with our proprietary infrastructure and co-location strategies.',
    stats: '< 1ms',
    statsLabel: 'Average Execution Time'
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description: 'Years of successful market making across multiple asset classes with consistent performance.',
    stats: '99.9%',
    statsLabel: 'Uptime Reliability'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Seasoned professionals with deep expertise in quantitative finance and blockchain technology.',
    stats: '15+',
    statsLabel: 'Years Combined Experience'
  },
  {
    icon: Lightbulb,
    title: 'Innovative Technology',
    description: 'Cutting-edge algorithms and machine learning models that adapt to changing market conditions.',
    stats: '24/7',
    statsLabel: 'Continuous Innovation'
  },
  {
    icon: Target,
    title: 'Precision Execution',
    description: 'Advanced order management and execution strategies that minimize market impact.',
    stats: '0.01%',
    statsLabel: 'Average Spread Improvement'
  },
  {
    icon: CheckCircle,
    title: 'Regulatory Compliance',
    description: 'Full compliance with global regulatory standards and best practices in all jurisdictions.',
    stats: '100%',
    statsLabel: 'Compliance Rate'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0
  }
}

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1
  }
}

export function Differentiators() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const parallaxRef = useParallax(20)

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 opacity-5"
        aria-hidden="true"
      >
        <svg className="absolute inset-0 h-full w-full" fill="none" viewBox="0 0 400 400">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" stroke="#3B82F6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
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
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Why Choose{' '}
            <span className="bg-gradient-to-r from-primary-blue to-light-blue bg-clip-text text-transparent">
              Zuvomo
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Our competitive advantages that set us apart in the market making industry
            and deliver superior results for our clients.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary-blue/30 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-blue to-light-blue rounded-xl text-white mr-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <motion.div variants={statVariants} className="text-right">
                    <div className="text-2xl font-bold text-primary-blue">{item.stats}</div>
                    <div className="text-sm text-gray-500">{item.statsLabel}</div>
                  </motion.div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed flex-grow">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <motion.div
                variants={statVariants}
                className="text-center border-r border-gray-200 last:border-r-0"
              >
                <div className="text-4xl font-bold text-primary-blue mb-2">500+</div>
                <div className="text-gray-600">Trading Pairs</div>
              </motion.div>
              <motion.div
                variants={statVariants}
                className="text-center border-r border-gray-200 last:border-r-0"
              >
                <div className="text-4xl font-bold text-primary-blue mb-2">$10B+</div>
                <div className="text-gray-600">Volume Facilitated</div>
              </motion.div>
              <motion.div
                variants={statVariants}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-blue mb-2">99.9%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}