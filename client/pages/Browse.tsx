import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  MapPin,
  Clock,
  SlidersHorizontal,
  Heart,
  MessageCircle,
  Users,
} from "lucide-react";

// Mock data for skill listings (expanded)
const skillListings = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "/api/placeholder/40/40",
      location: "San Francisco, CA",
      rating: 4.9,
      reviewCount: 127,
      distance: 2.3,
    },
    skillsOffered: ["Photoshop", "UI Design", "Figma"],
    skillsWanted: ["React", "JavaScript", "Node.js"],
    availability: "Weekends",
    description:
      "Experienced graphic designer looking to learn web development.",
    isOnline: true,
    responseTime: "Usually responds within 2 hours",
    category: "Design",
    level: "Expert",
  },
  {
    id: 2,
    user: {
      name: "Marcus Johnson",
      avatar: "/api/placeholder/40/40",
      location: "Austin, TX",
      rating: 4.8,
      reviewCount: 89,
      distance: 15.7,
    },
    skillsOffered: ["Guitar", "Music Theory", "Piano"],
    skillsWanted: ["Spanish", "Photography", "Video Editing"],
    availability: "Evenings",
    description: "Professional musician with 10+ years experience.",
    isOnline: false,
    responseTime: "Usually responds within 1 day",
    category: "Music",
    level: "Expert",
  },
  {
    id: 3,
    user: {
      name: "Emma Rodriguez",
      avatar: "/api/placeholder/40/40",
      location: "Remote",
      rating: 5.0,
      reviewCount: 156,
      distance: 0,
    },
    skillsOffered: ["Python", "Data Science", "Machine Learning"],
    skillsWanted: ["Cooking", "Yoga", "Meditation"],
    availability: "Flexible",
    description: "Data scientist at tech company.",
    isOnline: true,
    responseTime: "Usually responds within 30 minutes",
    category: "Programming",
    level: "Expert",
  },
  {
    id: 4,
    user: {
      name: "David Kim",
      avatar: "/api/placeholder/40/40",
      location: "New York, NY",
      rating: 4.7,
      reviewCount: 203,
      distance: 8.2,
    },
    skillsOffered: ["Excel", "Finance", "Business Analysis"],
    skillsWanted: ["Web Design", "Graphic Design", "Marketing"],
    availability: "Weekdays",
    description: "Finance professional with expertise in Excel.",
    isOnline: true,
    responseTime: "Usually responds within 4 hours",
    category: "Business",
    level: "Advanced",
  },
];

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("rating");
  const [filters, setFilters] = useState({
    distance: [50],
    rating: [0],
    availability: [],
    level: [],
    isOnline: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    "all",
    "Programming",
    "Design",
    "Music",
    "Business",
    "Language",
    "Fitness",
    "Cooking",
  ];

  const filteredListings = skillListings.filter((listing) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        listing.skillsOffered.some((skill) =>
          skill.toLowerCase().includes(query),
        ) ||
        listing.skillsWanted.some((skill) =>
          skill.toLowerCase().includes(query),
        ) ||
        listing.user.name.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Category filter
    if (selectedCategory !== "all" && listing.category !== selectedCategory) {
      return false;
    }

    // Distance filter
    if (listing.user.distance > filters.distance[0]) {
      return false;
    }

    // Rating filter
    if (listing.user.rating < filters.rating[0]) {
      return false;
    }

    // Online filter
    if (filters.isOnline && !listing.isOnline) {
      return false;
    }

    return true;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.user.rating - a.user.rating;
      case "distance":
        return a.user.distance - b.user.distance;
      case "reviews":
        return b.user.reviewCount - a.user.reviewCount;
      case "name":
        return a.user.name.localeCompare(b.user.name);
      default:
        return 0;
    }
  });

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

  const handleContact = (listing: any) => {
    toast({
      title: "Contact initiated",
      description: `Opening conversation with ${listing.user.name}...`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Skills</h1>
          <p className="text-muted-foreground">
            Discover and connect with skilled individuals in your community
          </p>
        </div>

        {/* Search and Controls */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search skills, people, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setViewMode(viewMode === "grid" ? "list" : "grid")
                    }
                  >
                    {viewMode === "grid" ? (
                      <List className="h-4 w-4" />
                    ) : (
                      <Grid className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Category Tabs */}
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <TabsList className="w-full justify-start overflow-x-auto">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="capitalize"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Sort and Results Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Found {sortedListings.length} results
                </p>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="sort-by" className="text-sm">
                    Sort by:
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="reviews">Reviews</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="border-t pt-4 mt-4 space-y-4">
                  <h3 className="font-semibold">Advanced Filters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Distance Filter */}
                    <div className="space-y-2">
                      <Label>Distance (miles)</Label>
                      <Slider
                        value={filters.distance}
                        onValueChange={(value) =>
                          setFilters({ ...filters, distance: value })
                        }
                        max={100}
                        step={5}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Within {filters.distance[0]} miles
                      </p>
                    </div>

                    {/* Rating Filter */}
                    <div className="space-y-2">
                      <Label>Minimum Rating</Label>
                      <Slider
                        value={filters.rating}
                        onValueChange={(value) =>
                          setFilters({ ...filters, rating: value })
                        }
                        max={5}
                        step={0.5}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        {filters.rating[0]}+ stars
                      </p>
                    </div>

                    {/* Online Status */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="online-only"
                          checked={filters.isOnline}
                          onCheckedChange={(checked) =>
                            setFilters({
                              ...filters,
                              isOnline: checked as boolean,
                            })
                          }
                        />
                        <Label htmlFor="online-only">Online users only</Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid gap-6 md:grid-cols-2 lg:grid-cols-2"
              : "space-y-4"
          }
        >
          {sortedListings.map((listing) => (
            <Card
              key={listing.id}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
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
                        {listing.user.distance > 0 && (
                          <span>• {listing.user.distance} mi</span>
                        )}
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
                      onClick={() => handleContact(listing)}
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
                    className="bg-skill-primary hover:bg-skill-primary/90"
                    onClick={() => handleContact(listing)}
                  >
                    Connect
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground border-t pt-3">
                  {listing.responseTime}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedListings.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setFilters({
                    distance: [50],
                    rating: [0],
                    availability: [],
                    level: [],
                    isOnline: false,
                  });
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {sortedListings.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                toast({
                  title: "Loading more results...",
                  description: "Fetching additional skill providers.",
                })
              }
            >
              Load More Results
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
