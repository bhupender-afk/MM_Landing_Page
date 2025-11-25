'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer mb-4"
              onClick={scrollToTop}
            >
               <Image
                            src="/assets/Zuvomo1.png"
                            alt="Zuvomo"
                            width={120}
                            height={40}
                            className="h-8 w-auto"
                            priority
                          />
            </motion.div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Professional market making services that enhance liquidity and optimize
              trading experiences across digital asset markets.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:contact@zuvomo.com"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-blue rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://t.me/zuvomo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-blue rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Telegram"
              >
                <MessageSquare className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-blue rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-blue rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-white transition-colors duration-300">Algorithmic Market Making</a></li>
              <li><a href="#services" className="hover:text-white transition-colors duration-300">High-Frequency Trading</a></li>
              <li><a href="#services" className="hover:text-white transition-colors duration-300">Risk Management</a></li>
              <li><a href="#services" className="hover:text-white transition-colors duration-300">Analytics & Reporting</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#team" className="hover:text-white transition-colors duration-300">Team</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors duration-300">Partners</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Risk Disclosure</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Zuvomo. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Professional market making services for the digital asset ecosystem.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}