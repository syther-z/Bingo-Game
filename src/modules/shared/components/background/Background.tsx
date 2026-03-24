import './style.css';
export default function Background() {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#0e0e1a',
        overflow: 'hidden',
        zIndex: -1,
      }}>
        {[
          { width: 300, height: 300, bg: '#2563eb', top: -80, left: -60 },
          { width: 220, height: 220, bg: '#be185d', bottom: -60, right: -40 },
          { width: 180, height: 180, bg: '#7c3aed', bottom: 60, left: 20 },
        ].map((orb, i) => (
          <div key={i} style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(60px)',
            opacity: 0.18,
            pointerEvents: 'none',
            width: orb.width,
            height: orb.height,
            background: orb.bg,
            top: orb.top,
            left: orb.left,
            bottom: orb.bottom,
            right: orb.right,
          }} />
        ))}
      </div>
    );
  }