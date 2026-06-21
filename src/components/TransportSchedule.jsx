import React, { useState } from 'react';
import transportData from '../data/transport.json';

export default function TransportSchedule() {
  const [tab, setTab] = useState('pickup');

  const renderSchedule = (data) => {
    return data.map((item, index) => (
      <div key={index} className="card">
        <div className="flex-between" style={{ marginBottom: '8px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--accent-teal)' }}>{item.date}</div>
          <div className="badge">{item.time}</div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', fontSize: '0.9rem' }}>
          <div style={{ color: '#888' }}>路線</div>
          <div style={{ color: 'var(--text-light)' }}>{item.route}</div>
          
          <div style={{ color: '#888' }}>對象</div>
          <div>{item.country} / {item.company} {item.pax > 0 ? `(${item.pax}人)` : ''}</div>
          
          {item.passengers && (
            <>
              <div style={{ color: '#888' }}>搭車人員</div>
              <div style={{ lineHeight: '1.4', color: '#ddd' }}>{item.passengers}</div>
            </>
          )}
          
          {item.flight && (
            <>
              <div style={{ color: '#888' }}>航班</div>
              <div style={{ color: 'var(--accent-cyan)' }}>{item.flight}</div>
            </>
          )}
          
          <div style={{ color: '#888' }}>負責人</div>
          <div>{item.leader}</div>
          
          <div style={{ color: '#888' }}>車型</div>
          <div>{item.bus}</div>
        </div>
      </div>
    ));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="glow-text">送接機&包車</h2>

      <div className="card" style={{ marginBottom: '16px', background: 'rgba(255, 152, 0, 0.1)', borderColor: '#ff9800' }}>
        <div style={{ color: '#ff9800', fontWeight: 'bold', marginBottom: '8px' }}>🚕 司機聯絡方式 (三水大鴻)</div>
        <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>冼生 13902413514</div>
        <div style={{ fontSize: '0.9rem' }}>雷狄 13927777360</div>
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
