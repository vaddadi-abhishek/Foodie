import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, ShoppingCart, User, Menu, X, Percent } from "lucide-react";
import { Input } from "./ui/input";
import imgLogo from "@/assets/imgLogo.png";
import { useAuth } from "@/hooks/AuthContext"; // ✅ using context
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { isAuthenticated, logout } = useAuth(); // ✅ get logout from context

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="swiss-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center">
                <img
                  src={imgLogo}
                  alt="Foodie Logo"
                  className="w-full h-14 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-2xl font-bold text-primary">Foodie</span>
            </Link>

            {/* Desktop Search + Location */}
            <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center max-w-2xl mx-8">
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
              <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Select Location</span>
              </div>
            </div>

            {/* Desktop Auth / User Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <button onClick={logout} className="btn-ghost">
                    Logout
                  </button>
                  <Link to="/offers" className="btn-ghost">Offers</Link>
                  <Link to="/cart" className="relative btn-ghost">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </Link>
                  <div className="relative btn-ghost">
                    <Link to="/profile">
                      <User className="w-5 h-5 text-muted-foreground cursor-pointer" />
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn-ghost">Sign Up</Link>
                  <Link to="/login" className="btn-ghost">Log In</Link>
                </>
              )}
            </div>

            {/* Mobile Actions (Cart and Menu) */}
            <div className="flex items-center space-x-4 lg:hidden">
              {isAuthenticated && (
                <Link to="/cart" className="relative p-2 text-muted-foreground">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Link>
              )}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground focus-ring"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        {/* Faded Background */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
            isMenuOpen ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Side Menu Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-background shadow-2xl transform transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Menu</h2>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground focus-ring"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

          {/* Menu Content */}
          <div className="p-6 space-y-6">
            {/* Search Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-muted-foreground hover:text-foreground cursor-pointer transition-colors p-2 rounded-lg hover:bg-muted/50">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Select Location</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/offers"
                    className="flex items-center space-x-3 p-3 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
                    onClick={toggleMenu}
                  >
                    <Percent className="w-5 h-5" />
                    <span className="font-medium">Offers</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 p-3 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
                    onClick={toggleMenu}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="flex items-center space-x-3 p-3 rounded-lg text-foreground hover:bg-muted/50 transition-colors w-full text-left"
                  >
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="flex items-center space-x-3 p-3 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
                    onClick={toggleMenu}
                  >
                    <span className="font-medium">Sign Up</span>
                  </Link>

                  <Link
                    to="/login"
                    className="flex items-center space-x-3 p-3 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
                    onClick={toggleMenu}
                  >
                    <span className="font-medium">Log In</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;