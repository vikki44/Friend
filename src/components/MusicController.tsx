'use client'

import { useMemo } from 'react'
import { Pause, Play, Volume2 } from 'lucide-react'

interface MusicControllerProps {
  playing: boolean
  onToggle: () => void
  volume: number
  onVolumeChange: (value: number) => void
}

export default function MusicController({ playing, onToggle, volume, onVolumeChange }: MusicControllerProps) {
  const label = useMemo(() => (playing ? 'Pause music' : 'Play music'), [playing])

  return (
    <div className="glass-card fixed right-4 top-4 z-50 flex items-center gap-3 rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-100 shadow-glass backdrop-blur-2xl sm:right-6 sm:top-6">
      <button
        type="button"
        aria-label={label}
        onClick={onToggle}
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/20"
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>
      <div className="flex items-center gap-3">
        <Volume2 className="h-4 w-4 text-slate-200" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
          className="h-2 w-24 cursor-pointer appearance-none rounded-full bg-white/20 accent-rose"
        />
      </div>
    </div>
  )
}
