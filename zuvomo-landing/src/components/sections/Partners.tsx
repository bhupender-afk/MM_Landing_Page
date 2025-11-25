'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const partners = [
  { name: 'Bybit', logo: '/assets/Bybit.png' },
  { name: 'Bitget', logo: '/assets/bitget.png' },
  { name: 'BitMart', logo: '/assets/bitmart.png' },
  { name: 'Gate.io', logo: '/assets/GATE.png' },
  { name: 'KuCoin', logo: '/assets/KUCOIN 3.png' },
  { name: 'MEXC', logo: '/assets/mexc.png' },
  { name: 'Pool', logo: '/assets/pool.png' },
  { name: 'Uniswap', logo: '/assets/UNISWAP.png' },
  { name: 'Dexcheck', logo: '/assets/Dexcheck (1).png' },
  { name: 'Fomofund', logo: '/assets/Fomofund (1).png' },
  { name: 'Landshare', logo: '/assets/Landshare (1).png' },
  { name: 'Morpheus', logo: '/assets/Morpheus (1).png' },
  { name: 'Pencils Protocol', logo: '/assets/Pencils Protocol (1).png' },
  { name: 'Vulcan', logo: '/assets/Vulcan (1).png' },
  { name: 'Zebec', logo: '/assets/Zebec (1).png' }
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1
  }
}

export function Partners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-24 bg-white">
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
            Trusted{' '}
            <span className="bg-gradient-to-r from-primary-blue to-light-blue bg-clip-text text-transparent">
              Partners
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            We collaborate with leading exchanges and innovative projects to deliver
            exceptional market making services across the digital asset ecosystem.
          </motion.p>
        </motion.div>

        {/* Exchange Partners */}
        <motion.div variants={containerVariants} className="mb-16">
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-semibold text-gray-800 text-center mb-8"
          >
            Exchange Partners
          </motion.h3>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center"
          >
            {partners.slice(0, 8).map((partner, index) => (
              <motion.div
                key={index}
                variants={logoVariants}
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 group cursor-pointer"
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={80}
                  height={40}
                  className="max-h-10 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Project Partners */}
        <motion.div variants={containerVariants}>
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-semibold text-gray-800 text-center mb-8"
          >
            Project Partners
          </motion.h3>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-8 items-center"
          >
            {partners.slice(8).map((partner, index) => (
              <motion.div
                key={index + 8}
                variants={logoVariants}
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 group cursor-pointer"
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={100}
                  height={50}
                  className="max-h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Partnership CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary-blue to-light-blue rounded-2xl p-8 max-w-4xl mx-auto text-white">
            <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
              Interested in Partnering with Us?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join our growing network of exchanges and projects benefiting from
              professional market making services that enhance liquidity and trading experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-blue hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Become a Partner
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-primary-blue px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                onClick={() => window.open('https://t.me/zuvomo', '_blank')}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}