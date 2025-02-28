
import React, { useState } from 'react';
import ContentCard, { ContentCardProps } from '../ui/ContentCard';

const FeaturedContent = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'video', label: 'Videos' },
    { id: 'music', label: 'Music' },
    { id: 'image', label: 'Artworks' },
    { id: 'blog', label: 'Articles' },
  ];
  
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
  ];
  
  const filteredContents = contents.filter((content) => 
    activeTab === 'all' || content.type === activeTab
  );
  
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trending Content</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Discover the most popular content across the platform, from videos and music to artworks and articles.
          </p>
        </div>
        
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredContents.map((content) => (
            <ContentCard key={content.id} {...content} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a
            href="/explore"
            className="inline-block rounded-full bg-secondary px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary/80"
          >
            Explore All Content
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
