import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { services } from "../constants/services";

export function ServiceCategories() {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Popular <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Browse our most requested services and find the perfect professional for your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md hover:scale-[1.02] bg-white"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed font-light">
                  {service.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {service.subcategories && service.subcategories.length > 0 && (
                    <>
                      {service.subcategories.slice(0, 2).map((sub, subIndex) => (
                        <Badge 
                          key={subIndex} 
                          variant="secondary" 
                          className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
                        >
                          {sub}
                        </Badge>
                      ))}
                      {service.subcategories.length > 2 && (
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-gray-100 text-gray-600 font-medium"
                        >
                          +{service.subcategories.length - 2} more
                        </Badge>
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center justify-center text-sm text-gray-500 font-medium">
                  <span className="font-black text-blue-600">{service.averageRating}</span>
                  <span className="ml-1">★ • {service.providersCount} providers</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
}