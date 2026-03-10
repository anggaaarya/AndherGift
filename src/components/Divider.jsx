export default function Divider() {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:'1rem',
      padding:'0 2rem', maxWidth:700, margin:'0 auto 4rem',
      position:'relative', zIndex:1,
    }}>
      <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,#2a2a3a,transparent)' }} />
      <span style={{ color:'#e8729a', fontSize:'1rem' }}>♥</span>
      <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,#2a2a3a,transparent)' }} />
    </div>
  )
}
