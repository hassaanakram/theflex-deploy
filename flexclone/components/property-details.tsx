import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Car, Tv, Wind, Waves, Coffee, Utensils, Shirt } from "lucide-react"

export function PropertyDetails() {
  const amenities = [
    { icon: Tv, label: "Cable TV" },
    { icon: Wifi, label: "Internet" },
    { icon: Waves, label: "Wireless" },
    { icon: Utensils, label: "Kitchen" },
    { icon: Shirt, label: "Washing Machine" },
    { icon: Wind, label: "Elevator" },
    { icon: Coffee, label: "Hair Dryer" },
    { icon: Car, label: "Heating" },
    { icon: Waves, label: "Smoke Detector" },
  ]

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">About this property</h2>
        <p className="text-muted-foreground leading-relaxed">
          Downtown Loft, un endroit idéal pour explorer Paris tout en profitant d'un
          environnement moderne et dynamique. Il est spacieux, confortable, et équipé de tout le nécessaire avec des
          lits de qualité. Vous trouverez également un supermarché à proximité, restaurants et cafés dans les environs.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Amenities</h2>
          <button className="text-sm text-[#284e4c] hover:underline">View all amenities →</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <amenity.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">{amenity.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Stay Policies</h2>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="bg-[#f1f3ee] p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center space-x-2">
                <span>🕐</span>
                <span>Check-in & Check-out</span>
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Check-in Time</p>
                  <p className="font-medium">3:00 PM</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Check-out Time</p>
                  <p className="font-medium">10:00 AM</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2 flex items-center space-x-2">
                <span>🏠</span>
                <span>House Rules</span>
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span>🚭</span>
                  <span>No smoking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🐕</span>
                  <span>No pets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🎉</span>
                  <span>No parties or events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🔒</span>
                  <span>Security deposit required</span>
                </div>
              </div>
            </div>

            <div className="bg-[#f1f3ee] p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center space-x-2">
                <span>📋</span>
                <span>Cancellation Policy</span>
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">For stays less than 28 days</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Full refund up to 5 days before check-in</li>
                    <li>No refund for bookings less than 5 days before check-in</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">For stays of 28 days or more</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Full refund up to 30 days before check-in</li>
                    <li>No refund for bookings less than 30 days before check-in</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
