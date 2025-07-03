export interface Theme {
  name: string;
  type: 'minecraft' | 'normal' | 'classic' | 'luxury' | 'space' | 'forest' | 'clouds' | 'rocks' | 'school' | 'ocean' | 'carnival' | 'desert' | 'neon' | 'zen' | 'midnight' | 'retro' | 'crystal';
  fonts: {
    primary: string;
    secondary: string;
  };
  colors: {
    background: string;
    foreground: string;
    accent: string;
    primary: string;
    secondary: string;
  };
  text: {
    searchPlaceholder: string;
    loadingText: string;
    featuredLabel: string;
    filtersTitle: string;
    noResultsTitle: string;
    noResultsDescription: string;
    clearFiltersText: string;
    resultsText: string;
  };
  effects: {
    pixelated: boolean;
    rounded: boolean;
    shadows: 'hard' | 'soft';
  };
}

export const themes = {
  minecraft: {
    name: 'Minecraft',
    type: 'minecraft' as const,
    fonts: {
      primary: 'Press Start 2P, monospace',
      secondary: 'VT323, monospace',
    },
    colors: {
      background: '#7CB342',
      foreground: '#FFFFFF',
      accent: '#FFD700',
      primary: '#5A4A2A',
      secondary: '#2E2E2E',
    },
    text: {
      searchPlaceholder: 'Search for items, blocks, or mobs...',
      loadingText: '⏳ Mining...',
      featuredLabel: '⭐ EPIC',
      filtersTitle: '📦 Crafting Filters',
      noResultsTitle: '🚫 No Items Found',
      noResultsDescription: 'Your search came up empty! Try different keywords or clear your filters.',
      clearFiltersText: '🔄 Reset Filters',
      resultsText: '📦 {count} items found',
    },
    effects: {
      pixelated: true,
      rounded: false,
      shadows: 'hard' as const,
    },
  },
  normal: {
    name: 'Modern',
    type: 'normal' as const,
    fonts: {
      primary: 'var(--font-geist-sans), sans-serif',
      secondary: 'var(--font-geist-mono), monospace',
    },
    colors: {
      background: '#F8F9FA',
      foreground: '#212529',
      accent: '#0066CC',
      primary: '#495057',
      secondary: '#6C757D',
    },
    text: {
      searchPlaceholder: 'Search for products, categories, or tags...',
      loadingText: 'Searching...',
      featuredLabel: 'Featured',
      filtersTitle: 'Filters',
      noResultsTitle: 'No results found',
      noResultsDescription: 'Try adjusting your search or filters to find what you\'re looking for.',
      clearFiltersText: 'Clear filters',
      resultsText: '{count} results',
    },
    effects: {
      pixelated: false,
      rounded: true,
      shadows: 'soft' as const,
    },
  },
  classic: {
    name: 'Classic',
    type: 'classic' as const,
    fonts: {
      primary: 'Playfair Display, serif',
      secondary: 'Source Serif Pro, serif',
    },
    colors: {
      background: '#ECF0F1',
      foreground: '#2C3E50',
      accent: '#3498DB',
      primary: '#2C3E50',
      secondary: '#7F8C8D',
    },
    text: {
      searchPlaceholder: 'Search with elegance...',
      loadingText: '📚 Searching...',
      featuredLabel: '✨ FEATURED',
      filtersTitle: '🔍 Refined Filters',
      noResultsTitle: 'No matches found',
      noResultsDescription: 'Please refine your search criteria or browse our collection.',
      clearFiltersText: 'Reset Filters',
      resultsText: '{count} results discovered',
    },
    effects: {
      pixelated: false,
      rounded: true,
      shadows: 'soft' as const,
    },
  },
  luxury: {
    name: 'Luxury',
    type: 'luxury' as const,
    fonts: {
      primary: 'Cormorant Garamond, serif',
      secondary: 'Lato, sans-serif',
    },
    colors: {
      background: '#F8F6F0',
      foreground: '#1A1A1A',
      accent: '#D4AF37',
      primary: '#1A1A1A',
      secondary: '#8B7355',
    },
    text: {
      searchPlaceholder: 'Discover luxury items...',
      loadingText: '💎 Curating...',
      featuredLabel: '👑 EXCLUSIVE',
      filtersTitle: '🏛️ Premium Filters',
      noResultsTitle: 'Nothing meets your standards',
      noResultsDescription: 'Our curators are working to find items worthy of your attention.',
      clearFiltersText: 'Reset Selection',
      resultsText: '{count} exquisite items',
    },
    effects: {
      pixelated: false,
      rounded: false,
      shadows: 'soft' as const,
    },
  },
  space: {
    name: 'Space',
    type: 'space' as const,
    fonts: {
      primary: 'Orbitron, monospace',
      secondary: 'Exo 2, sans-serif',
    },
    colors: {
      background: '#0A0A0F',
      foreground: '#00D4FF',
      accent: '#00D4FF',
      primary: '#1A1A2E',
      secondary: '#FF006E',
    },
    text: {
      searchPlaceholder: 'Scan the universe...',
      loadingText: '🚀 Scanning...',
      featuredLabel: '⭐ STELLAR',
      filtersTitle: '🛸 Navigation Filters',
      noResultsTitle: 'SECTOR EMPTY',
      noResultsDescription: 'No objects detected in this sector. Adjust scan parameters.',
      clearFiltersText: 'RESET SCAN',
      resultsText: '{count} OBJECTS DETECTED',
    },
    effects: {
      pixelated: false,
      rounded: false,
      shadows: 'hard' as const,
    },
  },
  forest: {
    name: 'Forest',
    type: 'forest' as const,
    fonts: {
      primary: 'Kalam, cursive',
      secondary: 'Nunito, sans-serif',
    },
    colors: {
      background: '#2D5016',
      foreground: '#E8F5E8',
      accent: '#228B22',
      primary: '#8FBC8F',
      secondary: '#ADFF2F',
    },
    text: {
      searchPlaceholder: 'Explore the wilderness...',
      loadingText: '🌲 Growing...',
      featuredLabel: '🌿 RARE',
      filtersTitle: '🍃 Nature Filters',
      noResultsTitle: 'Path not found',
      noResultsDescription: 'The forest holds many secrets. Try a different trail.',
      clearFiltersText: 'Clear Path',
      resultsText: '{count} treasures found',
    },
    effects: {
      pixelated: false,
      rounded: true,
      shadows: 'soft' as const,
    },
  },
  clouds: {
    name: 'Clouds',
    type: 'clouds' as const,
    fonts: {
      primary: 'Comfortaa, cursive',
      secondary: 'Poppins, sans-serif',
    },
    colors: {
      background: '#87CEEB',
      foreground: '#4682B4',
      accent: '#FFFFFF',
      primary: '#F0F8FF',
      secondary: '#D3D3D3',
    },
    text: {
      searchPlaceholder: 'Float through the clouds...',
      loadingText: '☁️ Drifting...',
      featuredLabel: '🌤️ BRIGHT',
      filtersTitle: '🌈 Sky Filters',
      noResultsTitle: 'Clear skies ahead',
      noResultsDescription: 'The clouds have parted. Try adjusting your view.',
      clearFiltersText: 'Clear Skies',
      resultsText: '{count} items floating',
    },
    effects: {
      pixelated: false,
      rounded: true,
      shadows: 'soft' as const,
    },
  },
  rocks: {
    name: 'Rocks',
    type: 'rocks' as const,
    fonts: {
      primary: 'Fredoka One, cursive',
      secondary: 'Rubik, sans-serif',
    },
    colors: {
      background: '#696969',
      foreground: '#F5F5F5',
      accent: '#2F4F4F',
      primary: '#A9A9A9',
      secondary: '#D3D3D3',
    },
    text: {
      searchPlaceholder: 'Dig through the rocks...',
      loadingText: '🪨 Digging...',
      featuredLabel: '💎 SOLID',
      filtersTitle: '⛏️ Rock Filters',
      noResultsTitle: 'Nothing but pebbles',
      noResultsDescription: 'Keep digging! The gems are deeper.',
      clearFiltersText: 'Reset Dig',
      resultsText: '{count} rocks found',
    },
    effects: {
      pixelated: false,
      rounded: true,
      shadows: 'hard' as const,
    },
  },
  school: {
    name: 'School',
    type: 'school' as const,
    fonts: {
      primary: 'Fredoka, sans-serif',
      secondary: 'Comic Neue, cursive',
    },
    colors: {
      background: '#F8F9FA',
      foreground: '#FF6B6B',
      accent: '#4ECDC4',
      primary: '#45B7D1',
      secondary: '#FFA07A',
    },
    text: {
      searchPlaceholder: 'Study and search...',
      loadingText: '📚 Learning...',
      featuredLabel: '⭐ TOP GRADE',
      filtersTitle: '🎒 Study Filters',
      noResultsTitle: 'Homework incomplete',
      noResultsDescription: 'Time to hit the books! Try different search terms.',
      clearFiltersText: 'Start Over',
      resultsText: '{count} lessons found',
    },
    effects: {
      pixelated: false,
      rounded: true,
      shadows: 'soft' as const,
    },
  },
  ocean: {
    name: 'Ocean',
    type: 'ocean' as const,
    fonts: {
      primary: 'Quicksand, sans-serif',
      secondary: 'Merriweather, serif',
    },
    colors: {
      background: '#006994',
      foreground: '#B8E6E6',
      accent: '#06FFA5',
      primary: '#47B5FF',
      secondary: '#40E0D0',
    },
    text: {
      searchPlaceholder: 'Dive into the depths...',
      loadingText: '🌊 Flowing...',
      featuredLabel: '🐠 DEEP',
      filtersTitle: '🔱 Current Filters',
      noResultsTitle: 'Dry ocean floor',
      noResultsDescription: 'The tides have changed. Cast your net elsewhere.',
      clearFiltersText: 'New Tide',
      resultsText: '{count} treasures surfaced',
    },
    effects: {
      pixelated: false,
      rounded: true,
      shadows: 'soft' as const,
    },
  },
  carnival: {
    name: 'Carnival',
    type: 'carnival' as const,
    fonts: {
      primary: 'Bungee, cursive',
      secondary: 'Fredoka One, cursive',
    },
    colors: {
      background: '#FF1744',
      foreground: '#FFFFFF',
      accent: '#FFD600',
      primary: '#00E676',
      secondary: '#E040FB',
    },
    text: {
      searchPlaceholder: 'Step right up and search!',
      loadingText: '🎪 Performing...',
      featuredLabel: '🎠 AMAZING',
      filtersTitle: '🎭 Show Filters',
      noResultsTitle: 'Show\'s over',
      noResultsDescription: 'The performers have left the stage. Try a different show.',
      clearFiltersText: 'New Show',
      resultsText: '{count} acts found',
    },
    effects: {
      pixelated: false,
      rounded: true,
      shadows: 'hard' as const,
    },
  },
  desert: {
    name: 'Desert',
    type: 'desert' as const,
    fonts: {
      primary: 'Amatic SC, cursive',
      secondary: 'Libre Baskerville, serif',
    },
    colors: {
      background: '#F4A460',
      foreground: '#8B4513',
      accent: '#CD853F',
      primary: '#D2691E',
      secondary: '#F5DEB3',
    },
    text: {
      searchPlaceholder: 'Search the endless sands...',
      loadingText: '🏜️ Wandering...',
      featuredLabel: '🌵 OASIS',
      filtersTitle: '🐪 Desert Filters',
      noResultsTitle: 'Mirage ahead',
      noResultsDescription: 'The desert plays tricks. Adjust your compass.',
      clearFiltersText: 'New Journey',
      resultsText: '{count} discoveries made',
    },
    effects: {
      pixelated: false,
      rounded: true,
      shadows: 'soft' as const,
    },
  },
  neon: {
    name: 'Neon',
    type: 'neon' as const,
    fonts: {
      primary: 'Audiowide, cursive',
      secondary: 'Orbitron, monospace',
    },
    colors: {
      background: '#0a0a0a',
      foreground: '#ff006e',
      accent: '#00f5ff',
      primary: '#1a1a1a',
      secondary: '#bf00ff',
    },
    text: {
      searchPlaceholder: 'ENTER SEARCH QUERY...',
      loadingText: '⚡ PROCESSING...',
      featuredLabel: '🔥 HOT',
      filtersTitle: '💫 NEON FILTERS',
      noResultsTitle: 'SIGNAL LOST',
      noResultsDescription: 'The neon lights have dimmed. Try a different frequency.',
      clearFiltersText: 'RESET SIGNAL',
      resultsText: '{count} SIGNALS DETECTED',
    },
    effects: {
      pixelated: false,
      rounded: false,
      shadows: 'hard' as const,
    },
  },
  zen: {
    name: 'Zen',
    type: 'zen' as const,
    fonts: {
      primary: 'Noto Serif, serif',
      secondary: 'Inter, sans-serif',
    },
    colors: {
      background: '#F7F9F7',
      foreground: '#2E4A3D',
      accent: '#7FB069',
      primary: '#8FBC8F',
      secondary: '#D3D3D3',
    },
    text: {
      searchPlaceholder: 'Find inner peace...',
      loadingText: '🧘 Meditating...',
      featuredLabel: '☯️ HARMONY',
      filtersTitle: '🕯️ Mindful Filters',
      noResultsTitle: 'Empty mind, full heart',
      noResultsDescription: 'In emptiness, there is possibility. Try again.',
      clearFiltersText: 'Begin Again',
      resultsText: '{count} peaceful moments',
    },
    effects: {
      pixelated: false,
      rounded: true,
      shadows: 'soft' as const,
    },
  },
  midnight: {
    name: 'Midnight',
    type: 'midnight' as const,
    fonts: {
      primary: 'Cinzel, serif',
      secondary: 'Lora, serif',
    },
    colors: {
      background: '#191970',
      foreground: '#C0C0C0',
      accent: '#9370DB',
      primary: '#483D8B',
      secondary: '#FFD700',
    },
    text: {
      searchPlaceholder: 'Search the midnight hour...',
      loadingText: '🌙 Dreaming...',
      featuredLabel: '✨ MYSTICAL',
      filtersTitle: '🔮 Night Filters',
      noResultsTitle: 'Dawn approaches',
      noResultsDescription: 'The night holds no answers. Wait for the stars.',
      clearFiltersText: 'New Night',
      resultsText: '{count} mysteries revealed',
    },
    effects: {
      pixelated: false,
      rounded: true,
      shadows: 'soft' as const,
    },
  },
  retro: {
    name: 'Retro Gaming',
    type: 'retro' as const,
    fonts: {
      primary: 'Press Start 2P, cursive',
      secondary: 'VT323, monospace',
    },
    colors: {
      background: '#0D1B2A',
      foreground: '#00FF41',
      accent: '#FF8500',
      primary: '#1B263B',
      secondary: '#7209B7',
    },
    text: {
      searchPlaceholder: 'ENTER SEARCH QUERY...',
      loadingText: '⏳ LOADING...',
      featuredLabel: '★ LEGENDARY',
      filtersTitle: '⚙ GAME FILTERS',
      noResultsTitle: 'GAME OVER',
      noResultsDescription: 'No items found. Insert coin to continue.',
      clearFiltersText: 'RESTART',
      resultsText: 'SCORE: {count} ITEMS',
    },
    effects: {
      pixelated: true,
      rounded: false,
      shadows: 'hard' as const,
    },
  },
  crystal: {
    name: 'Crystal',
    type: 'crystal' as const,
    fonts: {
      primary: 'Raleway, sans-serif',
      secondary: 'Montserrat, sans-serif',
    },
    colors: {
      background: '#E6E6FA',
      foreground: '#483D8B',
      accent: '#9370DB',
      primary: '#F0F8FF',
      secondary: '#DDA0DD',
    },
    text: {
      searchPlaceholder: 'Seek crystal clarity...',
      loadingText: '💎 Crystallizing...',
      featuredLabel: '💎 PURE',
      filtersTitle: '🔮 Crystal Filters',
      noResultsTitle: 'Clouded vision',
      noResultsDescription: 'The crystals are cloudy. Polish your search.',
      clearFiltersText: 'Purify',
      resultsText: '{count} gems discovered',
    },
    effects: {
      pixelated: false,
      rounded: true,
      shadows: 'soft' as const,
    },
  },
} as const;

