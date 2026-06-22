import React, { useState, useEffect } from 'react';
import { FaHome, FaMap, FaLayerGroup, FaBusAlt } from 'react-icons/fa';
import Dashboard from './components/Dashboard';
import ExhibitionMap from './components/ExhibitionMap';
import ProductCatalog from './components/ProductCatalog';
import TransportSchedule from './components/TransportSchedule';

function App() {
  const [view, setView] = useState('home');
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'glass');
  const [highlightId, setHighlightId] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const renderView = () => {
    switch(view) {
      case 'home': return <Dashboard setView={setView} setHighlightId={setHighlightId} theme={theme} setTheme={setTheme} />;
      case 'map': return <ExhibitionMap />;
      case 'products': return <ProductCatalog />;
      case 'transport': return <TransportSchedule highlightId={highlightId} />;
      default: return <Dashboard setView={setView} setHighlightId={setHighlightId} theme={theme} setTheme={setTheme} />;
    }
  };

  return (
    <div className="app-container">
      <div className="content-area">
        {renderView()}
      </div>

      <nav className="bottom-nav">
        <button className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
          <FaHome />
          <span>首頁</span>
        </button>
        <button className={`nav-item ${view === 'map' ? 'active' : ''}`} onClick={() => setView('map')}>
          <FaMap />
          <span>展磚說明</span>
        </button>
        <button className={`nav-item ${view === 'products' ? 'active' : ''}`} onClick={() => setView('products')}>
          <FaLayerGroup />
          <span>小展冊說明</span>
        </button>
        <button className={`nav-item ${view === 'transport' ? 'active' : ''}`} onClick={() => setView('transport')}>
          <FaBusAlt />
          <span>送接機&包車</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
