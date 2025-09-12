import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // backend expects email + password
      });

      const resData = await response.json();

      if (!response.ok) {
        alert(resData.detail || "Invalid email or password");
        return;
      }

      // Save tokens in localStorage
      localStorage.setItem("access", resData.access);
      localStorage.setItem("refresh", resData.refresh);

      // Redirect to home/dashboard
      navigate("/");
    } catch (error) {
      alert("Something went wrong. Please try again later!");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle py-20 px-4">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-24 left-24 w-40 h-40 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-24 w-48 h-48 bg-primary rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <Card className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl border-none bg-white/90 backdrop-blur-md animate-slide-up">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-bold text-primary">
            Welcome Back
          </CardTitle>
          <p className="text-muted-foreground">
            Log in to continue your food journey
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
                className={`rounded-xl border-muted focus:ring-2 focus:ring-accent ${errors.email ? "border-red-500" : ""
                  }`}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                className={`rounded-xl border-muted focus:ring-2 focus:ring-accent ${errors.password ? "border-red-500" : ""
                  }`}
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-hero group"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            {/* Footer */}
            <p className="text-sm text-center text-muted-foreground">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-accent font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
