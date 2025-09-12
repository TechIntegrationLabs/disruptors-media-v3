import React from 'react';
import SEO from '../components/common/SEO';

const SecretAdminPanel: React.FC = () => {
  return (
    <>
      <SEO 
        title="Admin Panel - Disruptors Media"
        description="Administrative control panel"
        type="website"
        noindex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-brand-charcoal via-gray-900 to-black text-brand-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-accent-gold mb-4">Admin Panel</h1>
          <p className="text-lg mb-4">Under maintenance - syntax issues being resolved</p>
          <p className="text-sm text-gray-400">The admin panel is temporarily unavailable while we fix syntax errors.</p>
        </div>
      </div>
    </>
  );
};

export default SecretAdminPanel;