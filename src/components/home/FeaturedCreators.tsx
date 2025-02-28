
import React from 'react';
import { Link } from 'react-router-dom';
import BlurContainer from '../ui/BlurContainer';

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  specialty: string;
  followers: number;
}

const FeaturedCreators = () => {
  const creators: Creator[] = [
    {
      id: '1',
      name: 'Emma Watson',
      username: '@emmacreates',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      specialty: 'Digital Art',
      followers: 15800,
    },
    {
      id: '2',
      name: 'Michael Chen',
      username: '@mikevisuals',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      specialty: 'Photography',
      followers: 12400,
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      username: '@sarahmusic',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      specialty: 'Music',
      followers: 9300,
    },
    {
      id: '4',
      name: 'David Kim',
      username: '@davidwrites',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      specialty: 'Writing',
      followers: 7800,
    },
  ];
  
  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
  
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Creators</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Discover talented creators from around the world who are pushing the boundaries of digital content.
          </p>
        </div>
        
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {creators.map((creator) => (
            <Link key={creator.id} to={`/creator/${creator.id}`}>
              <BlurContainer 
                className="group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                hover
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-primary to-purple-500 opacity-75 blur group-hover:opacity-100" />
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="relative h-20 w-20 rounded-full border-2 border-white/20 object-cover"
                    />
                  </div>
                  
                  <h3 className="mb-1 text-lg font-semibold">{creator.name}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">{creator.username}</p>
                  
                  <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {creator.specialty}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{formatFollowers(creator.followers)}</span> followers
                  </p>
                </div>
              </BlurContainer>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/explore?tab=creators"
            className="inline-block rounded-full bg-secondary px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary/80"
          >
            View All Creators
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCreators;
