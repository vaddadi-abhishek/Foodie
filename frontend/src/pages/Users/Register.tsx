import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";
import { useEffect } from "react";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  // ✅ Redirect if already registered
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // redirect to home (or dashboard)
    }
  }, [isAuthenticated, navigate]);

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        // Backend validation errors
        alert(JSON.stringify(resData)); // You can replace this with better UI feedback
        return;
      }

      reset(); // reset form
      navigate("/login"); // navigate to login page

    } catch (error) {
      alert("Something went wrong, try again later!");
    }
  };


  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle py-20 px-4">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-24 left-24 w-40 h-40 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-24 w-48 h-48 bg-primary rounded-full blur-3xl" />
      </div>

      <Card className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl border-none bg-white/90 backdrop-blur-md animate-slide-up">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-bold text-primary">
            Create Account
          </CardTitle>
          <p className="text-muted-foreground">
            Join us for fresh meals delivered right to your door.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                {...register("username", { required: "Username is required" })}
                className={`rounded-xl border-muted focus:ring-2 focus:ring-accent ${errors.username ? "border-red-500" : ""
                  }`}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                className={`rounded-xl border-muted focus:ring-2 focus:ring-accent ${errors.email ? "border-red-500" : ""
                  }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`rounded-xl border-muted focus:ring-2 focus:ring-accent ${errors.password ? "border-red-500" : ""
                  }`}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="password_confirm">Confirm Password</Label>
              <Input
                id="password_confirm"
                type="password"
                placeholder="••••••••"
                {...register("password_confirm", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`rounded-xl border-muted focus:ring-2 focus:ring-accent ${errors.password_confirm ? "border-red-500" : ""
                  }`}
              />
              {errors.password_confirm && (
                <p className="text-sm text-red-500">
                  {errors.password_confirm.message}
                </p>
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
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </Button>

            {/* Footer */}
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-accent font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
