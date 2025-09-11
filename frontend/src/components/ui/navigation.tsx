import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, MapPin, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "../button";
import { Input } from "../input";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  
  const isAuthenticated = false; // This will come from Supabase authentication

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="swiss-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-2xl font-bold text-primary">Foodie</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center max-w-2xl mx-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for dishes or restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-input bg-background focus-ring"
              />
            </div>

            {/* Location Selector */}
            <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Select Location</span>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/offers" className="btn-ghost">Offers</Link>
                <Link to="/cart" className="relative btn-ghost">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Link>
                <div className="relative">
                  <User className="w-5 h-5 text-muted-foreground cursor-pointer" />
                </div>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn-ghost">Sign Up</Link>
                <Link to="/login" className="btn-ghost">Log In</Link>
              </>
            )}
            <Button className="btn-hero">Order Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground focus-ring"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-in-right">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search for dishes or restaurants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg"
                />
              </div>

              {/* Mobile Location */}
              <div className="flex items-center space-x-2 text-muted-foreground py-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Select Location</span>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/offers" className="block py-2 text-foreground">Offers</Link>
                    <Link to="/cart" className="flex items-center space-x-2 py-2 text-foreground">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Cart (3)</span>
                    </Link>
                    <Link to="/profile" className="block py-2 text-foreground">Profile</Link>
                  </>
                ) : (
                  <>
                    <Link to="/signup" className="block py-2 text-foreground">Sign Up</Link>
                    <Link to="/login" className="block py-2 text-foreground">Log In</Link>
                  </>
                )}
                <Button className="btn-hero w-full mt-4">Order Now</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;