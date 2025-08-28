import { Button } from "./ui/button";
import { ChevronDown, Star, Shield, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function SplineHero() {
  const scrollToContent = () => {
    const nextSection = document.getElementById('services');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Spline Interactive Background - Full Height */}
      <div className="absolute inset-0 w-full h-full">
        <iframe 
          src="https://my.spline.design/backgroundhoverinteraction-nKmaXJhtphw1ZZkU1Cbi5Kuh/
          " 
          className="w-full h-full border-0"
          title="Interactive 3D Background"
        />
      </div>

      {/* Gradient Overlay - Bottom Half Only (Starting from 50% height) */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900 via-blue-800/50 to-transparent backdrop-blur-[2px] z-5"></div>

      {/* Main Content Container - Transparent to pointer events for interactivity */}
      <div className="absolute inset-0 flex flex-col justify-center items-start z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 w-full pointer-events-none">
          
          {/* Main Hero Content */}
          <div className="max-w-4xl pointer-events-none">
            {/* Tagline */}
            <div className="mb-6 pointer-events-none">
              <span className="inline-flex items-center px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/20 pointer-events-none">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                Trusted by 50,000+ customers
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mb-8 pointer-events-none">
              <span className="block text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent leading-[0.85] tracking-tight mb-4 drop-shadow-lg pointer-events-none">
                Find
              </span>
              <span className="block text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black bg-gradient-to-r from-blue-400 via-teal-300 to-green-400 bg-clip-text text-transparent leading-[0.85] tracking-tight mb-4 drop-shadow-lg pointer-events-none">
                Trusted
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-black leading-tight drop-shadow-lg pointer-events-none">
                Service Professionals
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-light text-black mt-4 drop-shadow-lg pointer-events-none">
                in your neighborhood
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-black/80 mb-10 leading-relaxed max-w-2xl font-light drop-shadow-lg pointer-events-none">
              Connect with skilled electricians, plumbers, house cleaners, and more. 
              <span className="font-medium text-black-300"> Quality professionals, verified and ready to help.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12 pointer-events-none">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 pointer-events-auto"
              >
                Find Services Now
              </Button>
              <Link to="/provider/register">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-10 py-6 text-xl font-semibold rounded-2xl backdrop-blur-sm bg-white/10 transition-all duration-300 pointer-events-auto"
                >
                  Join as Provider
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 pointer-events-none">
              <div className="flex items-center space-x-3 pointer-events-none">
                <div className="p-3 bg-green-500/20 rounded-full pointer-events-none">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div className="pointer-events-none">
                  <div className="text-white font-semibold drop-shadow-lg pointer-events-none">Background Checked</div>
                  <div className="text-white/60 text-sm drop-shadow-lg pointer-events-none">All providers verified</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 pointer-events-none">
                <div className="p-3 bg-blue-500/20 rounded-full pointer-events-none">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div className="pointer-events-none">
                  <div className="text-white font-semibold drop-shadow-lg pointer-events-none">Quick Response</div>
                  <div className="text-white/60 text-sm drop-shadow-lg pointer-events-none">Average 30 min reply</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 pointer-events-none">
                <div className="p-3 bg-purple-500/20 rounded-full pointer-events-none">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div className="pointer-events-none">
                  <div className="text-white font-semibold drop-shadow-lg pointer-events-none">500+ Professionals</div>
                  <div className="text-white/60 text-sm drop-shadow-lg pointer-events-none">Ready to serve you</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Bottom Left */}
      <div className="absolute bottom-24 left-8 md:left-16 lg:left-24 z-20 pointer-events-auto">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-white drop-shadow-lg">500+</div>
              <div className="text-xs uppercase tracking-widest text-white/90 font-medium">Providers</div>
            </div>
            <div>
              <div className="text-3xl font-black text-yellow-300 drop-shadow-lg">4.9★</div>
              <div className="text-xs uppercase tracking-widest text-white/90 font-medium">Rating</div>
            </div>
            <div>
              <div className="text-3xl font-black text-green-300 drop-shadow-lg">50K+</div>
              <div className="text-xs uppercase tracking-widest text-white/90 font-medium">Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Categories Quick Access - Bottom Right */}
      <div className="absolute bottom-24 right-8 md:right-16 lg:right-24 z-20 pointer-events-auto">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
          <div className="text-white font-semibold mb-4 text-center drop-shadow-lg">Popular Services</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors border border-white/30 hover:border-white/50">
              🧹 Cleaning
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors border border-white/30 hover:border-white/50">
              ⚡ Electrical
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors border border-white/30 hover:border-white/50">
              🔧 Plumbing
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors border border-white/30 hover:border-white/50">
              🔨 Handyman
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Hint - Top Right */}
      <div className="absolute top-24 right-8 md:right-16 lg:right-24 z-20 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl px-6 py-3 text-white border border-white/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">✨ Hover to interact with 3D scene</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto">
        <button 
          onClick={scrollToContent}
          className="flex flex-col items-center text-white hover:text-white transition-all group bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:bg-white/30 hover:border-white/50"
        >
          <span className="text-sm mb-2 uppercase tracking-widest font-medium drop-shadow-lg">Explore Services</span>
          <ChevronDown className="h-6 w-6 animate-bounce group-hover:animate-none group-hover:transform group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-teal-400/20 rounded-full animate-pulse delay-1000 pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-green-400/40 rounded-full animate-pulse delay-2000 pointer-events-none"></div>
    </section>
  );
}