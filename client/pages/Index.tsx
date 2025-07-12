import { useState } from "react";
import Layout from "@/components/Layout";
import AuthModal from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Filter,
  Heart,
  MessageCircle,
  Send,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Mock data for skill listings
const skillListings = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "/api/placeholder/40/40",
      location: "San Francisco, CA",
      rating: 4.9,
      reviewCount: 127,
    },
    skillsOffered: ["Photoshop", "UI Design", "Figma"],
    skillsWanted: ["React", "JavaScript", "Node.js"],
    availability: "Weekends",
    description:
      "Experienced graphic designer looking to learn web development. I can teach you advanced Photoshop techniques and UI design principles.",
    isOnline: true,
    responseTime: "Usually responds within 2 hours",
  },
  {
    id: 2,
    user: {
      name: "Marcus Johnson",
      avatar: "/api/placeholder/40/40",
      location: "Austin, TX",
      rating: 4.8,
      reviewCount: 89,
    },
    skillsOffered: ["Guitar", "Music Theory", "Piano"],
    skillsWanted: ["Spanish", "Photography", "Video Editing"],
    availability: "Evenings",
    description:
      "Professional musician with 10+ years experience. Willing to teach music fundamentals in exchange for language and creative skills.",
    isOnline: false,
    responseTime: "Usually responds within 1 day",
  },
  {
    id: 3,
    user: {
      name: "Emma Rodriguez",
      avatar: "/api/placeholder/40/40",
      location: "Remote",
      rating: 5.0,
      reviewCount: 156,
    },
    skillsOffered: ["Python", "Data Science", "Machine Learning"],
    skillsWanted: ["Cooking", "Yoga", "Meditation"],
    availability: "Flexible",
    description:
      "Data scientist at tech company. Happy to share programming knowledge for wellness and lifestyle skills.",
    isOnline: true,
    responseTime: "Usually responds within 30 minutes",
  },
  {
    id: 4,
    user: {
      name: "David Kim",
      avatar: "/api/placeholder/40/40",
      location: "New York, NY",
      rating: 4.7,
      reviewCount: 203,
    },
    skillsOffered: ["Excel", "Finance", "Business Analysis"],
    skillsWanted: ["Web Design", "Graphic Design", "Marketing"],
    availability: "Weekdays",
    description:
      "Finance professional with expertise in Excel and business analytics. Looking to learn creative skills.",
    isOnline: true,
    responseTime: "Usually responds within 4 hours",
  },
];

