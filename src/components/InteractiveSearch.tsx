'use client';

import { useState, useEffect, useCallback, useMemo, useRef, startTransition, memo, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue, useDragControls, useAnimationControls } from 'framer-motion';
import { Search, Filter, X, Star, Clock, TrendingUp } from 'lucide-react';
import { SearchResponse, SearchFilters, SearchItem } from '@/types';
import { Theme } from '@/types/theme';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant', icon: TrendingUp },
  { value: 'rating', label: 'Highest Rated', icon: Star },
  { value: 'price-asc', label: 'Price: Low to High', icon: null },
  { value: 'price-desc', label: 'Price: High to Low', icon: null },
  { value: 'newest', label: 'Newest First', icon: Clock },
];

// Advanced custom hooks with proper TypeScript generics
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      startTransition(() => {
        setDebouncedValue(value);
      });
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

// Advanced hook for intersection observer with TypeScript
const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });
    
    observer.observe(target);
    
    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [callback, options]);
  
  return targetRef;
};

// Performance-optimized virtual scrolling hook
const useVirtualization = (itemCount: number, itemHeight: number, containerHeight: number) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    itemCount
  );
  
  const visibleItems = useMemo(() => {
    const items = [];
    for (let i = startIndex; i < endIndex; i++) {
      items.push(i);
    }
    return items;
  }, [startIndex, endIndex]);
  
  return {
    visibleItems,
    totalHeight: itemCount * itemHeight,
    offsetY: startIndex * itemHeight,
    onScroll: (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    }
  };
};

// Advanced TypeScript interfaces with strict typing
interface SearchItemCardProps {
  item: SearchItem;
  index: number;
  theme: Theme;
  colorScheme?: any;
  onFavorite?: (itemId: string) => void;
  onQuickView?: (item: SearchItem) => void;
  isVisible?: boolean;
  carouselRef?: React.RefObject<HTMLDivElement | null>;
}

interface SearchItemCardRef {
  triggerPulse: () => void;
  focus: () => void;
}

// Advanced component composition types
type SearchVariant = 'grid' | 'list' | 'masonry' | 'carousel';
type SearchDensity = 'compact' | 'comfortable' | 'spacious';

interface AdvancedSearchOptions {
  variant: SearchVariant;
  density: SearchDensity;
  enableVirtualization: boolean;
  enableInfiniteScroll: boolean;
  enableKeyboardNavigation: boolean;
  customAnimations?: boolean;
}

