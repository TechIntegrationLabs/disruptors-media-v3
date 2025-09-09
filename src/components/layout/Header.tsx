import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { CLOUDINARY_ASSETS } from '../../constants/cloudinaryAssets';

interface NavigationItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string; }[];
}

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // PRD Navigation Items - Enhanced with dropdowns
  const navigation: NavigationItem[] = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { 
      name: 'SERVICES', 
      href: '/services',
      submenu: [
        { name: 'AI Marketing', href: '/services/ai-marketing' },
        { name: 'Studio Services', href: '/services/studio' },
        { name: 'Content Production', href: '/services/content-production' },
        { name: 'Digital Transformation', href: '/services/digital-transformation' },
        { name: 'All Services', href: '/services' }
      ]
    },
    { name: 'WORK', href: '/work' },
    {
      name: 'TOOLS',
      href: '#',
      submenu: [
        { name: 'AI Assessment', href: '/assessment' },
        { name: 'ROI Calculator', href: '/roi-calculator' },
        { name: 'Blog', href: '/blog' },
        { name: 'Portfolio', href: '/portfolio' }
      ]
    },
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


  const handleDropdownClose = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="relative w-full z-1000" style={{ padding: '25px 0' }}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo - PRD Specification */}
          <Link to="/" className="inline-block">
            <img 
              src="https://res.cloudinary.com/dvcvxhzmt/image/upload/v1755697031/logos/logo.svg" 
              alt="Disruptors Media" 
              className="h-auto max-h-10"
            />
          </Link>

          {/* Desktop Navigation - Enhanced with dropdowns */}
          {!isMobile && (
            <nav className="inline-block float-right">
              <ul className="flex list-none m-0">
                {navigation.map((item, index) => (
                  <li 
                    key={index} 
                    className="inline-block text-center mx-4 relative"
                    onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.href === '#' ? (
                      <span 
                        className={`font-pp-supply-mono text-body-primary transition-colors duration-300 ease-out text-brand-charcoal no-underline relative cursor-pointer ${
                          isActive(item.href) ? 'font-semibold' : ''
                        } hover:after:w-full after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-brand-charcoal after:transition-all after:duration-300 after:ease-out`}
                      >
                        {item.name}
                      </span>
                    ) : (
                      <Link 
                        to={item.href}
                        className={`font-pp-supply-mono text-body-primary transition-colors duration-300 ease-out text-brand-charcoal no-underline relative ${
                          isActive(item.href) ? 'font-semibold' : ''
                        } hover:after:w-full after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-brand-charcoal after:transition-all after:duration-300 after:ease-out`}
                      >
                        {item.name}
                      </Link>
                    )}
                    
                    {/* Dropdown Menu */}
                    {item.submenu && activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-brand-cream border border-brand-charcoal shadow-lg z-50">
                        <ul className="list-none p-0 m-0">
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.href}
                                className={`block px-4 py-3 font-pp-supply-mono text-sm text-brand-charcoal no-underline transition-colors duration-200 ${
                                  isActive(subItem.href) ? 'bg-brand-charcoal text-brand-cream' : 'hover:bg-gray-100'
                                }`}
                                onClick={handleDropdownClose}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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

        {/* Mobile Navigation - Enhanced with submenus */}
        {isMobile && (
          <nav className={`fixed top-0 left-0 w-full h-screen bg-brand-cream transform transition-transform duration-400 ease-in-out z-[999] pt-24 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <ul className="list-none p-0 m-0 text-center">
              {navigation.map((item, index) => (
                <li key={index} className="my-2">
                  <Link 
                    to={item.href}
                    className={`font-pp-supply-mono text-2xl font-normal text-brand-charcoal no-underline uppercase block p-4 transition-colors duration-300 ${
                      isActive(item.href) ? 'font-semibold' : ''
                    } hover:bg-black/10`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {item.submenu && (
                    <ul className="list-none p-0 m-0 bg-gray-50">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.href}
                            className={`font-pp-supply-mono text-lg text-brand-charcoal no-underline block p-3 transition-colors duration-300 ${
                              isActive(subItem.href) ? 'font-semibold bg-brand-charcoal text-brand-cream' : 'hover:bg-gray-200'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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