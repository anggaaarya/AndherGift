import { useNavigate } from 'react-router-dom'

export default function SplashPage() {
  const navigate = useNavigate()

  const openGift = () => {
    // nyalain musik
    if (window.__playMusic) window.__playMusic()

    // animasi keluar
    const splash = document.getElementById('splash-container')
    if (splash) {
      splash.style.opacity = '0'
      splash.style.transform = 'scale(1.05)'
    }
    setTimeout(() => navigate('/home'), 800)
  }

  return (
    <>
      <style>{`
        @keyframes float-box { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse-glow { 0%,100%{opacity:0.5;transform:translate(-50%,-50%) scale(1)} 50%{opacity:1;transform:translate(-50%,-50%) scale(1.1)} }
        @keyframes sparkle { 0%,100%{opacity:0;transform:scale(0.5)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes float-particle {
          0%{opacity:0;transform:translateY(100vh) rotate(0deg)}
          10%{opacity:0.6} 90%{opacity:0.6}
          100%{opacity:0;transform:translateY(-10vh) rotate(360deg)}
        }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .open-btn::before {
          content:''; position:absolute; inset:0;
          background:#e8729a; transform:translateX(-100%);
          transition:transform 0.3s ease; z-index:-1;
        }
        .open-btn:hover { color:#060608 !important; }
        .open-btn:hover::before { transform:translateX(0); }
      `}</style>

      <div
        id="splash-container"
        style={{
          position: 'fixed', inset: 0,
          background: '#060608',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          zIndex: 100, overflow: 'hidden',
        }}
      >
        {/* glow */}
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,114,154,0.08) 0%, transparent 70%)',
          top: '50%', left: '50%',
          animation: 'pulse-glow 3s ease infinite',
          pointerEvents: 'none',
        }} />

        {/* particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i * 17 + 5) % 100}%`,
            width: `${(i % 3) + 2}px`,
            height: `${(i % 3) + 2}px`,
            background: i % 2 === 0 ? '#e8729a' : '#c9a96e',
            borderRadius: i % 3 === 0 ? '50%' : '2px',
            opacity: 0,
            animation: `float-particle ${(i % 4) + 6}s ${(i % 5)}s linear infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* content */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '1.5rem',
          textAlign: 'center', padding: '2rem',
          animation: 'fadeIn 1s ease both',
        }}>

          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1rem', color: '#e8729a', letterSpacing: '0.1em' }}>
            ✦ sebuah hadiah kecil ✦
          </span>

          {/* gift box */}
          <div style={{ position: 'relative', width: 120, height: 120, animation: 'float-box 3s ease infinite' }}>
            <span style={{ position: 'absolute', top: -10, right: -10, fontSize: '0.8rem', animation: 'sparkle 2s 0s ease infinite' }}>✨</span>
            <span style={{ position: 'absolute', top: -5, left: -15, fontSize: '0.8rem', animation: 'sparkle 2s 0.5s ease infinite' }}>✨</span>
            <span style={{ position: 'absolute', bottom: 5, right: -15, fontSize: '0.8rem', animation: 'sparkle 2s 1s ease infinite' }}>✨</span>

            {/* lid */}
            <div style={{
              width: '110%', height: 28, position: 'absolute', top: 14, left: '-5%',
              background: 'linear-gradient(135deg, #2a1535, #3a1545)',
              border: '1px solid #e8729a66', borderRadius: 4,
              boxShadow: '0 0 20px rgba(232,114,154,0.2)',
            }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #c9a96e, #e8729a)', transform: 'translateY(-50%)' }} />
            </div>

            {/* body */}
            <div style={{
              width: '100%', height: 80, position: 'absolute', bottom: 0,
              background: 'linear-gradient(135deg, #1a0d20, #2a1535)',
              border: '1px solid #e8729a44', borderRadius: 4,
              boxShadow: '0 0 40px rgba(232,114,154,0.15)',
            }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: 'linear-gradient(to bottom, #c9a96e, #e8729a)', transform: 'translateX(-50%)' }} />
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #c9a96e, #e8729a)', transform: 'translateY(-50%)' }} />
            </div>

            {/* bow */}
            <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', fontSize: '1.8rem', zIndex: 2 }}>🎀</div>
          </div>

          {/* divider */}
          <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, #e8729a44, transparent)' }} />

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', color: '#f0ecf5', lineHeight: 1.3 }}>
            For ,<br/><em>Andher Brana Meliala</em>
          </h1>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1rem', color: '#7a7a9a', maxWidth: 280, lineHeight: 1.7 }}>
            Semoga Kamu Suka Ya kado nyaa yaa cantikk.
          </p>

          <button
            className="open-btn"
            onClick={openGift}
            style={{
              marginTop: '0.5rem',
              padding: '1rem 2.5rem',
              background: 'transparent',
              border: '1px solid #e8729a',
              borderRadius: 2,
              color: '#e8729a',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.1rem',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'color 0.3s',
            }}
          >
            Buka Hadiah 🖤
          </button>
        </div>
      </div>
    </>
  )
}