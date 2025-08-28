import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, MapPin, Clock, Shield } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { providers } from "../constants/providers";

export function FeaturedProviders() {
  return (
    <section id="providers" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Top-Rated Service Providers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with our highest-rated and most trusted professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <Card key={provider.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative h-48 bg-gray-200">
                  <ImageWithFallback
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                  {provider.verified && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full">
                      <Shield className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="">{provider.name}</h3>
                      <p className="text-blue-600 font-medium">{provider.service}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{provider.rating}</span>
                      </div>
                      <p className="text-sm text-gray-500">({provider.reviews} reviews)</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {provider.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {provider.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {provider.responseTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{provider.price}</span>
                    </div>
                    <Button size="sm">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Providers
          </Button>
        </div>
      </div>
    </section>
  );
}