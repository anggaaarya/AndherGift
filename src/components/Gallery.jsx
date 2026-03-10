import { useState, useRef, useEffect } from 'react'

const NUM_SLOTS = 6

function PhotoSlot({ index }) {
  const [imgSrc, setImgSrc] = useState(null)
  const [hovered, setHovered] = useState(false)
  const inputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImgSrc(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => inputRef.current?.click()}
      style={{
        aspectRatio:'4/5',
        border: `1px ${imgSrc ? 'solid' : 'dashed'} ${hovered ? '#e8729a' : '#2a2a3a'}`,
        borderRadius:2,
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap:'0.8rem',
        background:'#111118',
        position:'relative', overflow:'hidden',
        cursor:'pointer',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition:'border-color 0.3s, transform 0.3s',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display:'none' }}
      />
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={`foto ${index + 1}`}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
        />
      ) : (
        <>
          <div style={{ fontSize:'2rem', opacity:0.3 }}>📷</div>
          <div style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:'0.85rem', color:'#7a7a9a',
            textAlign:'center', padding:'0 1rem',
          }}>
            Klik untuk<br/>upload foto
          </div>
        </>
      )}

      {/* hover overlay on image */}
      {imgSrc && hovered && (
        <div style={{
          position:'absolute', inset:0,
          background:'rgba(232,114,154,0.15)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:"'Dancing Script', cursive",
          color:'#f0ecf5', fontSize:'1rem',
        }}>
          ganti foto ♥
        </div>
      )}
    </div>
  )
}

export default function Gallery() {
  const ref = useRef(null)

  useEffect(() => {
    const items = ref.current?.querySelectorAll('[data-slot]') || []
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })

    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      el.style.transitionDelay = `${i * 80}ms`
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{
      position:'relative', zIndex:1,
      padding:'0 1.5rem 8rem',
      maxWidth:1000, margin:'0 auto',
    }}>
      <p style={{
        fontFamily:"'Dancing Script', cursive",
        fontSize:'1.1rem', color:'#e8729a',
        letterSpacing:'0.1em', textAlign:'center',
        marginBottom:'1rem',
      }}>✦ momen kita ✦</p>

      <h2 style={{
        fontFamily:"'Playfair Display', serif",
        fontSize:'clamp(1.8rem,5vw,2.8rem)',
        textAlign:'center', color:'#f0ecf5',
        marginBottom:'2.5rem',
      }}>Foto-foto Indah</h2>

      <div
        ref={ref}
        style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',
          gap:'1rem',
        }}
      >
        {Array.from({ length: NUM_SLOTS }).map((_, i) => (
          <div key={i} data-slot>
            <PhotoSlot index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
