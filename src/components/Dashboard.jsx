import React, { useMemo } from 'react';
import { FaMapMarkedAlt, FaBookOpen, FaBus } from 'react-icons/fa';
import transportData from '../data/transport.json';

export default function Dashboard({ setView, theme, setTheme }) {
  // 動態抓取下一筆行程
  const nextEvent = useMemo(() => {
    const allEvents = [
      ...transportData.pickup,
      ...transportData.dropoff,
      ...transportData.charter
    ].filter(e => e.date && e.time); // 過濾掉沒有時間的空項目

    // 將字串時間轉換為可比較的 Date 物件
    const sortedEvents = allEvents.map(e => {
      // 確保格式為 YYYY-MM-DD HH:mm
      const dateTimeStr = `${e.date}T${e.time.padStart(5, '0')}:00`;
      return {
        ...e,
        timestamp: new Date(dateTimeStr).getTime()
      };
    }).sort((a, b) => a.timestamp - b.timestamp);

    const now = new Date().getTime();
    
    // 找出大於等於現在時間的下一個行程
    let upcoming = sortedEvents.find(e => e.timestamp >= now);
    
    // 如果全部都過期了，就顯示最後一個；如果還沒發生，就顯示第一個
    if (!upcoming && sortedEvents.length > 0) upcoming = sortedEvents[sortedEvents.length - 1];
    if (!upcoming) return null;

    // 將 2026-06-22 轉成 06/22 顯示
    const shortDate = upcoming.date.substring(5).replace('-', '/');

    return {
      time: upcoming.time,
      date: shortDate,
      route: upcoming.route.replace('➤', ' → '),
      bus: upcoming.bus || '不適用'
    };
  }, []);

  const themes = [
    { id: 'minimalist', label: '高端極簡白', color: '#D4AF37' },
    { id: 'glass', label: '磨砂玻璃暗黑風', color: '#00E5FF' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Theme Switcher */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', opacity: 0.8, marginRight: '4px' }}>主題切換</span>
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
          <div style={{ fontWeight: '600' }}>展磚說明</div>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '24px 16px' }} onClick={() => setView('products')}>
          <FaBookOpen size={32} color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
          <div style={{ fontWeight: '600' }}>小展冊說明</div>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '24px 16px', gridColumn: 'span 2' }} onClick={() => setView('transport')}>
          <FaBus size={32} color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
          <div style={{ fontWeight: '600' }}>送接機&包車</div>
        </div>
      </div>
    </div>
  );
}
