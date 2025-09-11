import { Button } from "../button";
import { ArrowRight, Clock, Star, Shield } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-subtle py-20 lg:py-32">
      <div className="swiss-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-primary leading-none">
                Crave. <br />
                <span className="text-accent">Click.</span> <br />
                Eat.
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-lg">
                Chef-crafted meals ready in 15–30 minutes. Fresh ingredients, 
                bold flavors, delivered to your door.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-hero group">
                Order Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="btn-outline-hero">
                Browse Menu
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-muted-foreground">15-30 min delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-accent fill-current" />
                <span className="text-sm font-medium text-muted-foreground">4.8/5 rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-muted-foreground">100% fresh</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl hover-lift">
              <img
                src={heroImage}
                alt="Fresh, artisanal dishes ready for delivery"
                className="w-full h-[400px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold animate-float">
              Fresh Daily
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold animate-float" style={{ animationDelay: "1s" }}>
              Free Delivery
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary rounded-full blur-xl" />
      </div>
    </section>
  );
};

export default HeroSection;