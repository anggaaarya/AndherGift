import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeartsCanvas from '../components/HeartsCanvas'

const LETTER_PARAGRAPHS = [
  "Hei kamu yang cantik,",
  "Aku sering bingung harus mulai dari mana ketika ingin bercerita tentang perasaanku padamu. Tapi hari ini aku memberanikan diri — karena kamu layak mendengarnya, selengkap-lengkapnya.",
  "Kamu adalah alasan aku tersenyum bahkan di hari-hari yang paling melelahkan. Ada sesuatu dalam caramu tertawa, caramu bicara, caramu ada — yang membuatku selalu ingin berada di dekatmu.",
  "Aku tidak tahu apa yang akan terjadi esok hari, tapi aku tahu satu hal: aku bersyukur setiap hari karena hidupku bertemu denganmu.",
  "Terima kasih sudah menjadi kamu. Terima kasih sudah membiarkan aku mencintaimu. 🖤",
]

const SENDER_NAME = "all my love for you"
const PHOTOS_LEFT  = ["/photos/tanktop.jpeg", "/photos/mirrorselfieblck.jpeg"]
const PHOTOS_RIGHT = ["/photos/anggun.jpeg", "/photos/mirorallsizewhite.jpeg"]
const PHOTOS_MOBILE = ["/photos/tanktop.jpeg", "/photos/mirrorselfieblck.jpeg", "/photos/anggun.jpeg", "/photos/mirorallsizewhite.jpeg"]

