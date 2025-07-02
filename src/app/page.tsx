'use client';

import InteractiveSearch from '@/components/InteractiveSearch';
import { useEffect, useState } from 'react';

const themes = [
  { name: 'Sunset Orange', bg: '#FF6B35', text: '#2C1810', accent: '#FFE5D9' },
  { name: 'Ocean Blue', bg: '#006BA6', text: '#E8F4F8', accent: '#7FB3D3' },
  { name: 'Forest Green', bg: '#2D5016', text: '#E8F5E8', accent: '#7FB069' },
  { name: 'Purple Dream', bg: '#7209B7', text: '#F3E8FF', accent: '#C77DFF' },
  { name: 'Crimson Red', bg: '#D00000', text: '#FFE8E8', accent: '#FF6B6B' },
  { name: 'Golden Hour', bg: '#F77F00', text: '#2D1B00', accent: '#FFD60A' },
  { name: 'Deep Teal', bg: '#264653', text: '#E9F7EF', accent: '#2A9D8F' },
  { name: 'Midnight Navy', bg: '#1D3557', text: '#F1F3F4', accent: '#457B9D' }
];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  useEffect(() => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setCurrentTheme(randomTheme);
    document.body.style.backgroundColor = randomTheme.bg;
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-4">
          <div 
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }}
          >
            🎨 Current Theme: {currentTheme.name}
          </div>
        </div>
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: currentTheme.text }}
          >
            Interactive Product Search
          </h1>
          <p 
            className="text-xl mb-8"
            style={{ color: currentTheme.text, opacity: 0.8 }}
          >
            A buttery-smooth search experience with real-time filtering and beautiful animations
          </p>
        </div>
        
        <InteractiveSearch />
      </div>
    </div>
  );
}
