import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trophy,
  Medal,
  Award,
  Star,
  TrendingUp,
  Users,
  Target,
  Crown,
  Zap,
  ChevronUp,
  ChevronDown,
  Flame,
} from "lucide-react";

interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string;
  points: number;
  skillsShared: number;
  skillsLearned: number;
  rating: number;
  badge: string;
  level: number;
  rank: number;
  previousRank: number;
  trend: "up" | "down" | "same";
  joinedDate: string;
  category: string;
}

const leaderboardData: LeaderboardUser[] = [
  {
    id: 1,
    name: "Shruti Gajjarr",
    avatar: "/api/placeholder/60/60",
    points: 2847,
    skillsShared: 12,
    skillsLearned: 8,
    rating: 4.9,
    badge: "Skill Master",
    level: 15,
    rank: 1,
    previousRank: 2,
    trend: "up",
    joinedDate: "2023-01-15",
    category: "Design",
  },
  {
    id: 2,
    name: "Alex Rivera",
    avatar: "/api/placeholder/60/60",
    points: 2756,
    skillsShared: 15,
    skillsLearned: 6,
    rating: 4.8,
    badge: "Teaching Pro",
    level: 14,
    rank: 2,
    previousRank: 1,
    trend: "down",
    joinedDate: "2023-02-03",
    category: "Programming",
  },
  {
    id: 3,
    name: "Maya Chen",
    avatar: "/api/placeholder/60/60",
    points: 2634,
    skillsShared: 10,
    skillsLearned: 11,
    rating: 4.9,
    badge: "Learning Enthusiast",
    level: 13,
    rank: 3,
    previousRank: 3,
    trend: "same",
    joinedDate: "2023-01-28",
    category: "Business",
  },
  {
    id: 4,
    name: "Jordan Kim",
    avatar: "/api/placeholder/60/60",
    points: 2501,
    skillsShared: 9,
    skillsLearned: 9,
    rating: 4.7,
    badge: "Balanced Learner",
    level: 12,
    rank: 4,
    previousRank: 5,
    trend: "up",
    joinedDate: "2023-03-10",
    category: "Creative",
  },
  {
    id: 5,
    name: "Taylor Swift",
    avatar: "/api/placeholder/60/60",
    points: 2398,
    skillsShared: 14,
    skillsLearned: 5,
    rating: 4.6,
    badge: "Knowledge Sharer",
    level: 11,
    rank: 5,
    previousRank: 4,
    trend: "down",
    joinedDate: "2023-02-20",
    category: "Music",
  },
  {
    id: 6,
    name: "Sam Wilson",
    avatar: "/api/placeholder/60/60",
    points: 2287,
    skillsShared: 8,
    skillsLearned: 12,
    rating: 4.8,
    badge: "Quick Learner",
    level: 10,
    rank: 6,
    previousRank: 6,
    trend: "same",
    joinedDate: "2023-03-05",
    category: "Technology",
  },
  {
    id: 7,
    name: "Riley Johnson",
    avatar: "/api/placeholder/60/60",
    points: 2156,
    skillsShared: 11,
    skillsLearned: 7,
    rating: 4.5,
    badge: "Community Builder",
    level: 9,
    rank: 7,
    previousRank: 8,
    trend: "up",
    joinedDate: "2023-04-12",
    category: "Lifestyle",
  },
  {
    id: 8,
    name: "Casey Brown",
    avatar: "/api/placeholder/60/60",
    points: 2043,
    skillsShared: 7,
    skillsLearned: 10,
    rating: 4.4,
    badge: "Rising Star",
    level: 8,
    rank: 8,
    previousRank: 7,
    trend: "down",
    joinedDate: "2023-04-25",
    category: "Sports",
  },
];

