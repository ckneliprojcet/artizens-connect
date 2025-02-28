
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Upload, Bell, Wallet, User } from 'lucide-react';
import BlurContainer from '../ui/BlurContainer';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('0.00 ETH');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    description: '',
    contentType: 'image',
    file: null,
    preview: null,
    price: '',
    isFree: true,
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mock notifications
  const notifications = [
    { id: 1, type: 'like', user: 'Marcus Chen', content: 'liked your artwork "Digital Dream"', time: '2 hours ago' },
    { id: 2, type: 'purchase', user: 'Emma Thompson', content: 'purchased your NFT "Cosmic Waves"', time: '1 day ago' },
    { id: 3, type: 'comment', user: 'Jessica Patel', content: 'commented on your post: "Amazing work!"', time: '2 days ago' },
    { id: 4, type: 'follow', user: 'David Wilson', content: 'started following you', time: '3 days ago' },
  ];
  
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
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setIsWalletConnected(true);
          // Truncate wallet address for display
          const address = accounts[0];
          setWalletAddress(`${address.substring(0, 6)}...${address.substring(address.length - 4)}`);
          
          // Get wallet balance
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest']
          });
          
          // Convert balance from wei to ETH
          const ethBalance = parseInt(balance, 16) / 1e18;
          setWalletBalance(`${ethBalance.toFixed(2)} ETH`);
          
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
    setWalletBalance('0.00 ETH');
    toast.info("Wallet disconnected.");
  };
  
  const handleUploadChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadFormData(prev => ({
          ...prev,
          file: files[0],
          preview: reader.result
        }));
      };
      reader.readAsDataURL(files[0]);
    } else if (type === 'checkbox') {
      setUploadFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setUploadFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    // Simulate upload
    toast.success("Content uploaded successfully!");
    setIsUploadDialogOpen(false);
    setUploadFormData({
      title: '',
      description: '',
      contentType: 'image',
      file: null,
      preview: null,
      price: '',
      isFree: true
    });
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
          
          {/* Upload Button */}
          <button 
            onClick={() => setIsUploadDialogOpen(true)}
            className="group relative flex items-center justify-center rounded-full bg-secondary/80 p-2 backdrop-blur-md hover:bg-secondary"
          >
            <Upload className="h-5 w-5" />
            <span className="absolute -bottom-12 hidden w-max rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm group-hover:block">
              Upload Content
            </span>
          </button>
          
          {/* Notifications Button */}
          <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <DropdownMenuTrigger asChild>
              <button className="relative flex items-center justify-center rounded-full bg-secondary/80 p-2 backdrop-blur-md hover:bg-secondary">
                <Bell className="h-5 w-5" />
                <span className="absolute right-0 top-0 flex h-2 w-2 rounded-full bg-primary"></span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map(notification => (
                <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {notification.type === 'like' && <span className="text-rose-500">❤️</span>}
                      {notification.type === 'purchase' && <span className="text-emerald-500">💰</span>}
                      {notification.type === 'comment' && <span className="text-blue-500">💬</span>}
                      {notification.type === 'follow' && <span className="text-violet-500">👤</span>}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm"><span className="font-medium">{notification.user}</span> {notification.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wallet Button */}
          {isWalletConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Wallet className="mr-2 h-4 w-4" />
                  {walletAddress}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Wallet</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-between">
                  <span>Balance:</span>
                  <span className="font-medium">{walletBalance}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={disconnectWallet} className="text-red-500">Disconnect</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button 
              className="flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              onClick={connectWallet}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </button>
          )}
          
          {/* User Profile */}
          <Link to="/profile" className="h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </Link>
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
            <Link
              to="/profile"
              className="flex items-center text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
          </nav>
          
          <div className="mt-10 space-y-4">
            {isWalletConnected ? (
              <div className="flex flex-col">
                <div className="flex w-full items-center justify-between gap-2 rounded-full bg-primary/10 px-6 py-3 font-medium text-primary">
                  <div className="flex items-center">
                    <Wallet className="h-5 w-5 mr-2" />
                    {walletAddress}
                  </div>
                  <span className="text-sm">{walletBalance}</span>
                </div>
                <button 
                  className="mt-2 text-red-500 text-sm"
                  onClick={disconnectWallet}
                >
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <button 
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
                onClick={connectWallet}
              >
                <Wallet className="h-5 w-5" />
                Connect Wallet
              </button>
            )}
            
            <button 
              className="flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 font-medium"
              onClick={() => {
                setIsUploadDialogOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
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

      {/* Upload Content Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Content</DialogTitle>
            <DialogDescription>
              Share your creations with the world. You can upload images, videos, audio files, or articles.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={uploadFormData.title}
                onChange={handleUploadChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="Give your content a title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={uploadFormData.description}
                onChange={handleUploadChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="Describe your content"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Content Type</label>
              <div className="flex flex-wrap gap-2">
                {['image', 'video', 'audio', 'article'].map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="contentType"
                      value={type}
                      checked={uploadFormData.contentType === type}
                      onChange={handleUploadChange}
                      className="mr-1"
                    />
                    <span className="capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="file" className="text-sm font-medium">Upload File</label>
              <div 
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => document.getElementById('file').click()}
              >
                {uploadFormData.preview ? (
                  uploadFormData.contentType === 'image' ? (
                    <img 
                      src={uploadFormData.preview} 
                      alt="Preview" 
                      className="max-h-40 mx-auto rounded object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-20 bg-primary/10 rounded">
                      <span className="text-primary font-medium capitalize">{uploadFormData.contentType} File Selected</span>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop a file here, or click to select a file
                    </p>
                  </div>
                )}
                <input 
                  id="file" 
                  name="file" 
                  type="file" 
                  onChange={handleUploadChange}
                  className="hidden" 
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="isFree" className="text-sm font-medium flex items-center">
                  <input
                    id="isFree"
                    name="isFree"
                    type="checkbox"
                    checked={uploadFormData.isFree}
                    onChange={handleUploadChange}
                    className="mr-2"
                  />
                  Free content
                </label>
                
                {!uploadFormData.isFree && (
                  <div className="flex items-center gap-2">
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.001"
                      value={uploadFormData.price}
                      onChange={handleUploadChange}
                      className="w-24 rounded-md border border-input bg-background px-3 py-1"
                      placeholder="0.00"
                      required={!uploadFormData.isFree}
                    />
                    <span>ETH</span>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <button
                type="button"
                onClick={() => setIsUploadDialogOpen(false)}
                className="px-4 py-2 rounded-md border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Upload
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
