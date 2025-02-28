
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentCard, { ContentCardProps } from '@/components/ui/ContentCard';
import BlurContainer from '@/components/ui/BlurContainer';
import { Search, Filter } from 'lucide-react';

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('trending');
  const [activeContentType, setActiveContentType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Get tab from URL query params
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
    
    const typeParam = params.get('type');
    if (typeParam) {
      setActiveContentType(typeParam);
    }
    
    const queryParam = params.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [location.search]);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(location.search);
    params.set('tab', tab);
    navigate(`/explore?${params.toString()}`);
  };
  
  const handleContentTypeChange = (type: string) => {
    setActiveContentType(type);
    const params = new URLSearchParams(location.search);
    params.set('type', type);
    navigate(`/explore?${params.toString()}`);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    params.set('q', searchQuery);
    navigate(`/explore?${params.toString()}`);
  };
  
  const tabs = [
    { id: 'trending', label: 'Trending' },
    { id: 'newest', label: 'Newest' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'free', label: 'Free Content' },
  ];
  
  const contentTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'video', label: 'Videos' },
    { id: 'music', label: 'Music' },
    { id: 'image', label: 'Artworks' },
    { id: 'blog', label: 'Articles' },
  ];
  
  // Mock content data (in a real app, this would come from an API)
  const contents: ContentCardProps[] = [
    {
      id: '1',
      type: 'video',
      title: 'Advanced Digital Painting Techniques',
      creator: {
        id: '1',
        name: 'Emma Watson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 2.5,
      isNFT: false,
      likes: 245,
    },
    {
      id: '2',
      type: 'music',
      title: 'Midnight Serenity - Electronic Ambient Mix',
      creator: {
        id: '3',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 1.0,
      isNFT: true,
      likes: 189,
    },
    {
      id: '3',
      type: 'image',
      title: 'Ethereal Landscapes Collection',
      creator: {
        id: '2',
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      thumbnail: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 3.2,
      isNFT: true,
      likes: 320,
    },
    {
      id: '4',
      type: 'blog',
      title: 'The Future of Decentralized Content Creation',
      creator: {
        id: '4',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 0.5,
      isNFT: false,
      likes: 127,
    },
    {
      id: '5',
      type: 'video',
      title: 'Creating Immersive VR Experiences',
      creator: {
        id: '1',
        name: 'Emma Watson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      thumbnail: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 4.0,
      isNFT: false,
      likes: 98,
    },
    {
      id: '6',
      type: 'music',
      title: 'Urban Beats Vol. 2 - Hip Hop Instrumentals',
      creator: {
        id: '3',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 1.5,
      isNFT: false,
      likes: 213,
    },
    {
      id: '7',
      type: 'blog',
      title: 'Blockchain Technology for Content Creators',
      creator: {
        id: '4',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 0,
      isNFT: false,
      likes: 88,
    },
    {
      id: '8',
      type: 'image',
      title: 'Abstract Digital Art Collection',
      creator: {
        id: '2',
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      thumbnail: 'https://images.unsplash.com/photo-1501472312651-726afe119ff1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 2.8,
      isNFT: true,
      likes: 176,
    },
    {
      id: '9',
      type: 'video',
      title: 'Documentary: The Rise of NFTs',
      creator: {
        id: '1',
        name: 'Emma Watson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      thumbnail: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 0,
      isNFT: false,
      likes: 322,
    },
  ];
  
  // Filter content based on active filters
  const filteredContents = contents.filter((content) => {
    const typeMatch = activeContentType === 'all' || content.type === activeContentType;
    const searchMatch = !searchQuery || 
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Additional filters based on active tab
    const tabMatch = activeTab === 'trending' ||
      (activeTab === 'newest' && true) || // In a real app, we'd filter by date
      (activeTab === 'popular' && content.likes > 150) ||
      (activeTab === 'free' && content.price === 0);
    
    return typeMatch && searchMatch && tabMatch;
  });
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Content</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Discover amazing content from talented creators around the world
            </p>
          </div>
          
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for content or creators..."
                  className="w-full rounded-lg border-none bg-secondary py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button 
                type="submit"
                className="flex items-center justify-center rounded-lg bg-primary px-4 py-3 font-medium text-white"
              >
                Search
              </button>
              <button 
                type="button"
                className="flex items-center justify-center rounded-lg bg-secondary px-4 py-3"
              >
                <Filter className="h-5 w-5" />
              </button>
            </form>
          </div>
          
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <div className="mr-2 text-sm font-medium">Filter by:</div>
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleContentTypeChange(type.id)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  activeContentType === type.id
                    ? 'bg-primary text-white'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          
          <div className="mb-10">
            <BlurContainer className="p-1 sm:p-2">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex-shrink-0 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors sm:px-6 ${
                      activeTab === tab.id
                        ? 'bg-secondary rounded-lg text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </BlurContainer>
          </div>
          
          {filteredContents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredContents.map((content) => (
                <ContentCard key={content.id} {...content} />
              ))}
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-secondary/50 p-8 text-center">
              <p className="text-lg font-medium">No content found</p>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
