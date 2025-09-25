"use client"

import { Button } from "@/components/ui/button"
import { Globe, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled ? "bg-[#284e4c] text-white" : "bg-white text-black"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isScrolled ? "bg-white" : "bg-[#284e4c]"
              }`}
            >
              <span className={`font-bold text-sm ${isScrolled ? "text-[#284e4c]" : "text-white"}`}>f</span>
            </div>
            <span className="font-semibold text-lg">the flex</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              className={`flex items-center space-x-1 ${
                isScrolled ? "text-white hover:text-gray-200" : "text-black hover:text-gray-600"
              }`}
            >
              <span>Locations</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              className={isScrolled ? "text-white hover:text-gray-200" : "text-black hover:text-gray-600"}
            >
              About Us
            </Button>
            <Button
              variant="ghost"
              className={isScrolled ? "text-white hover:text-gray-200" : "text-black hover:text-gray-600"}
            >
              Careers
            </Button>
            <Button
              variant="ghost"
              className={isScrolled ? "text-white hover:text-gray-200" : "text-black hover:text-gray-600"}
            >
              Contact
            </Button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-1 ${
                isScrolled ? "text-white hover:text-gray-200" : "text-black hover:text-gray-600"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>English</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={isScrolled ? "text-white hover:text-gray-200" : "text-black hover:text-gray-600"}
            >
              Exit
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
