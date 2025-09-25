import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-[#284e4c] text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Join The Flex</h3>
            <p className="text-sm text-white/80 mb-4">
              Be the first to stay up to date on our latest news and exclusive offers for your first stay!
            </p>
            <div className="space-y-2">
              <Input
                placeholder="First name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Input
                placeholder="Last name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Input
                placeholder="Phone number"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="w-full bg-white text-[#284e4c] hover:bg-gray-100">Subscribe</Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">The Flex</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#" className="hover:text-white">
                  Professional property management
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Serviced apartments for landlords
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Flexible corporate flex for businesses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Short-term apartment systems
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Locations</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#" className="hover:text-white">
                  LONDON
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  PARIS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  ALGIERS
                </a>
              </li>
            </ul>

            <h3 className="font-semibold mb-4 mt-6">Contact Us</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>📞 Support Numbers</li>
              <li>+44 77 7777 7777</li>
              <li>+33 7 77 77 77 77</li>
              <li>+213 7 77 77 77 77</li>
              <li>📧 info@theflex.global</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/80">
          <p>© 2023 The Flex. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span>Follow us:</span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                📘
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                📷
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
