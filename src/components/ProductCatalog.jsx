import React, { useState } from 'react';
import products from '../data/products.json';

export default function ProductCatalog() {
  const [filter, setFilter] = useState('all');

  const filteredProducts = products.filter(p => {
    if (filter === 'anti-slip') return p.id.includes('anti-slip');
    if (filter === 'matt') return p.id.includes('matt');
    return true;
  });

  return (
    <div className="animate-fade-in">
      <h2 className="glow-text">產品規格</h2>

      <div className="tabs" style={{ marginBottom: '16px' }}>
        <button className={`btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>全部</button>
        <button className={`btn ${filter === 'anti-slip' ? 'active' : ''}`} onClick={() => setFilter('anti-slip')}>止滑</button>
        <button className={`btn ${filter === 'matt' ? 'active' : ''}`} onClick={() => setFilter('matt')}>啞光</button>
      </div>

      {/* Sticky Note Bubble */}
      <div style={{
        position: 'sticky',
        top: '-5px',
        zIndex: 50,
        background: 'var(--bg-card)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid var(--accent-secondary)',
        borderLeft: '4px solid var(--accent-secondary)',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '24px',
        boxShadow: '0 4px 15px var(--shadow-color)'
      }}>
        <div style={{ fontWeight: 'bold', color: 'var(--accent-secondary)', marginBottom: '6px', fontSize: '0.95rem' }}>
          💡 編號對照備註
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: '4px 12px', fontSize: '0.9rem', color: 'var(--text-bold)' }}>
          <div>GD055</div>
          <div style={{ color: 'var(--text-main)', opacity: 0.8 }}>正式編號為</div>
          <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>CD-755</div>
          
          <div>DL106</div>
          <div style={{ color: 'var(--text-main)', opacity: 0.8 }}>正式編號為</div>
          <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>CD-7106</div>
        </div>
      </div>

      {filteredProducts.map(product => (
        <div key={product.id} className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '24px' }}>
          
          {/* Image Gallery (Horizontal Scroll) */}
          {product.images && product.images.length > 0 && (
            <div style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              gap: '2px', 
              background: 'var(--bg-main)',
              paddingBottom: '2px'
            }}>
              {product.images.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`${product.name} ${idx+1}`} 
                  style={{ 
                    height: '220px', 
                    width: 'auto', 
                    objectFit: 'cover',
                    flexShrink: 0
                  }} 
                />
              ))}
            </div>
          )}

          <div style={{ padding: '20px' }}>
            <div className="card-title" style={{ color: 'var(--accent-primary)', fontSize: '1.3rem' }}>{product.name}</div>
            <div className="text-small" style={{ marginBottom: '16px', letterSpacing: '1px' }}>{product.english}</div>
            
            {/* Detailed Explanations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div>
                <span className="badge" style={{ marginBottom: '6px', display: 'inline-block' }}>配方結構</span>
                <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {product.structure}
                </div>
              </div>

              <div>
                <span className="badge" style={{ marginBottom: '6px', display: 'inline-block' }}>釉面特點</span>
                <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {product.characteristics}
                </div>
              </div>

              <div>
                <span className="badge" style={{ marginBottom: '6px', display: 'inline-block' }}>外觀觸感</span>
                <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {product.appearance}
                </div>
              </div>

              <div style={{ background: 'var(--bg-main)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--accent-secondary)' }}>
                <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold', marginRight: '8px' }}>排程規格:</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-bold)' }}>{product.spec}</span>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