function PhotoColumn({ photos, expanded }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '0.8rem',
      width: expanded ? 0 : '22vw',
      maxWidth: expanded ? 0 : 200,
      minWidth: expanded ? 0 : 120,
      overflow: 'hidden',
      opacity: expanded ? 0 : 1,
      transform: expanded ? 'scale(0.9)' : 'scale(1)',
      flexShrink: 0, alignSelf: 'flex-start',
      position: 'sticky', top: '2rem',
      transition: 'opacity 0.5s ease, transform 0.5s ease, width 0.5s ease, max-width 0.5s ease, min-width 0.5s ease',
      pointerEvents: expanded ? 'none' : 'auto',
    }}>
      {photos.map((src, i) => (
        <div key={i} style={{ width: '100%', aspectRatio: '3/4', border: '1px solid #2a2a3a', borderRadius: 6, overflow: 'hidden', background: '#111118', boxShadow: '0 8px 32px rgba(232,114,154,0.08)' }}>
          <img src={src} alt={`foto ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ))}
    </div>
  )
}

export default function LetterPage() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <HeartsCanvas />
      <style>{`
        .letter-page {
          position: relative; min-height: 100vh;
          display: flex; align-items: flex-start; justify-content: center;
          padding: 3rem 2rem 6rem; gap: 2rem;
        }
        .side-col { display: flex; }
        .letter-box { flex: 1; min-width: 0; max-width: 500px; transition: max-width 0.5s ease; }
        .letter-box.expanded { max-width: 700px; }
        .mobile-photos { display: none; }

        @media (max-width: 768px) {
          .side-col { display: none !important; }
          .letter-page { padding: 2rem 1.2rem 5rem; gap: 0; }
          .letter-box { max-width: 100% !important; }
          .mobile-photos { display: flex !important; }
        }
      `}</style>

      <div className="letter-page" style={{ zIndex: 1 }}>

        <div className="side-col">
          <PhotoColumn photos={PHOTOS_LEFT} expanded={expanded} />
        </div>

        <div className={`letter-box${expanded ? ' expanded' : ''}`}>

          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.05rem', color: '#e8729a', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '0.6rem' }}>
            ✦ This Special Letter Just For You ✦
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', textAlign: 'center', color: '#f0ecf5', marginBottom: '1rem' }}>
            Kata-kata dari Hatiku
          </h2>

          {/* foto strip — mobile only */}
          <div className="mobile-photos" style={{ gap: '0.5rem', marginBottom: '1.2rem' }}>
            {PHOTOS_MOBILE.map((src, i) => (
              <div key={i} style={{ flex: 1, aspectRatio: '3/4', borderRadius: 6, overflow: 'hidden', border: '1px solid #2a2a3a', background: '#111118', boxShadow: '0 4px 16px rgba(232,114,154,0.08)' }}>
                <img src={src} alt={`foto ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>

          {!expanded && (
            <p style={{ textAlign: 'center', fontFamily: "'Dancing Script', cursive", fontSize: '0.9rem', color: '#e8729a', marginBottom: '0.8rem', animation: 'pulse 2s infinite' }}>
              ✦ klik surat untuk membaca ✦
            </p>
          )}

          <div
            onClick={() => !expanded && setExpanded(true)}
            style={{
              background: '#111118',
              border: `1px solid ${expanded ? '#e8729a44' : '#2a2a3a'}`,
              borderRadius: 4,
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              position: 'relative', overflow: 'hidden',
              cursor: expanded ? 'default' : 'pointer',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              boxShadow: expanded ? '0 0 60px rgba(232,114,154,0.07)' : 'none',
            }}
            onMouseEnter={e => { if (!expanded) e.currentTarget.style.boxShadow = '0 0 30px rgba(232,114,154,0.1)' }}
            onMouseLeave={e => { if (!expanded) e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#e8729a,#c9a96e,transparent)' }} />
            <div style={{ position: 'absolute', top: '-0.5rem', left: '1rem', fontFamily: "'Playfair Display', serif", fontSize: '7rem', color: '#e8729a', opacity: 0.06, lineHeight: 1, userSelect: 'none' }}>"</div>

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              lineHeight: 1.95, color: '#c8c4d8', fontWeight: 300,
              position: 'relative',
              maxHeight: expanded ? 3000 : 100,
              overflow: 'hidden',
              transition: 'max-height 0.9s cubic-bezier(0.4,0,0.2,1)',
              WebkitMaskImage: expanded ? 'none' : 'linear-gradient(to bottom, black 20%, transparent 100%)',
              maskImage: expanded ? 'none' : 'linear-gradient(to bottom, black 20%, transparent 100%)',
            }}>
              {LETTER_PARAGRAPHS.map((p, i) => (
                <p key={i} style={{ marginTop: i > 0 ? '1.4rem' : 0 }}>{p}</p>
              ))}
            </div>

            <div style={{ marginTop: '1.8rem', textAlign: 'right', fontFamily: "'Dancing Script', cursive", fontSize: '1.4rem', color: '#c9a96e', opacity: expanded ? 1 : 0, transition: 'opacity 0.5s 0.6s' }}>
              — {SENDER_NAME} ♥
            </div>
          </div>

          {expanded && (
            <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
              <button onClick={() => setExpanded(false)} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: '#7a7a9a', background: 'transparent', border: 'none', cursor: 'pointer', letterSpacing: '0.05em', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#e8729a'} onMouseLeave={e => e.currentTarget.style.color = '#7a7a9a'}>
                ↑ tutup surat
              </button>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
            <button onClick={() => navigate('/gallery')} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#c9a96e', background: 'transparent', border: '1px solid #c9a96e', borderRadius: 2, padding: '0.8rem 2rem', cursor: 'pointer', transition: 'background 0.3s, color 0.3s', width: '100%', maxWidth: 280 }} onMouseEnter={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.color = '#060608' }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a96e' }}>
              📷 Our Memories →
            </button>
            <button onClick={() => navigate('/home')} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: '#7a7a9a', background: 'transparent', border: '1px solid #2a2a3a', borderRadius: 20, padding: '0.5rem 1.5rem', cursor: 'pointer', letterSpacing: '0.05em', transition: 'color 0.3s, border-color 0.3s' }} onMouseEnter={e => { e.currentTarget.style.color = '#e8729a'; e.currentTarget.style.borderColor = '#e8729a' }} onMouseLeave={e => { e.currentTarget.style.color = '#7a7a9a'; e.currentTarget.style.borderColor = '#2a2a3a' }}>
              ← kembali
            </button>
          </div>
        </div>

        <div className="side-col">
          <PhotoColumn photos={PHOTOS_RIGHT} expanded={expanded} />
        </div>

      </div>
    </>
  )
}