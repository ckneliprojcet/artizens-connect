import React, { useState } from "react";
import { UserRound, Mail, Phone, MapPin, Users, Pencil, Camera, Wallet } from "lucide-react";
import BlurContainer from "@/components/ui/BlurContainer";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    username: "alexcreates",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Digital artist and content creator exploring the intersection of art and technology. Creating unique NFTs and digital experiences.",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    followers: 1286,
    following: 342,
    walletBalance: "124.56 ETH"
  });
  
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({ ...formData });
    setEditing(false);
    toast.success("Profile updated successfully!");
  };
  
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setFormData(prev => ({ ...prev, profilePicture: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const mockFollowers = [
    { id: 1, name: "Sarah Kim", username: "sarahcreates", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=120&h=120&q=80" },
    { id: 2, name: "Marcus Chen", username: "marcusart", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=120&h=120&q=80" },
    { id: 3, name: "Jessica Patel", username: "jessicadraws", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=120&h=120&q=80" },
    { id: 4, name: "David Wilson", username: "davidw", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=120&h=120&q=80" },
  ];
  
  const mockFollowing = [
    { id: 5, name: "Emma Thompson", username: "emmacreates", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=120&h=120&q=80" },
    { id: 6, name: "Michael Brown", username: "michaelb", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=120&h=120&q=80" },
    { id: 7, name: "Olivia Davis", username: "oliviad", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=120&h=120&q=80" },
  ];
  
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <BlurContainer intensity="medium" className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src={editing ? formData.profilePicture : userData.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {editing && (
                  <label 
                    htmlFor="profile-picture" 
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="w-8 h-8 text-white" />
                    <input 
                      type="file" 
                      id="profile-picture" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                  </label>
                )}
              </div>
              
              <div className="mt-6 flex flex-col items-center">
                <div className="flex gap-5">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{userData.followers}</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{userData.following}</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                  </div>
                </div>
                
                <div className="mt-4 bg-primary/10 rounded-full px-4 py-2 flex items-center">
                  <Wallet className="mr-2 h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">{userData.walletBalance}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              {editing ? (
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit Profile</h1>
                    <div className="space-x-2">
                      <button 
                        type="button"
                        onClick={() => {
                          setEditing(false);
                          setFormData({...userData});
                        }}
                        className="px-4 py-2 rounded-md border"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h1 className="text-2xl font-bold">{userData.name}</h1>
                      <p className="text-muted-foreground">@{userData.username}</p>
                    </div>
                    <button 
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-1 px-4 py-2 rounded-md border hover:bg-secondary transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                  
                  <p className="mb-6">{userData.bio}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 md:col-span-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{userData.location}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </BlurContainer>
        
        <Tabs defaultValue="followers" className="mt-8">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="followers" className="mt-6">
            <BlurContainer intensity="light" className="p-6">
              <div className="space-y-4">
                {mockFollowers.map(follower => (
                  <div key={follower.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={follower.avatar} 
                          alt={follower.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{follower.name}</p>
                        <p className="text-sm text-muted-foreground">@{follower.username}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors">
                      Follow Back
                    </button>
                  </div>
                ))}
              </div>
            </BlurContainer>
          </TabsContent>
          <TabsContent value="following" className="mt-6">
            <BlurContainer intensity="light" className="p-6">
              <div className="space-y-4">
                {mockFollowing.map(following => (
                  <div key={following.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={following.avatar} 
                          alt={following.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{following.name}</p>
                        <p className="text-sm text-muted-foreground">@{following.username}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                      Unfollow
                    </button>
                  </div>
                ))}
              </div>
            </BlurContainer>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
