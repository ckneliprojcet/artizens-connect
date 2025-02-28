
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedCreators from '@/components/home/FeaturedCreators';
import FeaturedContent from '@/components/home/FeaturedContent';
import BlurContainer from '@/components/ui/BlurContainer';
import { DollarSign, Gift, Award } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Initialize reveal animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const features = [
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: 'Microtransactions',
      description: 'Support creators directly with small payments for the content you love. No middlemen, no platform fees, just direct support.',
    },
    {
      icon: <Gift className="h-10 w-10" />,
      title: 'Subscriptions & Donations',
      description: 'Subscribe to your favorite creators for exclusive content or send tips as a thank you for their work.',
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: 'NFT Marketplace',
      description: 'Creators can mint their content as NFTs and sell them directly to fans, creating unique collectibles with provable ownership.',
    },
  ];
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="reveal mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Built on Kaia Blockchain
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Empowering Creators Through Decentralization
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              All content is stored on the Kaia blockchain or IPFS, ensuring creators maintain full ownership
              and control over their work while benefiting from immutability and security.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <BlurContainer
                key={index}
                className="reveal h-full p-8 text-center"
                intensity="light"
                hover
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </BlurContainer>
            ))}
          </div>
        </div>
        
        <div className="reveal bg-gradient-to-b from-background to-secondary/30 py-20">
          <FeaturedCreators />
        </div>
        
        <div className="reveal py-20">
          <FeaturedContent />
        </div>
        
        <div className="reveal bg-gradient-to-b from-secondary/30 to-background py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-2xl bg-primary p-10 text-center sm:p-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Join the Next Generation of Content Creators?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                Start creating, sharing, and monetizing your content today on the most creator-friendly platform.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#"
                  className="w-full rounded-full bg-white px-8 py-3 font-medium text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl sm:w-auto"
                >
                  Get Started
                </a>
                <a
                  href="/explore"
                  className="w-full rounded-full bg-primary-foreground/10 px-8 py-3 font-medium text-white transition-all hover:bg-primary-foreground/20 sm:w-auto"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
