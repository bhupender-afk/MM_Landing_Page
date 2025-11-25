'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Zap, Shield, BarChart3, Globe, Cpu } from 'lucide-react'

const services = [
  {
    icon: TrendingUp,
    title: 'Algorithmic Market Making',
    description: 'Advanced algorithms that provide continuous liquidity and optimize spreads across multiple trading pairs and exchanges.',
    features: ['24/7 automated trading', 'Dynamic spread optimization', 'Risk management protocols']
  },
  {
    icon: Zap,
    title: 'High-Frequency Trading',
    description: 'Ultra-low latency execution with sophisticated order management systems for maximum market efficiency.',
    features: ['Microsecond execution', 'Co-location services', 'Smart order routing']
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Comprehensive risk controls and monitoring systems to protect capital while maintaining optimal market presence.',
    features: ['Real-time monitoring', 'Automated stop-loss', 'Portfolio hedging']
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Deep market insights and performance analytics to continuously improve trading strategies and market impact.',
    features: ['Performance metrics', 'Market analysis', 'Custom reporting']
  },
  {
    icon: Globe,
    title: 'Multi-Exchange Support',
    description: 'Seamless integration across major centralized and decentralized exchanges for maximum market reach.',
    features: ['CEX & DEX integration', 'Cross-chain support', 'Unified management']
  },
  {
    icon: Cpu,
    title: 'Custom Solutions',
    description: 'Tailored market making solutions designed to meet specific project requirements and market conditions.',
    features: ['Bespoke algorithms', 'Custom integrations', 'Dedicated support']
  }
]

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

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
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
            What We Do
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            We provide comprehensive market making services that enhance liquidity,
            improve price discovery, and optimize trading experiences across digital asset markets.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-gray-200 hover:border-primary-blue/30">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-blue to-light-blue rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 text-center leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-primary-blue rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-ultra-light-blue to-extra-light-blue rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to enhance your market liquidity?
            </h3>
            <p className="text-gray-600 mb-6">
              Get in touch with our team to discuss how our market making services
              can benefit your project and improve your trading ecosystem.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-blue hover:bg-dark-blue text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Us Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}