'use client'

import React from 'react'

/**
 * Emergency performance wrapper that strips all animations
 * Use this to wrap any component when performance is critical
 */
export function NoAnimation({
  children,
  fallback
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  // Check if we're in high performance mode
  const isHighPerformanceMode = typeof window !== 'undefined' &&
    document.body.classList.contains('high-performance-mode')

  if (isHighPerformanceMode && fallback) {
    return <>{fallback}</>
  }

  // Strip animations from children
  const processChildren = (node: React.ReactNode): React.ReactNode => {
    if (React.isValidElement(node)) {
      // If it's a motion component, convert to regular div
      if (typeof node.type === 'string' && node.type.includes('motion')) {
        const { animate, initial, transition, whileHover, whileTap, ...restProps } = node.props
        return React.createElement('div', restProps, processChildren(node.props.children))
      }

      // For regular components, process their children
      if (node.props?.children) {
        return React.cloneElement(node, {
          ...node.props,
          children: processChildren(node.props.children)
        })
      }
    }

    if (Array.isArray(node)) {
      return node.map(processChildren)
    }

    return node
  }

  return <>{isHighPerformanceMode ? processChildren(children) : children}</>
}

/**
 * Static version of components for emergency performance mode
 */
export const StaticHero = React.memo(function StaticHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-ultra-light-blue to-extra-light-blue">
      {/* Static background */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-blue rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-light-blue rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-extra-light-blue rounded-full blur-xl" />
      </div>

      {/* Static content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <img
              src="/assets/zuvomo_01.png"
              alt="Zuvomo Logo"
              className="mx-auto h-16 w-auto"
              width={200}
              height={80}
            />
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Professional{' '}
            <span className="bg-gradient-to-r from-primary-blue to-light-blue bg-clip-text text-transparent">
              Market Making
            </span>{' '}
            Services
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Advanced algorithmic trading solutions and liquidity provision across
            centralized and decentralized exchanges. Enhancing market depth and
            reducing spreads for optimal price discovery.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary-blue to-light-blue text-white rounded-xl">
              Get Started
            </button>
            <button className="px-8 py-6 text-lg font-semibold bg-white text-primary-blue border-2 border-primary-blue rounded-xl">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
})