import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InquiryForm from "@/components/inquiry-form"
import PhotoGallery from "@/components/photo-gallery"
import ReviewList from "@/components/review-list"

export async function generateMetadata({ params }) {
  return {
    title: `Photographer Profile | Maternity Photographers in Bengaluru`,
    description: `View profile, gallery and book a session with this maternity photographer in Bengaluru`,
  }
}

export default function PhotographerProfile({ params }) {
  const { id } = params

  // In a real app, fetch the photographer data based on the ID
  const photographer = {
    id,
    name: "Priya Sharma",
    location: "Indiranagar, Bengaluru",
    price: 15000,
    rating: 4.8,
    reviews: 42,
    bio: "Specializing in maternity photography for over 8 years. My style focuses on natural light and candid moments that capture the beauty of motherhood. I believe every mother deserves to feel beautiful and empowered during this special time.",
    tags: ["Candid", "Outdoor", "Natural Light", "Studio"],
    experience: "8+ years",
    profileImage: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=600&width=1200",
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="relative h-64 md:h-80 bg-muted">
        <Image
          src={photographer.coverImage || "/placeholder.svg"}
          alt={`${photographer.name} cover photo`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container mx-auto px-4 absolute bottom-4 left-0 right-0">
          <Link
            href="/"
            className="inline-flex items-center text-white bg-black/30 hover:bg-black/50 px-3 py-1.5 rounded-md mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to photographers
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="relative mb-4">
              <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-background -mt-24 mx-auto md:mx-0">
                <Image
                  src={photographer.profileImage || "/placeholder.svg"}
                  alt={photographer.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h1 className="text-2xl font-bold">{photographer.name}</h1>
              <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{photographer.location}</span>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(photographer.rating) ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="font-medium">{photographer.rating}</span>
                <span className="text-muted-foreground">({photographer.reviews} reviews)</span>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Starting Price</h3>
                  <p className="text-xl font-bold">₹{photographer.price.toLocaleString()}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Experience</h3>
                  <p>{photographer.experience}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Styles</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {photographer.tags.map((tag) => (
                      <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <InquiryForm photographerId={id} photographerName={photographer.name} />
            </div>
          </div>

          <div className="md:w-2/3">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="mt-6">
                <h2 className="text-xl font-semibold mb-3">About {photographer.name}</h2>
                <p className="text-muted-foreground">{photographer.bio}</p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Services Offered</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Maternity photoshoots (indoor and outdoor)</li>
                  <li>Baby shower photography</li>
                  <li>Family portraits with maternity focus</li>
                  <li>Digital and printed photo albums</li>
                  <li>High-resolution digital images</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">Booking Process</h3>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Fill out the inquiry form</li>
                  <li>Schedule a consultation call</li>
                  <li>Choose your package and date</li>
                  <li>Pay the booking deposit</li>
                  <li>Receive your photoshoot guide</li>
                </ol>
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                <PhotoGallery photographerId={id} />
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <ReviewList photographerId={id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
