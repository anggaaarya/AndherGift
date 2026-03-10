import { useEffect, useRef } from 'react'

export default function Hero({ name }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const items = sectionRef.current.querySelectorAll('[data-anim]')
    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      setTimeout(() => {
        el.style.transition = 'opacity 1s ease, transform 1s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 300 + i * 300)
    })
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      zIndex: 1,
    }}>
      {/* glow */}
      <div style={{
        position:'absolute', inset:0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,114,154,0.09) 0%, transparent 70%)',
        pointerEvents:'none',
      }} />

      <p data-anim style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
        color: '#e8729a',
        letterSpacing: '0.15em',
        marginBottom: '1.2rem',
      }}>
        sebuah hadiah kecil, untukmu
      </p>

      <h1 data-anim style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(2.6rem, 9vw, 6.5rem)',
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg, #f0ecf5 0%, #c9a96e 50%, #e8729a 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        Untuk<br />{name}
      </h1>

      <p data-anim style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic',
        fontSize: 'clamp(1rem, 2.8vw, 1.5rem)',
        color: '#7a7a9a',
        marginTop: '1.2rem',
      }}>
        yang selalu ada di setiap detak jantungku
      </p>

      <div data-anim style={{
        position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)',
        fontFamily: "'Dancing Script', cursive",
        fontSize: '1rem',
        color: '#e8729a',
        display:'flex', flexDirection:'column', alignItems:'center', gap:'0.3rem',
        animation: 'pulse 2s infinite',
      }}>
        <span>buka suratnya</span>
        <span style={{ fontSize:'1.2rem' }}>↓</span>
      </div>
    </section>
  )
}
