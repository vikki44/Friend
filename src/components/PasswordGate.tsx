'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Lock } from 'lucide-react'
import { PASSWORD } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'
import { gsap } from 'gsap'

interface Particle {
  id: string
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `particle-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }))
}

export default function PasswordGate() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const lockIconRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsClient(true)
    setParticles(generateParticles(30))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.toLowerCase() === PASSWORD.toLowerCase()) {
      setIsUnlocking(true)

      // Lock unlock animation
      if (lockIconRef.current) {
        gsap.to(lockIconRef.current, {
          rotation: 360,
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: 'back.in',
        })
      }

      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 360,
        origin: { y: 0.5 },
        colors: ['#f2c8d9', '#c9b8ff', '#ffffff'],
      })

      // Background flash
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          background:
            'radial-gradient(circle at 50% 50%, rgba(242, 200, 217, 0.2), transparent 70%)',
          duration: 0.6,
          ease: 'power2.out',
        })
      }

      // Smooth camera zoom and transition
      setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            scale: 1.1,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              router.push('/letter')
            },
          })
        }
      }, 400)
    } else {
      // Shake animation
      setIsShaking(true)
      setError("That's not our secret password.")

      if (inputRef.current) {
        gsap.fromTo(
          inputRef.current,
          { x: 0 },
          {
            x: 10,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            ease: 'power2.inOut',
          }
        )
      }

      setTimeout(() => setIsShaking(false), 600)
      setPassword('')
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_20%_top,_rgba(242,200,217,0.08),_transparent_20%),radial-gradient(circle_at_80%_top,_rgba(201,184,255,0.1),_transparent_25%)] bg-night transition-all duration-300"
    >
      {/* Animated background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-r from-rose/20 to-transparent blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-l from-lavender/20 to-transparent blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Floating particles */}
      {isClient &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, rgba(242,200,217,0.6), transparent)`,
              boxShadow: '0 0 12px rgba(242,200,217,0.4)',
            }}
            animate={{
              y: [0, -400, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <div className="space-y-8">
            {/* Lock Icon */}
            <motion.div
              ref={lockIconRef}
              className="flex justify-center"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-rose/20 to-lavender/20 backdrop-blur-xl"
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(242,200,217,0.2)',
                    '0 0 80px rgba(242,200,217,0.4)',
                    '0 0 40px rgba(242,200,217,0.2)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Lock className="h-16 w-16 text-rose" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(8,4,13,0.55)] backdrop-blur-2xl"
            >
              <div className="space-y-6 text-center">
                {/* Heading */}
                <div className="space-y-3">
                  <h1 className="text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl">
                    A Little Surprise Awaits You
                  </h1>
                  <p className="text-sm leading-7 text-slate-300">
                    Only one person in the world knows the password.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 pt-4">
                  {/* Password Input */}
                  <motion.div
                    animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <input
                      ref={inputRef}
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (error) setError('')
                      }}
                      placeholder="Enter the password..."
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-slate-400 transition backdrop-blur-xl focus:border-rose/50 focus:outline-none focus:ring-2 focus:ring-rose/20"
                    />
                  </motion.div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl border border-rose/25 bg-rose/10 px-4 py-3 text-sm text-rose-100"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Unlock Button */}
                  <motion.button
                    type="submit"
                    disabled={isUnlocking}
                    whileHover={!isUnlocking ? { scale: 1.02 } : {}}
                    whileTap={!isUnlocking ? { scale: 0.98 } : {}}
                    className="group w-full rounded-2xl bg-gradient-to-r from-rose via-[#f0a8d4] to-lavender px-6 py-4 font-semibold text-white shadow-[0_15px_40px_rgba(242,200,217,0.25)] transition disabled:opacity-50"
                  >
                    <motion.span
                      animate={isUnlocking ? { opacity: 0 } : {}}
                      className="inline-flex items-center justify-center gap-2"
                    >
                      Unlock
                    </motion.span>
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Footer hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center text-xs text-slate-400"
            >
              Think about what makes this friendship so special.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
