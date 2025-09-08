import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Analytics from '../common/Analytics';
import Chat from '../common/Chat';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dvcvxhzmt/image/upload/v1755697037/backgrounds/main-bg.jpg)`
      }}
    >
      <Analytics />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Chat />
    </div>
  );
};

export default Layout;