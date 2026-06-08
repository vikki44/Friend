'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import Lenis from '@studio-freight/lenis'
import { galleryItems } from '@/lib/constants'
import confetti from 'canvas-confetti'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const accentMap = {
  rose: {
    border: 'border-rose/40',
    badge: 'bg-rose/10 text-rose',
    ring: 'ring-rose/10',
  },
  lavender: {
    border: 'border-lavender/40',
    badge: 'bg-lavender/10 text-lavender',
    ring: 'ring-lavender/10',
  },
  ice: {
    border: 'border-slate-300/30',
    badge: 'bg-slate-300/10 text-slate-200',
    ring: 'ring-slate-300/10',
  },
}

const getAccent = (accent?: string) => accentMap[(accent as keyof typeof accentMap) ?? 'rose']

export default function MemoriesGallery() {
  const [selected, setSelected] = useState<string | null>(null)
  const finaleRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: (t: number) => t * (2 - t), lerp: 0.08 })
    const frame = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
    return () => lenis.destroy()
  }, [])

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.memory-card')
    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        scale: 0.98,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, [])

  useEffect(() => {
    const target = finaleRef.current
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.75 },
            colors: ['#f2c8d9', '#c9b8ff', '#ffffff'],
          })
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  const activeItem = useMemo(
    () => galleryItems.find((item) => item.id === selected) ?? null,
    [selected]
  )

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-14 px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-ambient opacity-70" />

      <section className="relative z-10 overflow-hidden rounded-[42px] border border-white/10 bg-black/30 p-10 shadow-glass backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(242,200,217,0.14),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(201,184,255,0.14),_transparent_30%)]" />
        <div className="relative z-10 max-w-3xl space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Memory story</p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Some of the best moments of our friendship, captured in a gallery.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-300">

          </p>
        </div>
      </section>

      <section className="relative z-10 grid gap-6 md:grid-cols-2">
        {galleryItems.map((item, index) => {
          const accent = getAccent(item.accent)
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.id)}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.99 }}
              className={`memory-card group relative overflow-hidden rounded-[38px] border border-white/10 bg-white/5 p-5 text-left shadow-glass transition duration-500 hover:border-white/20 hover:bg-white/10 ${accent.ring}`}
            >
              <div className={`relative overflow-hidden rounded-[28px] border ${accent.border} bg-slate-950/70 p-4 shadow-[inset_0_0_60px_rgba(255,255,255,0.04)]`}>
                <motion.div layoutId={`memory-image-${item.id}`} className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-slate-950">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 48vw, 640px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </motion.div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-slate-400">
                  <span className={`h-2 w-2 rounded-full ${accent.badge}`} />
                  <span>Memory {index + 1}</span>
                </div>
                <p className="text-xl font-semibold leading-tight text-white">{item.title}</p>
                <p className="text-sm leading-7 text-slate-300">
                  Tap to open a memory in a polished modal and feel the emotion in every frame.
                </p>
              </div>
            </motion.button>
          )
        })}
      </section>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.35 } }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <motion.div
              className="relative w-full max-w-4xl rounded-[38px] border border-white/15 bg-[#0d0714]/95 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
              initial={{ y: 24, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } }}
              exit={{ y: 24, opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]">
                  <motion.div layoutId={`memory-image-${activeItem.id}`} className="relative aspect-[4/3] min-h-[320px] w-full overflow-hidden rounded-[32px]">
                    <Image
                      src={activeItem.src}
                      alt={activeItem.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 720px"
                      className="object-cover"
                    />
                  </motion.div>
                </div>
                <div className="flex flex-col justify-between rounded-[32px] border border-white/10 bg-white/5 p-8">
                  <div className="space-y-6">
                    <span className="inline-flex rounded-full bg-rose/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-rose-100">
                      Story highlight
                    </span>
                    <h2 className="text-3xl font-semibold text-white">{activeItem.title}</h2>
                    <p className="text-sm leading-7 text-slate-300">
                      The pagal panti in game, in dc, in instagram omg our cute memories.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm leading-7 text-slate-300">
                    <p></p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section ref={finaleRef} className="relative overflow-hidden rounded-[42px] border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(242,200,217,0.16),_transparent_24%),radial-gradient(circle_at_bottom,_rgba(201,184,255,0.16),_transparent_24%)]" />
        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.9, ease: 'circOut' } }}
            className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-rose to-lavender shadow-[0_0_90px_rgba(242,200,217,0.28)]"
          >
            <span className="text-6xl leading-none">❤</span>
          </motion.div>
          <div className="space-y-4 max-w-3xl">
            <p className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Out of all the people I met,
              <br /> I'm grateful that I met you. <br /> I'm Never Gonna Leave You.
            </p>
            <p className="text-lg leading-8 text-slate-300">
              Thank you for being part of my story.
            </p>
            <p className="text-xl font-semibold text-rose">Happy Best Friend Day.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
