declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number
    spread?: number
    origin?: { x?: number; y?: number }
    colors?: string[]
    zIndex?: number
    disableForReducedMotion?: boolean
  }

  interface ConfettiFunction {
    (options?: ConfettiOptions): void
  }

  const confetti: ConfettiFunction
  export default confetti
}
