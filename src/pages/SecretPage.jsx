import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeartsCanvas from '../components/HeartsCanvas'

const PASSCODES = ['310623', '230825']

const SECRET_PHOTOS = [
  { src: '/photos/bocilSMP.jpeg', caption: 'hahaha lucuu BGT BOCIL 😭' },
  { src: '/photos/Tidur.jpeg', caption: 'jangan marah ya 🤣' },
  { src: '/photos/Klimis.jpeg', caption: 'gemoy 😂' },
  { src: '/photos/Jamet.jpeg', caption: 'jaman jahiliyah' },
]

const FUNNY_MESSAGES = [
  "salah! coba lagi ya cantik 🤨",
  "masih salah? hint ada di bawah lho 👀",
  "SALAH LAGI!! udah 3x nih 😂 baca clue-nya dong!",
]

function Keypad({ input, onPress, onDelete, shaking }) {
  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            width: 14, height: 14, borderRadius: '50%',
            background: i < input.length ? '#e8729a' : 'transparent',
            border: `2px solid ${i < input.length ? '#e8729a' : '#2a2a3a'}`,
            transition: 'background 0.2s, border-color 0.2s',
            boxShadow: i < input.length ? '0 0 8px rgba(232,114,154,0.5)' : 'none',
          }} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', animation: shaking ? 'shake 0.4s ease' : 'none' }}>
        {keys.map((key, i) => (
          <button
            key={i}
            onClick={() => { if (key === '⌫') onDelete(); else if (key !== '') onPress(key) }}
            style={{
              width: 72, height: 72, borderRadius: '50%',
              background: key === '' ? 'transparent' : 'rgba(17,17,24,0.9)',
              border: key === '' ? 'none' : '1px solid #2a2a3a',
              color: '#f0ecf5',
              fontSize: key === '⌫' ? '1.2rem' : '1.5rem',
              fontFamily: "'Cormorant Garamond', serif",
              cursor: key === '' ? 'default' : 'pointer',
              transition: 'background 0.2s, border-color 0.2s, transform 0.1s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => { if (key !== '') { e.currentTarget.style.background = '#1e1e2e'; e.currentTarget.style.borderColor = '#e8729a44' }}}
            onMouseLeave={e => { if (key !== '') { e.currentTarget.style.background = 'rgba(17,17,24,0.9)'; e.currentTarget.style.borderColor = '#2a2a3a' }}}
            onMouseDown={e => { if (key !== '') e.currentTarget.style.transform = 'scale(0.92)' }}
            onMouseUp={e => { if (key !== '') e.currentTarget.style.transform = 'scale(1)' }}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function SecretPage() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [shaking, setShaking] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [current, setCurrent] = useState(null)
  const [funnyMsg, setFunnyMsg] = useState('')

  const handlePress = (key) => {
    if (input.length >= 6) return
    const newInput = input + key
    setInput(newInput)
    if (newInput.length === 6) setTimeout(() => checkPasscode(newInput), 300)
  }

  const handleDelete = () => setInput(input.slice(0, -1))

  const checkPasscode = (code) => {
    if (PASSCODES.includes(code)) {
      setUnlocked(true)
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setShaking(true)
      setFunnyMsg(FUNNY_MESSAGES[Math.min(newAttempts - 1, FUNNY_MESSAGES.length - 1)])
      setTimeout(() => { setShaking(false); setInput('') }, 600)
    }
  }

  return (
    <>
      <HeartsCanvas />

      {!unlocked ? (
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '1.2rem' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(232,114,154,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#111118', border: '1px solid #2a2a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', boxShadow: '0 0 30px rgba(232,114,154,0.1)' }}>🔒</div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1rem', color: '#e8729a', marginBottom: '0.4rem' }}>✦ halaman rahasia ✦</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#f0ecf5' }}>Masukkan Passcode</h2>
          </div>

          {funnyMsg ? (
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1rem', color: '#e8729a', textAlign: 'center', maxWidth: 280, animation: 'fadeUp 0.4s ease' }}>{funnyMsg}</p>
          ) : (
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.95rem', color: '#7a7a9a' }}>kamu pasti tau jawabannya 😏</p>
          )}

          <Keypad input={input} onPress={handlePress} onDelete={handleDelete} shaking={shaking} />

          <div style={{ marginTop: '0.5rem', background: '#111118', border: '1px solid #2a2a3a', borderRadius: 8, padding: '1rem 1.5rem', maxWidth: 300, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#e8729a,#c9a96e,transparent)' }} />
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '0.85rem', color: '#e8729a', marginBottom: '0.5rem' }}>✦ clue ✦</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: '#7a7a9a', lineHeight: 1.8, fontStyle: 'italic' }}>
              tanggal lahirku + tanggal lahirmu + tanggal jadian<br/>
              <span style={{ color: '#c9a96e' }}>atau</span><br/>
              tanggal jadian kita 🖤
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: '#7a7a9a', background: 'transparent', border: '1px solid #2a2a3a', borderRadius: 20, padding: '0.5rem 1.5rem', cursor: 'pointer', marginTop: '0.5rem', transition: 'color 0.3s, border-color 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e8729a'; e.currentTarget.style.borderColor = '#e8729a' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#7a7a9a'; e.currentTarget.style.borderColor = '#2a2a3a' }}
          >
            ← kembali
          </button>
        </div>

      ) : (
        <div style={{ position: 'relative', zIndex: 1, padding: '3rem 2rem 6rem', maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem', color: '#e8729a', textAlign: 'center', marginBottom: '0.6rem', animation: 'fadeUp 0.6s both' }}>✦ ketauan deh ✦</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,4vw,2.3rem)', textAlign: 'center', color: '#f0ecf5', marginBottom: '0.4rem', animation: 'fadeUp 0.6s 0.1s both' }}>Foto Aib 😭</h2>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.95rem', color: '#7a7a9a', textAlign: 'center', marginBottom: '2.5rem', animation: 'fadeUp 0.6s 0.2s both' }}>jangan marah ya princess serang 🤣</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.8rem', animation: 'fadeUp 0.6s 0.3s both' }}>
            {SECRET_PHOTOS.map((photo, i) => (
              <div key={i} onClick={() => setCurrent(i)} style={{ aspectRatio: '1', borderRadius: 6, overflow: 'hidden', background: '#111118', border: '1px solid #1e1e2e', cursor: 'pointer', transition: 'transform 0.3s, border-color 0.3s', position: 'relative' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = '#e8729a55' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#1e1e2e' }}
              >
                <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,6,8,0.8) 0%, transparent 50%)', display: 'flex', alignItems: 'flex-end', padding: '0.7rem' }}>
                  <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '0.8rem', color: '#f0ecf5' }}>{photo.caption}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={() => navigate(-1)}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: '#7a7a9a', background: 'transparent', border: '1px solid #2a2a3a', borderRadius: 20, padding: '0.5rem 1.5rem', cursor: 'pointer', letterSpacing: '0.05em', transition: 'color 0.3s, border-color 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#e8729a'; e.currentTarget.style.borderColor = '#e8729a' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#7a7a9a'; e.currentTarget.style.borderColor = '#2a2a3a' }}
            >
              ← kembali
            </button>
          </div>
        </div>
      )}

      {current !== null && (
        <div onClick={() => setCurrent(null)} style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6,6,8,0.93)', backdropFilter: 'blur(12px)' }}>
          <button onClick={() => setCurrent(null)} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', width: 36, height: 36, background: '#111118', border: '1px solid #2a2a3a', borderRadius: '50%', color: '#7a7a9a', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <div style={{ width: 'min(400px, 85vw)', height: 'min(500px, 65vh)', background: '#111118', border: '1px solid #2a2a3a', borderRadius: 8, overflow: 'hidden', position: 'relative', boxShadow: '0 0 80px rgba(232,114,154,0.15)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#e8729a,#c9a96e,transparent)' }} />
              <img src={SECRET_PHOTOS[current].src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.2rem', color: '#e8729a' }}>{SECRET_PHOTOS[current].caption}</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <button onClick={() => setCurrent((current - 1 + SECRET_PHOTOS.length) % SECRET_PHOTOS.length)} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: '#7a7a9a', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#e8729a'} onMouseLeave={e => e.currentTarget.style.color = '#7a7a9a'}>← sebelumnya</button>
              <button onClick={() => setCurrent((current + 1) % SECRET_PHOTOS.length)} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: '#7a7a9a', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#e8729a'} onMouseLeave={e => e.currentTarget.style.color = '#7a7a9a'}>berikutnya →</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
        @keyframes popIn { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
      `}</style>
    </>
  )
}