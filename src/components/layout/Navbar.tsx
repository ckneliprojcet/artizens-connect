
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Upload, Bell, Wallet } from 'lucide-react';
import BlurContainer from '../ui/BlurContainer';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/about', label: 'About' }
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const connectWallet = async () => {
    // This is a mock implementation - in a real app, this would use a web3 library like ethers.js
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setIsWalletConnected(true);
          // Truncate wallet address for display
          const address = accounts[0];
          setWalletAddress(`${address.substring(0, 6)}...${address.substring(address.length - 4)}`);
          toast.success("Wallet connected successfully!");
        }
      } else {
        toast.error("Ethereum wallet not detected. Please install a wallet like MetaMask.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    toast.info("Wallet disconnected.");
  };
  
  return (
    <header className={cn(
      'fixed left-0 top-0 z-50 w-full transition-all duration-300',
      isScrolled ? 'py-3' : 'py-5'
    )}>
      <BlurContainer 
        intensity={isScrolled ? 'medium' : 'light'} 
        className={cn(
          'mx-auto flex w-full max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8',
          isScrolled ? 'rounded-none rounded-b-2xl' : 'mx-4 mt-4 max-w-[calc(100%-2rem)] rounded-2xl sm:mx-6 sm:max-w-[calc(100%-3rem)] lg:mx-8 lg:max-w-[calc(100%-4rem)]'
        )}
      >
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight">Artizens</span>
            <span className="ml-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">Beta</span>
          </Link>
          
          <nav className="ml-10 hidden space-x-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  isActive(link.href) 
                    ? 'text-primary' 
                    : 'text-foreground/70 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="hidden items-center space-x-4 sm:flex">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search content..."
              className="w-full rounded-full border-none bg-secondary/80 py-2 pl-10 pr-4 text-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          
          <button className="group relative flex items-center justify-center rounded-full bg-secondary/80 p-2 backdrop-blur-md hover:bg-secondary">
            <Upload className="h-5 w-5" />
            <span className="absolute -bottom-12 hidden w-max rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm group-hover:block">
              Upload Content
            </span>
          </button>
          
          <button className="relative flex items-center justify-center rounded-full bg-secondary/80 p-2 backdrop-blur-md hover:bg-secondary">
            <Bell className="h-5 w-5" />
            <span className="absolute right-0 top-0 flex h-2 w-2 rounded-full bg-primary"></span>
          </button>

          {isWalletConnected ? (
            <div 
              className="flex cursor-pointer items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
              onClick={disconnectWallet}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {walletAddress}
            </div>
          ) : (
            <button 
              className="flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              onClick={connectWallet}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </button>
          )}
          
          <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        
        <button 
          className="flex lg:hidden items-center justify-center rounded-md p-2" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </BlurContainer>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          'fixed inset-0 z-40 flex transform flex-col overflow-y-auto bg-background transition-all duration-300 ease-elastic lg:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-20 items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-2xl font-bold tracking-tight">Artizens</span>
            <span className="ml-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">Beta</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mt-4 flex-1 px-4 py-6 sm:px-6">
          <div className="mb-8">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search content..."
                className="w-full rounded-full border-none bg-secondary/80 py-3 pl-10 pr-4 text-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          
          <nav className="grid gap-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center text-base font-medium transition-colors',
                  isActive(link.href) 
                    ? 'text-primary' 
                    : 'text-foreground/70 hover:text-foreground'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-10 space-y-4">
            {isWalletConnected ? (
              <button 
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary/10 px-6 py-3 font-medium text-primary"
                onClick={disconnectWallet}
              >
                <Wallet className="h-5 w-5" />
                {walletAddress}
              </button>
            ) : (
              <button 
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
                onClick={connectWallet}
              >
                <Wallet className="h-5 w-5" />
                Connect Wallet
              </button>
            )}
            
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 font-medium">
              <Upload className="h-5 w-5" />
              Upload Content
            </button>
            
            <div className="mt-8 flex items-center gap-4 border-t border-border pt-8">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-secondary">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">@johndoe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
