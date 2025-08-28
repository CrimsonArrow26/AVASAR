import { Button } from "./ui/button";
import { Menu, Phone } from "lucide-react";

export function Header() {
  return (
    <header className="w-full bg-white/5 backdrop-blur-md border-b border-white/10 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-black text-white">
                Service<span className="text-blue-400">Hub</span>
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-white/90 hover:text-white transition-colors font-medium">
              Services
            </a>
            <a href="#how-it-works" className="text-white/90 hover:text-white transition-colors font-medium">
              How It Works
            </a>
            <a href="#providers" className="text-white/90 hover:text-white transition-colors font-medium">
              For Providers
            </a>
            <a href="#contact" className="text-white/90 hover:text-white transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Contact Info & CTA */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-sm text-white/80 font-medium">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <Button 
              variant="outline" 
              className="hidden md:block border-white/30 text-white hover:bg-white hover:text-gray-900 font-medium backdrop-blur-sm bg-white/10"
            >
              Join as Provider
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 font-semibold rounded-xl">
              Book Service
            </Button>
            <button className="md:hidden text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}