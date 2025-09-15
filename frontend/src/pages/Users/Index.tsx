import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import FeaturedRestaurants from "@/components/featured-restaurants";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";

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
