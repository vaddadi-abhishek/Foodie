import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/ui/hero-section";
import HowItWorks from "@/components/ui/how-it-works";
import FeaturedRestaurants from "@/components/ui/featured-restaurants";
import Testimonials from "@/components/ui/testimonials";
import Footer from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturedRestaurants />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
