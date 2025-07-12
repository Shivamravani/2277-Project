import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import {
  Edit,
  Plus,
  Star,
  MapPin,
  Calendar,
  X,
  Camera,
  Clock,
  Users,
  Shield,
  Bell,
  Eye,
  Save,
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    bio: "Experienced web developer and designer passionate about sharing knowledge and learning new skills.",
    avatar: "/api/placeholder/96/96",
    rating: 4.9,
    reviewCount: 156,
    joinDate: "Dec 2023",
    isPublic: true,
    emailNotifications: true,
    responseTime: "Usually within 2 hours",
    availability: "Weekends, Evenings",
  });

  const [offeredSkills, setOfferedSkills] = useState<Skill[]>([
    { id: "1", name: "React", category: "Frontend", level: "Expert" },
    { id: "2", name: "JavaScript", category: "Programming", level: "Expert" },
    { id: "3", name: "TypeScript", category: "Programming", level: "Advanced" },
    { id: "4", name: "Node.js", category: "Backend", level: "Advanced" },
    {
      id: "5",
      name: "UI/UX Design",
      category: "Design",
      level: "Intermediate",
    },
    { id: "6", name: "Figma", category: "Design", level: "Advanced" },
  ]);

  const [wantedSkills, setWantedSkills] = useState<Skill[]>([
    { id: "7", name: "Photography", category: "Creative", level: "Beginner" },
    { id: "8", name: "Spanish", category: "Language", level: "Beginner" },
    { id: "9", name: "Piano", category: "Music", level: "Beginner" },
    { id: "10", name: "Cooking", category: "Lifestyle", level: "Intermediate" },
  ]);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [skillType, setSkillType] = useState<"offered" | "wanted">("offered");
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "",
    level: "Beginner" as const,
  });

  const skillCategories = [
    "Programming",
    "Frontend",
    "Backend",
    "Design",
    "Creative",
    "Language",
    "Music",
    "Lifestyle",
    "Business",
    "Sports",
  ];

  const handleAddSkill = () => {
    if (!newSkill.name || !newSkill.category) {
      toast({
        title: "Error",
        description: "Please fill in all skill details.",
        variant: "destructive",
      });
      return;
    }

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      category: newSkill.category,
      level: newSkill.level,
    };

    if (skillType === "offered") {
      setOfferedSkills([...offeredSkills, skill]);
    } else {
      setWantedSkills([...wantedSkills, skill]);
    }

    setNewSkill({ name: "", category: "", level: "Beginner" });
    setIsAddSkillOpen(false);
    toast({
      title: "Success",
      description: `Skill added to your ${skillType} list!`,
    });
  };

  const handleRemoveSkill = (skillId: string, type: "offered" | "wanted") => {
    if (type === "offered") {
      setOfferedSkills(offeredSkills.filter((skill) => skill.id !== skillId));
    } else {
      setWantedSkills(wantedSkills.filter((skill) => skill.id !== skillId));
    }
    toast({
      title: "Skill removed",
      description: "The skill has been removed from your profile.",
    });
  };

  const handleUpdateProfile = (updatedUser: any) => {
    setUser({ ...user, ...updatedUser });
    setIsEditProfileOpen(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated!",
    });
  };

  const handleToggleVisibility = () => {
    setUser({ ...user, isPublic: !user.isPublic });
    toast({
      title: "Privacy updated",
      description: `Your profile is now ${!user.isPublic ? "public" : "private"}.`,
    });
  };

  const handleToggleNotifications = () => {
    setUser({ ...user, emailNotifications: !user.emailNotifications });
    toast({
      title: "Notifications updated",
      description: `Email notifications are now ${!user.emailNotifications ? "enabled" : "disabled"}.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Header */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <div className="flex items-center space-x-4 mt-2 text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>
                          {user.rating} ({user.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {user.joinDate}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-muted-foreground">{user.bio}</p>
                  </div>

                  {/* Edit Profile Dialog */}
                  <Dialog
                    open={isEditProfileOpen}
                    onOpenChange={setIsEditProfileOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-skill-primary hover:bg-skill-primary/90">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Update your profile information and settings.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            defaultValue={user.name}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue={user.email}
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            defaultValue={user.location}
                            placeholder="Enter your location"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            defaultValue={user.bio}
                            placeholder="Tell others about yourself..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditProfileOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() =>
                            handleUpdateProfile({
                              name:
                                (
                                  document.getElementById(
                                    "name",
                                  ) as HTMLInputElement
                                )?.value || user.name,
                              email:
                                (
                                  document.getElementById(
                                    "email",
                                  ) as HTMLInputElement
                                )?.value || user.email,
                              location:
                                (
                                  document.getElementById(
                                    "location",
                                  ) as HTMLInputElement
                                )?.value || user.location,
                              bio:
                                (
                                  document.getElementById(
                                    "bio",
                                  ) as HTMLTextAreaElement
                                )?.value || user.bio,
                            })
                          }
                          className="bg-skill-primary hover:bg-skill-primary/90"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Offered */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Skills I Offer
                  <Dialog
                    open={isAddSkillOpen && skillType === "offered"}
                    onOpenChange={(open) => {
                      setIsAddSkillOpen(open);
                      if (open) setSkillType("offered");
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Skill</DialogTitle>
                        <DialogDescription>
                          Add a skill you can offer to others.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="skill-name">Skill Name</Label>
                          <Input
                            id="skill-name"
                            value={newSkill.name}
                            onChange={(e) =>
                              setNewSkill({ ...newSkill, name: e.target.value })
                            }
                            placeholder="e.g., React, Photography, Guitar"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="skill-category">Category</Label>
                          <Select
                            value={newSkill.category}
                            onValueChange={(value) =>
                              setNewSkill({ ...newSkill, category: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {skillCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="skill-level">Proficiency Level</Label>
                          <Select
                            value={newSkill.level}
                            onValueChange={(value: any) =>
                              setNewSkill({ ...newSkill, level: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsAddSkillOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleAddSkill}
                          className="bg-skill-primary hover:bg-skill-primary/90"
                        >
                          Add Skill
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-3">
                    {offeredSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Badge variant="secondary">{skill.name}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {skill.category}
                          </span>
                          <Badge
                            variant="outline"
                            className={
                              skill.level === "Expert"
                                ? "border-skill-primary text-skill-primary"
                                : skill.level === "Advanced"
                                  ? "border-skill-secondary text-skill-secondary"
                                  : ""
                            }
                          >
                            {skill.level}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSkill(skill.id, "offered")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Skills I Want to Learn
                  <Dialog
                    open={isAddSkillOpen && skillType === "wanted"}
                    onOpenChange={(open) => {
                      setIsAddSkillOpen(open);
                      if (open) setSkillType("wanted");
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Learning Goal</DialogTitle>
                        <DialogDescription>
                          Add a skill you want to learn from others.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="wanted-skill-name">Skill Name</Label>
                          <Input
                            id="wanted-skill-name"
                            value={newSkill.name}
                            onChange={(e) =>
                              setNewSkill({ ...newSkill, name: e.target.value })
                            }
                            placeholder="What do you want to learn?"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="wanted-skill-category">
                            Category
                          </Label>
                          <Select
                            value={newSkill.category}
                            onValueChange={(value) =>
                              setNewSkill({ ...newSkill, category: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {skillCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="wanted-skill-level">
                            Current Level
                          </Label>
                          <Select
                            value={newSkill.level}
                            onValueChange={(value: any) =>
                              setNewSkill({ ...newSkill, level: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsAddSkillOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleAddSkill}
                          className="bg-skill-primary hover:bg-skill-primary/90"
                        >
                          Add Goal
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-3">
                    {wantedSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-skill-primary/10 text-skill-primary border-skill-primary/20">
                            {skill.name}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {skill.category}
                          </span>
                          <Badge variant="outline">{skill.level}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSkill(skill.id, "wanted")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Settings */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong>Preferred Times:</strong> {user.availability}
                  </p>
                  <p className="text-sm">
                    <strong>Response Time:</strong> {user.responseTime}
                  </p>
                  <p className="text-sm">
                    <strong>Location Preference:</strong> Remote or Local
                  </p>

                  <Dialog
                    open={isAvailabilityOpen}
                    onOpenChange={setIsAvailabilityOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Edit Availability
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Availability</DialogTitle>
                        <DialogDescription>
                          Set your preferred times and availability for skill
                          swaps.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Preferred Times</Label>
                          <Select defaultValue="weekends-evenings">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weekdays">Weekdays</SelectItem>
                              <SelectItem value="weekends">Weekends</SelectItem>
                              <SelectItem value="evenings">Evenings</SelectItem>
                              <SelectItem value="weekends-evenings">
                                Weekends & Evenings
                              </SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Response Time</Label>
                          <Select defaultValue="2-hours">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30-minutes">
                                Within 30 minutes
                              </SelectItem>
                              <SelectItem value="2-hours">
                                Within 2 hours
                              </SelectItem>
                              <SelectItem value="1-day">
                                Within 1 day
                              </SelectItem>
                              <SelectItem value="2-days">
                                Within 2 days
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsAvailabilityOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button className="bg-skill-primary hover:bg-skill-primary/90">
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">Profile Visibility</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={user.isPublic}
                        onCheckedChange={handleToggleVisibility}
                      />
                      <Badge
                        className={
                          user.isPublic
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {user.isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span className="text-sm">Email Notifications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={user.emailNotifications}
                        onCheckedChange={handleToggleNotifications}
                      />
                      <Badge>
                        {user.emailNotifications ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>

                  <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Privacy Settings
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Privacy & Security</DialogTitle>
                        <DialogDescription>
                          Control who can see your information and contact you.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-email">Show email address</Label>
                          <Switch id="show-email" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-location">
                            Show exact location
                          </Label>
                          <Switch id="show-location" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="allow-messages">
                            Allow direct messages
                          </Label>
                          <Switch id="allow-messages" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="search-visible">
                            Visible in search results
                          </Label>
                          <Switch id="search-visible" defaultChecked />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsPrivacyOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button className="bg-skill-primary hover:bg-skill-primary/90">
                          Save Settings
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