// Get all theme names for easy access
export const themeNames = Object.keys(themes) as (keyof typeof themes)[];

// Color variations for each theme
export const colorVariations = {
  minecraft: [
    { name: 'Plains', bg: '#7CB342', accent: '#8BC34A' },
    { name: 'Desert', bg: '#F57C00', accent: '#FFA726' },
    { name: 'Forest', bg: '#388E3C', accent: '#66BB6A' },
    { name: 'Ocean', bg: '#1976D2', accent: '#42A5F5' },
    { name: 'Nether', bg: '#B71C1C', accent: '#EF5350' },
    { name: 'End', bg: '#4A148C', accent: '#AB47BC' },
    { name: 'Mountains', bg: '#616161', accent: '#9E9E9E' },
    { name: 'Swamp', bg: '#33691E', accent: '#689F38' }
  ],
  normal: [
    { name: 'Ocean Blue', bg: '#006BA6', accent: '#42A5F5' },
    { name: 'Forest Green', bg: '#2E7D32', accent: '#66BB6A' },
    { name: 'Sunset Orange', bg: '#F57C00', accent: '#FFB74D' },
    { name: 'Purple Dream', bg: '#7B1FA2', accent: '#BA68C8' },
    { name: 'Deep Teal', bg: '#00695C', accent: '#4DB6AC' },
    { name: 'Midnight Navy', bg: '#1A237E', accent: '#7986CB' },
    { name: 'Crimson Red', bg: '#C62828', accent: '#EF5350' },
    { name: 'Golden Hour', bg: '#F9A825', accent: '#FFD54F' }
  ],
  classic: [
    { name: 'Royal Blue', bg: '#4169E1', accent: '#6495ED' },
    { name: 'Emerald', bg: '#50C878', accent: '#90EE90' },
    { name: 'Burgundy', bg: '#800020', accent: '#DC143C' },
    { name: 'Navy', bg: '#000080', accent: '#4169E1' },
    { name: 'Maroon', bg: '#800000', accent: '#B22222' },
    { name: 'Teal', bg: '#008080', accent: '#20B2AA' }
  ],
  luxury: [
    { name: 'Gold', bg: '#D4AF37', accent: '#FFD700' },
    { name: 'Rose Gold', bg: '#E8B4B8', accent: '#F4C2C2' },
    { name: 'Platinum', bg: '#E5E4E2', accent: '#C0C0C0' },
    { name: 'Champagne', bg: '#F7E7CE', accent: '#FAEBD7' },
    { name: 'Bronze', bg: '#CD7F32', accent: '#B87333' },
    { name: 'Silver', bg: '#C0C0C0', accent: '#DCDCDC' }
  ],
  space: [
    { name: 'Nebula', bg: '#4B0082', accent: '#9370DB' },
    { name: 'Galaxy', bg: '#191970', accent: '#6495ED' },
    { name: 'Cosmic', bg: '#000080', accent: '#00CED1' },
    { name: 'Stellar', bg: '#2F4F4F', accent: '#40E0D0' },
    { name: 'Void', bg: '#000000', accent: '#FF69B4' },
    { name: 'Aurora', bg: '#008B8B', accent: '#00FFFF' }
  ],
  forest: [
    { name: 'Pine', bg: '#01796F', accent: '#4CAF50' },
    { name: 'Oak', bg: '#8D6E63', accent: '#A1887F' },
    { name: 'Birch', bg: '#F5F5DC', accent: '#FFFACD' },
    { name: 'Redwood', bg: '#A0522D', accent: '#D2691E' },
    { name: 'Willow', bg: '#9ACD32', accent: '#ADFF2F' },
    { name: 'Cedar', bg: '#556B2F', accent: '#6B8E23' }
  ],
  clouds: [
    { name: 'Cumulus', bg: '#87CEEB', accent: '#B0E0E6' },
    { name: 'Cirrus', bg: '#F0F8FF', accent: '#E6E6FA' },
    { name: 'Storm', bg: '#708090', accent: '#778899' },
    { name: 'Sunset', bg: '#FFB6C1', accent: '#FFC0CB' },
    { name: 'Dawn', bg: '#FFEFD5', accent: '#FFFACD' },
    { name: 'Twilight', bg: '#9370DB', accent: '#BA55D3' }
  ],
  rocks: [
    { name: 'Granite', bg: '#696969', accent: '#A9A9A9' },
    { name: 'Marble', bg: '#F8F8FF', accent: '#DCDCDC' },
    { name: 'Slate', bg: '#2F4F4F', accent: '#708090' },
    { name: 'Sandstone', bg: '#F4A460', accent: '#D2B48C' },
    { name: 'Obsidian', bg: '#36454F', accent: '#696969' },
    { name: 'Quartz', bg: '#FFFAFA', accent: '#F5F5F5' }
  ],
  school: [
    { name: 'Classroom', bg: '#87CEEB', accent: '#B0E0E6' },
    { name: 'Playground', bg: '#32CD32', accent: '#90EE90' },
    { name: 'Library', bg: '#8B4513', accent: '#D2691E' },
    { name: 'Art Room', bg: '#FF69B4', accent: '#FFB6C1' },
    { name: 'Science Lab', bg: '#00CED1', accent: '#AFEEEE' },
    { name: 'Cafeteria', bg: '#FFD700', accent: '#FFFFE0' }
  ],
  ocean: [
    { name: 'Deep Blue', bg: '#006994', accent: '#4682B4' },
    { name: 'Coral Reef', bg: '#FF7F50', accent: '#FA8072' },
    { name: 'Tropical', bg: '#008B8B', accent: '#20B2AA' },
    { name: 'Arctic', bg: '#B0E0E6', accent: '#E0FFFF' },
    { name: 'Abyss', bg: '#191970', accent: '#483D8B' },
    { name: 'Lagoon', bg: '#008080', accent: '#00CED1' }
  ],
  carnival: [
    { name: 'Big Top', bg: '#FF1744', accent: '#FF5722' },
    { name: 'Ferris Wheel', bg: '#FF9800', accent: '#FFC107' },
    { name: 'Cotton Candy', bg: '#E91E63', accent: '#F06292' },
    { name: 'Popcorn', bg: '#FFEB3B', accent: '#FFEE58' },
    { name: 'Carousel', bg: '#9C27B0', accent: '#BA68C8' },
    { name: 'Funhouse', bg: '#00BCD4', accent: '#4DD0E1' }
  ],
  desert: [
    { name: 'Sahara', bg: '#F4A460', accent: '#DEB887' },
    { name: 'Mojave', bg: '#CD853F', accent: '#D2691E' },
    { name: 'Atacama', bg: '#BC8F8F', accent: '#F5DEB3' },
    { name: 'Gobi', bg: '#D2B48C', accent: '#F5DEB3' },
    { name: 'Kalahari', bg: '#DAA520', accent: '#B8860B' },
    { name: 'Thar', bg: '#F0E68C', accent: '#EEE8AA' }
  ],
  neon: [
    { name: 'Electric Pink', bg: '#FF006E', accent: '#FF69B4' },
    { name: 'Cyber Blue', bg: '#00F5FF', accent: '#87CEEB' },
    { name: 'Laser Green', bg: '#39FF14', accent: '#7FFF00' },
    { name: 'Ultra Violet', bg: '#BF00FF', accent: '#DA70D6' },
    { name: 'Hot Orange', bg: '#FF4500', accent: '#FF6347' },
    { name: 'Acid Yellow', bg: '#FFFF00', accent: '#FFFF66' }
  ],
  zen: [
    { name: 'Bamboo', bg: '#90EE90', accent: '#98FB98' },
    { name: 'Stone Garden', bg: '#D3D3D3', accent: '#E5E5E5' },
    { name: 'Lotus', bg: '#DDA0DD', accent: '#E6E6FA' },
    { name: 'Tea', bg: '#8FBC8F', accent: '#7FB069' },
    { name: 'Sand', bg: '#F5DEB3', accent: '#FFFACD' },
    { name: 'Water', bg: '#B0E0E6', accent: '#E0FFFF' }
  ],
  midnight: [
    { name: 'Starry Night', bg: '#191970', accent: '#4169E1' },
    { name: 'Moon Glow', bg: '#2F4F4F', accent: '#708090' },
    { name: 'Aurora', bg: '#483D8B', accent: '#9370DB' },
    { name: 'Galaxy', bg: '#000080', accent: '#6495ED' },
    { name: 'Nebula', bg: '#4B0082', accent: '#8A2BE2' },
    { name: 'Cosmos', bg: '#1E1E1E', accent: '#C0C0C0' }
  ],
  retro: [
    { name: 'Arcade Green', bg: '#00FF41', accent: '#32CD32' },
    { name: 'Pixel Orange', bg: '#FF8500', accent: '#FFA500' },
    { name: 'Game Purple', bg: '#7209B7', accent: '#9370DB' },
    { name: 'Console Blue', bg: '#0066CC', accent: '#4169E1' },
    { name: 'Neon Pink', bg: '#FF1493', accent: '#FF69B4' },
    { name: 'Electric Yellow', bg: '#FFFF00', accent: '#FFFF66' }
  ],
  crystal: [
    { name: 'Amethyst', bg: '#9370DB', accent: '#DDA0DD' },
    { name: 'Quartz', bg: '#F0F8FF', accent: '#E6E6FA' },
    { name: 'Emerald', bg: '#50C878', accent: '#90EE90' },
    { name: 'Sapphire', bg: '#0F52BA', accent: '#6495ED' },
    { name: 'Ruby', bg: '#E0115F', accent: '#FF69B4' },
    { name: 'Diamond', bg: '#B9F2FF', accent: '#E0FFFF' }
  ]
} as const;

// Legacy exports for backward compatibility
export const minecraftBiomes = colorVariations.minecraft;
export const normalColorSchemes = colorVariations.normal;