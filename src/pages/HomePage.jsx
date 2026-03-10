import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import HeartsCanvas from '../components/HeartsCanvas'

const PARTNER_NAME = "Andher Brana Meliala"
const PHOTO_LEFT  = "/photos/photo1.jpg"
const PHOTO_RIGHT = "/photos/photo2.jpg"

function PhotoSlot({ src }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '3/4',
      border: '1px solid #2a2a3a',
      borderRadius: 4,
      overflow: 'hidden',
      background: '#111118',
      boxShadow: '0 0 30px rgba(232,114,154,0.1)',
    }}>
      <img src={src} alt="foto" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <HeartsCanvas />
      <style>{`
        .home-page {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          zIndex: 1;
        }

        /* ── DESKTOP layout: foto | nama | foto ── */
        .home-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          width: 100%;
          max-width: 1000px;
        }
        .home-photo {
          width: 22vw;
          max-width: 220px;
          min-width: 130px;
          flex-shrink: 0;
        }
        .home-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.6rem;
          min-width: 0;
        }
        .home-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 3.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #f0ecf5 0%, #c9a96e 50%, #e8729a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .home-sub {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(0.85rem, 1.5vw, 1.1rem);
          color: #7a7a9a;
        }
        .home-btn-primary {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          letter-spacing: 0.12em;
          color: #f0ecf5;
          background: transparent;
          border: 1px solid #e8729a;
          border-radius: 2px;
          padding: 0.85rem 2.2rem;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
          width: 100%;
          max-width: 280px;
        }
        .home-btn-primary:hover {
          background: #e8729a;
          color: #060608;
        }

        /* ── MOBILE layout: stack vertikal ── */
        @media (max-width: 640px) {
          .home-page { padding: 3rem 1.2rem 4rem; }
          .home-layout {
            flex-direction: column;
            gap: 1.5rem;
          }
          .home-photo {
            width: 55vw;
            max-width: 180px;
            min-width: unset;
          }
          .home-name { font-size: clamp(1.6rem, 7vw, 2.2rem); }
          .home-sub { font-size: 0.9rem; }
          .home-btn-primary { max-width: 100%; }
        }
      `}</style>

      <div className="home-page" style={{ zIndex: 1 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,114,154,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="home-layout" style={{ animation: 'fadeUp 1s 0.3s both' }}>

          {/* foto kiri (desktop) / atas (mobile) */}
          <div className="home-photo">
            <PhotoSlot src={PHOTO_LEFT} />
          </div>

          {/* nama tengah */}
          <div className="home-center">
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', color: '#e8729a', letterSpacing: '0.15em' }}>
              sebuah hadiah Ulang Tahun Yang Pernah Aku Janjiin, Untuk Mu
            </p>

            <h1 className="home-name"><br />{PARTNER_NAME}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 36, height: 1, background: 'linear-gradient(90deg, transparent, #2a2a3a)' }} />
              <span style={{ color: '#e8729a', fontSize: '0.75rem' }}>♥</span>
              <div style={{ width: 36, height: 1, background: 'linear-gradient(90deg, #2a2a3a, transparent)' }} />
            </div>

            <p className="home-sub">I Always Love you ASBM </p>

            <div style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <button
                className="home-btn-primary"
                onClick={() => navigate('/letter')}
              >
                ✉ Baca Surat Untukmu
              </button>
            </div>
          </div>

          {/* foto kanan (desktop) / bawah (mobile) */}
          <div className="home-photo">
            <PhotoSlot src={PHOTO_RIGHT} />
          </div>

        </div>
      </div>
    </>
  )
}