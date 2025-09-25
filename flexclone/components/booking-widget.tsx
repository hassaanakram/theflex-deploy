import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Users, MessageSquare, Heart } from "lucide-react"

export function BookingWidget() {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <h3 className="text-lg font-semibold text-[#284e4c]">Book Your Stay</h3>
        <p className="text-sm text-[#284e4c]">Select dates to see prices</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="checkin" className="text-xs">
              Check-in
            </Label>
            <Input id="checkin" type="date" defaultValue="2024-10-08" className="text-sm" />
          </div>
          <div>
            <Label htmlFor="checkout" className="text-xs">
              Check-out
            </Label>
            <Input id="checkout" type="date" defaultValue="2024-10-24" className="text-sm" />
          </div>
        </div>

        <div>
          <Label htmlFor="guests" className="text-xs">
            Guests
          </Label>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <Input id="guests" type="number" defaultValue="1" min="1" max="2" className="text-sm" />
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2 text-green-700">
            <span className="text-sm">🎯</span>
            <span className="text-sm font-medium">15% length of stay discount</span>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Price per night (16 nights)</span>
            <span>€2,679.3</span>
          </div>
          <div className="flex justify-between">
            <span>Cleaning fee</span>
            <span>€87.75</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Have a coupon?</span>
            <span>Enter code</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <div className="text-right">
              <div>€2,384.57</div>
              <div className="text-xs text-muted-foreground">You saved €382.48</div>
            </div>
          </div>
        </div>

        <Button className="w-full bg-[#284e4c] hover:bg-[#1f3d3b] text-white">Book Now</Button>

        <div className="flex items-center justify-center space-x-4 pt-2">
          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>Send Inquiry</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">You won't be charged yet</p>
        <p className="text-xs text-center text-muted-foreground">Instant booking confirmation</p>
      </CardContent>
    </Card>
  )
}
