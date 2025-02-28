
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentCard, { ContentCardProps } from '@/components/ui/ContentCard';
import BlurContainer from '@/components/ui/BlurContainer';
import { Search, Filter } from 'lucide-react';

// Sample content data
const MOCK_CONTENT: ContentCardProps[] = [
  {
    id: '1',
    type: 'video',
    title: 'How to Create NFT Art That Sells',
    creator: {
      id: 'creator1',
      name: 'Digital Maestro',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 5,
    isNFT: true,
    likes: 423,
  },
  {
    id: '2',
    type: 'music',
    title: 'Ethereal Dreams - Ambient Music Collection',
    creator: {
      id: 'creator2',
      name: 'SoundScape',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 2.5,
    likes: 187,
  },
  {
    id: '3',
    type: 'image',
    title: 'Cyberpunk City at Night - Limited Edition',
    creator: {
      id: 'creator3',
      name: 'Pixel Prophet',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 20,
    isNFT: true,
    likes: 764,
  },
  {
    id: '4',
    type: 'blog',
    title: 'The Future of Decentralized Content Creation',
    creator: {
      id: 'creator4',
      name: 'Crypto Philosopher',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    likes: 392,
  },
  {
    id: '5',
    type: 'video',
    title: 'Creating Digital Art Using Procreate',
    creator: {
      id: 'creator5',
      name: 'Art Academy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 3.5,
    likes: 215,
  },
  {
    id: '6',
    type: 'music',
    title: 'Lo-fi Beats to Create To',
    creator: {
      id: 'creator6',
      name: 'Chill Vibes',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 1.5,
    likes: 876,
  },
  {
    id: '7',
    type: 'image',
    title: 'Abstract Geometry - NFT Collection',
    creator: {
      id: 'creator7',
      name: 'Geometry Master',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 15,
    isNFT: true,
    likes: 532,
  },
  {
    id: '8',
    type: 'blog',
    title: 'How to Market Your Digital Content in 2023',
    creator: {
      id: 'creator8',
      name: 'Marketing Genius',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    likes: 298,
  },
];

type FilterType = 'all' | 'video' | 'music' | 'image' | 'blog' | 'nft';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  const filteredContent = MOCK_CONTENT.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           content.creator.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      activeFilter === 'all' || 
      content.type === activeFilter || 
      (activeFilter === 'nft' && content.isNFT);
    
    return matchesSearch && matchesFilter;
  });

  const filters: {label: string, value: FilterType}[] = [
    {label: 'All Content', value: 'all'},
    {label: 'Videos', value: 'video'},
    {label: 'Music', value: 'music'},
    {label: 'Artwork', value: 'image'},
    {label: 'Articles', value: 'blog'},
    {label: 'NFTs Only', value: 'nft'},
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Explore Content</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover amazing content from creators around the world
            </p>
          </div>

          <div className="mb-8">
            <div className="relative mx-auto max-w-3xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search content, creators, or keywords..."
                className="w-full rounded-full border-none bg-secondary/80 py-3 pl-10 pr-4 text-base shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.value}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/80 text-foreground hover:bg-secondary'
                }`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {filteredContent.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredContent.map((content) => (
                <ContentCard key={content.id} {...content} />
              ))}
            </div>
          ) : (
            <BlurContainer className="mx-auto max-w-2xl p-10 text-center">
              <Filter className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold">No content found</h3>
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

export default Explore;
