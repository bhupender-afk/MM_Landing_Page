'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  loading?: boolean
  effect?: 'glow' | 'ripple' | 'magnetic' | 'particles' | 'morph'
  className?: string
}

// Particle effect for buttons
const ParticleEffect = ({ isActive }: { isActive: boolean }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <div className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: '50%',
                y: '50%',
                opacity: 0,
                scale: 0
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 200}%`,
                y: `${50 + (Math.random() - 0.5) * 200}%`,
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              exit={{
                opacity: 0,
                scale: 0
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.05,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

// Ripple effect for buttons
const RippleEffect = ({ isActive, position }: {
  isActive: boolean
  position: { x: number, y: number }
}) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: position.x - 10,
            top: position.y - 10,
            width: 20,
            height: 20,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 15, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  )
}

// Loading spinner
const LoadingSpinner = () => (
  <motion.div
    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
)

export function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  effect = 'glow',
  className = ''
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [effectActive, setEffectActive] = useState(false)
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Magnetic effect with throttling
  useEffect(() => {
    if (effect !== 'magnetic' || !buttonRef.current) return

    let throttleTimer: NodeJS.Timeout | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimer) return

      throttleTimer = setTimeout(() => {
        throttleTimer = null
      }, 16) // Throttle to ~60fps

      const rect = buttonRef.current!.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      setMousePosition({ x, y })
    }

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 })
      if (throttleTimer) {
        clearTimeout(throttleTimer)
        throttleTimer = null
      }
    }

    const button = buttonRef.current
    button.addEventListener('mousemove', handleMouseMove, { passive: true })
    button.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      if (throttleTimer) {
        clearTimeout(throttleTimer)
      }
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [effect])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    // Ripple effect
    if (effect === 'ripple' && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setRipplePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    // Trigger effects
    setEffectActive(true)
    setTimeout(() => setEffectActive(false), 800)

    onClick?.()
  }

  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-primary-blue/20 overflow-hidden"

  const variantStyles = {
    primary: "bg-primary-blue hover:bg-dark-blue text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white hover:bg-gray-50 text-primary-blue border-2 border-primary-blue shadow-md hover:shadow-lg",
    ghost: "bg-transparent hover:bg-primary-blue/10 text-primary-blue",
    gradient: "bg-gradient-to-r from-primary-blue to-light-blue hover:from-dark-blue hover:to-primary-blue text-white shadow-lg hover:shadow-xl"
  }

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  const magneticTransform = effect === 'magnetic'
    ? `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
    : 'none'

  return (
    <motion.button
      ref={buttonRef}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled || loading}
      style={{
        transform: magneticTransform
      }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: effect === 'magnetic' ? 1.05 : 1.02 }}
      animate={{
        boxShadow: effect === 'glow' && isHovered
          ? `0 0 20px ${variant === 'primary' || variant === 'gradient' ? '#3B82F660' : '#3B82F640'}`
          : undefined
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Background effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Ripple effect */}
      {effect === 'ripple' && (
        <div className="absolute inset-0 overflow-hidden rounded-inherit">
          <RippleEffect isActive={effectActive} position={ripplePosition} />
        </div>
      )}

      {/* Particle effect */}
      {effect === 'particles' && (
        <ParticleEffect isActive={effectActive} />
      )}

      {/* Glow effect */}
      {effect === 'glow' && (
        <motion.div
          className="absolute inset-0 rounded-inherit"
          animate={{
            boxShadow: isHovered
              ? `inset 0 0 20px ${variant === 'primary' || variant === 'gradient' ? '#FFFFFF20' : '#3B82F620'}`
              : 'inset 0 0 0px transparent'
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center space-x-2">
        {loading && <LoadingSpinner />}

        {Icon && iconPosition === 'left' && !loading && (
          <motion.div
            animate={{
              rotate: isHovered ? 5 : 0,
              scale: isPressed ? 0.9 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )}

        <motion.span
          animate={{
            scale: isPressed ? 0.95 : 1,
            y: effect === 'morph' && isHovered ? -1 : 0
          }}
          transition={{ duration: 0.1 }}
        >
          {children}
        </motion.span>

        {Icon && iconPosition === 'right' && !loading && (
          <motion.div
            animate={{
              rotate: isHovered ? -5 : 0,
              scale: isPressed ? 0.9 : 1,
              x: isHovered ? 2 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )}
      </div>

      {/* Morphing border effect */}
      {effect === 'morph' && (
        <motion.div
          className="absolute inset-0 border-2 border-current rounded-inherit"
          animate={{
            borderRadius: isHovered ? '1.5rem' : '0.75rem',
            scale: isHovered ? 1.02 : 1
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
        initial={{ x: "-200%" }}
        animate={{ x: isHovered ? "200%" : "-200%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </motion.button>
  )
}