import { useState, useEffect, useRef } from 'react'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    audio.volume = 1 // ikutin volume device
    const tryPlay = async () => {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // autoplay diblock browser, user harus klik dulu
      }
    }
    setTimeout(tryPlay, 1000)
    setTimeout(() => setVisible(true), 500)
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (playing) { audio.pause() } else { audio.play() }
    setPlaying(!playing)
  }

  return (
    <>
      <audio ref={audioRef} src="/Music/song.mp3" loop />

      <div style={{
        position: 'fixed',
        bottom: '1.2rem',
        right: '1.2rem',
        zIndex: 999,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s, transform 0.5s',
      }}>

        {/* expanded card */}
        {expanded && (
          <div style={{
            marginBottom: '0.8rem',
            background: 'rgba(17,17,24,0.97)',
            border: '1px solid #2a2a3a',
            borderRadius: 12,
            padding: '1rem 1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            width: 'min(260px, 80vw)',
            boxShadow: '0 8px 40px rgba(232,114,154,0.18)',
            animation: 'popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#e8729a,#c9a96e,transparent)' }} />

            {/* album art */}
            <div style={{
              width: 56, height: 56,
              borderRadius: 8,
              overflow: 'hidden',
              flexShrink: 0,
              border: '1px solid #2a2a3a',
              animation: playing ? 'spin 8s linear infinite' : 'none',
              background: 'linear-gradient(135deg, #1a0d20, #2a1530)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img
                src="/Music/cover.jpg"
                alt="album"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none' }}
              />
              <span style={{ fontSize: '1.5rem', position: 'absolute' }}>🎵</span>
            </div>

            {/* info */}
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', fontWeight: 700, color: '#f0ecf5', marginBottom: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>About You</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.82rem', color: '#7a7a9a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>The 1975</p>
              {playing && (
                <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 14, marginTop: '0.35rem' }}>
                  {[4,8,5,10,6,9,4,7].map((h, i) => (
                    <div key={i} style={{ width: 3, borderRadius: 2, background: '#e8729a', height: h, animation: `eq ${0.4 + i * 0.08}s ease infinite alternate` }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* buttons row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>

          {/* info toggle */}
          <div
            onClick={() => setExpanded(!expanded)}
            style={{
              width: 40, height: 40,
              borderRadius: '50%',
              background: 'rgba(17,17,24,0.97)',
              border: `1px solid ${expanded ? '#e8729a' : '#2a2a3a'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              color: expanded ? '#e8729a' : '#7a7a9a',
              transition: 'border-color 0.3s, color 0.3s',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            }}
          >
            ♪
          </div>

          {/* play/pause — lebih gede di HP */}
          <div
            onClick={toggle}
            style={{
              width: 56, height: 56,
              borderRadius: '50%',
              background: 'rgba(17,17,24,0.97)',
              border: `2px solid ${playing ? '#e8729a' : '#2a2a3a'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: playing ? '0 0 24px rgba(232,114,154,0.4)' : '0 4px 16px rgba(0,0,0,0.4)',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{
              width: 32, height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a0d20, #2a1530)',
              border: '1px solid #3a2a4a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: playing ? 'spin 4s linear infinite' : 'none',
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: playing ? '#e8729a' : '#3a2a4a', transition: 'background 0.3s', boxShadow: playing ? '0 0 8px #e8729a' : 'none' }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
        @keyframes popIn { from { opacity:0; transform:scale(0.9) translateY(10px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes eq { from { transform:scaleY(0.3) } to { transform:scaleY(1.5) } }
      `}</style>
    </>
  )
}