import React, { useState } from 'react';
import transportData from '../data/transport.json';

export default function TransportSchedule() {
  const [tab, setTab] = useState('pickup');

  const renderSchedule = (data) => {
    return data.map((item, index) => (
      <div key={index} className="card">
        <div className="flex-between" style={{ marginBottom: '8px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--accent-secondary)' }}>{item.date}</div>
          <div className="badge">{item.time}</div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', fontSize: '0.9rem' }}>
          <div style={{ color: 'var(--text-main)', opacity: 0.8 }}>路線</div>
          <div style={{ color: 'var(--text-bold)' }}>{item.route}</div>
          
          <div style={{ color: 'var(--text-main)', opacity: 0.8 }}>對象</div>
          <div style={{ color: 'var(--text-main)' }}>{item.country} / {item.company} {item.pax > 0 ? `(${item.pax}人)` : ''}</div>
          
          {item.passengers && (
            <>
              <div style={{ color: 'var(--text-main)', opacity: 0.8 }}>搭車人員</div>
              <div style={{ lineHeight: '1.4', color: 'var(--text-bold)' }}>{item.passengers}</div>
            </>
          )}
          
          {item.flight && (
            <>
              <div style={{ color: 'var(--text-main)', opacity: 0.8 }}>航班</div>
              <div style={{ color: 'var(--accent-primary)' }}>{item.flight}</div>
            </>
          )}
          
          <div style={{ color: 'var(--text-main)', opacity: 0.8 }}>負責人</div>
          <div style={{ color: 'var(--text-main)' }}>{item.leader}</div>
          
          <div style={{ color: 'var(--text-main)', opacity: 0.8 }}>車型</div>
          <div style={{ color: 'var(--text-main)' }}>{item.bus}</div>
        </div>
      </div>
    ));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="glow-text">送接機&包車</h2>

      <div className="card" style={{ marginBottom: '16px', borderStyle: 'dashed', borderColor: 'var(--accent-secondary)' }}>
        <div style={{ color: 'var(--accent-secondary)', fontWeight: 'bold', marginBottom: '8px' }}>🚕 司機聯絡方式</div>
        <div style={{ fontSize: '0.9rem', marginBottom: '4px', color: 'var(--text-bold)' }}>冼生 13902413514</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-bold)' }}>雷狄 13927777360</div>
      </div>
      
      <div className="tabs">
        <button className={`btn ${tab === 'pickup' ? 'active' : ''}`} onClick={() => setTab('pickup')}>接機 (Pickup)</button>
        <button className={`btn ${tab === 'dropoff' ? 'active' : ''}`} onClick={() => setTab('dropoff')}>送機 (Drop-off)</button>
        <button className={`btn ${tab === 'charter' ? 'active' : ''}`} onClick={() => setTab('charter')}>包車 (Charter)</button>
      </div>

      <div style={{ marginTop: '16px' }}>
        {renderSchedule(transportData[tab])}
      </div>
    </div>
  );
}
