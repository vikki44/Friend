'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { letterLines } from '@/lib/constants'
import MusicController from '@/components/MusicController'
import { useRouter } from 'next/navigation'

const openVariants = {
  closed: { rotateX: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  open: { rotateX: -38, opacity: 1, transition: { duration: 1.1, ease: 'circOut' } },
}

export default function LetterScene() {
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(0.68)
  const [opened, setOpened] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)
  const [showContinue, setShowContinue] = useState(false)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    if (playing) {
      audio.play().catch(() => {
        setBlocked(true)
      })
    } else {
      audio.pause()
    }
  }, [playing, volume])

  useEffect(() => {
    if (!opened || lineIndex >= letterLines.length) return
    const timer = window.setTimeout(() => {
      setLineIndex((value) => value + 1)
    }, 750)
    return () => window.clearTimeout(timer)
  }, [opened, lineIndex])

  useEffect(() => {
    if (lineIndex >= letterLines.length) {
      const timer = window.setTimeout(() => setShowContinue(true), 240)
      return () => window.clearTimeout(timer)
    }
  }, [lineIndex])

  const displayedLines = useMemo(() => letterLines.slice(0, lineIndex), [lineIndex])

  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16">
      <MusicController
        playing={playing}
        onToggle={() => setPlaying((value) => !value)}
        volume={volume}
        onVolumeChange={setVolume}
      />
      <audio
        ref={audioRef}
        src="/music/TumHoToh.mp3"
        loop
        preload="auto"
      />

      <div className="relative z-10 flex w-full flex-col items-center gap-8 text-center">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">A quiet invitation</p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            A letter written for you.
          </h1>
        </div>

        <motion.button
          type="button"
          onClick={() => setOpened(true)}
          disabled={opened}
          aria-label="Open letter"
          className="group relative flex h-[420px] w-full max-w-3xl items-end justify-center overflow-hidden rounded-[42px] border border-white/12 bg-white/5 p-8 text-left shadow-glass transition hover:-translate-y-1 hover:border-rose/30 hover:bg-white/10"
        >
          <motion.div
            initial="closed"
            animate={opened ? 'open' : 'closed'}
            variants={openVariants}
            className="absolute inset-0 bg-gradient-to-t from-[#09050f] via-transparent to-transparent"
          />
          <motion.div
            className="relative z-10 flex h-full w-full flex-col items-center justify-between"
            whileHover={{ y: opened ? 0 : -8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 shadow-[0_30px_80px_rgba(240,168,212,0.18)] transition group-hover:scale-105">
                <Mail className="h-12 w-12 text-rose" />
              </div>
              <div className="space-y-3 text-center">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Tap to open</p>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">The letter awaits</h2>

              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm text-slate-200 backdrop-blur-xl transition group-hover:bg-white/15">
              Open <ArrowRight className="h-4 w-4" />
            </span>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }}
              exit={{ opacity: 0, y: 24, transition: { duration: 0.4 } }}
              className="w-full max-w-3xl rounded-[38px] border border-white/10 bg-slate-950/50 p-8 shadow-glass backdrop-blur-2xl"
            >
              <div className="mb-8 rounded-[32px] border border-white/10 bg-white/5 p-8 text-left shadow-[0_0_120px_rgba(255,255,255,0.04)]">
                <div className="space-y-5 text-lg leading-8 text-slate-100">
                  {displayedLines.map((line, index) => (
                    <motion.p
                      key={`${line}-${index}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </div>
              {blocked && (
                <div className="rounded-3xl border border-rose/25 bg-rose/10 px-5 py-4 text-sm text-rose-100">
                  The music may be blocked by your browser. Tap the controller to resume the experience.
                </div>
              )}
              <AnimatePresence>
                {showContinue && (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }}
                    exit={{ opacity: 0, y: 18, transition: { duration: 0.3 } }}
                    className="mt-8 flex justify-center"
                  >
                    <button
                      type="button"
                      onClick={() => router.push('/memories')}
                      className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-rose via-[#f0a8d4] to-lavender px-8 py-4 text-base font-semibold text-white shadow-[0_25px_80px_rgba(242,200,217,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(242,200,217,0.36)]"
                    >
                      Continue Our Story
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
