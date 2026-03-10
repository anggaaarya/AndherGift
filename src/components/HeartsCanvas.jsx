import { useEffect, useRef } from 'react'

const COLORS = ['#e8729a','#c9a96e','#f0a0be','#ffffff','#d45f8a']

class Heart {
  constructor(W, H) {
    this.W = W; this.H = H
    this.reset(true)
  }
  reset(init = false) {
    this.x     = Math.random() * this.W
    this.y     = init ? Math.random() * this.H : this.H + 20
    this.size  = 7 + Math.random() * 16
    this.speed = 0.4 + Math.random() * 1.1
    this.alpha = 0
    this.targetAlpha = 0.25 + Math.random() * 0.45
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.drift = (Math.random() - 0.5) * 0.35
    this.rot   = (Math.random() - 0.5) * 0.025
    this.angle = Math.random() * Math.PI * 2
    this.fadeIn= true
  }
  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.globalAlpha = this.alpha
    ctx.fillStyle = this.color
    ctx.beginPath()
    const s = this.size
    ctx.moveTo(0, s * 0.3)
    ctx.bezierCurveTo(-s*0.5, -s*0.1, -s, -s*0.5, 0, -s*0.8)
    ctx.bezierCurveTo( s*0.5, -s*0.1,  s, -s*0.5, 0, -s*0.8)
    ctx.bezierCurveTo( s,     -s*0.5,  s*0.5, -s*0.1, 0, s*0.3)
    ctx.fill()
    ctx.restore()
  }
  update() {
    this.y     -= this.speed
    this.x     += this.drift
    this.angle += this.rot
    if (this.fadeIn) {
      this.alpha = Math.min(this.alpha + 0.007, this.targetAlpha)
      if (this.alpha >= this.targetAlpha) this.fadeIn = false
    } else {
      if (this.y < this.H * 0.3) this.alpha = Math.max(0, this.alpha - 0.003)
    }
    if (this.y < -this.size * 2) this.reset()
  }
}

export default function HeartsCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, hearts = [], raf

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      hearts = Array.from({ length: 55 }, () => new Heart(W, H))
    }

    function tick() {
      ctx.clearRect(0, 0, W, H)
      hearts.forEach(h => { h.update(); h.draw(ctx) })
      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0 }}
    />
  )
}
