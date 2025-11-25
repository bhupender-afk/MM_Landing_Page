'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Linkedin, Github, Twitter } from 'lucide-react'

const team = [
  {
    name: 'Alex Chen',
    role: 'Chief Executive Officer',
    experience: '15+ years in quantitative finance',
    background: 'Former Goldman Sachs quantitative trader with expertise in algorithmic trading and risk management.',
    specialties: ['Algorithmic Trading', 'Risk Management', 'Financial Engineering'],
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Sarah Rodriguez',
    role: 'Chief Technology Officer',
    experience: '12+ years in fintech & blockchain',
    background: 'Ex-Coinbase Principal Engineer, leading blockchain infrastructure and high-performance trading systems.',
    specialties: ['Blockchain Infrastructure', 'High-Frequency Trading', 'System Architecture'],
    social: {
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Michael Kim',
    role: 'Head of Trading',
    experience: '10+ years in cryptocurrency markets',
    background: 'Previously led trading operations at major cryptocurrency exchanges with focus on market making and liquidity.',
    specialties: ['Market Making', 'Cryptocurrency Trading', 'Liquidity Provision'],
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Emma Thompson',
    role: 'Head of Compliance',
    experience: '8+ years in regulatory compliance',
    background: 'Former SEC advisor specializing in cryptocurrency regulations and compliance frameworks.',
    specialties: ['Regulatory Compliance', 'Legal Framework', 'Risk Assessment'],
    social: {
      linkedin: '#'
    }
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

export function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-24 bg-gray-50">
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
            Meet Our{' '}
            <span className="bg-gradient-to-r from-primary-blue to-light-blue bg-clip-text text-transparent">
              Expert Team
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Our leadership team combines decades of experience in traditional finance,
            quantitative trading, and blockchain technology to deliver cutting-edge market making solutions.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {team.map((member, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-gray-200">
                <CardContent className="p-8">
                  {/* Avatar Placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-blue to-light-blue rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary-blue font-medium text-lg mb-1">
                      {member.role}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {member.experience}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed text-center">
                    {member.background}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty, specialtyIndex) => (
                        <span
                          key={specialtyIndex}
                          className="px-3 py-1 bg-extra-light-blue text-primary-blue text-xs font-medium rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    {member.social.linkedin && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.social.linkedin}
                        className="w-10 h-10 bg-gray-100 hover:bg-primary-blue hover:text-white rounded-full flex items-center justify-center transition-colors duration-300"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                    )}
                    {member.social.github && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.social.github}
                        className="w-10 h-10 bg-gray-100 hover:bg-primary-blue hover:text-white rounded-full flex items-center justify-center transition-colors duration-300"
                        aria-label={`${member.name} GitHub`}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                    {member.social.twitter && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.social.twitter}
                        className="w-10 h-10 bg-gray-100 hover:bg-primary-blue hover:text-white rounded-full flex items-center justify-center transition-colors duration-300"
                        aria-label={`${member.name} Twitter`}
                      >
                        <Twitter className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Advisory Board */}
        <motion.div
          variants={itemVariants}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Backed by Industry Advisors
          </h3>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-gray-600 leading-relaxed mb-6">
              Our advisory board includes former executives from leading financial institutions,
              blockchain pioneers, and regulatory experts who guide our strategic vision and
              ensure we maintain the highest standards of professionalism and innovation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-blue mb-1">50+</div>
                <div className="text-gray-600 text-sm">Combined Years in Traditional Finance</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-blue mb-1">25+</div>
                <div className="text-gray-600 text-sm">Years in Blockchain & DeFi</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-blue mb-1">15+</div>
                <div className="text-gray-600 text-sm">Regulatory & Compliance Expertise</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}