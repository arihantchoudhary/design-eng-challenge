'use client';

import InteractiveSearch from '@/components/InteractiveSearch';
import { useEffect, useState } from 'react';
import { themes, colorVariations, themeNames, Theme } from '@/types/theme';

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.minecraft);
  type ColorScheme = (typeof colorVariations)[keyof typeof colorVariations][number];
  const [currentColorScheme, setCurrentColorScheme] = useState<ColorScheme>(colorVariations.minecraft[0]);

  useEffect(() => {
    // Randomly choose from all available themes
    const randomThemeName = themeNames[Math.floor(Math.random() * themeNames.length)];
    const selectedTheme = themes[randomThemeName];
    setCurrentTheme(selectedTheme);

    // Choose random color scheme based on theme
    const themeColorVariations = colorVariations[randomThemeName];
    const colorScheme = themeColorVariations[Math.floor(Math.random() * themeColorVariations.length)];
    setCurrentColorScheme(colorScheme);

    // Apply theme to body
    document.body.className = `theme-${selectedTheme.type}`;
    document.body.style.backgroundColor = selectedTheme.colors.background;
    document.body.style.color = selectedTheme.colors.foreground;
    document.body.style.fontFamily = selectedTheme.fonts.primary;

    // Apply theme-specific background effects
    if (selectedTheme.effects.pixelated) {
      // Pixelated texture for retro themes
      document.body.style.backgroundImage = `
        linear-gradient(0deg, ${selectedTheme.colors.background} 0%, ${colorScheme.bg} 100%),
        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, rgba(0,0,0,0.1) 1px, transparent 1px)
      `;
      document.body.style.backgroundSize = '100%, 16px 16px, 16px 16px';
    } else {
      // Smooth gradient for modern themes
      document.body.style.backgroundImage = `
        linear-gradient(135deg, ${selectedTheme.colors.background} 0%, ${colorScheme.bg} 70%, ${colorScheme.accent}20 100%),
        radial-gradient(circle at 20% 80%, ${selectedTheme.colors.accent}15 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, ${selectedTheme.colors.primary}10 0%, transparent 50%)
      `;
      document.body.style.backgroundSize = 'cover';
    }
  }, []);

  const getThemeTitle = () => {
    switch (currentTheme.type) {
      case 'minecraft':
        return '⛏️ MINECRAFT ITEM SHOP ⛏️';
      case 'space':
        return '🚀 GALACTIC SEARCH STATION 🚀';
      case 'carnival':
        return '🎪 CARNIVAL ITEM BAZAAR 🎪';
      case 'retro':
        return '👾 RETRO ARCADE SHOP 👾';
      case 'luxury':
        return '👑 LUXURY COLLECTION 👑';
      case 'neon':
        return '⚡ NEON MARKETPLACE ⚡';
      default:
        return `${currentTheme.name} Search Experience`;
    }
  };

  const getThemeSubtitle = () => {
    switch (currentTheme.type) {
      case 'minecraft':
        return '🔍 Search and craft your perfect inventory with pixelated precision!';
      case 'space':
        return '🛸 Navigate the cosmos to discover stellar products!';
      case 'carnival':
        return '🎠 Step right up and find amazing deals!';
      case 'retro':
        return '🕹️ Level up your shopping game!';
      case 'luxury':
        return '💎 Discover exquisite items worthy of royalty';
      case 'neon':
        return '💫 Experience the future of digital shopping';
      default:
        return `Discover amazing products with ${currentTheme.name.toLowerCase()} style`;
    }
  };

  const getThemeIndicator = () => {
    return `✨ ${currentTheme.name} Theme: ${currentColorScheme.name}`;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-4">
          <div 
            className={`inline-block ${currentTheme.type}-tag mb-4`}
            style={{ 
              backgroundColor: currentColorScheme.accent, 
              color: currentTheme.type === 'minecraft' ? '#2E2E2E' : 'white',
              fontFamily: currentTheme.fonts.primary,
              fontSize: currentTheme.type === 'minecraft' ? '10px' : '12px',
              padding: currentTheme.type === 'minecraft' ? '8px 16px' : '6px 12px'
            }}
          >
            {getThemeIndicator()}
          </div>
        </div>
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-bold mb-4 text-white"
            style={{ 
              fontFamily: currentTheme.fonts.primary,
              fontSize: currentTheme.type === 'minecraft' ? '24px' : '36px',
              textShadow: currentTheme.type === 'minecraft' 
                ? '2px 2px 0px rgba(0,0,0,0.8)'
                : '0 2px 10px rgba(0,0,0,0.3)',
              lineHeight: '1.4'
            }}
          >
            {getThemeTitle()}
          </h1>
          <p 
            className="text-xl mb-8"
            style={{ 
              fontFamily: currentTheme.fonts.secondary,
              fontSize: currentTheme.type === 'minecraft' ? '20px' : '18px',
              color: currentTheme.type === 'minecraft' ? '#FFD700' : 'rgba(255,255,255,0.9)',
              textShadow: currentTheme.type === 'minecraft' 
                ? '1px 1px 0px rgba(0,0,0,0.8)'
                : '0 1px 5px rgba(0,0,0,0.3)'
            }}
          >
            {getThemeSubtitle()}
          </p>
        </div>
        
        <InteractiveSearch theme={currentTheme} colorScheme={currentColorScheme} />
      </div>
    </div>
  );
}
