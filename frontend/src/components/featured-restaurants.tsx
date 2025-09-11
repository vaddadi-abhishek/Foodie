import { Star, Clock, Truck } from "lucide-react";
import { Button } from "./ui/button";

// Mock data - this will come from your Supabase database
const featuredRestaurants = [
  {
    id: 1,
    name: "Bella Italia",
    cuisine: "Italian",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: "Free",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&crop=center",
    featured: true,
  },
  {
    id: 2,
    name: "Tokyo Ramen House",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "25-35 min",
    deliveryFee: "$2.99",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&crop=center",
    featured: true,
  },
  {
    id: 3,
    name: "Green Garden",
    cuisine: "Healthy",
    rating: 4.7,
    deliveryTime: "15-25 min",
    deliveryFee: "Free",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&crop=center",
    featured: true,
  },
  {
    id: 4,
    name: "Burger Craft",
    cuisine: "American",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: "$1.99",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&crop=center",
    featured: false,
  },
  {
    id: 5,
    name: "Spice Route",
    cuisine: "Indian",
    rating: 4.8,
    deliveryTime: "30-40 min",
    deliveryFee: "Free",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&crop=center",
    featured: false,
  },
  {
    id: 6,
    name: "Fresh Poke",
    cuisine: "Hawaiian",
    rating: 4.9,
    deliveryTime: "15-20 min",
    deliveryFee: "$2.49",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&crop=center",
    featured: false,
  },
];

const RestaurantCard = ({ restaurant }: { restaurant: typeof featuredRestaurants[0] }) => {
  return (
    <div className="card-elegant group cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {restaurant.featured && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-md px-2 py-1 flex items-center space-x-1">
          <Star className="w-3 h-3 text-accent fill-current" />
          <span className="text-xs font-medium">{restaurant.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-muted-foreground">{restaurant.cuisine}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Truck className="w-4 h-4" />
            <span>{restaurant.deliveryFee}</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors"
        >
          View Menu
        </Button>
      </div>
    </div>
  );
};

const FeaturedRestaurants = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="swiss-container">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-primary">
            Featured Restaurants
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the best local restaurants, carefully curated for exceptional quality and taste
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="swiss-grid mb-12">
          {featuredRestaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button className="btn-hero">
            View All Restaurants
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;