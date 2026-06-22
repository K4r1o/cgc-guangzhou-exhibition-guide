import React from 'react';
import { FaMapMarkedAlt, FaBookOpen, FaBus } from 'react-icons/fa';

export default function Dashboard({ setView, theme, setTheme }) {
  // Mock next upcoming event based on transport.json (hardcoded for demo)
  const nextEvent = {
    time: "17:10",
    date: "06/22",
    route: "白云机场 → 喜來登",
    bus: "22座"
  };

  const themes = [
    { id: 'minimalist', label: '高端極簡白', color: '#D4AF37' },
    { id: 'glass', label: '磨砂玻璃暗黑風', color: '#00E5FF' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Theme Switcher */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '16px' }}>
        {themes.map(t => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: t.color,
              border: theme === t.id ? '2px solid var(--text-bold)' : '2px solid transparent',
              cursor: 'pointer',
              boxShadow: theme === t.id ? '0 0 8px var(--shadow-hover)' : 'none',
              transition: 'all 0.3s'
            }}
            title={t.label}
          />
        ))}
      </div>

      {/* Visual Cover */}
      <div style={{
        background: 'linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%)',
        borderRadius: '16px',
        padding: '32px 20px',
        textAlign: 'center',
        marginBottom: '24px',
        boxShadow: '0 8px 32px var(--shadow-hover)'
      }}>
        <h1 style={{ color: 'var(--text-inverse)', fontSize: '2rem', fontWeight: '900', margin: 0 }}>
          中釉廣州展指南
        </h1>
      </div>
      
      <div className="card" style={{ background: 'var(--header-gradient)', borderColor: 'var(--accent-primary)' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: 'var(--text-bold)' }}>即將到來行程</h3>
        <div className="flex-between">
          <div>
            <div style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', fontWeight: 'bold' }}>{nextEvent.time}</div>
            <div className="text-small">{nextEvent.date}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--text-bold)' }}>{nextEvent.route}</div>
            <div className="badge" style={{ display: 'inline-block', marginTop: '4px' }}>{nextEvent.bus}</div>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: '24px' }}>快速導航</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '24px 16px' }} onClick={() => setView('map')}>
          <FaMapMarkedAlt size={32} color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
          <div style={{ fontWeight: '600' }}>展場地圖</div>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '24px 16px' }} onClick={() => setView('products')}>
          <FaBookOpen size={32} color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
          <div style={{ fontWeight: '600' }}>小展冊說明</div>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '24px 16px', gridColumn: 'span 2' }} onClick={() => setView('transport')}>
          <FaBus size={32} color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
          <div style={{ fontWeight: '600' }}>交通時刻表</div>
        </div>
      </div>
    </div>
  );
}
