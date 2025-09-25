import { Header } from "@/components/header"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyDetails } from "@/components/property-details"
import { BookingWidget } from "@/components/booking-widget"
import { ReviewsSection } from "@/components/reviews-section"
import { LocationSection } from "@/components/location-section"
import { Footer } from "@/components/footer"

export default function PropertyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyGallery />
            <PropertyDetails />
            <ReviewsSection 
            property="Downtown Loft"
            />
            <LocationSection />
          </div>
          <div className="lg:col-span-1">
            <BookingWidget />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
