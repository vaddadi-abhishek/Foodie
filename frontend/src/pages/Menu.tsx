import { useState } from "react";
import { Plus, Minus, Star, Clock, ChefHat } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/button";

// Mock menu data - this will come from your Supabase database
const restaurant = {
  id: 1,
  name: "Bella Italia",
  cuisine: "Italian",
  rating: 4.8,
  deliveryTime: "20-30 min",
  image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=400&fit=crop&crop=center",
};

const categories = [
  { id: "appetizers", name: "Appetizers", count: 8 },
  { id: "mains", name: "Main Courses", count: 12 },
  { id: "pasta", name: "Pasta", count: 10 },
  { id: "pizza", name: "Pizza", count: 6 },
  { id: "desserts", name: "Desserts", count: 5 },
  { id: "drinks", name: "Drinks", count: 8 },
];

const menuItems = [
  {
    id: 1,
    name: "Truffle Arancini",
    description: "Crispy risotto balls filled with truffle and parmesan, served with marinara sauce",
    price: 16.99,
    category: "appetizers",
    image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: 2,
    name: "Osso Buco Milanese",
    description: "Slow-braised veal shanks with saffron risotto and gremolata",
    price: 32.99,
    category: "mains",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    popular: false,
  },
  {
    id: 3,
    name: "Handmade Cacio e Pepe",
    description: "Fresh pasta with pecorino romano, black pepper, and olive oil",
    price: 22.99,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc57d2586?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: 4,
    name: "Margherita Napoletana",
    description: "San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil",
    price: 19.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: 5,
    name: "Tiramisu della Casa",
    description: "Classic tiramisu with espresso-soaked ladyfingers and mascarpone",
    price: 12.99,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    popular: false,
  },
];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("appetizers");
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  const addToCart = (itemId: number) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const cartTotal = Object.entries(cart).reduce((total, [itemId, quantity]) => {
    const item = menuItems.find(item => item.id === parseInt(itemId));
    return total + (item ? item.price * quantity : 0);
  }, 0);

  const cartItemsCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Restaurant Header */}
      <section className="relative h-64 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="swiss-container">
            <div className="text-white space-y-2">
              <h1 className="text-4xl font-bold">{restaurant.name}</h1>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current text-accent" />
                  <span>{restaurant.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ChefHat className="w-4 h-4" />
                  <span>{restaurant.cuisine}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="swiss-container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <h3 className="font-semibold text-primary mb-4">Categories</h3>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="text-sm">{category.count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary capitalize">
                {categories.find(c => c.id === activeCategory)?.name}
              </h2>
              
              <div className="grid gap-6">
                {filteredItems.map((item) => (
                  <div key={item.id} className="card-elegant p-6">
                    <div className="grid md:grid-cols-4 gap-6">
                      {/* Item Image */}
                      <div className="md:col-span-1">
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-32 object-cover"
                          />
                          {item.popular && (
                            <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold">
                              Popular
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="md:col-span-2 space-y-2">
                        <h3 className="text-xl font-semibold text-primary">{item.name}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                        <div className="text-2xl font-bold text-accent">${item.price}</div>
                      </div>

                      {/* Add to Cart */}
                      <div className="md:col-span-1 flex items-center justify-center">
                        {cart[item.id] ? (
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-semibold min-w-[2rem] text-center">
                              {cart[item.id]}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => addToCart(item.id)}
                              className="w-8 h-8 p-0 bg-accent hover:bg-accent/90"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button onClick={() => addToCart(item.id)} className="btn-hero">
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Cart */}
        {cartItemsCount > 0 && (
          <div className="fixed bottom-6 right-6 bg-accent text-accent-foreground rounded-lg shadow-xl p-4 min-w-[250px] animate-slide-in-right">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Cart ({cartItemsCount} items)</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-accent-foreground text-accent hover:bg-accent-foreground/90">
                View Cart & Checkout
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MenuPage;