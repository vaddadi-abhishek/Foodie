import { Search, ShoppingCart, Truck } from "lucide-react";
import kitchenImage from "@/assets/kitchen-scene.jpg";
import deliveryImage from "@/assets/delivery-hero.jpg";

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Explore curated menus from top local restaurants and discover new favorites.",
    image: kitchenImage,
  },
  {
    icon: ShoppingCart,
    title: "Customize & Order",
    description: "Personalize your meal exactly how you like it and place your order with one click.",
    image: null,
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Track your order in real-time and enjoy fresh, hot meals delivered in 15-30 minutes.",
    image: deliveryImage,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="swiss-container">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-primary">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From craving to satisfaction in three simple steps
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="card-feature group hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step Number */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-lg flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <step.icon className="w-8 h-8 text-accent" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Optional Image */}
              {step.image && (
                <div className="mt-6 rounded-lg overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-accent/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="btn-hero">
            Start Your Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;