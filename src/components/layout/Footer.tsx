import React from 'react';
import { CLOUDINARY_ASSETS } from '../../constants/cloudinaryAssets';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="w-full bg-texture bg-logo-emboss text-center"
      style={{ 
        padding: '160px 30px 40px 30px',
        background: `url('${CLOUDINARY_ASSETS.backgrounds.mainBg}') repeat${CLOUDINARY_ASSETS.logos.logoEmboss ? `, url('${CLOUDINARY_ASSETS.logos.logoEmboss}') center 40px no-repeat` : ''}`
      }}
    >
      <div className="container-custom">
        {/* Copyright Information - PRD Specification */}
        <p 
          className="text-brand-charcoal mb-6"
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '16px',
            fontWeight: 400,
            textTransform: 'uppercase',
            lineHeight: 1.8
          }}
        >
          © {currentYear} DISRUPTORS MEDIA. ALL RIGHTS RESERVED.
        </p>

        {/* Contact Information - PRD Specification */}
        <div 
          className="mb-8"
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '16px',
            fontWeight: 400,
            textTransform: 'uppercase',
            lineHeight: 1.8,
            color: 'var(--color-brand-charcoal)'
          }}
        >
          <p className="mb-2">
            <a 
              href="mailto:hello@disruptorsmedia.com"
              className="text-brand-charcoal no-underline hover:opacity-80 transition-opacity"
            >
              HELLO@DISRUPTORSMEDIA.COM
            </a>
          </p>
          <p className="mb-2">
            <a 
              href="tel:+1234567890"
              className="text-brand-charcoal no-underline hover:opacity-80 transition-opacity"
            >
              +1 (XXX) XXX-XXXX
            </a>
          </p>
          <p className="mb-4">
            [BUSINESS ADDRESS]<br />
            [CITY, STATE ZIP CODE]
          </p>
        </div>

        {/* Social Media Icons - PRD Specification */}
        <div className="flex justify-center space-x-6">
          <a 
            href="https://facebook.com/disruptorsmedia" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ margin: '0 13px' }}
          >
            <img 
              src="/images/fb.svg" 
              alt="Facebook" 
              className="w-6 h-6"
            />
          </a>
          <a 
            href="https://instagram.com/disruptorsmedia" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ margin: '0 13px' }}
          >
            <img 
              src="/images/insta.svg" 
              alt="Instagram" 
              className="w-6 h-6"
            />
          </a>
          <a 
            href="https://x.com/disruptorsmedia" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ margin: '0 13px' }}
          >
            <img 
              src="/images/twitter.svg" 
              alt="Twitter/X" 
              className="w-6 h-6"
            />
          </a>
          <a 
            href="https://youtube.com/@disruptorsmedia" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ margin: '0 13px' }}
          >
            <img 
              src="/images/youtube.svg" 
              alt="YouTube" 
              className="w-6 h-6"
            />
          </a>
          <a 
            href="https://linkedin.com/company/disruptorsmedia" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ margin: '0 13px' }}
          >
            <img 
              src="/images/linkedin.svg" 
              alt="LinkedIn" 
              className="w-6 h-6"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;