'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Star, Clock, TrendingUp } from 'lucide-react';
import { SearchResponse, SearchFilters, SearchItem } from '@/types';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant', icon: TrendingUp },
  { value: 'rating', label: 'Highest Rated', icon: Star },
  { value: 'price-asc', label: 'Price: Low to High', icon: null },
  { value: 'price-desc', label: 'Price: High to Low', icon: null },
  { value: 'newest', label: 'Newest First', icon: Clock },
];

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface SearchItemCardProps {
  item: SearchItem;
  index: number;
}

const SearchItemCard = ({ item, index }: SearchItemCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    transition={{ 
      duration: 0.3, 
      delay: index * 0.05,
      ease: [0.25, 0.25, 0, 1]
    }}
    whileHover={{ 
      y: -4, 
      scale: 1.02,
      transition: { duration: 0.2, ease: [0.25, 0.25, 0, 1] }
    }}
    className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-200"
  >
    {item.featured && (
      <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-medium rounded-full z-10">
        Featured
      </div>
    )}
    
    <div className="aspect-square bg-gray-100 relative overflow-hidden">
      {item.imageUrl && (
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}
    </div>
    
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
        {item.rating && (
          <div className="flex items-center ml-2 flex-shrink-0">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
          </div>
        )}
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {item.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">
            ${item.price}
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
            {item.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mt-3">
        {item.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
          >
            {tag}
          </span>
        ))}
        {item.tags.length > 3 && (
          <span className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded-full">
            +{item.tags.length - 3}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

export default function InteractiveSearch() {
  const [searchQuery, setSearchQuery] = useState('');
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
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [total, setTotal] = useState(0);

  const debouncedQuery = useDebounce(searchQuery, 300);

  const searchAPI = useCallback(async (searchFilters: SearchFilters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchFilters.query) params.set('query', searchFilters.query);
      if (searchFilters.category) params.set('category', searchFilters.category);
      if (searchFilters.tags.length > 0) params.set('tags', searchFilters.tags.join(','));
      if (searchFilters.sortBy) params.set('sortBy', searchFilters.sortBy);
      if (searchFilters.priceRange?.min !== undefined) params.set('minPrice', searchFilters.priceRange.min.toString());
      if (searchFilters.priceRange?.max !== undefined) params.set('maxPrice', searchFilters.priceRange.max.toString());
      if (searchFilters.featured) params.set('featured', 'true');

      const response = await fetch(`/api/search?${params}`);
      const data: SearchResponse = await response.json();
      
      setResults(data.items);
      setSuggestions(data.suggestions);
      setFacets(data.facets);
      setTotal(data.total);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const newFilters = { ...filters, query: debouncedQuery };
    setFilters(newFilters);
    searchAPI(newFilters);
  }, [debouncedQuery, searchAPI]);

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    searchAPI(updatedFilters);
  };

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
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search for products, categories, or tags..."
              className="w-full pl-12 pr-20 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
            />
            
            {/* Filter Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-200 ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-5 h-5" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
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
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden"
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
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-3"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    <span>{suggestion}</span>
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
              className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <div className="flex items-center space-x-3">
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
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
                            className="mr-2 text-blue-500"
                          />
                          <span className="text-sm text-gray-700">{category.name}</span>
                          <span className="ml-auto text-xs text-gray-500">({category.count})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Sort by</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
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
                    <label className="block text-sm font-medium text-gray-700 mb-3">Features</label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.featured || false}
                        onChange={(e) => handleFilterChange({ featured: e.target.checked })}
                        className="mr-2 text-blue-500"
                      />
                      <span className="text-sm text-gray-700">Featured items only</span>
                    </label>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
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
                          className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                            filters.tags.includes(tag.name)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
          <h2 className="text-xl font-semibold text-gray-900">
            {loading ? 'Searching...' : `${total} results`}
            {searchQuery && (
              <span className="text-gray-500 font-normal"> for "{searchQuery}"</span>
            )}
          </h2>
          {loading && (
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        {/* Quick Sort */}
        <div className="hidden sm:flex items-center space-x-2">
          {SORT_OPTIONS.slice(0, 3).map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange({ sortBy: option.value as any })}
              className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                filters.sortBy === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.icon && <option.icon className="w-4 h-4 inline mr-1" />}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {results.map((item, index) => (
            <SearchItemCard key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {!loading && results.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear filters
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}