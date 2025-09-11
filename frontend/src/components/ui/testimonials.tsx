import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Food Blogger",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content: "The quality is outstanding! Every dish arrives perfectly prepared and still hot. The variety of restaurants keeps me coming back every week.",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Busy Professional",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content: "Foodie has been a lifesaver for my hectic schedule. The 20-minute delivery promise is always kept, and the food is restaurant-quality.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Home Chef",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content: "As someone who loves cooking, I'm impressed by the fresh ingredients and authentic flavors. It's like having a personal chef service.",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <div className="card-elegant p-8 relative">
      <Quote className="absolute top-6 right-6 w-8 h-8 text-accent opacity-20" />
      
      {/* Rating */}
      <div className="flex items-center space-x-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-accent fill-current" />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-lg text-foreground leading-relaxed mb-8 italic">
        "{testimonial.content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center space-x-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-primary">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="swiss-container">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-primary">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Foodie for their daily meals
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="swiss-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">10K+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">500+</div>
            <div className="text-muted-foreground">Partner Restaurants</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">98%</div>
            <div className="text-muted-foreground">On-Time Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">4.8</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;