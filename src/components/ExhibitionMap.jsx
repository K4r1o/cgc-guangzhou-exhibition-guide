import React, { useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import exhibitMap from '../data/exhibit_map.json';

export default function ExhibitionMap() {
  const [activeZone, setActiveZone] = useState(null);

  const handleZoneClick = (id) => {
    setActiveZone(id);
    // Scroll to the detail card
    const element = document.getElementById(`zone-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const renderZone = (id, style) => (
    <div 
      key={id}
      onClick={() => handleZoneClick(id)}
      style={{
        position: 'absolute',
        background: activeZone === id ? 'var(--accent-primary)' : 'var(--bg-card)',
        border: `1px solid ${activeZone === id ? 'var(--bg-main)' : 'var(--accent-primary)'}`,
        color: activeZone === id ? 'var(--text-inverse)' : 'var(--accent-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: '4px',
        boxShadow: activeZone === id ? '0 0 15px var(--shadow-hover)' : 'none',
        zIndex: 10,
        ...style
      }}
    >
      {id}
    </div>
  );

  return (
    <div className="animate-fade-in">
      <h2 className="glow-text">展磚佈置說明</h2>
      <p className="text-small" style={{ marginBottom: '16px' }}>點擊平面圖區塊以查看各區樣磚實體照與詳情</p>
      
      {/* 2D Floor Plan */}
      <div className="card" style={{ padding: '24px 16px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          aspectRatio: '1 / 1.2', 
          borderBottom: '2px dashed var(--accent-secondary)',
          background: 'var(--bg-main)',
          borderRadius: '8px 8px 0 0'
        }}>
          {/* Entrance Indicator */}
          <div style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center', color: 'var(--accent-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', letterSpacing: '2px' }}>主走道 (ENTRANCE)</span>
            <FaLocationArrow style={{ transform: 'rotate(-45deg)', marginTop: '4px' }} />
          </div>

          {/* Walls */}
          {/* Back Wall */}
          <div style={{ position: 'absolute', top: '0', left: '0', right: '0', height: '4px', background: 'var(--bg-card)', border: '1px solid var(--accent-secondary)' }}></div>
          {/* Left Wall */}
          <div style={{ position: 'absolute', top: '0', bottom: '0', left: '0', width: '4px', background: 'var(--bg-card)', border: '1px solid var(--accent-secondary)' }}></div>
          {/* Right Wall */}
          <div style={{ position: 'absolute', top: '0', bottom: '0', right: '0', width: '4px', background: 'var(--bg-card)', border: '1px solid var(--accent-secondary)' }}></div>

          {/* Zones Based on User Blueprint */}
          {/* Outer Back Wall: A, B */}
          {renderZone("A", { top: '2%', left: '2%', width: '26%', height: '14%' })}
          {renderZone("B", { top: '2%', right: '2%', width: '26%', height: '14%' })}
          
          {/* Inner Back Wall: C */}
          {renderZone("C", { top: '18%', left: '26%', right: '26%', height: '10%' })}

          {/* Inner Left Wall: F, G, H */}
          {renderZone("F", { top: '28%', left: '2%', width: '18%', height: '14%' })}
          {renderZone("G", { top: '48%', left: '2%', width: '18%', height: '14%' })}
          {renderZone("H", { top: '68%', left: '2%', width: '18%', height: '14%' })}

          {/* Inner Right Wall: D, E */}
          {renderZone("D", { top: '28%', right: '2%', width: '18%', height: '20%' })}
          {renderZone("E", { top: '54%', right: '2%', width: '18%', height: '20%' })}
        </div>
      </div>

      <h3 style={{ marginTop: '24px', marginBottom: '16px', color: 'var(--accent-primary)' }}>各區展品明細</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {exhibitMap.map((zone) => (
          <div 
            key={zone.id} 
            id={`zone-card-${zone.id}`}
            className="card" 
            style={{ 
              borderColor: activeZone === zone.id ? 'var(--accent-primary)' : 'var(--border-color)',
              boxShadow: activeZone === zone.id ? '0 0 15px var(--shadow-hover)' : 'none',
              transform: activeZone === zone.id ? 'scale(1.02)' : 'scale(1)',
              padding: '0',
              overflow: 'hidden'
            }}
          >
            {Array.isArray(zone.image) ? (
              <div style={{ display: 'flex', overflowX: 'auto', gap: '2px', background: 'var(--bg-main)', paddingBottom: '2px' }}>
                {zone.image.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`Zone ${zone.id} ${idx+1}`} 
                    style={{ height: '220px', width: 'auto', objectFit: 'cover', flexShrink: 0 }} 
                  />
                ))}
              </div>
            ) : zone.image && (
               <img 
                 src={zone.image} 
                 alt={`Zone ${zone.id}`} 
                 style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover', display: 'block' }} 
               />
            )}
            <div style={{ padding: '16px' }}>
              <div className="card-title" style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  display: 'inline-block', 
                  width: '28px', 
                  height: '28px', 
                  background: activeZone === zone.id ? 'var(--accent-primary)' : 'var(--bg-card)',
                  color: activeZone === zone.id ? 'var(--text-inverse)' : 'var(--accent-primary)',
                  border: '1px solid var(--accent-primary)',
                  borderRadius: '50%', 
                  textAlign: 'center', 
                  lineHeight: '26px',
                  marginRight: '12px',
                  transition: 'all 0.3s',
                  flexShrink: 0
                }}>{zone.id}</span>
                <span>{zone.name}</span>
                {zone.note && <span className="badge" style={{ marginLeft: 'auto' }}>{zone.note}</span>}
              </div>
              <div className="text-small" style={{ marginTop: '8px', paddingLeft: '40px', marginBottom: '8px' }}>{zone.english}</div>
              
              {(zone.coreSpec || zone.process || zone.overview) && (
                <div style={{ marginTop: '16px', paddingLeft: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {zone.coreSpec && (
                    <div>
                      <span className="badge" style={{ marginBottom: '6px', display: 'inline-block' }}>核心規格</span>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>{zone.coreSpec}</div>
                    </div>
                  )}
                  {zone.process && (
                    <div>
                      <span className="badge" style={{ marginBottom: '6px', display: 'inline-block' }}>製程</span>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>{zone.process}</div>
                    </div>
                  )}
                  {zone.overview && (
                    <div>
                      <span className="badge" style={{ marginBottom: '6px', display: 'inline-block' }}>概述</span>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>{zone.overview}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
