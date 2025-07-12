import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Terminal,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Copy,
  Check,
  Code,
  Play,
  Stop,
  Monitor,
  Zap,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    profile: {
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "Web developer passionate about skill sharing",
      location: "San Francisco, CA",
    },
    notifications: {
      email: true,
      push: true,
      swapRequests: true,
      messages: true,
      marketing: false,
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showLocation: true,
      allowMessages: true,
    },
    appearance: {
      theme: "system",
      language: "en",
      timezone: "America/Los_Angeles",
    },
  });

  const [copied, setCopied] = useState<string>("");

  const developmentCommands = [
    {
      name: "Start Development Server",
      command: "npm run dev",
      description: "Starts the development server on port 8080",
      icon: <Play className="h-4 w-4" />,
      category: "dev",
    },
    {
      name: "Build for Production",
      command: "npm run build",
      description: "Creates optimized production build",
      icon: <Database className="h-4 w-4" />,
      category: "build",
    },
    {
      name: "Run Tests",
      command: "npm test",
      description: "Runs the test suite",
      icon: <Check className="h-4 w-4" />,
      category: "test",
    },
    {
      name: "Type Check",
      command: "npm run typecheck",
      description: "Validates TypeScript types",
      icon: <Code className="h-4 w-4" />,
      category: "dev",
    },
    {
      name: "Format Code",
      command: "npm run format.fix",
      description: "Formats code with Prettier",
      icon: <Palette className="h-4 w-4" />,
      category: "dev",
    },
    {
      name: "Start Production Server",
      command: "npm start",
      description: "Starts the production server",
      icon: <Monitor className="h-4 w-4" />,
      category: "prod",
    },
  ];

  const quickActions = [
    {
      name: "Clear Cache",
      action: () => {
        localStorage.clear();
        sessionStorage.clear();
        toast({
          title: "Cache cleared",
          description: "All cached data removed.",
        });
      },
      icon: <RefreshCw className="h-4 w-4" />,
      variant: "outline" as const,
    },
    {
      name: "Export Data",
      action: () => {
        const data = {
          settings,
          timestamp: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "skillswap-settings.json";
        a.click();
        toast({
          title: "Data exported",
          description: "Settings downloaded as JSON.",
        });
      },
      icon: <Download className="h-4 w-4" />,
      variant: "outline" as const,
    },
    {
      name: "Reset Settings",
      action: () => {
        // This would reset to defaults
        toast({
          title: "Settings reset",
          description: "All settings restored to defaults.",
          variant: "destructive",
        });
      },
      icon: <Trash2 className="h-4 w-4" />,
      variant: "destructive" as const,
      requiresConfirm: true,
    },
  ];

  const systemInfo = {
    version: "1.0.0",
    buildDate: "2024-01-15",
    nodeVersion: "18.17.0",
    npmVersion: "9.6.7",
    environment: "development",
    port: "8080",
  };

  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopied(command);
    setTimeout(() => setCopied(""), 2000);
    toast({
      title: "Copied!",
      description: "Command copied to clipboard",
    });
  };

  const handleRunCommand = (command: string) => {
    toast({
      title: "Command Execution",
      description: `To run: ${command}`,
    });
  };

  const handleUpdateSettings = (section: string, updates: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...updates },
    }));
    toast({
      title: "Settings updated",
      description: "Your changes have been saved.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, preferences, and development environment
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger
              value="profile"
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center space-x-2"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="flex items-center space-x-2"
            >
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger
              value="development"
              className="flex items-center space-x-2"
            >
              <Terminal className="h-4 w-4" />
              <span className="hidden sm:inline">Development</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Monitor className="h-4 w-4" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={settings.profile.name}
                      onChange={(e) =>
                        handleUpdateSettings("profile", {
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) =>
                        handleUpdateSettings("profile", {
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={settings.profile.location}
                      onChange={(e) =>
                        handleUpdateSettings("profile", {
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={settings.profile.bio}
                    onChange={(e) =>
                      handleUpdateSettings("profile", { bio: e.target.value })
                    }
                    className="min-h-[100px]"
                  />
                </div>
                <Button className="bg-skill-primary hover:bg-skill-primary/90">
                  Save Profile Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <Label className="capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {key === "email" && "Receive notifications via email"}
                        {key === "push" && "Browser push notifications"}
                        {key === "swapRequests" &&
                          "Notifications for skill swap requests"}
                        {key === "messages" && "New message notifications"}
                        {key === "marketing" &&
                          "Marketing and promotional emails"}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        handleUpdateSettings("notifications", {
                          [key]: checked,
                        })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(settings.privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <Label className="capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {key === "profileVisible" &&
                          "Make your profile visible to other users"}
                        {key === "showEmail" &&
                          "Display your email address on your profile"}
                        {key === "showLocation" &&
                          "Show your location to other users"}
                        {key === "allowMessages" &&
                          "Allow other users to message you directly"}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        handleUpdateSettings("privacy", { [key]: checked })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance & Localization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select
                      value={settings.appearance.theme}
                      onValueChange={(value) =>
                        handleUpdateSettings("appearance", { theme: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={settings.appearance.language}
                      onValueChange={(value) =>
                        handleUpdateSettings("appearance", { language: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select
                      value={settings.appearance.timezone}
                      onValueChange={(value) =>
                        handleUpdateSettings("appearance", { timezone: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">
                          Pacific Time
                        </SelectItem>
                        <SelectItem value="America/Denver">
                          Mountain Time
                        </SelectItem>
                        <SelectItem value="America/Chicago">
                          Central Time
                        </SelectItem>
                        <SelectItem value="America/New_York">
                          Eastern Time
                        </SelectItem>
                        <SelectItem value="Europe/London">London</SelectItem>
                        <SelectItem value="Europe/Paris">Paris</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Development */}
          <TabsContent value="development">
            <div className="space-y-6">
              {/* Commands */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Terminal className="h-5 w-5" />
                    <span>Development Commands</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {developmentCommands.map((cmd) => (
                      <div
                        key={cmd.command}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                      >
                        <div className="flex items-center space-x-3">
                          {cmd.icon}
                          <div>
                            <h3 className="font-medium">{cmd.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {cmd.description}
                            </p>
                            <code className="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">
                              {cmd.command}
                            </code>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyCommand(cmd.command)}
                          >
                            {copied === cmd.command ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleRunCommand(cmd.command)}
                            className="bg-skill-primary hover:bg-skill-primary/90"
                          >
                            <Zap className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {quickActions.map((action) =>
                      action.requiresConfirm ? (
                        <AlertDialog key={action.name}>
                          <AlertDialogTrigger asChild>
                            <Button variant={action.variant}>
                              {action.icon}
                              <span className="ml-2">{action.name}</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently reset all your settings to their
                                default values.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={action.action}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      ) : (
                        <Button
                          key={action.name}
                          variant={action.variant}
                          onClick={action.action}
                        >
                          {action.icon}
                          <span className="ml-2">{action.name}</span>
                        </Button>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Info */}
          <TabsContent value="system">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(systemInfo).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                      >
                        <Label className="capitalize font-medium">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </Label>
                        <Badge variant="outline">{value}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Useful Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Button
                      variant="outline"
                      className="justify-start h-auto p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <HelpCircle className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">Documentation</div>
                          <div className="text-sm text-muted-foreground">
                            View project documentation and guides
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <Code className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">Source Code</div>
                          <div className="text-sm text-muted-foreground">
                            View and contribute to the source code
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <Terminal className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">VS Code Setup</div>
                          <div className="text-sm text-muted-foreground">
                            Learn how to set up the development environment
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
