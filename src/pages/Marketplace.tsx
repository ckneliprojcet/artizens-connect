
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentCard, { ContentCardProps } from '@/components/ui/ContentCard';
import BlurContainer from '@/components/ui/BlurContainer';
import { Search, Filter, TrendingUp, Clock, ArrowUpDown } from 'lucide-react';

// Sample NFT content data
const MOCK_NFTS: ContentCardProps[] = [
  {
    id: 'nft1',
    type: 'image',
    title: 'Cosmic Dreamscape #42',
    creator: {
      id: 'creator1',
      name: 'Digital Maestro',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 35,
    isNFT: true,
    likes: 423,
  },
  {
    id: 'nft2',
    type: 'video',
    title: 'Cybernetic Evolution - Motion Art',
    creator: {
      id: 'creator3',
      name: 'Pixel Prophet',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 50,
    isNFT: true,
    likes: 764,
  },
  {
    id: 'nft3',
    type: 'music',
    title: 'Quantum Harmonics - Exclusive Track',
    creator: {
      id: 'creator2',
      name: 'SoundScape',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 25,
    isNFT: true,
    likes: 187,
  },
  {
    id: 'nft4',
    type: 'image',
    title: 'Neon City Nights - Limited Edition',
    creator: {
      id: 'creator7',
      name: 'Geometry Master',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 45,
    isNFT: true,
    likes: 532,
  },
  {
    id: 'nft5',
    type: 'image',
    title: 'Abstract Dreamscape #87',
    creator: {
      id: 'creator5',
      name: 'Art Academy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 20,
    isNFT: true,
    likes: 215,
  },
  {
    id: 'nft6',
    type: 'video',
    title: 'Holographic Memories - VR Experience',
    creator: {
      id: 'creator1',
      name: 'Digital Maestro',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 60,
    isNFT: true,
    likes: 876,
  },
  {
    id: 'nft7',
    type: 'music',
    title: 'Ethereal Echoes - Ambient Collection',
    creator: {
      id: 'creator2',
      name: 'SoundScape',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 30,
    isNFT: true,
    likes: 298,
  },
  {
    id: 'nft8',
    type: 'image',
    title: 'Digital Renaissance - Masterpiece',
    creator: {
      id: 'creator3',
      name: 'Pixel Prophet',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 75,
    isNFT: true,
    likes: 423,
  },
];

type SortOption = 'trending' | 'newest' | 'price-high' | 'price-low';
type CategoryType = 'all' | 'image' | 'video' | 'music';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [activeSortOption, setActiveSortOption] = useState<SortOption>('trending');
  
  let sortedAndFilteredNFTs = [...MOCK_NFTS].filter(nft => {
    const matchesSearch = nft.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           nft.creator.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || nft.type === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Apply sorting
  switch (activeSortOption) {
    case 'newest':
      // In a real app, this would sort by creation date
      sortedAndFilteredNFTs = sortedAndFilteredNFTs.sort((a, b) => b.id.localeCompare(a.id));
      break;
    case 'price-high':
      sortedAndFilteredNFTs = sortedAndFilteredNFTs.sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case 'price-low':
      sortedAndFilteredNFTs = sortedAndFilteredNFTs.sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case 'trending':
    default:
      // In a real app, this would sort by some trending algorithm
      sortedAndFilteredNFTs = sortedAndFilteredNFTs.sort((a, b) => b.likes - a.likes);
      break;
  }

  const categories: {label: string, value: CategoryType}[] = [
    {label: 'All NFTs', value: 'all'},
    {label: 'Artwork', value: 'image'},
    {label: 'Videos', value: 'video'},
    {label: 'Music', value: 'music'},
  ];

  const sortOptions: {label: string, value: SortOption, icon: React.ReactNode}[] = [
    {label: 'Trending', value: 'trending', icon: <TrendingUp className="mr-2 h-4 w-4" />},
    {label: 'Newest', value: 'newest', icon: <Clock className="mr-2 h-4 w-4" />},
    {label: 'Price: High to Low', value: 'price-high', icon: <ArrowUpDown className="mr-2 h-4 w-4" />},
    {label: 'Price: Low to High', value: 'price-low', icon: <ArrowUpDown className="mr-2 h-4 w-4" />},
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">NFT Marketplace</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover, collect, and sell extraordinary NFTs
            </p>
          </div>

          <div className="mb-8">
            <div className="relative mx-auto max-w-3xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search NFTs, creators, or collections..."
                className="w-full rounded-full border-none bg-secondary/80 py-3 pl-10 pr-4 text-base shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/80 text-foreground hover:bg-secondary'
                  }`}
                  onClick={() => setActiveCategory(category.value)}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center">
              <span className="mr-2 text-sm text-muted-foreground">Sort by:</span>
              <select
                className="rounded-lg border-none bg-secondary/80 px-3 py-2 text-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={activeSortOption}
                onChange={(e) => setActiveSortOption(e.target.value as SortOption)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {sortedAndFilteredNFTs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedAndFilteredNFTs.map((nft) => (
                <ContentCard key={nft.id} {...nft} />
              ))}
            </div>
          ) : (
            <BlurContainer className="mx-auto max-w-2xl p-10 text-center">
              <Filter className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold">No NFTs found</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for
              </p>
            </BlurContainer>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
