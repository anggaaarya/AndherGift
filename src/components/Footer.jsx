export default function Footer() {
  return (
    <footer style={{
      position:'relative', zIndex:1,
      textAlign:'center',
      padding:'3rem 1.5rem 4rem',
      borderTop:'1px solid #2a2a3a',
    }}>
      <span style={{
        fontSize:'2rem',
        display:'block',
        marginBottom:'0.8rem',
        animation:'pulse 1.5s infinite',
      }}>🖤</span>
      <p style={{
        fontFamily:"'Cormorant Garamond', serif",
        fontSize:'1rem',
        color:'#7a7a9a',
        fontStyle:'italic',
      }}>
        dibuat dengan cinta, hanya untukmu.
      </p>
    </footer>
  )
}
