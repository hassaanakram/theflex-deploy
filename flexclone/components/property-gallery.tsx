import { Button } from "@/components/ui/button"
import { Grid3X3 } from "lucide-react"

export function PropertyGallery() {
  const images = [
    "/modern-apartment-living-room-with-gray-sofa-and-la.jpg",
    "/modern-bedroom-with-white-bedding.jpg",
    "/modern-bathroom-with-marble-countertops.jpg",
    "/modern-white-kitchen.png",
    "/modern-dining-area-with-wooden-table.jpg",
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-balance">Downtown Loft</h1>

      <div className="grid grid-cols-4 gap-2 h-96">
        <div className="col-span-2 row-span-2 relative">
          <img
            src={images[0] || "/placeholder.svg"}
            alt="Main apartment view"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="relative">
          <img src={images[1] || "/placeholder.svg"} alt="Bedroom" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="relative">
          <img src={images[2] || "/placeholder.svg"} alt="Bathroom" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="relative">
          <img src={images[3] || "/placeholder.svg"} alt="Kitchen" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="relative">
          <img
            src={images[4] || "/placeholder.svg"}
            alt="Dining area"
            className="w-full h-full object-cover rounded-lg"
          />
          <Button variant="secondary" size="sm" className="absolute bottom-2 right-2 flex items-center space-x-1">
            <Grid3X3 className="w-4 h-4" />
            <span>View all photos</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <span>🏠</span>
          <span>2 guests</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>🛏️</span>
          <span>1 bedroom</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>🛁</span>
          <span>1 bathroom</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>⭐</span>
          <span>4.9</span>
        </div>
      </div>
    </div>
  )
}
