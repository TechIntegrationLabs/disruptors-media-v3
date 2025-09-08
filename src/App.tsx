import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';
import { CLOUDINARY_ASSETS } from './constants/cloudinaryAssets';
import LoadingCounter from './components/animations/LoadingCounter';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AIAssessment from './pages/AIAssessment';
import ROICalculator from './pages/ROICalculator';
import NotFound from './pages/NotFound';
import AIMarketing from './pages/services/AIMarketing';
import StudioServices from './pages/services/StudioServices';
import Gallery from './pages/Gallery';
import Podcast from './pages/Podcast';
import FAQ from './pages/FAQ';
import CaseStudyDetail from './pages/CaseStudyDetail';

function App() {
  return (
    <div className="App" style={{ background: `url('${CLOUDINARY_ASSETS.backgrounds.mainBg}') repeat` }}>
      <LoadingCounter />
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/assessment" element={<AIAssessment />} />
            <Route path="/roi-calculator" element={<ROICalculator />} />
            <Route path="/services/ai-marketing" element={<AIMarketing />} />
            <Route path="/services/studio" element={<StudioServices />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/case-study/:id" element={<CaseStudyDetail />} />
            <Route path="/work/:slug" element={<CaseStudyDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </div>
  );
}

export default App;