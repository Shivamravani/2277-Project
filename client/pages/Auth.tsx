"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Chrome,
  Github,
  CheckCircle,
  XCircle,
  Loader2,
  Sparkles,
  ArrowRight,
} from "lucide-react"

interface FormData {
  name: string
  email: string
  password: string
  rememberMe: boolean
}

interface ValidationState {
  name: {
    isValid: boolean
    message: string
  }
  email: {
    isValid: boolean
    message: string
  }
  password: {
    isValid: boolean
    message: string
  }
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  })

  const [validation, setValidation] = useState<ValidationState>({
    name: { isValid: false, message: "" },
    email: { isValid: false, message: "" },
    password: { isValid: false, message: "" },
  })

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  })

  // Real-time validation
  useEffect(() => {
    // Name validation
    if (!isLogin) {
      const nameValid = formData.name.trim().length >= 2
      setValidation((prev) => ({
        ...prev,
        name: {
          isValid: nameValid,
          message: nameValid ? "Looks good!" : "Name must be at least 2 characters",
        },
      }))
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const emailValid = emailRegex.test(formData.email)
    setValidation((prev) => ({
      ...prev,
      email: {
        isValid: emailValid,
        message: emailValid ? "Valid email address" : "Please enter a valid email address",
      },
    }))

    // Password validation
    const passwordValid = formData.password.length >= 8
    const hasUpperCase = /[A-Z]/.test(formData.password)
    const hasLowerCase = /[a-z]/.test(formData.password)
    const hasNumbers = /\d/.test(formData.password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)

    let passwordMessage = ""
    if (formData.password.length === 0) {
      passwordMessage = "Password is required"
    } else if (formData.password.length < 8) {
      passwordMessage = "Password must be at least 8 characters"
    } else if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      passwordMessage = "Password must contain uppercase, lowercase, and numbers"
    } else {
      passwordMessage = hasSpecialChar ? "Strong password!" : "Good password"
    }

    setValidation((prev) => ({
      ...prev,
      password: {
        isValid: passwordValid && hasUpperCase && hasLowerCase && hasNumbers,
        message: passwordMessage,
      },
    }))
  }, [formData, isLogin])

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInputBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({ name: true, email: true, password: true })

    // Validate form
    const isFormValid = validation.email.isValid && validation.password.isValid && (isLogin || validation.name.isValid)

    if (!isFormValid) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: isLogin ? "Welcome back! 👋" : "Welcome to ShrutiAi! 🎉",
        description: isLogin ? "You've been logged in successfully." : "Your account has been created successfully.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        rememberMe: false,
      })
      setTouched({ name: false, email: false, password: false })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: `${provider} Sign-in successful! 🎉`,
        description: "Welcome to ShrutiAi!",
      })
      setIsLoading(false)
    }, 1500)
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      name: "",
      email: "",
      password: "",
      rememberMe: false,
    })
    setTouched({ name: false, email: false, password: false })
  }

  const getValidationIcon = (field: keyof ValidationState) => {
    if (!touched[field] || !formData[field]) return null
    return validation[field].isValid ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    )
  }

  const getValidationColor = (field: keyof ValidationState) => {
    if (!touched[field] || !formData[field]) return ""
    return validation[field].isValid ? "border-green-500" : "border-red-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4 font-['Inter',sans-serif]">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full opacity-20">
          <div className="animate-pulse bg-gradient-to-l from-skill-primary/30 to-transparent rounded-full w-96 h-96 blur-3xl"></div>
        </div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full opacity-20">
          <div className="animate-pulse bg-gradient-to-r from-skill-secondary/30 to-transparent rounded-full w-96 h-96 blur-3xl"></div>
        </div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-6 pb-8">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-skill-primary to-skill-secondary flex items-center justify-center shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-skill-primary to-skill-secondary bg-clip-text text-transparent">
              {isLogin ? "Welcome Back" : "Join ShrutiAi"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Sign in to your account to continue" : "Create your account to get started"}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <button
              type="button"
              onClick={() => !isLogin && toggleMode()}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                isLogin ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => isLogin && toggleMode()}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                !isLogin ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Login */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("Google")}
              disabled={isLoading}
              className="w-full h-12 border-2 hover:border-skill-primary transition-all duration-300 hover:shadow-lg group"
            >
              <Chrome className="h-5 w-5 mr-3 text-blue-500 group-hover:scale-110 transition-transform" />
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("GitHub")}
              disabled={isLoading}
              className="w-full h-12 border-2 hover:border-skill-primary transition-all duration-300 hover:shadow-lg group"
            >
              <Github className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-card px-4 text-xs text-muted-foreground font-medium">or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Sign Up Only) */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onBlur={() => handleInputBlur("name")}
                    className={`pl-10 pr-10 h-12 transition-all duration-300 ${getValidationColor("name")}`}
                    required={!isLogin}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getValidationIcon("name")}</div>
                </div>
                {touched.name && formData.name && (
                  <p className={`text-xs ${validation.name.isValid ? "text-green-600" : "text-red-600"}`}>
                    {validation.name.message}
                  </p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={() => handleInputBlur("email")}
                  className={`pl-10 pr-10 h-12 transition-all duration-300 ${getValidationColor("email")}`}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getValidationIcon("email")}</div>
              </div>
              {touched.email && formData.email && (
                <p className={`text-xs ${validation.email.isValid ? "text-green-600" : "text-red-600"}`}>
                  {validation.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  onBlur={() => handleInputBlur("password")}
                  className={`pl-10 pr-20 h-12 transition-all duration-300 ${getValidationColor("password")}`}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  {getValidationIcon("password")}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-8 w-8 p-0 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              {touched.password && formData.password && (
                <p className={`text-xs ${validation.password.isValid ? "text-green-600" : "text-red-600"}`}>
                  {validation.password.message}
                </p>
              )}
            </div>

            {/* Login Options */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-skill-primary hover:underline font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-skill-primary to-skill-secondary hover:from-skill-primary/90 hover:to-skill-secondary/90 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span className="mr-2">{isLogin ? "Sign In" : "Create Account"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-skill-primary hover:underline font-medium transition-colors"
              >
                {isLogin ? "Sign up here" : "Sign in here"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
