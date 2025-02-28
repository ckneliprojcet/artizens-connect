
import { UserRound, Mail, Phone, MapPin, Users, Calendar } from "lucide-react";
import BlurContainer from "@/components/ui/BlurContainer";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Artizens</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BlurContainer intensity="medium" className="md:col-span-2 p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg mb-6">
              Artizens is a decentralized platform that empowers creators to share and monetize their content directly with their audience, 
              without intermediaries. We believe in giving full ownership and control back to creators while providing fans 
              with authentic ways to support their favorite artists.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 mt-8">Our Vision</h2>
            <p className="text-lg mb-6">
              We envision a creative economy where artists are fairly compensated for their work, 
              where fans can directly support creators they love, and where content remains secure, 
              immutable, and censorship-resistant through blockchain technology.
            </p>
            
            <Separator className="my-8" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">For Creators</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="bg-primary/10 p-1 rounded-full mr-2">
                      <UserRound className="h-4 w-4 text-primary" />
                    </span>
                    Full ownership of your content
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 p-1 rounded-full mr-2">
                      <Mail className="h-4 w-4 text-primary" />
                    </span>
                    Direct connection with your audience
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 p-1 rounded-full mr-2">
                      <Phone className="h-4 w-4 text-primary" />
                    </span>
                    Multiple monetization options
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">For Fans</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="bg-primary/10 p-1 rounded-full mr-2">
                      <MapPin className="h-4 w-4 text-primary" />
                    </span>
                    Support creators directly
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 p-1 rounded-full mr-2">
                      <Users className="h-4 w-4 text-primary" />
                    </span>
                    Exclusive content access
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 p-1 rounded-full mr-2">
                      <Calendar className="h-4 w-4 text-primary" />
                    </span>
                    Ownership of digital collectibles
                  </li>
                </ul>
              </div>
            </div>
          </BlurContainer>
          
          <BlurContainer intensity="light" className="p-8">
            <h2 className="text-2xl font-bold mb-4">Platform Features</h2>
            <ul className="space-y-4">
              <li className="bg-primary/5 p-4 rounded-lg">
                <h3 className="font-bold">Content Ownership</h3>
                <p className="text-sm mt-1">All content is stored on blockchain or decentralized storage</p>
              </li>
              <li className="bg-primary/5 p-4 rounded-lg">
                <h3 className="font-bold">Microtransactions</h3>
                <p className="text-sm mt-1">Pay for exclusive content with cryptocurrency</p>
              </li>
              <li className="bg-primary/5 p-4 rounded-lg">
                <h3 className="font-bold">Subscriptions</h3>
                <p className="text-sm mt-1">Subscribe to your favorite creators</p>
              </li>
              <li className="bg-primary/5 p-4 rounded-lg">
                <h3 className="font-bold">NFT Marketplace</h3>
                <p className="text-sm mt-1">Buy, sell, and trade digital collectibles</p>
              </li>
              <li className="bg-primary/5 p-4 rounded-lg">
                <h3 className="font-bold">Direct Donations</h3>
                <p className="text-sm mt-1">Support creators with tips and donations</p>
              </li>
            </ul>
            
            <div className="mt-8 border border-primary/20 rounded-lg p-4">
              <h3 className="font-bold text-center mb-2">Join the Community</h3>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </BlurContainer>
        </div>
      </div>
    </div>
  );
};

export default About;
