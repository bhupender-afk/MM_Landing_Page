'use client'

import { memo, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Original media/news logos from AsSeen.ts file
const mediaLogos = [
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/cc95740ca28db7fc39e20601cc3afc030133498f?placeholderIfAbsent=true",
    alt: "News Media Logo 1",
    size: "h-12"
  },
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/bebd155ece411431e9f6ab55893e73d66022da59?placeholderIfAbsent=true",
    alt: "News Media Logo 2",
    size: "h-10"
  },
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/2d53b2539cdd551f17a435906deaf8db10b7d759?placeholderIfAbsent=true",
    alt: "News Media Logo 3",
    size: "h-12"
  },
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/d76717f35a07bd2bedfb7481cfdab0c7f9ce50d2?placeholderIfAbsent=true",
    alt: "News Media Logo 4",
    size: "h-12"
  },
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/57eddc4281d393a4b2deb2447243e5ee199a259c?placeholderIfAbsent=true",
    alt: "News Media Logo 5",
    size: "h-12"
  },
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/2e78ffe82ec17f63f9ca27386ded03022e92b08d?placeholderIfAbsent=true",
    alt: "News Media Logo 6",
    size: "h-16"
  },
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/6d548a92b4185947a5734467a245221e27633369?placeholderIfAbsent=true",
    alt: "News Media Logo 7",
    size: "h-12"
  },
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/6c221620bd198b674e1e1cf2308f89670361f63f?placeholderIfAbsent=true",
    alt: "News Media Logo 8",
    size: "h-12"
  },
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/1a1d94d222b6ad304265e0a5a5cb5825b9b265e2?placeholderIfAbsent=true",
    alt: "News Media Logo 9",
    size: "h-10"
  }
]



export const AsSeen = memo(function AsSeen() {
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-[#2f3a63] via-[#2f3a63]/98 to-[#2f3a63]">
      <div className="container mx-auto px-6 lg:px-8">

        {/* Animated Section Header */}
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="h-0.5 w-12 bg-gradient-to-r from-transparent to-[#f8673c]"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
            <div className="relative">
              <motion.h2
                className="text-3xl lg:text-5xl font-bold text-black tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {["A", "s", " ", "S", "e", "e", "n", " ", "I", "n"].map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.h2>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#2B91D6] to-[#f8673c] rounded-full"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 64, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
              ></motion.div>
            </div>
            <motion.div
              className="h-0.5 w-12 bg-gradient-to-l from-transparent to-[#2B91D6]"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.div>
          <motion.p
            className="text-black/70 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            viewport={{ once: true }}
          >
            Featured across leading financial publications and trusted by industry experts worldwide
          </motion.p>
        </div>

        {/* Animated Media Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
          {mediaLogos.map((logo, index) => (
            <motion.div
              key={index}
              className="group relative"
              custom={index % 2 === 0 ? 'left' : 'right'}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                scale: 0.8
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1
              }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredLogo(index)}
              onMouseLeave={() => setHoveredLogo(null)}
              whileHover={{ y: -5 }}
            >
              {/* Glassmorphism Card */}
              <motion.div className={`
                relative p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500
                ${hoveredLogo === index
                  ? 'bg-white/15 border-[#f8673c]/50 shadow-2xl shadow-[#f8673c]/20'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
                }
              `}
              animate={{
                y: [0, -2, 0],
                rotate: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + (index * 0.2),
                repeat: Infinity,
                ease: "easeInOut"
              }}
              >
                {/* Spotlight Effect */}
                {hoveredLogo === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#f8673c]/10 via-transparent to-[#2B91D6]/10 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  ></motion.div>
                )}

                {/* Logo Container */}
                <div className="relative z-10 flex items-center justify-center h-16">
                  <motion.img
                    src={logo.url}
                    alt={logo.alt}
                    className={`
                      ${logo.size} w-auto object-contain transition-all duration-500
                      ${hoveredLogo === index
                        ? 'filter-none opacity-100'
                        : 'grayscale opacity-60 hover:opacity-80'
                      }
                    `}
                    loading="lazy"
                    whileHover={{ scale: 1.1, filter: "grayscale(0%)" }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Animated Border Gradient */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#2B91D6]/20 via-[#f8673c]/20 to-[#2B91D6]/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredLogo === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </motion.div>

              {/* Animated Badge/Label */}
              <motion.div
                className={`
                  absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium
                  ${hoveredLogo === index
                    ? 'bg-[#f8673c] text-black shadow-lg'
                    : 'bg-white/10 text-black/60'
                  }
                `}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: hoveredLogo === index ? 1 : 0,
                  scale: hoveredLogo === index ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
              >
                Media Partner
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust Metrics */}
        {/* <div className="border-t border-white/10 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {trustMetrics.map((metric) => (
              <div key={metric.label} className="text-center group">
                <div className="relative mb-4">
                  <div
                    className="text-4xl lg:text-5xl font-bold transition-all duration-300 group-hover:scale-110"
                    style={{ color: metric.color }}
                  >
                    {metric.value}
                  </div>
                  <div className="absolute inset-0 blur-xl opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                       style={{ background: metric.color }}></div>
                </div>
                <div className="text-black/70 text-sm font-medium tracking-wide uppercase">
                  {metric.label}
                </div>
                <div
                  className="h-0.5 w-12 mx-auto mt-3 rounded-full transition-all duration-300 group-hover:w-16"
                  style={{ backgroundColor: metric.color, opacity: 0.6 }}
                ></div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Professional Footer */}
        {/* <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-black/50 text-sm">
            <div className="flex items-center gap-2 hover:text-black/70 transition-colors duration-300">
              <div className="w-1.5 h-1.5 bg-[#2B91D6] rounded-full animate-pulse"></div>
              Verified Coverage
            </div>
            <div className="flex items-center gap-2 hover:text-black/70 transition-colors duration-300">
              <div className="w-1.5 h-1.5 bg-[#f8673c] rounded-full animate-pulse"></div>
              Global Recognition
            </div>
            <div className="flex items-center gap-2 hover:text-black/70 transition-colors duration-300">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              Industry Authority
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
})