import React from 'react';
import { FaMapMarkedAlt, FaBookOpen, FaBus } from 'react-icons/fa';

export default function Dashboard({ setView }) {
  // Mock next upcoming event based on transport.json (hardcoded for demo)
  const nextEvent = {
    time: "17:10",
    date: "06/22",
    route: "白云机场 ➤ 安喜曼",
    bus: "22座"
  };

  return (
    <div className="animate-fade-in">
      {/* Visual Cover */}
      <div style={{
        background: 'linear-gradient(135deg, var(--accent-teal) 0%, var(--accent-cyan) 100%)',
        borderRadius: '16px',
        padding: '32px 20px',
        textAlign: 'center',
        marginBottom: '24px',
        boxShadow: '0 8px 32px rgba(102, 252, 241, 0.2)'
      }}>
        <h1 style={{ color: '#0B0C10', fontSize: '2rem', fontWeight: '900', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          中釉廣州展指南
        </h1>
      </div>
      
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(31,40,51,1) 0%, rgba(11,12,16,1) 100%)', borderColor: 'var(--accent-cyan)' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>即將到來行程</h3>
        <div className="flex-between">
          <div>
            <div style={{ color: 'var(--accent-cyan)', fontSize: '1.2rem', fontWeight: 'bold' }}>{nextEvent.time}</div>
            <div className="text-small">{nextEvent.date}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div>{nextEvent.route}</div>
            <div className="badge" style={{ display: 'inline-block', marginTop: '4px' }}>{nextEvent.bus}</div>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: '24px' }}>快速導覽</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '24px 16px' }} onClick={() => setView('map')}>
          <FaMapMarkedAlt size={32} color="var(--accent-cyan)" style={{ marginBottom: '12px' }} />
          <div style={{ fontWeight: '600' }}>展場地圖</div>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '24px 16px' }} onClick={() => setView('products')}>
          <FaBookOpen size={32} color="var(--accent-cyan)" style={{ marginBottom: '12px' }} />
          <div style={{ fontWeight: '600' }}>小展冊說明</div>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '24px 16px', gridColumn: 'span 2' }} onClick={() => setView('transport')}>
          <FaBus size={32} color="var(--accent-cyan)" style={{ marginBottom: '12px' }} />
          <div style={{ fontWeight: '600' }}>交通時刻表</div>
        </div>
      </div>
    </div>
  );
}
