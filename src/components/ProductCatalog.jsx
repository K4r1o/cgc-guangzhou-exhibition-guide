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
      <h2 className="glow-text">Product Specs</h2>

      <div className="tabs">
        <button className={`btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`btn ${filter === 'anti-slip' ? 'active' : ''}`} onClick={() => setFilter('anti-slip')}>Anti-slip</button>
        <button className={`btn ${filter === 'matt' ? 'active' : ''}`} onClick={() => setFilter('matt')}>Matt</button>
      </div>

      {filteredProducts.map(product => (
        <div key={product.id} className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '24px' }}>
          
          {/* Image Gallery (Horizontal Scroll) */}
          {product.images && product.images.length > 0 && (
            <div style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              gap: '2px', 
              background: '#000',
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
            <div className="card-title" style={{ color: 'var(--accent-cyan)', fontSize: '1.3rem' }}>{product.name}</div>
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

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--accent-teal)' }}>
                <span style={{ color: 'var(--accent-teal)', fontWeight: 'bold', marginRight: '8px' }}>排程規格:</span>
                <span style={{ fontSize: '0.9rem' }}>{product.spec}</span>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
