import Image from "next/image"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"
import { Button } from "./ui/button"

export default function PhotographerCard({ photographer }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-card transition-all hover:shadow-md">
      <div className="relative h-48">
        <Image
          src={photographer.profileImage || "/placeholder.jpg"}
          alt={photographer.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-lg">{photographer.name}</h2>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <MapPin className="w-3 h-3" />
          <span>{photographer.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 my-3">
          {photographer.tags.map((tag) => (
            <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-sm text-muted-foreground">Starting at</p>
            <p className="font-semibold">₹{photographer.price.toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-medium">{ photographer.rating ? photographer.rating.toFixed(1) : "New"}</span>
          </div>

        </div>

        <Button asChild className="w-full mt-4">
          <Link href={`/photographers/${photographer.id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  )
}
