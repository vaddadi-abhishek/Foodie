import { useState, useEffect } from "react";
import { CheckCircle, Clock, Truck, MapPin, Phone } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/button";

// Mock order data - this will come from your Supabase database
const orderData = {
  id: "ORD-2024-001",
  restaurant: "Bella Italia",
  items: [
    { name: "Truffle Arancini", quantity: 2, price: 16.99 },
    { name: "Margherita Napoletana", quantity: 1, price: 19.99 },
  ],
  total: 53.97,
  status: "preparing", // confirmed, preparing, on_the_way, delivered
  estimatedDelivery: "7:35 PM",
  deliveryAddress: "123 Main St, Apt 4B, San Francisco, CA 94102",
  driver: {
    name: "Alex Rodriguez",
    phone: "+1 (555) 123-4567",
    vehicle: "Red Honda Civic - ABC123",
    rating: 4.9,
  },
};

const orderStatuses = [
  { id: "confirmed", label: "Order Confirmed", icon: CheckCircle, time: "7:05 PM" },
  { id: "preparing", label: "Preparing Food", icon: Clock, time: "7:15 PM" },
  { id: "on_the_way", label: "On the Way", icon: Truck, time: "Est. 7:25 PM" },
  { id: "delivered", label: "Delivered", icon: CheckCircle, time: "Est. 7:35 PM" },
];

const TrackOrderPage = () => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(
    orderStatuses.findIndex(status => status.id === orderData.status)
  );

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStatusIndex < orderStatuses.length - 1) {
        setCurrentStatusIndex(prev => prev + 1);
      }
    }, 30000); // Update every 30 seconds for demo

    return () => clearInterval(interval);
  }, [currentStatusIndex]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="swiss-container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold text-primary">Track Your Order</h1>
            <p className="text-xl text-muted-foreground">Order #{orderData.id}</p>
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Estimated delivery: {orderData.estimatedDelivery}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Status */}
            <div className="lg:col-span-2 space-y-8">
              {/* Status Timeline */}
              <div className="card-elegant p-8">
                <h2 className="text-2xl font-semibold text-primary mb-8">Order Status</h2>
                
                <div className="space-y-6">
                  {orderStatuses.map((status, index) => {
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    const IconComponent = status.icon;
                    
                    return (
                      <div key={status.id} className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                          isCompleted 
                            ? "bg-accent text-accent-foreground" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1">
                          <div className={`font-semibold ${
                            isCurrent ? "text-accent" : isCompleted ? "text-primary" : "text-muted-foreground"
                          }`}>
                            {status.label}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {status.time}
                          </div>
                        </div>
                        
                        {isCurrent && (
                          <div className="animate-pulse">
                            <div className="w-3 h-3 bg-accent rounded-full"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="card-elegant p-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Live Tracking</h3>
                <div className="bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="w-12 h-12 text-accent mx-auto" />
                    <p className="text-muted-foreground">
                      Live map tracking will appear here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Connect to Supabase to enable real-time tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="card-elegant p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{orderData.restaurant}</span>
                  </div>
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${orderData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="card-elegant p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">Delivery Info</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Delivery Address</div>
                    <div className="text-sm">{orderData.deliveryAddress}</div>
                  </div>
                  
                  {orderData.status === "on_the_way" && (
                    <div className="border-t border-border pt-3">
                      <div className="font-medium text-sm text-muted-foreground mb-2">Your Driver</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{orderData.driver.name}</span>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs">★</span>
                            <span className="text-xs">{orderData.driver.rating}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">{orderData.driver.vehicle}</div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Driver
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  Modify Order
                </Button>
                <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                  Cancel Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrackOrderPage;