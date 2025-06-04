"use client";

import { useSession, signIn, signOut } from "next-auth/react";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Camera,
  ArrowLeft,
  Users,
  Award,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PhotographerAuth() {
  const { data: session } = useSession();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    agreeToTerms: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/photographers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) throw new Error("Login failed");

      const { token } = await res.json();

      localStorage.setItem("token", token); // or use cookies
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Navigate to dashboard
    } catch (err) {
      console.error(err);
      alert("Invalid credentials.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/auth/photographer-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

     toast.success('Login successful!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    } catch (err) {
      alert("Network error");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Photographer Branding */}
        <div className="hidden lg:block">
          <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="Professional photography showcase"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Camera className="w-6 h-6" />
                  </div>
                  <h1 className="text-2xl font-bold">PhotoConnect Pro</h1>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold leading-tight">
                    Grow your photography business
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Join our platform and connect with clients looking for
                    professional photography services.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <span>Access to thousands of potential clients</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                    <span>Professional portfolio showcase</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4" />
                    </div>
                    <span>Build your reputation with reviews</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-gray-400">
                      Active Photographers
                    </div>
                  </div>
                  <div className="w-px h-12 bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">₹50L+</div>
                    <div className="text-sm text-gray-400">
                      Earned by Photographers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full max-w-md mx-auto">
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>

            <div className="lg:hidden flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                PhotoConnect Pro
              </h1>
            </div>
          </div>

          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {activeTab === "login"
                  ? "Welcome back, Photographer"
                  : "Start your photography journey"}
              </CardTitle>
              <p className="text-gray-600">
                {activeTab === "login"
                  ? "Sign in to manage your photography business"
                  : "Create your photographer account and showcase your work"}
              </p>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Join as Photographer</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email address</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="Enter your professional email"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          placeholder="Enter your password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
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
                            setLoginData((prev) => ({
                              ...prev,
                              rememberMe: Boolean(checked),
                            }))
                          }
                        />
                        <Label htmlFor="remember" className="text-sm">
                          Keep me signed in
                        </Label>
                      </div>
                      <Button variant="link" className="text-sm p-0 h-auto">
                        Forgot password?
                      </Button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-gray-800"
                    >
                      Sign In to Dashboard
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full name</Label>
                      <Input
                        id="signup-name"
                        value={signupData.name}
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business-name">
                        Business/Studio name (Optional)
                      </Label>
                      <Input
                        id="business-name"
                        value={signupData.businessName}
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            businessName: e.target.value,
                          }))
                        }
                        placeholder="e.g., John's Photography Studio"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Professional email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          value={signupData.password}
                          onChange={(e) =>
                            setSignupData((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          placeholder="Create a strong password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={signupData.confirmPassword}
                          onChange={(e) =>
                            setSignupData((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          placeholder="Confirm your password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={signupData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          setSignupData((prev) => ({
                            ...prev,
                            agreeToTerms: Boolean(checked),
                          }))
                        }
                        required
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Button variant="link" className="text-sm p-0 h-auto">
                          Photographer Terms
                        </Button>{" "}
                        and{" "}
                        <Button variant="link" className="text-sm p-0 h-auto">
                          Privacy Policy
                        </Button>
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-gray-800"
                      disabled={!signupData.agreeToTerms}
                    >
                      Create Photographer Account
                    </Button>

                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        After signup, you'll be guided to set up your
                        professional profile
                      </p>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className=" gap-3 mt-4">
                  <Button
                    onClick={() => signIn("google")}
                    variant="outline"
                    className="border-gray-300 w-full "
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-gray-600">
              {activeTab === "login"
                ? "New to PhotoConnect? "
                : "Already have an account? "}
              <Button
                variant="link"
                className="text-sm p-0 h-auto font-medium"
                onClick={() =>
                  setActiveTab(activeTab === "login" ? "signup" : "login")
                }
              >
                {activeTab === "login" ? "Join as Photographer" : "Sign in"}
              </Button>
            </p>
            <p className="text-sm text-gray-500">
              Looking to hire a photographer?{" "}
              <Button
                asChild
                variant="link"
                className="text-sm p-0 h-auto font-medium"
              >
                <Link href="/client-auth">Client Login</Link>
              </Button>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