export default function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [animatedPoints, setAnimatedPoints] = useState<Record<number, number>>(
    {},
  );

  useEffect(() => {
    // Animate points on component mount
    const timer = setTimeout(() => {
      const animated: Record<number, number> = {};
      leaderboardData.forEach((user) => {
        animated[user.id] = user.points;
      });
      setAnimatedPoints(animated);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return (
          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
            {rank}
          </div>
        );
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ChevronUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <ChevronDown className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      "Skill Master": "bg-gradient-to-r from-purple-500 to-pink-500",
      "Teaching Pro": "bg-gradient-to-r from-blue-500 to-cyan-500",
      "Learning Enthusiast": "bg-gradient-to-r from-green-500 to-emerald-500",
      "Balanced Learner": "bg-gradient-to-r from-orange-500 to-red-500",
      "Knowledge Sharer": "bg-gradient-to-r from-indigo-500 to-purple-500",
      "Quick Learner": "bg-gradient-to-r from-teal-500 to-blue-500",
      "Community Builder": "bg-gradient-to-r from-rose-500 to-pink-500",
      "Rising Star": "bg-gradient-to-r from-yellow-500 to-orange-500",
    };
    return colors[badge as keyof typeof colors] || "bg-skill-primary";
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-skill-primary/5 via-background to-skill-secondary/5">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full opacity-30">
            <div className="animate-pulse bg-gradient-to-r from-skill-primary/20 to-transparent rounded-full w-96 h-96 blur-3xl"></div>
          </div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full opacity-30">
            <div className="animate-pulse bg-gradient-to-l from-skill-secondary/20 to-transparent rounded-full w-96 h-96 blur-3xl animation-delay-2000"></div>
          </div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="h-12 w-12 text-yellow-500 mr-4 animate-bounce" />
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-skill-primary to-skill-secondary bg-clip-text text-transparent">
                Leaderboard
              </h1>
              <Flame className="h-12 w-12 text-orange-500 ml-4 animate-pulse" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Top skill sharers and learners in our community
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-48 hover:border-skill-primary transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="quarterly">This Quarter</SelectItem>
                <SelectItem value="yearly">This Year</SelectItem>
                <SelectItem value="alltime">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-48 hover:border-skill-primary transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {leaderboardData.slice(0, 3).map((user, index) => (
              <Card
                key={user.id}
                className={`relative overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  index === 0
                    ? "md:order-2 border-yellow-500 bg-gradient-to-br from-yellow-50 to-amber-50"
                    : index === 1
                      ? "md:order-1 border-gray-400 bg-gradient-to-br from-gray-50 to-slate-50"
                      : "md:order-3 border-amber-600 bg-gradient-to-br from-amber-50 to-orange-50"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="text-center p-8">
                  <div className="relative">
                    <div
                      className={`absolute -top-4 -right-4 ${getRankIcon(user.rank) ? "block" : "hidden"}`}
                    >
                      {getRankIcon(user.rank)}
                    </div>
                    <div className="relative mb-4">
                      <Avatar className="h-20 w-20 mx-auto ring-4 ring-white shadow-lg group-hover:ring-skill-primary transition-all duration-300">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-lg font-bold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2">
                        <Badge
                          className={`${getBadgeColor(user.badge)} text-white px-2 py-1 text-xs animate-pulse`}
                        >
                          Lv.{user.level}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-skill-primary transition-colors">
                      {user.name}
                    </h3>
                    <div className="text-3xl font-bold bg-gradient-to-r from-skill-primary to-skill-secondary bg-clip-text text-transparent mb-2">
                      {animatedPoints[user.id]?.toLocaleString() || 0}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {user.badge}
                    </p>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{user.rating}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-skill-secondary">
                          {user.skillsShared}
                        </div>
                        <div className="text-muted-foreground">Shared</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-skill-primary">
                          {user.skillsLearned}
                        </div>
                        <div className="text-muted-foreground">Learned</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card className="backdrop-blur-sm bg-white/90 hover:bg-white/95 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-6 w-6" />
                <span>Full Rankings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-4 p-4 rounded-lg border hover:border-skill-primary transition-all duration-300 hover:shadow-lg hover:bg-gradient-to-r hover:from-skill-primary/5 hover:to-skill-secondary/5 group cursor-pointer"
                  >
                    {/* Rank */}
                    <div className="flex items-center space-x-2 min-w-fit">
                      {getRankIcon(user.rank)}
                      {getTrendIcon(user.trend)}
                    </div>

                    {/* Avatar */}
                    <Avatar className="h-12 w-12 ring-2 ring-transparent group-hover:ring-skill-primary transition-all duration-300">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold truncate group-hover:text-skill-primary transition-colors">
                          {user.name}
                        </h3>
                        <Badge
                          className={`${getBadgeColor(user.badge)} text-white text-xs`}
                        >
                          {user.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>Level {user.level}</span>
                        <span>•</span>
                        <span>{user.category}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{user.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden sm:flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-skill-secondary">
                          {user.skillsShared}
                        </div>
                        <div className="text-muted-foreground">Shared</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-skill-primary">
                          {user.skillsLearned}
                        </div>
                        <div className="text-muted-foreground">Learned</div>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <div className="text-xl font-bold bg-gradient-to-r from-skill-primary to-skill-secondary bg-clip-text text-transparent">
                        {user.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        points
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-skill-primary hover:text-white"
                    >
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Insights */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-skill-primary mx-auto mb-4 group-hover:animate-spin" />
                <h3 className="text-lg font-semibold mb-2">Weekly Goal</h3>
                <p className="text-muted-foreground mb-4">
                  Share 3 skills to earn bonus points
                </p>
                <Progress value={66} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  2 of 3 completed
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-skill-secondary mx-auto mb-4 group-hover:animate-pulse" />
                <h3 className="text-lg font-semibold mb-2">Streak Bonus</h3>
                <p className="text-muted-foreground mb-4">
                  7-day learning streak active
                </p>
                <div className="text-2xl font-bold text-skill-secondary">
                  +50%
                </div>
                <p className="text-xs text-muted-foreground">bonus points</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-skill-accent mx-auto mb-4 group-hover:animate-bounce" />
                <h3 className="text-lg font-semibold mb-2">Next Badge</h3>
                <p className="text-muted-foreground mb-4">
                  347 points to "Expert Mentor"
                </p>
                <Progress value={73} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  73% complete
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
