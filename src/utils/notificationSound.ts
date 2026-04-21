/**
 * Plays a two-tone ping notification using the Web Audio API.
 * No audio file required. Silently fails if the browser blocks it
 * (e.g. before any user interaction).
 */
export function playNotificationSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioCtx()

    const playTone = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, startTime)
      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
      osc.start(startTime)
      osc.stop(startTime + duration)
    }

    // Two ascending tones — classic "ping"
    playTone(880, ctx.currentTime, 0.15)
    playTone(1100, ctx.currentTime + 0.12, 0.22)
  } catch {
    // Audio blocked or not supported — ignore silently
  }
}
