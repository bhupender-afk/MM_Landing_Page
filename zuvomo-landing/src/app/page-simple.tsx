'use client'

import { memo } from 'react'
import Image from 'next/image'

// Ultra-simple components without any animations
const SimpleNavigation = memo(function SimpleNavigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Image
            src="/assets/zuvomo_01.png"
            alt="Zuvomo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="font-medium text-gray-800 hover:text-primary-blue">Services</a>
            <a href="#about" className="font-medium text-gray-800 hover:text-primary-blue">About</a>
            <a href="#partners" className="font-medium text-gray-800 hover:text-primary-blue">Partners</a>
            <a href="#team" className="font-medium text-gray-800 hover:text-primary-blue">Team</a>
            <a href="#contact" className="font-medium text-gray-800 hover:text-primary-blue">Contact</a>
            <button className="bg-primary-blue hover:bg-dark-blue text-white px-6 py-2 rounded-lg font-semibold">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
})

const SimpleHero = memo(function SimpleHero() {
  return (
    <section className="pt-20 min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Image
              src="/assets/zuvomo_01.png"
              alt="Zuvomo Logo"
              width={200}
              height={80}
              className="mx-auto h-16 w-auto"
              priority
            />
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
            Professional Market Making Services
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Advanced algorithmic trading solutions and liquidity provision across
            centralized and decentralized exchanges.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-primary-blue hover:bg-dark-blue text-white px-8 py-4 rounded-xl font-semibold">
              Get Started
            </button>
            <button className="bg-white hover:bg-gray-50 text-primary-blue border-2 border-primary-blue px-8 py-4 rounded-xl font-semibold">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
})

const SimpleServices = memo(function SimpleServices() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">What We Do</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive market making services that enhance liquidity,
            improve price discovery, and optimize trading experiences.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            'Algorithmic Market Making',
            'High-Frequency Trading',
            'Risk Management',
            'Analytics & Reporting',
            'Multi-Exchange Support',
            'Custom Solutions'
          ].map((service) => (
            <div key={service} className="bg-white p-6 rounded-xl border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{service}</h3>
              <p className="text-gray-600">
                Professional trading solutions for optimal market efficiency.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

const SimpleContact = memo(function SimpleContact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Get In Touch</h2>
        <p className="text-xl text-gray-600 mb-8">
          Ready to enhance your market liquidity? Contact our team.
        </p>
        <button className="bg-primary-blue hover:bg-dark-blue text-white px-8 py-4 rounded-xl font-semibold">
          Contact Us
        </button>
      </div>
    </section>
  )
})

const SimpleFooter = memo(function SimpleFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <p>&copy; 2024 Zuvomo. All rights reserved.</p>
      </div>
    </footer>
  )
})

// Ultra-simple page with zero animations and minimal complexity
export default function SimplePage() {
  return (
    <main className="font-sans">
      <SimpleNavigation />
      <SimpleHero />
      <SimpleServices />
      <SimpleContact />
      <SimpleFooter />
    </main>
  )
}