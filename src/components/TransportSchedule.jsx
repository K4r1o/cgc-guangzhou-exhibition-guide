import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import transportData from '../data/transport.json';

export default function TransportSchedule({ highlightId }) {
  const [tab, setTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 當 highlightId 變更時自動滾動
  useEffect(() => {
    if (highlightId) {
      setTimeout(() => {
        const el = document.getElementById('highlighted-card');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [highlightId, tab]);

  const renderSchedule = (data) => {
    // 關鍵字搜尋過濾
    const filteredData = data.filter(item => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      // 搜尋物件內的所有欄位值
      return Object.values(item).some(val => String(val).toLowerCase().includes(q));
    });

    if (filteredData.length === 0) {
      return <div style={{ textAlign: 'center', color: 'var(--text-main)', padding: '32px 0' }}>找不到符合「{searchQuery}」的行程</div>;
    }

    return filteredData.map((item, index) => {
      const isHighlighted = highlightId === `${item.date}-${item.time}`;
      
      return (
        <div 
          key={`${item.date}-${item.time}-${index}`} 
          id={isHighlighted ? "highlighted-card" : undefined}
          className="card"
          style={isHighlighted ? {
            borderColor: 'var(--accent-primary)',
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
            transform: 'scale(1.02)',
            transition: 'all 0.5s ease',
            borderWidth: '2px'
          } : { transition: 'all 0.3s ease' }}
        >
          <div className="flex-between" style={{ marginBottom: '8px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: isHighlighted ? 'var(--accent-primary)' : 'var(--accent-secondary)' }}>
              {isHighlighted && <span style={{ marginRight: '6px' }}>👉</span>}
              <span style={{ color: isHighlighted ? 'var(--text-bold)' : 'inherit' }}>{item.date}</span>
            </div>
            <div className="badge" style={isHighlighted ? { background: 'var(--accent-primary)', color: 'var(--text-inverse)' } : {}}>{item.time}</div>
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
      );
    });
  };

  // 取得當前標籤頁的資料
  const getCurrentData = () => {
    if (tab === 'all') {
      const all = [
        ...transportData.pickup,
        ...transportData.dropoff,
        ...transportData.charter
      ];
      // 依照日期與時間排序
      return all.sort((a, b) => {
        const timeA = new Date(`${a.date}T${(a.time || '00:00').padStart(5, '0')}:00`).getTime();
        const timeB = new Date(`${b.date}T${(b.time || '00:00').padStart(5, '0')}:00`).getTime();
        return timeA - timeB;
      });
    }
    return transportData[tab];
  };

  return (
    <div className="animate-fade-in">
      <h2 className="glow-text">送接機&包車</h2>

      {/* Search Box */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <FaSearch style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-main)', opacity: 0.5 }} />
        <input 
          type="text" 
          placeholder="搜尋人員、公司、航班..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 12px 12px 42px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-bold)',
            fontSize: '1rem',
            outline: 'none',
            boxShadow: '0 4px 12px var(--shadow-color)',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        />
      </div>

      <div className="card" style={{ marginBottom: '16px', borderStyle: 'dashed', borderColor: 'var(--accent-secondary)' }}>
        <div style={{ color: 'var(--accent-secondary)', fontWeight: 'bold', marginBottom: '8px' }}>🚕 司機聯絡方式</div>
        <div style={{ fontSize: '0.9rem', marginBottom: '4px', color: 'var(--text-bold)' }}>冼生 13902413514</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-bold)' }}>雷狄 13927777360</div>
      </div>
      
      <div className="tabs">
        <button className={`btn ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>全部</button>
        <button className={`btn ${tab === 'pickup' ? 'active' : ''}`} onClick={() => setTab('pickup')}>接機</button>
        <button className={`btn ${tab === 'dropoff' ? 'active' : ''}`} onClick={() => setTab('dropoff')}>送機</button>
        <button className={`btn ${tab === 'charter' ? 'active' : ''}`} onClick={() => setTab('charter')}>包車</button>
      </div>

      <div style={{ marginTop: '16px' }}>
        {renderSchedule(getCurrentData())}
      </div>
    </div>
  );
}
