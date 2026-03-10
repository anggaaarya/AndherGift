import { useEffect, useRef } from 'react'

// ✏️  EDIT SURAT KAMU DI SINI
const LETTER_PARAGRAPHS = [
  "Hei kamu yang cantik,",
  "Aku sering bingung harus mulai dari mana ketika ingin bercerita tentang perasaanku padamu. Tapi hari ini aku memberanikan diri — karena kamu layak mendengarnya, selengkap-lengkapnya.",
  "Kamu adalah alasan aku tersenyum bahkan di hari-hari yang paling melelahkan. Ada sesuatu dalam caramu tertawa, caramu bicara, caramu ada — yang membuatku selalu ingin berada di dekatmu.",
  "Aku tidak tahu apa yang akan terjadi esok hari, tapi aku tahu satu hal: aku bersyukur setiap hari karena hidupku bertemu denganmu.",
  "Terima kasih sudah menjadi kamu. Terima kasih sudah membiarkan aku mencintaimu. 🖤",
]

// ✏️  GANTI DENGAN NAMAMU
const SENDER_NAME = "dengan seluruh cintaku"

export default function Letter() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.transition = 'opacity 0.9s ease, transform 0.9s ease'
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })

    if (ref.current) {
      ref.current.style.opacity = '0'
      ref.current.style.transform = 'translateY(30px)'
      observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{
      position:'relative', zIndex:1,
      padding:'0 1.5rem 6rem',
      maxWidth:780, margin:'0 auto',
    }}>
      <p style={{
        fontFamily:"'Dancing Script', cursive",
        fontSize:'1.1rem', color:'#e8729a',
        letterSpacing:'0.1em', textAlign:'center',
        marginBottom:'1rem',
      }}>✦ surat untukmu ✦</p>

      <h2 style={{
        fontFamily:"'Playfair Display', serif",
        fontSize:'clamp(1.8rem,5vw,2.8rem)',
        textAlign:'center', color:'#f0ecf5',
        marginBottom:'2.5rem',
      }}>Kata-kata dari Hatiku</h2>

      <div ref={ref} style={{
        background:'#111118',
        border:'1px solid #2a2a3a',
        borderRadius:2,
        padding:'clamp(2rem,5vw,3.5rem)',
        position:'relative',
        overflow:'hidden',
      }}>
        {/* top shimmer line */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:2,
          background:'linear-gradient(90deg,transparent,#e8729a,#c9a96e,transparent)',
        }} />
        {/* big quote mark */}
        <div style={{
          position:'absolute', top:'-0.5rem', left:'1.5rem',
          fontFamily:"'Playfair Display', serif",
          fontSize:'8rem', color:'#e8729a', opacity:0.07, lineHeight:1,
          userSelect:'none',
        }}>"</div>

        <div style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:'clamp(1.05rem,2.2vw,1.25rem)',
          lineHeight:2, color:'#c8c4d8', fontWeight:300,
          position:'relative',
        }}>
          {LETTER_PARAGRAPHS.map((p, i) => (
            <p key={i} style={{ marginTop: i > 0 ? '1.5rem' : 0 }}>{p}</p>
          ))}
        </div>

        <div style={{
          marginTop:'2.5rem', textAlign:'right',
          fontFamily:"'Dancing Script', cursive",
          fontSize:'1.6rem', color:'#c9a96e',
        }}>
          — {SENDER_NAME} ♥
        </div>
      </div>
    </section>
  )
}