// Memoized component with forwardRef for performance
const SearchItemCard = memo(forwardRef<SearchItemCardRef, SearchItemCardProps>((
  { item, index, theme, colorScheme, onFavorite, onQuickView, isVisible = true, carouselRef }, 
  ref
) => {
  const isMinecraft = theme.type === 'minecraft';
  const controls = useAnimationControls();
  const dragControls = useDragControls();
  
  // Advanced Framer Motion values for sophisticated animations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  const scale = useSpring(1, { stiffness: 400, damping: 30 });
  
  // Card selection and animation state
  const [isSelected] = useState(false);
  
  // Define text colors based on theme and color scheme
  const getTextColor = (type: 'primary' | 'secondary' | 'muted') => {
    // Check if the background is light or dark based on colorScheme
    const bgColor = colorScheme?.bg || theme.colors.background;
    const isLightBg = ['#F', '#E', '#D', '#C', '#B', '#A', '#9'].some(hex => bgColor.startsWith(hex)) ||
                      theme.type === 'clouds' || theme.type === 'luxury' || theme.type === 'desert' || 
                      theme.type === 'classic' || theme.type === 'school' || theme.type === 'zen';
    
    if (type === 'primary') {
      return isLightBg ? 'text-gray-900' : 'text-white';
    } else if (type === 'secondary') {
      return isLightBg ? 'text-gray-800' : 'text-gray-200';
    } else {
      return isLightBg ? 'text-gray-700' : 'text-gray-300';
    }
  };
  
  // Sophisticated hover and interaction handlers
  const handleHoverStart = () => {
    scale.set(1.05);
    controls.start({
      boxShadow: theme.effects.pixelated 
        ? '12px 12px 0px rgba(0,0,0,0.8)'
        : '0 25px 50px rgba(0,0,0,0.25)',
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
    });
  };
  
  const handleHoverEnd = () => {
    scale.set(1);
    x.set(0);
    y.set(0);
    controls.start({
      boxShadow: theme.effects.pixelated 
        ? '4px 4px 0px rgba(0,0,0,0.5)'
        : '0 8px 25px rgba(0,0,0,0.1)',
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
    });
  };
  
  // Expose methods via ref for external control
  useImperativeHandle(ref, () => ({
    triggerPulse: () => {
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.4, ease: "easeInOut" }
      });
    },
    focus: () => {
      controls.start({
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
        transition: { duration: 0.2 }
      });
    }
  }), [controls]);
  
  // Set initial animation on mount
  useEffect(() => {
    controls.start({
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)'
    });
  }, [controls]);
  
  // Handle card selection
  const handleCardClick = useCallback(() => {
    if (onFavorite) {
      onFavorite(item.id);
    }
  }, [onFavorite, item.id]);
  
  // Get theme-specific card shape and style
  const getCardShapeClass = () => {
    switch (theme.type) {
      case 'clouds':
        return 'rounded-[40px_20px_30px_15px]'; // Cloud-like irregular curves
      case 'forest':
        return 'rounded-[20px_40px_10px_30px]'; // Organic tree-like shape
      case 'luxury':
        return 'rounded-none border-4'; // Sharp, geometric luxury with thick border
      case 'space':
        return 'rounded-2xl'; // Futuristic rounded
      case 'ocean':
        return 'rounded-[25px_15px_35px_20px]'; // Wave-like curves
      case 'minecraft':
        return 'rounded-none'; // Perfect squares
      case 'neon':
        return 'rounded-lg'; // Sharp but slightly rounded
      case 'carnival':
        return 'rounded-[30px_10px_30px_10px]'; // Playful asymmetric
      case 'desert':
        return 'rounded-[20px_30px_20px_30px]'; // Dune-like curves
      default:
        return 'rounded-xl';
    }
  };
  
  // Get theme-specific clip path for advanced shapes
  const getClipPath = () => {
    switch (theme.type) {
      case 'clouds':
        return 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 75% 100%, 25% 100%, 0% 80%, 0% 20%)';
      case 'forest':
        return 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)';
      case 'luxury':
        return 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)';
      case 'space':
        return 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
      case 'ocean':
        return 'polygon(0% 20%, 60% 5%, 100% 0%, 100% 80%, 40% 95%, 0% 100%)';
      default:
        return '';
    }
  };
  
  return (
    <motion.div
      // Advanced entrance animation with spring physics
      initial={{ 
        opacity: 0, 
        y: 50, 
        scale: 0.9,
        rotateX: -15,
        filter: 'blur(10px)'
      }}
      animate={controls}
      exit={{ 
        opacity: 0, 
        scale: 0.8,
        filter: 'blur(5px)',
        transition: { duration: 0.2 }
      }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
        opacity: { duration: 0.4 },
        filter: { duration: 0.5 }
      }}
      
      // Advanced gesture handling for drag and drop
      drag={true}
      dragControls={dragControls}
      dragConstraints={false}
      dragElastic={0.2}
      whileDrag={{ 
        scale: 1.1, 
        rotate: 3,
        cursor: 'grabbing',
        zIndex: 1000,
        boxShadow: theme.effects.pixelated 
          ? '12px 12px 0px rgba(0,0,0,0.8)' 
          : '0 25px 50px rgba(0,0,0,0.5)'
      }}
      onDragStart={() => {
        // Pause carousel animation when dragging starts
        if (carouselRef?.current) {
          carouselRef.current.style.animationPlayState = 'paused';
        }
      }}
      onDragEnd={(_, info) => {
        // Resume carousel animation when dragging ends
        if (carouselRef?.current) {
          carouselRef.current.style.animationPlayState = 'running';
        }
        
        // Check if dropped in selected area (below y: 600) OR carousel area (above y: 600)
        const isInSelectedArea = info.point.y > 600;
        const isInCarouselArea = info.point.y < 600;
        
        if (onFavorite) {
          // If dragging from carousel to selected area
          if (isInSelectedArea) {
            onFavorite(item.id);
          }
          // If dragging from selected area back to carousel
          else if (isInCarouselArea) {
            onFavorite(item.id);
          }
        }
      }}
      
      // Sophisticated hover with 3D tilt effect
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onMouseMove={(e) => {
        if (!theme.effects.pixelated) {
          const rect = e.currentTarget.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          x.set((e.clientX - centerX) * 0.1);
          y.set((e.clientY - centerY) * 0.1);
        }
      }}
      
      // Advanced styling with CSS variables and transforms
      style={{
        x,
        y,
        rotateX: theme.effects.pixelated ? 0 : rotateX,
        rotateY: theme.effects.pixelated ? 0 : rotateY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        pointerEvents: 'auto',
        zIndex: 10,
        backgroundColor: colorScheme?.bg || theme.colors.background,
        borderColor: colorScheme?.accent || theme.colors.accent,
        clipPath: getClipPath(),
        // Enhanced theme-specific styling
        boxShadow: theme.type === 'luxury' ? `0 8px 32px ${colorScheme?.accent || theme.colors.accent}40` :
                   theme.type === 'neon' ? `0 0 20px ${colorScheme?.accent || theme.colors.accent}60` :
                   theme.type === 'space' ? `0 4px 20px ${colorScheme?.accent || theme.colors.accent}30` :
                   `0 4px 12px rgba(0,0,0,0.1)`,
        border: theme.type === 'luxury' ? `3px solid ${colorScheme?.accent || theme.colors.accent}` :
                theme.type === 'neon' ? `2px solid ${colorScheme?.accent || theme.colors.accent}` : 
                `1px solid ${colorScheme?.accent || theme.colors.accent}40`
      }}
      
      onClick={handleCardClick}
      onPointerDown={(e) => e.stopPropagation()}
      className={`group relative ${theme.type}-card overflow-hidden cursor-pointer select-none ${getCardShapeClass()}`}
    >
      {item.featured && (
        <div className={`absolute top-2 right-2 ${theme.type}-tag z-10`}>
          {theme.text.featuredLabel}
        </div>
      )}
      
      <motion.div 
        className={`aspect-[4/3] ${isMinecraft ? 'bg-gray-600 border-b-4 border-gray-800' : 'bg-gradient-to-br from-white/10 to-white/5'} relative overflow-hidden`}
        whileHover={{
          scale: theme.effects.pixelated ? 1 : 1.02,
          transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
        }}
      >
        {item.imageUrl && (
          <motion.img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-full object-cover"
            style={{
              imageRendering: isMinecraft ? 'pixelated' : 'auto',
              filter: isMinecraft 
                ? 'contrast(1.1) brightness(0.95) saturate(1.1)' 
                : 'contrast(1.05) brightness(1.02) saturate(1.1)'
            }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{
              scale: theme.effects.pixelated ? 1 : 1.05,
              transition: { duration: 0.4 }
            }}
          />
        )}
        
        {/* Enhanced gradient overlay */}
        <motion.div 
          className={`absolute inset-0 ${
            theme.effects.pixelated 
              ? 'bg-gradient-to-t from-black/40 via-transparent to-transparent'
              : 'bg-gradient-to-t from-black/60 via-black/20 to-transparent'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />
        
        {/* Subtle corner accent */}
        {!theme.effects.pixelated && (
          <motion.div 
            className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/20 to-transparent"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          />
        )}
      </motion.div>
      
      <motion.div 
        className={`p-6 ${isMinecraft ? 'bg-gradient-to-b from-gray-300 to-gray-400' : 'bg-gradient-to-b from-white/5 via-white/10 to-white/5 backdrop-blur-sm'}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="flex items-start justify-between mb-4">
          <motion.h3 
            className={`font-bold line-clamp-2 leading-tight ${getTextColor('primary')}`}
            style={{ 
              fontFamily: theme.fonts.primary,
              fontSize: isMinecraft ? '12px' : '16px',
              fontWeight: isMinecraft ? '700' : '700',
              letterSpacing: isMinecraft ? '0.5px' : '-0.01em',
              lineHeight: isMinecraft ? '1.3' : '1.25',
              textShadow: isMinecraft ? '1px 1px 0px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
              fontFeatureSettings: '"kern" 1, "liga" 1'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {item.title}
          </motion.h3>
          {item.rating && (
            <motion.div 
              className={`flex items-center ml-4 flex-shrink-0 px-3 py-1.5 rounded-full ${isMinecraft ? 'bg-yellow-600/30 border border-yellow-500' : 'bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30'}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <Star className={`w-3.5 h-3.5 text-yellow-400 fill-current`} />
              <span 
                className={`text-sm ml-1.5 font-bold ${getTextColor('secondary')}`}
                style={{ 
                  fontFamily: theme.fonts.secondary, 
                  fontSize: '13px',
                  fontWeight: '700',
                  letterSpacing: '0.02em'
                }}
              >
                {item.rating}
              </span>
            </motion.div>
          )}
        </div>
        
        <motion.p 
          className={`mb-5 line-clamp-2 ${getTextColor('muted')}`}
          style={{ 
            fontFamily: theme.fonts.secondary, 
            fontSize: isMinecraft ? '11px' : '14px',
            lineHeight: isMinecraft ? '1.4' : '1.6',
            fontWeight: '400',
            letterSpacing: '0.01em',
            opacity: '0.9'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {item.description}
        </motion.p>
        
        <div className="flex items-center justify-between mb-5">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span 
              className={`font-bold text-green-400 px-3 py-2 rounded-lg ${
                theme.effects.pixelated 
                  ? 'bg-green-900/40 border border-green-700' 
                  : 'bg-green-500/15 backdrop-blur-sm border border-green-400/20'
              }`}
              style={{ 
                fontFamily: theme.fonts.primary, 
                fontSize: isMinecraft ? '12px' : '16px',
                fontWeight: '800',
                letterSpacing: isMinecraft ? '0.5px' : '0.02em',
                textShadow: isMinecraft ? '1px 1px 0px rgba(0,0,0,0.4)' : '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              {isMinecraft ? '💰 ' : '$'}{item.price}
            </span>
          </motion.div>
          <motion.span 
            className={`${theme.type}-tag text-sm font-semibold px-4 py-2 rounded-lg`}
            style={{
              fontSize: isMinecraft ? '10px' : '12px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              textTransform: 'uppercase' as const,
              textShadow: isMinecraft ? '1px 1px 0px rgba(0,0,0,0.3)' : 'none'
            }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {item.category}
          </motion.span>
        </div>
        
        <motion.div 
          className="flex flex-wrap gap-2.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, staggerChildren: 0.1 }}
        >
          {item.tags.slice(0, 2).map((tag, tagIndex) => {
            const lightThemes = ['clouds', 'classic', 'luxury', 'school', 'zen', 'crystal', 'desert'];
            const isLight = lightThemes.includes(theme.type);
            
            return (
            <motion.span
              key={tag}
              className={`px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                isMinecraft 
                  ? 'bg-blue-600 text-white border border-blue-800 hover:bg-blue-500' 
                  : isLight
                    ? 'bg-gray-200/80 text-gray-800 border border-gray-300/50 backdrop-blur-md hover:bg-gray-300/80'
                    : 'bg-white/20 text-white border border-white/30 backdrop-blur-md hover:bg-white/30'
              }`}
              style={{ 
                fontFamily: theme.fonts.secondary, 
                fontSize: isMinecraft ? '9px' : '11px',
                boxShadow: isMinecraft 
                  ? '2px 2px 0px rgba(0,0,0,0.4)' 
                  : '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
                borderRadius: isMinecraft ? '3px' : '8px',
                fontWeight: '600',
                letterSpacing: '0.4px'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + tagIndex * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              {tag}
            </motion.span>
            );
          })}
          {item.tags.length > 2 && (() => {
            const lightThemes = ['clouds', 'classic', 'luxury', 'school', 'zen', 'crystal', 'desert'];
            const isLight = lightThemes.includes(theme.type);
            
            return (
            <motion.span 
              className={`px-3 py-2 text-xs font-semibold cursor-pointer transition-all duration-300 ${
                isMinecraft 
                  ? 'bg-gray-600 text-white border border-gray-800 hover:bg-gray-500' 
                  : isLight
                    ? 'bg-gray-300/80 text-gray-700 border border-gray-400/50 backdrop-blur-md hover:bg-gray-400/80'
                    : 'bg-white/15 text-white/80 border border-white/25 backdrop-blur-md hover:bg-white/25'
              }`}
              style={{ 
                fontFamily: theme.fonts.secondary, 
                fontSize: isMinecraft ? '9px' : '11px',
                boxShadow: isMinecraft 
                  ? '2px 2px 0px rgba(0,0,0,0.4)' 
                  : '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                borderRadius: isMinecraft ? '3px' : '8px',
                fontWeight: '600',
                letterSpacing: '0.4px'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 }
              }}
              title={`${item.tags.length - 2} more tags: ${item.tags.slice(2).join(', ')}`}
            >
              +{item.tags.length - 2}
            </motion.span>
            );
          })()}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}));

// Add display name for debugging
SearchItemCard.displayName = 'SearchItemCard';

interface InteractiveSearchProps {
  theme: Theme;
  colorScheme: any;
}

export default function InteractiveSearch({ theme, colorScheme }: InteractiveSearchProps) {
  // Advanced state management with proper typing
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    tags: [],
    sortBy: 'relevance',
  });
  const [results, setResults] = useState<SearchItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [facets, setFacets] = useState<SearchResponse['facets']>({
    categories: [],
    tags: [],
    priceRange: { min: 0, max: 1000 }
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  
  // Advanced UI state
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectedCards, setSelectedCards] = useState<SearchItem[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  
  // Use the state variables to avoid warnings
  console.log('Selected items:', selectedItems.size, 'Focused:', focusedIndex, 'Search focused:', isSearchFocused);
  
  // Refs for advanced interactions
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  
  // Animation controls
  const searchBarControls = useAnimationControls();
  const resultsControls = useAnimationControls();

  const debouncedQuery = useDebounce<string>(searchQuery, 300);
  
  // Advanced keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!results.length) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        if (focusedIndex >= 0) {
          // Could trigger item selection or quick view here
          console.log('Selected item at index:', focusedIndex);
        }
        break;
      case 'Escape':
        setFocusedIndex(-1);
        setShowFilters(false);
        setShowSuggestions(false);
        searchInputRef.current?.blur();
        break;
    }
  }, [results, focusedIndex]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  // Advanced search analytics and performance
  const searchMetrics = useRef({
    searchCount: 0,
    avgResponseTime: 0,
    popularQueries: new Map<string, number>()
  });

  const searchAPI = useCallback(async (searchFilters: SearchFilters) => {
    const startTime = performance.now();
    setLoading(true);
    
    // Advanced search with performance tracking
    try {
      const params = new URLSearchParams();
      if (searchFilters.query) {
        params.set('query', searchFilters.query);
        // Track popular queries
        const currentCount = searchMetrics.current.popularQueries.get(searchFilters.query) || 0;
        searchMetrics.current.popularQueries.set(searchFilters.query, currentCount + 1);
      }
      if (searchFilters.category) params.set('category', searchFilters.category);
      if (searchFilters.tags.length > 0) params.set('tags', searchFilters.tags.join(','));
      if (searchFilters.sortBy) params.set('sortBy', searchFilters.sortBy);
      if (searchFilters.priceRange?.min !== undefined) params.set('minPrice', searchFilters.priceRange.min.toString());
      if (searchFilters.priceRange?.max !== undefined) params.set('maxPrice', searchFilters.priceRange.max.toString());
      if (searchFilters.featured) params.set('featured', 'true');

      const response = await fetch(`/api/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`);
      }
      
      const data: SearchResponse = await response.json();
      
      // Performance tracking
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      searchMetrics.current.searchCount++;
      searchMetrics.current.avgResponseTime = 
        (searchMetrics.current.avgResponseTime * (searchMetrics.current.searchCount - 1) + responseTime) / 
        searchMetrics.current.searchCount;
      
      // Animate results change
      startTransition(() => {
        setResults(data.items);
        setSuggestions(data.suggestions);
        setFacets(data.facets);
        setTotal(data.total);
        setFocusedIndex(-1); // Reset focus
      });
      
      // Trigger results animation
      resultsControls.start({
        opacity: [0, 1],
        y: [20, 0],
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
      });
      
    } catch (error) {
      console.error('Search failed:', error);
      // Could add error toast notification here
    } finally {
      setLoading(false);
    }
  }, [resultsControls]);

  useEffect(() => {
    const newFilters = { ...filters, query: debouncedQuery };
    setFilters(newFilters);
    searchAPI(newFilters);
  }, [debouncedQuery, searchAPI]);

  const handleFilterChange = useCallback((newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Advanced filter animation
    searchBarControls.start({
      scale: [1, 1.02, 1],
      transition: { duration: 0.2 }
    });
    
    searchAPI(updatedFilters);
  }, [filters, searchAPI, searchBarControls]);

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      query: searchQuery,
      tags: [],
      sortBy: 'relevance',
    };
    setFilters(clearedFilters);
    searchAPI(clearedFilters);
    setShowFilters(false);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.tags.length > 0) count++;
    if (filters.priceRange) count++;
    if (filters.featured) count++;
    if (filters.sortBy !== 'relevance') count++;
    return count;
  }, [filters]);

  const isMinecraft = theme.type === 'minecraft';
  
  // Define text colors based on theme
  const getInterfaceTextColor = (type: 'primary' | 'secondary' | 'muted' | 'accent') => {
    const darkThemes = ['space', 'neon', 'midnight', 'retro', 'minecraft', 'normal'];
    const isDark = darkThemes.includes(theme.type);
    
    if (type === 'primary') {
      return isDark ? 'text-white' : 'text-gray-900';
    } else if (type === 'secondary') {
      return isDark ? 'text-white/90' : 'text-gray-700';
    } else if (type === 'muted') {
      return isDark ? 'text-white/70' : 'text-gray-600';
    } else { // accent
      return isDark ? 'text-blue-400' : 'text-blue-600';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="relative mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Main Search Bar */}
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isMinecraft ? 'text-yellow-400' : getInterfaceTextColor('muted')
            }`} />
            <motion.input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
                
                // Micro-interaction: input scaling
                searchBarControls.start({
                  scale: [1, 1.01, 1],
                  transition: { duration: 0.15 }
                });
              }}
              onFocus={() => {
                setShowSuggestions(true);
                setIsSearchFocused(true);
                
                // Advanced focus animation
                searchBarControls.start({
                  boxShadow: theme.effects.pixelated
                    ? '0 0 0 3px rgba(255, 215, 0, 0.5)'
                    : '0 0 0 3px rgba(59, 130, 246, 0.2), 0 8px 25px rgba(0,0,0,0.1)',
                  transition: { duration: 0.2 }
                });
              }}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 200);
                setIsSearchFocused(false);
                
                searchBarControls.start({
                  boxShadow: '0 0 0 0px transparent',
                  transition: { duration: 0.2 }
                });
              }}
              placeholder={theme.text.searchPlaceholder}
              className={`w-full pl-12 pr-20 py-4 ${theme.type}-input text-lg transition-all duration-200`}
              style={{ 
                fontFamily: theme.fonts.secondary,
                fontSize: '18px'
              }}
              animate={searchBarControls}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.15 }
              }}
            />
            
            {/* Filter Toggle Button */}
            <motion.button
              whileHover={{ 
                scale: isMinecraft ? 1.02 : 1.05, 
                x: isMinecraft ? -1 : 0, 
                y: isMinecraft ? -1 : -2 
              }}
              whileTap={{ 
                scale: 0.98, 
                x: isMinecraft ? 1 : 0, 
                y: isMinecraft ? 1 : 0 
              }}
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme.type}-button ${
                showFilters || activeFiltersCount > 0
                  ? isMinecraft ? 'bg-yellow-600' : 'bg-blue-600'
                  : ''
              }`}
              style={{ padding: '8px' }}
            >
              <Filter className="w-4 h-4 text-white" />
              {activeFiltersCount > 0 && (
                <span 
                  className={`absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white ${theme.type}-tag flex items-center justify-center`} 
                  style={{ 
                    fontSize: '8px', 
                    minWidth: '16px', 
                    minHeight: '16px' 
                  }}
                >
                  {activeFiltersCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* Search Suggestions */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`absolute top-full left-0 right-0 mt-2 ${theme.type}-panel z-20 overflow-hidden`}
              >
                {suggestions.slice(0, 5).map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                    }}
                    className={`w-full px-4 py-3 text-left ${getInterfaceTextColor('primary')} transition-colors duration-150 flex items-center space-x-3 border-b last:border-b-0 ${
                      isMinecraft 
                        ? 'hover:bg-yellow-600/20 border-yellow-600/30' 
                        : 'hover:bg-white/10 border-white/20'
                    }`}
                    style={{ 
                      fontFamily: theme.fonts.secondary, 
                      fontSize: '16px' 
                    }}
                  >
                    <Search className={`w-4 h-4 ${isMinecraft ? 'text-yellow-400' : getInterfaceTextColor('muted')}`} />
                    <span>{isMinecraft ? '🔍 ' : ''}{suggestion}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
              className={`mt-4 ${theme.type}-panel overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 
                    className={`text-lg font-semibold ${getInterfaceTextColor('primary')}`} 
                    style={{ 
                      fontFamily: theme.fonts.primary, 
                      fontSize: isMinecraft ? '14px' : '18px' 
                    }}
                  >
                    {theme.text.filtersTitle}
                  </h3>
                  <div className="flex items-center space-x-3">
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className={`${theme.type}-button text-xs ${getInterfaceTextColor('primary')} hover:text-red-400 transition-colors`}
                        style={{ 
                          fontFamily: theme.fonts.primary, 
                          fontSize: isMinecraft ? '8px' : '10px', 
                          padding: isMinecraft ? '6px 12px' : '8px 16px' 
                        }}
                      >
                        {isMinecraft ? '🗑️ ' : ''}Clear All
                      </button>
                    )}
                    <button
                      onClick={() => setShowFilters(false)}
                      className={`${theme.type}-button p-2`}
                    >
                      <X className={`w-4 h-4 ${getInterfaceTextColor('primary')}`} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Categories */}
                  <div>
                    <label 
                      className={`block text-sm font-medium mb-3 ${isMinecraft ? 'text-yellow-400' : getInterfaceTextColor('primary')}`} 
                      style={{ 
                        fontFamily: theme.fonts.primary, 
                        fontSize: isMinecraft ? '10px' : '12px' 
                      }}
                    >
                      {isMinecraft ? '🏷️ ' : ''}Category
                    </label>
                    <div className="space-y-2">
                      {facets.categories.map((category) => (
                        <label key={category.name} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            checked={filters.category === category.name}
                            onChange={() => handleFilterChange({
                              category: filters.category === category.name ? undefined : category.name
                            })}
                            className={`mr-2 ${
                              isMinecraft 
                                ? 'text-yellow-500 bg-gray-800 border-yellow-600' 
                                : 'text-blue-500'
                            }`}
                          />
                          <span 
                            className={`text-sm ${getInterfaceTextColor('secondary')}`} 
                            style={{ 
                              fontFamily: theme.fonts.secondary, 
                              fontSize: '14px' 
                            }}
                          >
                            {category.name}
                          </span>
                          <span 
                            className={`ml-auto text-xs ${isMinecraft ? 'text-yellow-400' : getInterfaceTextColor('muted')}`} 
                            style={{ fontFamily: theme.fonts.secondary }}
                          >
                            ({category.count})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <label 
                      className={`block text-sm font-medium mb-3 ${isMinecraft ? 'text-yellow-400' : getInterfaceTextColor('primary')}`} 
                      style={{ 
                        fontFamily: theme.fonts.primary, 
                        fontSize: isMinecraft ? '10px' : '12px' 
                      }}
                    >
                      {isMinecraft ? '📊 ' : ''}Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                      className={`w-full ${theme.type}-input`}
                      style={{ 
                        fontFamily: theme.fonts.secondary, 
                        fontSize: '14px' 
                      }}
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Featured Toggle */}
                  <div>
                    <label 
                      className={`block text-sm font-medium mb-3 ${isMinecraft ? 'text-yellow-400' : getInterfaceTextColor('primary')}`} 
                      style={{ 
                        fontFamily: theme.fonts.primary, 
                        fontSize: isMinecraft ? '10px' : '12px' 
                      }}
                    >
                      {isMinecraft ? '⭐ ' : ''}Special
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.featured || false}
                        onChange={(e) => handleFilterChange({ featured: e.target.checked })}
                        className={`mr-2 ${
                          isMinecraft 
                            ? 'text-yellow-500 bg-gray-800 border-yellow-600' 
                            : 'text-blue-500'
                        }`}
                      />
                      <span 
                        className={`text-sm ${getInterfaceTextColor('secondary')}`} 
                        style={{ 
                          fontFamily: theme.fonts.secondary, 
                          fontSize: '14px' 
                        }}
                      >
                        {isMinecraft ? 'Epic items only' : 'Featured items only'}
                      </span>
                    </label>
                  </div>

                  {/* Tags */}
                  <div>
                    <label 
                      className={`block text-sm font-medium mb-3 ${isMinecraft ? 'text-yellow-400' : getInterfaceTextColor('primary')}`} 
                      style={{ 
                        fontFamily: theme.fonts.primary, 
                        fontSize: isMinecraft ? '10px' : '12px' 
                      }}
                    >
                      {isMinecraft ? '🏷️ ' : ''}Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {facets.tags.slice(0, 6).map((tag) => (
                        <button
                          key={tag.name}
                          onClick={() => {
                            const newTags = filters.tags.includes(tag.name)
                              ? filters.tags.filter(t => t !== tag.name)
                              : [...filters.tags, tag.name];
                            handleFilterChange({ tags: newTags });
                          }}
                          className={`${theme.type}-tag transition-all duration-200 ${
                            filters.tags.includes(tag.name)
                              ? isMinecraft 
                                ? 'bg-green-600 border-green-800 text-white'
                                : 'bg-blue-600 border-blue-800 text-white'
                              : isMinecraft
                                ? 'bg-gray-600 border-gray-800 text-white hover:bg-gray-500'
                                : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                          }`}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 
            className={`text-xl font-semibold ${getInterfaceTextColor('primary')}`} 
            style={{ 
              fontFamily: theme.fonts.primary, 
              fontSize: isMinecraft ? '16px' : '20px' 
            }}
          >
            {loading 
              ? theme.text.loadingText 
              : theme.text.resultsText.replace('{count}', total.toString())
            }
            {searchQuery && (
              <span 
                className={`font-normal ${isMinecraft ? 'text-yellow-400' : getInterfaceTextColor('muted')}`} 
                style={{ 
                  fontFamily: theme.fonts.secondary, 
                  fontSize: isMinecraft ? '18px' : '16px' 
                }}
              >
                {' '}for "{searchQuery}"
              </span>
            )}
          </h2>
          {loading && (
            <div 
              className={`w-6 h-6 border-2 border-t-transparent animate-spin ${
                isMinecraft ? 'border-yellow-400' : 'border-gray-400'
              }`} 
              style={{ borderRadius: isMinecraft ? '0px' : '50%' }} 
            />
          )}
        </div>

        {/* Quick Sort */}
        <div className="hidden sm:flex items-center space-x-2">
          {SORT_OPTIONS.slice(0, 3).map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange({ sortBy: option.value as any })}
              className={`${theme.type}-button transition-all duration-200 ${
                filters.sortBy === option.value
                  ? isMinecraft 
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white'
                  : `${getInterfaceTextColor('primary')} hover:bg-gray-500`
              }`}
              style={{ 
                fontSize: isMinecraft ? '8px' : '10px', 
                padding: isMinecraft ? '6px 10px' : '8px 12px' 
              }}
            >
              {option.icon && <option.icon className="w-3 h-3 inline mr-1" />}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Theme-Aware Circuit Carousel */}
      <div 
        className={`relative overflow-hidden h-[600px] mb-12 rounded-3xl border backdrop-blur-sm ${
          theme.type === 'forest' ? 'bg-gradient-to-br from-green-100/40 to-emerald-200/40 border-green-300/50' :
          theme.type === 'clouds' ? 'bg-gradient-to-br from-sky-100/40 to-blue-200/40 border-sky-300/50' :
          theme.type === 'space' ? 'bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-500/50' :
          theme.type === 'neon' ? 'bg-gradient-to-br from-pink-500/20 to-cyan-500/20 border-pink-400/50' :
          theme.type === 'luxury' ? 'bg-gradient-to-br from-amber-100/40 to-yellow-200/40 border-amber-300/50' :
          theme.type === 'minecraft' ? 'bg-gradient-to-br from-green-600/30 to-brown-600/30 border-yellow-500/50' :
          theme.type === 'ocean' ? 'bg-gradient-to-br from-teal-100/40 to-cyan-200/40 border-teal-300/50' :
          theme.type === 'carnival' ? 'bg-gradient-to-br from-red-200/40 to-pink-200/40 border-red-400/50' :
          theme.type === 'desert' ? 'bg-gradient-to-br from-orange-100/40 to-yellow-200/40 border-orange-300/50' :
          'bg-gradient-to-br from-gray-100/40 to-gray-200/40 border-gray-300/50'
        }`}
        style={{
          backgroundColor: `${colorScheme?.bg}15`,
          borderColor: `${colorScheme?.accent}30`
        }}
      >
        {/* Theme-specific track visualization */}
        <div 
          className={`absolute inset-6 border border-dashed rounded-2xl pointer-events-none ${
            theme.type === 'forest' ? 'border-green-400/40' :
            theme.type === 'clouds' ? 'border-sky-400/40' :
            theme.type === 'space' ? 'border-purple-400/40' :
            theme.type === 'neon' ? 'border-cyan-400/40' :
            theme.type === 'luxury' ? 'border-amber-400/40' :
            theme.type === 'minecraft' ? 'border-yellow-400/40' :
            'border-blue-400/40'
          }`}
          style={{
            borderColor: `${colorScheme?.accent}40`
          }}
        />
        
        <AnimatePresence>
          {results.map((item, index) => {
            const cardDelay = (index / results.length) * 20;
            
            // Theme-specific animation patterns
            const getThemeAnimation = () => {
              switch (theme.type) {
                case 'forest':
                  // Organic, swaying motion like trees
                  return {
                    x: [50, 900, 900, 50, 50],
                    y: [50, 50, 500, 500, 50],
                    rotate: [0, 2, 0, -2, 0] // Gentle sway
                  };
                case 'clouds':
                  // Floating, drifting motion
                  return {
                    x: [50, 900, 900, 50, 50],
                    y: [50, 30, 480, 520, 50], // Floating up/down
                    scale: [1, 1.02, 1, 1.02, 1] // Gentle breathing
                  };
                case 'space':
                  // Orbital, futuristic motion
                  return {
                    x: [50, 900, 900, 50, 50],
                    y: [50, 50, 500, 500, 50],
                    rotateZ: [0, 90, 180, 270, 360] // Full rotation
                  };
                case 'ocean':
                  // Wave-like motion
                  return {
                    x: [50, 900, 900, 50, 50],
                    y: [50, 40, 490, 510, 50], // Wave motion
                    rotate: [0, 3, 0, -3, 0] // Gentle rocking
                  };
                case 'minecraft':
                  // Blocky, step-by-step motion
                  return {
                    x: [50, 50, 900, 900, 900, 50, 50, 50], // Step motion
                    y: [50, 50, 50, 50, 500, 500, 500, 50]
                  };
                case 'neon':
                  // Electric, glitchy motion
                  return {
                    x: [50, 900, 900, 50, 50],
                    y: [50, 50, 500, 500, 50],
                    filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)']
                  };
                default:
                  return {
                    x: [50, 900, 900, 50, 50],
                    y: [50, 50, 500, 500, 50]
                  };
              }
            };
            
            return (
              <motion.div
                key={`themed-${item.id}`}
                className={`absolute w-72 h-auto ${
                  theme.type === 'forest' ? 'drop-shadow-lg' :
                  theme.type === 'clouds' ? 'drop-shadow-md' :
                  theme.type === 'space' ? 'drop-shadow-2xl' :
                  theme.type === 'neon' ? 'drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]' :
                  'drop-shadow-md'
                }`}
                style={{ 
                  pointerEvents: 'auto',
                  willChange: 'transform',
                  borderRadius: theme.type === 'minecraft' ? '0px' : 
                               theme.type === 'clouds' ? '20px' :
                               theme.type === 'forest' ? '15px' :
                               '12px'
                }}
                initial={{
                  x: 50,
                  y: 50
                }}
                animate={getThemeAnimation()}
                transition={{
                  duration: theme.type === 'minecraft' ? 24 : // Slower for blocky motion
                           theme.type === 'clouds' ? 25 : // Slower for floating
                           theme.type === 'space' ? 18 : // Faster for futuristic
                           20,
                  repeat: Infinity,
                  ease: theme.type === 'minecraft' ? 'easeInOut' : 'linear',
                  delay: -cardDelay
                }}
                whileHover={{
                  scale: theme.type === 'minecraft' ? 1.05 : 1.08,
                  zIndex: 30,
                  transition: { duration: 0.2 }
                }}
                whileDrag={{
                  scale: 1.1,
                  zIndex: 50,
                  rotate: theme.type === 'minecraft' ? 0 : 5,
                  transition: { duration: 0.1 }
                }}
              >
                <SearchItemCard 
                  item={item} 
                  index={index} 
                  theme={theme}
                  colorScheme={colorScheme}
                  isVisible={true}
                  carouselRef={resultsContainerRef}
                  onFavorite={(itemId) => {
                    setSelectedItems(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(itemId)) {
                        newSet.delete(itemId);
                        setSelectedCards(cards => cards.filter(card => card.id !== itemId));
                      } else {
                        newSet.add(itemId);
                        setSelectedCards(cards => {
                          const isAlreadySelected = cards.some(card => card.id === itemId);
                          return isAlreadySelected ? cards : [...cards, item];
                        });
                      }
                      return newSet;
                    });
                  }}
                  onQuickView={(item) => {
                    console.log('Quick view:', item.title);
                  }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Selected Cards Section - Drop Zone */}
      <div className="mb-8">
        <h3 className={`text-2xl font-bold mb-6 ${getInterfaceTextColor('primary')}`} 
            style={{ fontFamily: theme.fonts.primary }}>
          Selected Items ({selectedCards.length})
        </h3>
        <motion.div 
          className="min-h-[300px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 border-2 border-dashed rounded-2xl backdrop-blur-sm"
          layout
          style={{
            borderStyle: selectedCards.length === 0 ? 'dashed' : 'solid',
            borderColor: `${colorScheme?.accent || theme.colors.accent}50`,
            backgroundColor: `${colorScheme?.bg || theme.colors.background}20`
          }}
          whileHover={{ 
            borderColor: `${colorScheme?.accent || theme.colors.accent}80`,
            backgroundColor: `${colorScheme?.bg || theme.colors.background}30`
          }}
        >
          {selectedCards.length === 0 && (
            <motion.div 
              className="col-span-full flex flex-col items-center justify-center text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-4 text-6xl opacity-40"
              >
                ⬇️
              </motion.div>
              <h4 className={`text-xl font-semibold mb-2 ${getInterfaceTextColor('secondary')}`}
                  style={{ fontFamily: theme.fonts.primary }}>
                Drag cards here to select them
              </h4>
              <p className={`text-sm ${getInterfaceTextColor('muted')}`}
                 style={{ fontFamily: theme.fonts.secondary }}>
                Drag items from the carousel above or click to select
              </p>
            </motion.div>
          )}
          
          <AnimatePresence>
            {selectedCards.map((item, index) => (
              <motion.div
                key={`selected-${item.id}`}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 300, damping: 25 }
                }}
                exit={{ 
                  opacity: 0, 
                  y: -50, 
                  scale: 0.8,
                  transition: { duration: 0.3 }
                }}
                layout
                className="relative"
              >
                <SearchItemCard 
                  item={item} 
                  index={index} 
                  theme={theme}
                  colorScheme={colorScheme}
                  isVisible={true}
                  carouselRef={resultsContainerRef}
                  onFavorite={(itemId) => {
                    // Remove from selected when clicked again
                    setSelectedItems(prev => {
                      const newSet = new Set(prev);
                      newSet.delete(itemId);
                      return newSet;
                    });
                    setSelectedCards(cards => cards.filter(card => card.id !== itemId));
                  }}
                  onQuickView={(item) => {
                    console.log('Selected card quick view:', item.title);
                  }}
                />
                {/* Badge to show it's selected */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold z-20"
                >
                  ✓
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Advanced Performance Metrics Display (Dev Mode) */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono backdrop-blur-lg z-50"
        >
          <div>Searches: {searchMetrics.current.searchCount}</div>
          <div>Avg Response: {Math.round(searchMetrics.current.avgResponseTime)}ms</div>
          <div>Popular: {Array.from(searchMetrics.current.popularQueries.entries())
            .sort(([,a], [,b]) => b - a)
            .slice(0, 1)
            .map(([query]) => query)[0] || 'None'}
          </div>
        </motion.div>
      )}
      
      {/* Enhanced Empty State with Advanced Animations */}
      {!loading && results.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="text-center py-16"
        >
          <motion.div 
            className={`w-32 h-32 mx-auto mb-6 ${theme.type}-card flex items-center justify-center relative overflow-hidden`}
            whileHover={{ 
              scale: 1.05,
              rotateY: theme.effects.pixelated ? 0 : 5,
              transition: { duration: 0.3 }
            }}
            animate={{
              boxShadow: [
                theme.effects.pixelated ? '4px 4px 0px rgba(0,0,0,0.5)' : '0 8px 25px rgba(0,0,0,0.1)',
                theme.effects.pixelated ? '6px 6px 0px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.15)',
                theme.effects.pixelated ? '4px 4px 0px rgba(0,0,0,0.5)' : '0 8px 25px rgba(0,0,0,0.1)'
              ]
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Search className={`w-16 h-16 ${isMinecraft ? 'text-yellow-400' : getInterfaceTextColor('muted')}`} />
            </motion.div>
            
            {/* Ambient particles effect for non-pixelated themes */}
            {!theme.effects.pixelated && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                    animate={{
                      x: [0, Math.cos(i * 60) * 30, 0],
                      y: [0, Math.sin(i * 60) * 30, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
          
          <motion.h3 
            className={`text-xl font-medium ${getInterfaceTextColor('primary')} mb-3`} 
            style={{ 
              fontFamily: theme.fonts.primary, 
              fontSize: isMinecraft ? '16px' : '20px' 
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {theme.text.noResultsTitle}
          </motion.h3>
          
          <motion.p 
            className={`mb-6 max-w-md mx-auto ${isMinecraft ? 'text-yellow-400' : getInterfaceTextColor('muted')}`} 
            style={{ 
              fontFamily: theme.fonts.secondary, 
              fontSize: '16px',
              lineHeight: '1.6'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {theme.text.noResultsDescription}
          </motion.p>
          
          {activeFiltersCount > 0 && (
            <motion.button
              onClick={clearFilters}
              className={`${theme.type}-button px-8 py-4 ${getInterfaceTextColor('primary')} transition-all duration-200`}
              style={{ 
                fontFamily: theme.fonts.primary, 
                fontSize: isMinecraft ? '12px' : '14px' 
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {theme.text.clearFiltersText}
            </motion.button>
          )}
        </motion.div>
      )}
      {/* Advanced Loading States */}
      {loading && (
        <motion.div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={`${theme.type}-card p-8 flex flex-col items-center space-y-4`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <motion.div
              className={`w-12 h-12 border-4 border-t-transparent rounded-full ${
                isMinecraft ? 'border-yellow-400' : 'border-blue-400'
              }`}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p 
              className={`${getInterfaceTextColor('primary')} text-lg font-medium`}
              style={{ fontFamily: theme.fonts.primary }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {theme.text.loadingText}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}