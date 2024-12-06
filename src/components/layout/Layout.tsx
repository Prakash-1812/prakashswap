import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div 
    className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=3432&ixlib=rb-4.0.3')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="w-full min-h-screen backdrop-blur-xl bg-black/40 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
        {children}
      </main>
      <Footer />
    </div>
  </div>
);