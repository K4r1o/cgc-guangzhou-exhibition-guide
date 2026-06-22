import React, { useMemo, useState, useEffect } from 'react';
import { FaMapMarkedAlt, FaBookOpen, FaBus, FaClock, FaCloudSun } from 'react-icons/fa';
import transportData from '../data/transport.json';

// 天氣代碼轉換
const getWeatherInfo = (code) => {
  if (code === 0) return { emoji: '☀️', text: '晴天' };
  if (code === 1 || code === 2) return { emoji: '⛅', text: '多雲' };
  if (code === 3) return { emoji: '☁️', text: '陰天' };
  if (code >= 45 && code <= 48) return { emoji: '🌫️', text: '有霧' };
  if (code >= 51 && code <= 55) return { emoji: '🌧️', text: '毛毛雨' };
  if (code >= 61 && code <= 65) return { emoji: '🌧️', text: '下雨' };
  if (code >= 80 && code <= 82) return { emoji: '🌦️', text: '陣雨' };
  if (code >= 95) return { emoji: '⛈️', text: '雷陣雨' };
  return { emoji: '☁️', text: '未知' };
};

export default function Dashboard({ setView, theme, setTheme }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({ loading: true, temp: '--', emoji: '☁️', desc: '載入中...' });

  // 即時時鐘
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 抓取廣州即時天氣
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=23.1291&longitude=113.2644&current_weather=true');
        const data = await res.json();
        const info = getWeatherInfo(data.current_weather.weathercode);
        setWeather({
          loading: false,
          temp: Math.round(data.current_weather.temperature),
          emoji: info.emoji,
          desc: info.text
        });
      } catch (err) {
        setWeather({ loading: false, temp: '--', emoji: '⚠️', desc: '無法取得' });
      }
    };
    fetchWeather();
  }, []);

  // 時間格式化
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const formattedDate = `${currentTime.getMonth() + 1}月${currentTime.getDate()}日 ${weekdays[currentTime.getDay()]}`;
  const formattedTime = currentTime.toLocaleTimeString('zh-TW', { hour12: false });

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
        boxShadow: '0 8px 32px var(--shadow-hover)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Overlay for depth */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.5
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'var(--text-inverse)', fontSize: '2.2rem', fontWeight: '900', margin: '0', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
            中釉廣州展指南
          </h1>
        </div>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '24px 16px', marginBottom: '0' }} onClick={() => setView('map')}>
          <FaMapMarkedAlt size={32} color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
          <div style={{ fontWeight: '600' }}>展磚說明</div>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '24px 16px', marginBottom: '0' }} onClick={() => setView('products')}>
          <FaBookOpen size={32} color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
          <div style={{ fontWeight: '600' }}>小展冊說明</div>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '24px 16px', gridColumn: 'span 2', marginBottom: '0' }} onClick={() => setView('transport')}>
          <FaBus size={32} color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
          <div style={{ fontWeight: '600' }}>送接機&包車</div>
        </div>
      </div>

      {/* Moved Time & Weather Widget */}
      <div className="card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        padding: '24px 16px',
        color: 'var(--text-bold)',
        marginBottom: '0'
      }}>
        {/* Clock Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaClock size={24} style={{ color: 'var(--accent-primary)' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '2px' }}>{formattedDate}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '1px', lineHeight: '1' }}>
              {formattedTime}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '40px', background: 'var(--border-color)' }} />

        {/* Weather Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '2rem', lineHeight: '1' }}>{weather.emoji}</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '2px' }}>廣州 {weather.desc}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', lineHeight: '1' }}>
              {weather.temp}°C
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
