import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Mail,
  Phone,
  Eye,
  EyeOff,
  Chrome,
  User,
  Lock,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signup");
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [loginData, setLoginData] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (signupMethod === "email" && !formData.email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (signupMethod === "phone" && !formData.phone) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!formData.name || !formData.password) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are identical.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms and conditions",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate signup process
    setTimeout(() => {
      toast({
        title: "Welcome to SkillSwap! 🎉",
        description: "Your account has been created successfully.",
      });
      setIsLoading(false);
      onClose();
      navigate("/profile");
    }, 2000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!loginData.emailOrPhone || !loginData.password) {
      toast({
        title: "Required fields missing",
        description: "Please enter your email/phone and password.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate login process
    setTimeout(() => {
      toast({
        title: "Welcome back! 👋",
        description: "You've been logged in successfully.",
      });
      setIsLoading(false);
      onClose();
      navigate("/profile");
    }, 1500);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      toast({
        title: "Google Sign-in successful! 🎉",
        description: "Welcome to SkillSwap!",
      });
      setIsLoading(false);
      onClose();
      navigate("/profile");
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    });
    setLoginData({
      emailOrPhone: "",
      password: "",
      rememberMe: false,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-gradient-to-br from-background to-muted/30">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full opacity-30">
            <div className="animate-pulse bg-gradient-to-l from-skill-primary/20 to-transparent rounded-full w-96 h-96 blur-3xl"></div>
          </div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full opacity-30">
            <div className="animate-pulse bg-gradient-to-r from-skill-secondary/20 to-transparent rounded-full w-96 h-96 blur-3xl"></div>
          </div>
        </div>

        <div className="relative">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-xl bg-skill-primary flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">SS</span>
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-skill-primary to-skill-secondary bg-clip-text text-transparent">
                  Join SkillSwap
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Connect, learn, and share skills with our community
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-skill-primary data-[state=active]:text-white"
                  onClick={resetForm}
                >
                  Sign Up
                </TabsTrigger>
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-skill-primary data-[state=active]:text-white"
                  onClick={resetForm}
                >
                  Login
                </TabsTrigger>
              </TabsList>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-6">
                {/* Google Sign Up */}
                <Button
                  onClick={handleGoogleSignup}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full h-12 text-sm font-medium border-2 hover:border-skill-primary transition-all duration-300 hover:shadow-lg group"
                >
                  <Chrome className="h-5 w-5 mr-3 text-blue-500 group-hover:animate-pulse" />
                  {isLoading ? (
                    <div className="loading-dots">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    "Sign up with Google"
                  )}
                </Button>

                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-background px-4 text-xs text-muted-foreground">
                      or continue with
                    </span>
                  </div>
                </div>

                {/* Method Selection */}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={signupMethod === "email" ? "default" : "outline"}
                    onClick={() => setSignupMethod("email")}
                    className={`flex-1 h-10 ${
                      signupMethod === "email"
                        ? "bg-skill-primary hover:bg-skill-primary/90"
                        : ""
                    }`}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={signupMethod === "phone" ? "default" : "outline"}
                    onClick={() => setSignupMethod("phone")}
                    className={`flex-1 h-10 ${
                      signupMethod === "phone"
                        ? "bg-skill-primary hover:bg-skill-primary/90"
                        : ""
                    }`}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </Button>
                </div>

                {/* Sign Up Form */}
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="pl-10 h-11 border-2 focus:border-skill-primary"
                        required
                      />
                    </div>
                  </div>

                  {signupMethod === "email" ? (
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="pl-10 h-11 border-2 focus:border-skill-primary"
                          required
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="pl-10 h-11 border-2 focus:border-skill-primary"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="pl-10 pr-10 h-11 border-2 focus:border-skill-primary"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium"
                    >
                      Confirm Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="pl-10 h-11 border-2 focus:border-skill-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          agreeToTerms: checked as boolean,
                        })
                      }
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground"
                    >
                      I agree to the{" "}
                      <span className="text-skill-primary hover:underline cursor-pointer">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="text-skill-primary hover:underline cursor-pointer">
                        Privacy Policy
                      </span>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-skill-primary hover:bg-skill-primary/90 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-skill-primary/25 group"
                  >
                    {isLoading ? (
                      <div className="loading-dots">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                        Create Account
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    className="text-skill-primary hover:underline font-medium"
                  >
                    Login here
                  </button>
                </p>
              </TabsContent>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-6">
                {/* Google Login */}
                <Button
                  onClick={handleGoogleSignup}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full h-12 text-sm font-medium border-2 hover:border-skill-primary transition-all duration-300 hover:shadow-lg group"
                >
                  <Chrome className="h-5 w-5 mr-3 text-blue-500 group-hover:animate-pulse" />
                  {isLoading ? (
                    <div className="loading-dots">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    "Continue with Google"
                  )}
                </Button>

                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-background px-4 text-xs text-muted-foreground">
                      or login with email/phone
                    </span>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="emailOrPhone"
                      className="text-sm font-medium"
                    >
                      Email or Phone Number *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="emailOrPhone"
                        type="text"
                        placeholder="Enter your email or phone"
                        value={loginData.emailOrPhone}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            emailOrPhone: e.target.value,
                          })
                        }
                        className="pl-10 h-11 border-2 focus:border-skill-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="loginPassword"
                      className="text-sm font-medium"
                    >
                      Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="loginPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className="pl-10 pr-10 h-11 border-2 focus:border-skill-primary"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={loginData.rememberMe}
                        onCheckedChange={(checked) =>
                          setLoginData({
                            ...loginData,
                            rememberMe: checked as boolean,
                          })
                        }
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm text-muted-foreground"
                      >
                        Remember me
                      </Label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-skill-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-skill-primary hover:bg-skill-primary/90 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-skill-primary/25 group"
                  >
                    {isLoading ? (
                      <div className="loading-dots">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                        Login to Account
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setActiveTab("signup")}
                    className="text-skill-primary hover:underline font-medium"
                  >
                    Sign up here
                  </button>
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
