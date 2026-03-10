import { useState, useRef, useEffect } from 'react'

const NUM_SLOTS = 6

function PhotoSlot({ index }) {
  const [imgSrc, setImgSrc] = useState(null)
  const [hovered, setHovered] = useState(false)
  const inputRef = useRef(null)
  const slotRef = useRef(null)

  useEffect(() => {
    const el = slotRef.current
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.animation = `fadeUp 0.7s ${index * 0.1}s forwards`
        obs.unobserve(el)
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImgSrc(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div
      ref={slotRef}
      className="photo-slot"
      onClick={() => inputRef.current.click()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        aspectRatio: '4/5',
        border: `1px ${imgSrc ? 'solid' : 'dashed'} ${hovered ? '#e8729a' : '#2a2a3a'}`,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.8rem',
        background: '#111118',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        opacity: 0,
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: 'none' }}
      />

      {imgSrc ? (
        <>
          <img
            src={imgSrc}
            alt={`Foto ${index + 1}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
          {hovered && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(6,6,8,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f0ecf5',
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1rem',
              letterSpacing: '0.1em',
            }}>
              ganti foto
            </div>
          )}
        </>
      ) : (
        <>
          <div style={{ fontSize: '2rem', opacity: 0.25 }}>📷</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.85rem',
            color: '#7a7a9a',
            textAlign: 'center',
            padding: '0 1rem',
            lineHeight: 1.6,
          }}>
            Klik untuk<br />upload foto
          </div>
        </>
      )}
    </div>
  )
}

export default function PhotoGallery() {
  return (
    <section style={{
      position: 'relative',
      zIndex: 1,
      padding: '0 1.5rem 8rem',
      maxWidth: 1000,
      margin: '0 auto',
    }}>
      <p style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: '1.1rem',
        color: '#e8729a',
        letterSpacing: '0.1em',
        textAlign: 'center',
        marginBottom: '1rem',
      }}>✦ momen kita ✦</p>

      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
        textAlign: 'center',
        color: '#f0ecf5',
        marginBottom: '2.5rem',
      }}>Foto-foto Indah</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}>
        {Array.from({ length: NUM_SLOTS }, (_, i) => (
          <PhotoSlot key={i} index={i} />
        ))}
      </div>
    </section>
  )
}
