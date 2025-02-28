
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlurContainer from '@/components/ui/BlurContainer';
import { Wallet, Heart, Share2, ArrowLeft, Shield, Clock, Tag, Eye, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import ContentCard, { ContentCardProps } from '@/components/ui/ContentCard';

// Sample NFT data
const NFT_DATA: Record<string, ContentCardProps & { 
  description: string; 
  createdAt: string;
  views: number;
  attributes: Array<{trait_type: string; value: string}>;
  history: Array<{event: string; from: string; to: string; price: number; date: string}>;
}> = {
  'nft1': {
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
    description: 'Cosmic Dreamscape is a unique digital artwork that explores the intersection of dreams and reality. This piece represents the fluidity of consciousness and the endless possibilities of the imagination.',
    createdAt: '2023-11-15',
    views: 1542,
    attributes: [
      { trait_type: 'Style', value: 'Abstract' },
      { trait_type: 'Palette', value: 'Cosmic' },
      { trait_type: 'Rarity', value: 'Rare' },
      { trait_type: 'Dimension', value: '3000x3000' }
    ],
    history: [
      { event: 'Minted', from: 'Digital Maestro', to: 'Digital Maestro', price: 0, date: '2023-11-15' },
      { event: 'Listed', from: 'Digital Maestro', to: 'Marketplace', price: 35, date: '2023-11-16' }
    ]
  },
  'nft2': {
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
    description: 'Cybernetic Evolution is a motion art piece that explores the convergence of humanity and technology. This work visualizes the future of human augmentation and digital consciousness.',
    createdAt: '2023-10-23',
    views: 2871,
    attributes: [
      { trait_type: 'Medium', value: 'Motion Graphics' },
      { trait_type: 'Duration', value: '45 seconds' },
      { trait_type: 'Style', value: 'Cyberpunk' },
      { trait_type: 'Resolution', value: '4K' }
    ],
    history: [
      { event: 'Minted', from: 'Pixel Prophet', to: 'Pixel Prophet', price: 0, date: '2023-10-23' },
      { event: 'Listed', from: 'Pixel Prophet', to: 'Marketplace', price: 50, date: '2023-10-24' }
    ]
  }
};

// More sample NFTs for related content
const RELATED_NFTS: ContentCardProps[] = [
  {
    id: 'nft3',
    type: 'image',
    title: 'Astral Projection #17',
    creator: {
      id: 'creator1',
      name: 'Digital Maestro',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 28,
    isNFT: true,
    likes: 315,
  },
  {
    id: 'nft4',
    type: 'image',
    title: 'Neon City Nights',
    creator: {
      id: 'creator3',
      name: 'Pixel Prophet',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 45,
    isNFT: true,
    likes: 532,
  },
  {
    id: 'nft5',
    type: 'video',
    title: 'Digital Dreamscape',
    creator: {
      id: 'creator5',
      name: 'Art Academy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    thumbnail: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 22,
    isNFT: true,
    likes: 198,
  },
];

const NFTDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(['Amazing artwork! Love the details.', 'The colors are so vibrant!']);
  const [newComment, setNewComment] = useState('');
  
  // Get the NFT data or redirect to 404 if not found
  const nft = NFT_DATA[id || ''] || null;
  
  if (!nft) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BlurContainer className="mx-auto my-20 max-w-2xl p-10 text-center">
              <h2 className="text-2xl font-bold">NFT Not Found</h2>
              <p className="mt-4 text-muted-foreground">The NFT you are looking for does not exist or has been removed.</p>
              <Link 
                to="/marketplace" 
                className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Marketplace
              </Link>
            </BlurContainer>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleBuyNFT = () => {
    // This would be connected to a smart contract in a real app
    toast.success(`Purchase initiated for ${nft.title}!`);
  };
  
  const handleLikeNFT = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success('Added to your favorites!');
    }
  };
  
  const handleShareNFT = () => {
    // This would open a sharing dialog in a real app
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
      toast.success('Comment posted!');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              to="/marketplace" 
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* NFT Image/Media */}
            <div className="overflow-hidden rounded-2xl bg-secondary/20 backdrop-blur-sm">
              <div className="aspect-square w-full overflow-hidden">
                {nft.type === 'image' ? (
                  <img 
                    src={nft.thumbnail} 
                    alt={nft.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-black/40">
                    <img 
                      src={nft.thumbnail} 
                      alt={nft.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute rounded-full bg-black/60 p-6">
                      {/* Play button for videos */}
                      <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 5.14v13.72a.5.5 0 0 0 .8.4l10-6.86a.5.5 0 0 0 0-.8L8.8 4.74a.5.5 0 0 0-.8.4Z"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* NFT Details */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-1 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {nft.type === 'image' ? 'Digital Artwork' : 'Motion Art'}
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight">{nft.title}</h1>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleLikeNFT}
                    className={`rounded-full p-2 ${isLiked ? 'bg-red-100 text-red-500 dark:bg-red-900/20' : 'bg-secondary/80 hover:bg-secondary'}`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={handleShareNFT}
                    className="rounded-full bg-secondary/80 p-2 hover:bg-secondary"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-3">
                <img 
                  src={nft.creator.avatar} 
                  alt={nft.creator.name}
                  className="h-10 w-10 rounded-full border-2 border-white/10"
                />
                <div>
                  <p className="text-sm text-muted-foreground">Created by</p>
                  <Link to={`/creator/${nft.creator.id}`} className="font-medium hover:text-primary">
                    {nft.creator.name}
                  </Link>
                </div>
              </div>
              
              <p className="mt-6 text-muted-foreground">{nft.description}</p>
              
              <BlurContainer className="mt-6 grid grid-cols-2 gap-4 p-4 sm:grid-cols-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-xl font-bold">{nft.price} KAIA</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Likes</p>
                  <p className="text-xl font-bold">{nft.likes}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Views</p>
                  <p className="text-xl font-bold">{nft.views}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-xl font-bold">{new Date(nft.createdAt).toLocaleDateString()}</p>
                </div>
              </BlurContainer>
              
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <button 
                  onClick={handleBuyNFT}
                  className="flex w-full items-center justify-center rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Buy for {nft.price} KAIA
                </button>
                <button className="flex w-full items-center justify-center rounded-full border border-primary/20 bg-transparent px-8 py-3 font-semibold text-primary shadow-md transition-all hover:bg-primary/10">
                  Make Offer
                </button>
              </div>
              
              {/* Attributes */}
              <div className="mt-8">
                <h3 className="mb-3 text-lg font-semibold">Properties</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {nft.attributes.map((attr, index) => (
                    <BlurContainer 
                      key={index} 
                      className="p-3 text-center"
                      intensity="light"
                    >
                      <p className="text-xs text-primary">{attr.trait_type}</p>
                      <p className="mt-1 font-medium">{attr.value}</p>
                    </BlurContainer>
                  ))}
                </div>
              </div>
              
              {/* History */}
              <div className="mt-8">
                <h3 className="mb-3 text-lg font-semibold">History</h3>
                <BlurContainer className="p-3">
                  {nft.history.map((item, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between py-3 ${
                        index < nft.history.length - 1 ? "border-b border-border/40" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.event === 'Minted' ? (
                          <Shield className="h-5 w-5 text-green-500" />
                        ) : item.event === 'Listed' ? (
                          <Tag className="h-5 w-5 text-blue-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-orange-500" />
                        )}
                        <div>
                          <p className="font-medium">{item.event}</p>
                          <p className="text-sm text-muted-foreground">
                            From {item.from} to {item.to}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.price > 0 ? `${item.price} KAIA` : '-'}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </BlurContainer>
              </div>
              
              {/* Comments */}
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
                </div>
                
                <form onSubmit={handleSubmitComment} className="mt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full rounded-full border-none bg-secondary/80 py-2 px-4 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button 
                      type="submit"
                      className="rounded-full bg-primary px-6 font-medium text-primary-foreground"
                    >
                      Post
                    </button>
                  </div>
                </form>
                
                <div className="mt-4 space-y-4">
                  {comments.map((comment, index) => (
                    <BlurContainer key={index} className="p-4" intensity="light">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-secondary">
                          <img
                            src={`https://images.unsplash.com/photo-${1570295999919 + index}-b6472a39a025?w=50&auto=format`}
                            alt="User avatar"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">User{index + 1}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(Date.now() - index * 86400000).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{comment}</p>
                    </BlurContainer>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Related NFTs */}
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">More from this collection</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {RELATED_NFTS.map((nft) => (
                <ContentCard key={nft.id} {...nft} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NFTDetails;
