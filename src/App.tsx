import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';
import PageTransition from './components/common/PageTransition';
import { CLOUDINARY_ASSETS } from './constants/cloudinaryAssets';
// import LoadingCounter from './components/animations/LoadingCounter';
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
import ContentProduction from './pages/services/ContentProduction';
import DigitalTransformation from './pages/services/DigitalTransformation';
import Gallery from './pages/Gallery';
import Podcast from './pages/Podcast';
import FAQ from './pages/FAQ';
import CaseStudyDetail from './pages/CaseStudyDetail';

function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <div className="App" style={{ background: `url('${CLOUDINARY_ASSETS.backgrounds.mainBg}') repeat` }}>
        {/* <LoadingCounter /> */}
        <ErrorBoundary>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
              <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
              <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
              <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
              <Route path="/assessment" element={<PageTransition><AIAssessment /></PageTransition>} />
              <Route path="/roi-calculator" element={<PageTransition><ROICalculator /></PageTransition>} />
              <Route path="/services/ai-marketing" element={<PageTransition><AIMarketing /></PageTransition>} />
              <Route path="/services/studio" element={<PageTransition><StudioServices /></PageTransition>} />
              <Route path="/services/content-production" element={<PageTransition><ContentProduction /></PageTransition>} />
              <Route path="/services/digital-transformation" element={<PageTransition><DigitalTransformation /></PageTransition>} />
              <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
              <Route path="/podcast" element={<PageTransition><Podcast /></PageTransition>} />
              <Route path="/case-study/:id" element={<PageTransition><CaseStudyDetail /></PageTransition>} />
              <Route path="/work/:slug" element={<PageTransition><CaseStudyDetail /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </ErrorBoundary>
      </div>
    </HelmetProvider>
  );
}

export default App;