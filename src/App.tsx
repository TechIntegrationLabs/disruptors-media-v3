import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import AIMarketing from './pages/services/AIMarketing';
import StudioServices from './pages/services/StudioServices';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/ai-marketing" element={<AIMarketing />} />
          <Route path="/services/studio" element={<StudioServices />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;