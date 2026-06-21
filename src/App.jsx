import React, { useState } from 'react';
import { FaHome, FaMap, FaLayerGroup, FaBusAlt } from 'react-icons/fa';
import Dashboard from './components/Dashboard';
import ExhibitionMap from './components/ExhibitionMap';
import ProductCatalog from './components/ProductCatalog';
import TransportSchedule from './components/TransportSchedule';

function App() {
  const [view, setView] = useState('home');

  const renderView = () => {
    switch(view) {
      case 'home': return <Dashboard setView={setView} />;
      case 'map': return <ExhibitionMap />;
      case 'products': return <ProductCatalog />;
      case 'transport': return <TransportSchedule />;
      default: return <Dashboard setView={setView} />;
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
