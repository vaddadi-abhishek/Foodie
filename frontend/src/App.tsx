import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Users/Index";
import MenuPage from "./pages/Users/Menu";
import TrackOrderPage from "./pages/Users/TrackOrder";
import NotFound from "./pages/Users/NotFound";
import Login from "./pages/Users/Login";
import Register from "./pages/Users/Register";
import Profile from "./pages/Users/Profile";
import RestaurantLogin from "./pages/Restaurant/Login";
import RestaurantRegister from "./pages/Restaurant/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu/:restaurantId" element={<MenuPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/restaurants/login" element={<RestaurantLogin />} />
          <Route path="/restaurants/register" element={<RestaurantRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
