import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeartsCanvas from '../components/HeartsCanvas'

const MEMORIES = [
  { type: 'photo', src: '/photos/vidcall.jpeg', caption: 'Kangen ini' },
  { type: 'photo', src: '/photos/fotober2.jpeg', caption: 'Foto Ber 2 Yang lansung tapi lucu' },
  { type: 'video', src: '/photos/video1.mp4', caption: 'HAHAHAHA LUCU' },
  { type: 'photo', src: '/photos/myfav.jpeg', caption: 'FOTO KAMU YANG AKU FAVORITEIN' },
  { type: 'video', src: '/photos/acne.mp4', caption: 'TETEP CANTIK KOO, INI YANG GAMAU KETEMU GRGR JERAWAT' },
  { type: 'photo', src: '/photos/roblox.jpeg', caption: 'MISS THIS AVA NDER?' },
]

export default function GalleryPage() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(null)

  const item = current !== null ? MEMORIES[current] : null

  return (
    <>
      <HeartsCanvas />
      <style>{`
        .mem-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; }
        @media (max-width: 600px) { .mem-grid { grid-template-columns: repeat(2, 1fr); } }
        @keyframes popIn { from { opacity:0; transform:scale(0.85) } to { opacity:1; transform:scale(1) } }
      `}</style>

      <div style={{ position: 'relative', zIndex: 1, padding: '3rem 2rem 6rem', maxWidth: 900, margin: '0 auto' }}>

        <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem', color: '#e8729a', textAlign: 'center', marginBottom: '0.6rem' }}>✦ kenangan kita ✦</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,4vw,2.5rem)', textAlign: 'center', color: '#f0ecf5', marginBottom: '0.4rem' }}>Our Memory</h2>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1rem', color: '#7a7a9a', textAlign: 'center', marginBottom: '2.5rem' }}>setiap momen bersamamu adalah favoritku</p>

        <div className="mem-grid">
          {MEMORIES.map((mem, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              style={{ position: 'relative', aspectRatio: '1', borderRadius: 6, overflow: 'hidden', background: '#111118', border: '1px solid #1e1e2e', cursor: 'pointer', transition: 'transform 0.3s, border-color 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = '#e8729a55' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#1e1e2e' }}
            >
              {mem.type === 'photo' ? (
                <img src={mem.src} alt={mem.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <video src={mem.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} muted playsInline />
              )}

              {mem.type === 'video' && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 42, height: 42, background: 'rgba(232,114,154,0.85)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', boxShadow: '0 4px 20px rgba(232,114,154,0.4)' }}>▶</div>
                </div>
              )}

              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,6,8,0.8) 0%, transparent 50%)', display: 'flex', alignItems: 'flex-end', padding: '0.7rem' }}>
                <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '0.8rem', color: '#f0ecf5' }}>{mem.caption} ♥</span>
              </div>
            </div>
          ))}
        </div>

        {/* secret button */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '0.85rem', color: '#3a2a4a' }}>
            ada yang tersembunyi... 🤫
          </p>
          <button
            onClick={() => navigate('/secret')}
            style={{ background: 'transparent', border: '1px dashed #2a2a3a', borderRadius: 20, padding: '0.4rem 1.2rem', cursor: 'pointer', fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: '#3a2a4a', transition: 'color 0.3s, border-color 0.3s', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e8729a'; e.currentTarget.style.borderColor = '#e8729a44' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#3a2a4a'; e.currentTarget.style.borderColor = '#2a2a3a' }}
          >
            🔒 klik kalau berani
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button onClick={() => navigate('/')} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: '#7a7a9a', background: 'transparent', border: 'none', cursor: 'pointer', letterSpacing: '0.05em', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#e8729a'} onMouseLeave={e => e.currentTarget.style.color = '#7a7a9a'}>
            ← kembali
          </button>
        </div>
      </div>

      {current !== null && (
        <div onClick={() => setCurrent(null)} style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6,6,8,0.93)', backdropFilter: 'blur(12px)' }}>
          <button onClick={() => setCurrent(null)} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', width: 36, height: 36, background: '#111118', border: '1px solid #2a2a3a', borderRadius: '50%', color: '#7a7a9a', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>✕</button>
          <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', padding: '1rem', animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <div style={{ width: 'min(420px, 85vw)', height: 'min(520px, 65vh)', background: '#111118', border: '1px solid #2a2a3a', borderRadius: 8, overflow: 'hidden', position: 'relative', boxShadow: '0 0 80px rgba(232,114,154,0.15)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#e8729a,#c9a96e,transparent)', zIndex: 1 }} />
              {item.type === 'photo' ? (
                <img src={item.src} alt={item.caption} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              ) : (
                <video src={item.src} controls autoPlay style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              )}
            </div>
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.3rem', color: '#e8729a', textAlign: 'center' }}>{item.caption} ♥</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <button onClick={() => setCurrent((current - 1 + MEMORIES.length) % MEMORIES.length)} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: '#7a7a9a', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#e8729a'} onMouseLeave={e => e.currentTarget.style.color = '#7a7a9a'}>← sebelumnya</button>
              <button onClick={() => setCurrent((current + 1) % MEMORIES.length)} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: '#7a7a9a', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#e8729a'} onMouseLeave={e => e.currentTarget.style.color = '#7a7a9a'}>berikutnya →</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}