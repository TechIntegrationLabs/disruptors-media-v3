import React from 'react';
import { Link } from 'react-router-dom';

const PreFooter: React.FC = () => {
  // PRD Navigation Links
  const footerLinks = [
    { name: 'PRIVACY POLICY', href: '/privacy' },
    { name: 'TERMS OF SERVICE', href: '/terms' },
    { name: 'CAREERS', href: '/careers' },
    { name: 'PRESS', href: '/press' },
  ];

  return (
    <section 
      className="w-full text-center"
      style={{ padding: '40px 0' }}
    >
      <div className="container-custom">
        <nav>
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              <Link
                to={link.href}
                className="text-brand-charcoal no-underline hover:opacity-80 transition-opacity inline-block mx-4"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '28px',
                  textTransform: 'uppercase',
                  textDecoration: 'none'
                }}
              >
                {link.name}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className="mx-4 text-brand-charcoal">|</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default PreFooter;