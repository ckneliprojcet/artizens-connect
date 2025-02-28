
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlurContainer from '../ui/BlurContainer';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <div className="relative overflow-hidden pt-20 sm:pt-24 lg:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="relative">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="mb-4 block">Create. Share. Earn.</span>
              <span className="block bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                The Future of Creator Economy
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A decentralized platform where creators own their content, connect directly with fans,
              and earn through microtransactions, subscriptions, and NFTs.
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/explore"
                className="w-full rounded-full bg-primary px-8 py-3 font-medium text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl sm:w-auto"
              >
                Explore Content
              </Link>
              <Link
                to="#"
                className="w-full rounded-full bg-secondary px-8 py-3 font-medium text-foreground transition-all hover:bg-secondary/80 sm:w-auto"
              >
                Start Creating
              </Link>
            </div>
          </div>
          
          <div className="mt-16 sm:mt-24">
            <div className="relative mx-auto max-w-5xl">
              <BlurContainer className="overflow-hidden rounded-2xl shadow-2xl">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Platform showcase ${index + 1}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                        index === currentImage ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-8">
                    <div className="flex items-center gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Creator"
                        className="h-12 w-12 rounded-full border-2 border-white/50 object-cover"
                      />
                      <div className="text-left">
                        <h3 className="text-lg font-medium text-white">Digital Creation Showcase</h3>
                        <p className="text-sm text-white/80">Featuring top creators on the platform</p>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurContainer>
              
              <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 transform justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-8 rounded-full transition-all ${
                      index === currentImage ? 'bg-primary' : 'bg-secondary'
                    }`}
                    onClick={() => setCurrentImage(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-48 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-primary/20 blur-3xl filter"></div>
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl filter"></div>
    </div>
  );
};

export default Hero;
