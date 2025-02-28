
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart, DollarSign } from 'lucide-react';

export interface ContentCardProps {
  id: string;
  type: 'video' | 'music' | 'image' | 'blog';
  title: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  thumbnail: string;
  price?: number;
  isNFT?: boolean;
  likes?: number;
  className?: string;
}

const ContentCard = ({
  id,
  type,
  title,
  creator,
  thumbnail,
  price,
  isNFT = false,
  likes = 0,
  className,
}: ContentCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const typeLabel = {
    video: 'Video',
    music: 'Track',
    image: 'Artwork',
    blog: 'Article'
  };

  return (
    <div 
      className={cn(
        'group relative overflow-hidden rounded-2xl transition-all duration-500 hover-lift',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/content/${id}`} className="block h-full w-full">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <div className={cn(
            'absolute inset-0 bg-creatorshub-200/20 img-blur-loading',
            imageLoaded ? 'img-loaded' : ''
          )} />
          
          <img
            src={thumbnail}
            alt={title}
            className={cn(
              'h-full w-full object-cover transition-all duration-500',
              isHovered ? 'scale-105' : 'scale-100',
              imageLoaded ? 'img-loaded' : 'img-blur-loading'
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          <div className="absolute top-3 left-3 z-10">
            <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {typeLabel[type]}
            </span>
          </div>
          
          {isNFT && (
            <div className="absolute top-3 right-3 z-10">
              <span className="rounded-full bg-purple-500/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                NFT
              </span>
            </div>
          )}
          
          <div className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300',
            isHovered ? 'opacity-100' : ''
          )} />
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10"
              />
              <Link to={`/creator/${creator.id}`} onClick={(e) => e.stopPropagation()} className="text-sm font-medium hover:text-primary">
                {creator.name}
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              {price !== undefined && (
                <span className="flex items-center text-sm font-medium">
                  <DollarSign className="mr-1 h-3 w-3" />
                  {price} KAIA
                </span>
              )}
              <span className="flex items-center text-sm text-muted-foreground">
                <Heart className="mr-1 h-3 w-3" />
                {likes}
              </span>
            </div>
          </div>
          
          <h3 className="line-clamp-2 text-base font-semibold leading-tight tracking-tight">
            {title}
          </h3>
        </div>
      </Link>
      
      <div className={cn(
        'absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-2 bg-black/80 p-3 backdrop-blur-md transition-transform duration-300',
        isHovered ? 'translate-y-0' : ''
      )}>
        <Link 
          to={`/content/${id}`} 
          className="w-full rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          {price && isNFT ? `Buy for ${price} KAIA` : 'View Content'}
        </Link>
      </div>
    </div>
  );
};

export default ContentCard;
