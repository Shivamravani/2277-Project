import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Menu,
  X,
  Bell,
  Plus,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: "Browse Skills",
      href: "/browse",
      current: location.pathname === "/browse",
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      current: location.pathname === "/leaderboard",
    },
    {
      name: "My Swaps",
      href: "/swaps",
      current: location.pathname === "/swaps",
    },
    {
      name: "Messages",
      href: "/messages",
      current: location.pathname === "/messages",
    },
    {
      name: "My Profile",
      href: "/profile",
      current: location.pathname === "/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center min-w-fit">
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-skill-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SS</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  SkillSwap
                </span>
              </Link>
            </div>

            {/* Center Section with Navigation and Search */}
            <div className="hidden md:flex items-center space-x-8 flex-1 justify-center max-w-4xl mx-8">
              {/* Desktop Navigation */}
              <nav className="flex space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group ${
                      item.current
                        ? "bg-skill-primary text-white shadow-lg"
                        : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-skill-primary/10 hover:to-skill-secondary/10"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-skill-primary to-skill-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Link>
                ))}
              </nav>

              {/* Search Bar - Desktop */}
              <div className="flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search skills..."
                    className="w-full pl-10 pr-4"
                  />
                </div>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Add Skill Button */}
              <Button
                size="sm"
                className="hidden sm:flex bg-skill-primary hover:bg-skill-primary/90 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-skill-primary/25"
              >
                <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90" />
                Add Skill
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative transform hover:scale-110 transition-all duration-300 hover:bg-skill-primary/10"
              >
                <Bell className="h-5 w-5 transition-transform hover:animate-pulse" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-skill-accent text-xs animate-pulse hover:animate-bounce">
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/api/placeholder/32/32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">John Doe</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        john.doe@example.com
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                className="w-full pl-10 pr-4"
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md relative overflow-hidden group ${
                    item.current
                      ? "bg-skill-primary text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-skill-primary/10 hover:to-skill-secondary/10"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-skill-primary to-skill-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
              ))}
              <div className="pt-2">
                <Button className="w-full bg-skill-primary hover:bg-skill-primary/90 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-skill-primary/25">
                  <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90" />
                  Add Skill
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-skill-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SS</span>
                </div>
                <span className="text-xl font-bold">SkillSwap</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Connect with others to exchange skills and knowledge. Learn new
                things while sharing what you know best.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/about" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="hover:text-foreground">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link to="/safety" className="hover:text-foreground">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="hover:text-foreground">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 SkillSwap. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
