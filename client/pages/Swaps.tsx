import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  Calendar,
  Star,
} from "lucide-react";

const mockSwaps = [
  {
    id: 1,
    type: "incoming",
    status: "pending",
    user: {
      name: "Sarah Chen",
      avatar: "/api/placeholder/40/40",
    },
    skillOffered: "Photoshop",
    skillWanted: "React",
    message: "Hi! I'd love to learn React in exchange for Photoshop lessons.",
    date: "2 days ago",
  },
  {
    id: 2,
    type: "outgoing",
    status: "accepted",
    user: {
      name: "Marcus Johnson",
      avatar: "/api/placeholder/40/40",
    },
    skillOffered: "Spanish",
    skillWanted: "Guitar",
    message: "Excited to start our language-music exchange!",
    date: "1 week ago",
  },
  {
    id: 3,
    type: "completed",
    status: "completed",
    user: {
      name: "Emma Rodriguez",
      avatar: "/api/placeholder/40/40",
    },
    skillOffered: "Python",
    skillWanted: "Yoga",
    message: "Great experience! Learned so much about data science.",
    date: "2 weeks ago",
    rating: 5,
  },
];

export default function Swaps() {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">My Skill Swaps</h1>
          <p className="text-muted-foreground">
            Manage your skill exchange requests and ongoing swaps
          </p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">
              Pending{" "}
              <Badge className="ml-2 bg-skill-accent text-white">3</Badge>
            </TabsTrigger>
            <TabsTrigger value="active">
              Active{" "}
              <Badge className="ml-2 bg-skill-secondary text-white">2</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {mockSwaps
              .filter((swap) => swap.status === "pending")
              .map((swap) => (
                <Card key={swap.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={swap.user.avatar}
                            alt={swap.user.name}
                          />
                          <AvatarFallback>
                            {swap.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{swap.user.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">
                              {swap.skillOffered}
                            </Badge>
                            <span className="text-muted-foreground">→</span>
                            <Badge className="bg-skill-primary/10 text-skill-primary border-skill-primary/20">
                              {swap.skillWanted}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {swap.message}
                          </p>
                          <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{swap.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-skill-secondary hover:bg-skill-secondary/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {mockSwaps
              .filter((swap) => swap.status === "accepted")
              .map((swap) => (
                <Card key={swap.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={swap.user.avatar}
                            alt={swap.user.name}
                          />
                          <AvatarFallback>
                            {swap.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{swap.user.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">
                              {swap.skillOffered}
                            </Badge>
                            <span className="text-muted-foreground">↔</span>
                            <Badge className="bg-skill-primary/10 text-skill-primary border-skill-primary/20">
                              {swap.skillWanted}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {swap.message}
                          </p>
                          <div className="flex items-center space-x-4 mt-3">
                            <Badge className="bg-green-100 text-green-800">
                              In Progress
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Started {swap.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {mockSwaps
              .filter((swap) => swap.status === "completed")
              .map((swap) => (
                <Card key={swap.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={swap.user.avatar}
                            alt={swap.user.name}
                          />
                          <AvatarFallback>
                            {swap.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{swap.user.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">
                              {swap.skillOffered}
                            </Badge>
                            <span className="text-muted-foreground">↔</span>
                            <Badge className="bg-skill-primary/10 text-skill-primary border-skill-primary/20">
                              {swap.skillWanted}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {swap.message}
                          </p>
                          <div className="flex items-center space-x-4 mt-3">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < (swap.rating || 0)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              Completed {swap.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="cancelled">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Cancelled Swaps
                  </h3>
                  <p className="text-muted-foreground">
                    You haven't cancelled any skill swaps yet.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
