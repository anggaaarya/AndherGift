import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const el = cursorRef.current
    const move = (e) => {
      el.style.left = e.clientX + 'px'
      el.style.top  = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div ref={cursorRef} style={{
      position: 'fixed',
      width: 20, height: 20,
      border: '1.5px solid #e8729a',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 9999,
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.08s',
      mixBlendMode: 'difference',
    }} />
  )
}
