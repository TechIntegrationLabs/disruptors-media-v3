import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AIAssessment from './pages/AIAssessment';
import ROICalculator from './pages/ROICalculator';
import NotFound from './pages/NotFound';
import AIMarketing from './pages/services/AIMarketing';
import StudioServices from './pages/services/StudioServices';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/assessment" element={<AIAssessment />} />
            <Route path="/roi-calculator" element={<ROICalculator />} />
            <Route path="/services/ai-marketing" element={<AIMarketing />} />
            <Route path="/services/studio" element={<StudioServices />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </div>
  );
}

export default App;