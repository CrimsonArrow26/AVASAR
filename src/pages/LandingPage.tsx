import React from 'react';
import { SplineHero } from '../components/SplineHero';
import { ServiceCategories } from '../components/ServiceCategories';
import { FeaturedProviders } from '../components/FeaturedProviders';
import { HowItWorks } from '../components/HowItWorks';
import { Testimonials } from '../components/Testimonials';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Interactive 3D Hero Section */}
      <SplineHero />
      
      {/* Service Categories Showcase */}
      <ServiceCategories />
      
      {/* Featured Service Providers */}
      <FeaturedProviders />
      
      {/* How It Works Process */}
      <HowItWorks />
      
      {/* Customer Testimonials */}
      <Testimonials />
      
      {/* Footer with Contact Info */}
      <Footer />
    </div>
  );
};

export default LandingPage;