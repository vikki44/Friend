'use client'

import MemoriesGallery from '@/components/MemoriesGallery'

export default function MemoriesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-night text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_top,_rgba(242,200,217,0.12),_transparent_17%),radial-gradient(circle_at_80%_top,_rgba(201,184,255,0.14),_transparent_18%)]" />
      <MemoriesGallery />
    </main>
  )
}