const featuredSkills = [
  "Web Development",
  "Graphic Design",
  "Photography",
  "Languages",
  "Music",
  "Business",
  "Fitness",
  "Cooking",
];

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isSwapDialogOpen, setIsSwapDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [swapMessage, setSwapMessage] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const filteredListings = skillListings.filter((listing) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        listing.skillsOffered.some((skill) =>
          skill.toLowerCase().includes(query),
        ) ||
        listing.skillsWanted.some((skill) =>
          skill.toLowerCase().includes(query),
        ) ||
        listing.user.name.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  const handleBrowseSkills = () => {
    navigate("/browse");
  };

  const handleSkillCategoryClick = (skill: string) => {
    setSearchQuery(skill.toLowerCase());
    toast({
      title: "Category selected",
      description: `Showing results for ${skill}`,
    });
  };

  const handleToggleFavorite = (listingId: number) => {
    setFavorites((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId],
    );

    const action = favorites.includes(listingId) ? "removed from" : "added to";
    toast({
      title: `Favorite ${action}`,
      description: `This user has been ${action} your favorites.`,
    });
  };

  const handleRequestSwap = (listing: any) => {
    setSelectedListing(listing);
    setIsSwapDialogOpen(true);
  };

  const handleSendSwapRequest = () => {
    if (!swapMessage.trim()) {
      toast({
        title: "Message required",
        description: "Please write a message to send with your swap request.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Swap request sent!",
      description: `Your request has been sent to ${selectedListing.user.name}.`,
    });

    setIsSwapDialogOpen(false);
    setSwapMessage("");
    setSelectedListing(null);
  };

  const handleStartMessaging = (listing: any) => {
    toast({
      title: "Message sent",
      description: `Opening conversation with ${listing.user.name}...`,
    });
    navigate("/messages");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-skill-primary/10 via-background to-skill-secondary/10 py-20 lg:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full opacity-30">
            <div className="animate-pulse bg-gradient-to-r from-skill-primary/20 to-transparent rounded-full w-96 h-96 blur-3xl animate-float"></div>
          </div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full opacity-30">
            <div
              className="animate-pulse bg-gradient-to-l from-skill-secondary/20 to-transparent rounded-full w-96 h-96 blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 opacity-20">
            <div className="bg-gradient-to-r from-skill-accent/30 to-transparent rounded-full w-full h-full blur-2xl animate-bounce-subtle"></div>
          </div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Swap Skills,{" "}
                <span className="text-skill-primary">Share Knowledge</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Connect with people in your community to exchange skills and
                learn new things. Teach what you know, learn what you want.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="bg-skill-primary hover:bg-skill-primary/90 text-white px-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-skill-primary/25 group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleBrowseSkills}
                  className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:bg-gradient-to-r hover:from-skill-primary/10 hover:to-skill-secondary/10 hover:border-skill-primary"
                >
                  Browse Skills
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-card border rounded-2xl p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>SG</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Shruti Gajjarr</h3>
                      <p className="text-sm text-muted-foreground">
                        UI Designer → Web Developer
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Offering:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Photoshop</Badge>
                        <Badge variant="secondary">UI Design</Badge>
                        <Badge variant="secondary">Figma</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Looking for:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-skill-primary/10 text-skill-primary border-skill-primary/20">
                          React
                        </Badge>
                        <Badge className="bg-skill-primary/10 text-skill-primary border-skill-primary/20">
                          JavaScript
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-skill-secondary text-white rounded-full p-3">
                <Users className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-skill-accent text-white rounded-full p-3">
                <Star className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills Section */}
      <section className="relative py-16 bg-muted/30 overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-animated opacity-50"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Popular Skill Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the most in-demand skills on our platform
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featuredSkills.map((skill, index) => (
              <Button
                key={skill}
                variant="outline"
                onClick={() => handleSkillCategoryClick(skill)}
                className="h-16 text-center hover:bg-skill-primary hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-skill-primary/25 relative overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{skill}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-skill-primary to-skill-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Browse Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Find Your Perfect Match</h2>
            <p className="text-muted-foreground mb-8">
              Browse skilled individuals in your area or search for specific
              expertise
            </p>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search skills or people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                <TabsTrigger value="all">All Skills</TabsTrigger>
                <TabsTrigger value="tech">Technology</TabsTrigger>
                <TabsTrigger value="creative">Creative</TabsTrigger>
                <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Skill Listings Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 stagger-children">
            {filteredListings.map((listing) => (
              <Card
                key={listing.id}
                className="hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:scale-[1.02] hover:-translate-y-2 relative overflow-hidden border-2 hover:border-skill-primary/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-skill-primary/5 via-transparent to-skill-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 ring-2 ring-transparent group-hover:ring-skill-primary transition-all duration-300 transform group-hover:scale-110">
                          <AvatarImage
                            src={listing.user.avatar}
                            alt={listing.user.name}
                          />
                          <AvatarFallback>
                            {listing.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {listing.isOnline && (
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {listing.user.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{listing.user.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {listing.user.rating}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({listing.user.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFavorite(listing.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(listing.id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStartMessaging(listing)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {listing.description}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Skills Offered:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {listing.skillsOffered.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Looking to Learn:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {listing.skillsWanted.map((skill) => (
                          <Badge
                            key={skill}
                            className="bg-skill-primary/10 text-skill-primary border-skill-primary/20"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{listing.availability}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleRequestSwap(listing)}
                      className="bg-skill-primary hover:bg-skill-primary/90"
                    >
                      Request Swap
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground border-t pt-3">
                    {listing.responseTime}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Results
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-skill-primary to-skill-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Swapping Skills?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of learners and teachers. Create your profile and
            start exchanging knowledge today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-white text-skill-primary hover:bg-white/90 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-white/25"
            >
              Create Your Profile
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/browse")}
              className="border-white text-white hover:bg-white hover:text-skill-primary transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-white/25"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Swap Request Dialog */}
      <Dialog open={isSwapDialogOpen} onOpenChange={setIsSwapDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Skill Swap</DialogTitle>
            <DialogDescription>
              Send a swap request to {selectedListing?.user.name}
            </DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={selectedListing.user.avatar}
                    alt={selectedListing.user.name}
                  />
                  <AvatarFallback>
                    {selectedListing.user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedListing.user.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">
                      Offers: {selectedListing.skillsOffered.join(", ")}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-skill-primary/10 text-skill-primary border-skill-primary/20">
                      Wants: {selectedListing.skillsWanted.join(", ")}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="swap-message">Your Message</Label>
                <Textarea
                  id="swap-message"
                  placeholder="Hi! I'd love to exchange skills with you. I can offer..."
                  value={swapMessage}
                  onChange={(e) => setSwapMessage(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSwapDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendSwapRequest}
              className="bg-skill-primary hover:bg-skill-primary/90"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </Layout>
  );
}
