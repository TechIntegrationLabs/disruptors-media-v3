import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItem {
  name: string;
  href: string;
}

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // PRD Navigation Items - Exact specification
  const navigation: NavigationItem[] = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'SERVICES', href: '/services' },
    { name: 'WORK', href: '/work' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative w-full z-1000" style={{ padding: '25px 0' }}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo - PRD Specification */}
          <Link to="/" className="inline-block">
            <img 
              src="https://res.cloudinary.com/dvcvxhzmt/image/upload/v1755697029/logos/logo-menu.png" 
              alt="Disruptors Media" 
              className="h-auto max-h-10"
            />
          </Link>

          {/* Desktop Navigation - PRD Specification */}
          {!isMobile && (
            <nav className="inline-block float-right">
              <ul className="flex list-none m-0">
                {navigation.map((item, index) => (
                  <li key={index} className="inline-block text-center mx-4">
                    <Link 
                      to={item.href}
                      className={`font-pp-supply-mono text-body-primary transition-colors duration-300 ease-out text-brand-charcoal no-underline relative ${
                        isActive(item.href) ? 'font-semibold' : ''
                      } hover:after:w-full after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-brand-charcoal after:transition-all after:duration-300 after:ease-out`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Mobile Menu Toggle - PRD Specification */}
          {isMobile && (
            <button 
              className="inline-flex items-center justify-center p-2 bg-transparent border-none cursor-pointer"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <span className={`hamburger relative w-7 h-5 block ${isMenuOpen ? 'open' : ''}`}>
                <span className="absolute w-full h-0.5 bg-brand-charcoal transition-all duration-300 top-0 left-0"></span>
                <span className="absolute w-full h-0.5 bg-brand-charcoal transition-all duration-300 top-1/2 -translate-y-1/2 left-0"></span>
                <span className="absolute w-full h-0.5 bg-brand-charcoal transition-all duration-300 bottom-0 left-0"></span>
              </span>
            </button>
          )}
        </div>

        {/* Mobile Navigation - PRD Specification */}
        {isMobile && (
          <nav className={`fixed top-0 left-0 w-full h-screen bg-brand-cream transform transition-transform duration-400 ease-in-out z-[999] pt-24 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <ul className="list-none p-0 m-0 text-center">
              {navigation.map((item, index) => (
                <li key={index} className="my-5">
                  <Link 
                    to={item.href}
                    className={`font-pp-supply-mono text-2xl font-normal text-brand-charcoal no-underline uppercase block p-4 transition-colors duration-300 ${
                      isActive(item.href) ? 'font-semibold' : ''
                    } hover:bg-black/10`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;