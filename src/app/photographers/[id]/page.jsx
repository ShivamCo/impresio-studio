"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Star,
  Camera,
  Award,
  Users,
  ChevronRight,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import InquiryForm from "@/components/inquiry-form"
import PhotoGallery from "@/components/photo-gallery"
import ReviewList from "@/components/review-list"
import usePhotographerStore from "@/lib/store"

export default function PhotographerProfile() {
  const { id } = useParams()
  const photographerId = Number(id)
  const [isScrolled, setIsScrolled] = useState(false)

  const { photographerDetail, fetchPhotographerDetail, loading, error } = usePhotographerStore()

  useEffect(() => {
    if (photographerId) {
      fetchPhotographerDetail(photographerId)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [photographerId, fetchPhotographerDetail])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-2xl font-semibold text-gray-800">Loading profile</p>
            <div className="flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0ms" }}></span>
              <span
                className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                style={{ animationDelay: "300ms" }}
              ></span>
              <span
                className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                style={{ animationDelay: "600ms" }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-8 max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto border border-gray-200">
            <Camera className="w-12 h-12 text-gray-400" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Something went wrong</h2>
            <p className="text-red-500 font-medium">{error}</p>
            <p className="text-gray-600">We couldn't load the photographer profile. Please try again.</p>
          </div>
          <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-700 text-white">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to photographers
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!photographerDetail) return null

  const photographer = photographerDetail

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-lg shadow-lg py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full text-start px-10 bg-gray-950 text-white hover:bg-gray-100 hover:text-gray-900"
            >
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>

            {isScrolled && (
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8 border border-gray-200">
                  <AvatarImage src={photographer.profilePic || "/placeholder.svg"} alt={photographer.name} />
                  <AvatarFallback className="bg-gray-100 text-gray-500">{photographer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-800">{photographer.name}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            
            
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh]  md:h-[60vh] overflow-hidden">
        <Image
          src={photographer.portfolio[0] || "/placeholder.jpg"}
          alt={`${photographer.name} cover photo`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/70 to-gray-50/20" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-16 md:pb-24">
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src={photographer.profilePic || "/placeholder.jpg"}
                    alt={photographer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border-4 border-white">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{photographer.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{photographer.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(photographer.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-800">{photographer.rating}</span>
                    <span className="text-gray-500">({photographer.reviews?.length || 0})</span>
                  </div>

                  <Badge className="bg-gray-800 text-white hover:bg-gray-700 border-0 rounded-full px-3 py-1">
                    ₹{photographer.price.toLocaleString()} starting price
                  </Badge>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-white border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between py-4 gap-4">
            <div className="flex flex-wrap gap-3">
              {photographer.styles.slice(0, 3).map((style) => (
                <Badge key={style} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-0">
                  {style}
                </Badge>
              ))}
              {photographer.styles.length > 3 && (
                <Badge variant="outline" className="border-gray-300 text-gray-600">
                  +{photographer.styles.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{photographer.reviews?.length || 0} clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>{photographer.portfolio?.length || 0} photos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="bg-white p-1 rounded-full mb-8 border border-gray-200">
                <TabsTrigger
                  value="about"
                  className="rounded-full data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 px-6"
                >
                  About
                </TabsTrigger>
                <TabsTrigger
                  value="gallery"
                  className="rounded-full data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 px-6"
                >
                  Gallery
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-full data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 px-6"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-8">
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <h2 className="text-2xl font-semibold text-gray-900">About {photographer.name}</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{photographer.bio}</p>
                  </CardContent>
                </Card>

                

                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-gray-900">Specialties</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {photographer.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery">
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold text-gray-900">Portfolio Gallery</h2>
                      <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                        View all
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <PhotoGallery portfolioImages={photographer.portfolio} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold text-gray-900">Client Reviews</h2>
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(photographer.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="font-medium text-gray-800">{photographer.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ReviewList photographerReviews={photographer.reviews} />
                  </CardContent>
                  <CardFooter className="border-t border-gray-200 flex justify-center py-4">
                    <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                      Load more reviews
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24">
              {/* Pricing Card */}
              <Card className="bg-white border-gray-200 mb-6">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-gray-900">Pricing</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Starting at</span>
                      <span className="text-2xl font-bold text-gray-900">₹{photographer.price.toLocaleString()}</span>
                    </div>
                    
                  </div>

                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  
                  <InquiryForm photographerId={photographerId} photographerName={photographer.name} />
                  
                </CardFooter>
              </Card>

             
              
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}