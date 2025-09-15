import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Define the structure of our form data
interface RestaurantRegisterFormData extends FieldValues {
  email: string;
  personal_phone: string;
  restaurant_name: string;
  restaurant_phone: string;
  address_town: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;
  website?: string;
  fssai_license: FileList;
  gst_certificate: FileList;
  pan_card: FileList;
  shop_license: FileList;
  business_proof: FileList;
}

const RestaurantRegister = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RestaurantRegisterFormData>();

  const handleNext = async () => {
    const fieldsToValidate: (keyof RestaurantRegisterFormData)[] = [
      "email",
      "personal_phone",
      "restaurant_name",
      "restaurant_phone",
      "address_town",
      "address_city",
      "address_state",
      "address_zipcode",
    ];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: RestaurantRegisterFormData) => {
    const formData = new FormData();

    // Append text and file fields
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList && value.length > 0) {
        formData.append(key, value[0]);
      } else if (typeof value === 'string' && value) {
        formData.append(key, value);
      }
    });

    try {
      // TODO: Update with the correct restaurant registration API endpoint
      const response = await fetch("http://127.0.0.1:8000/api/restaurants/register/", {
        method: "POST",
        body: formData, // Browser will set Content-Type to multipart/form-data
      });

      const resData = await response.json();

      if (!response.ok) {
        alert(JSON.stringify(resData));
        return;
      }

      navigate("/restaurants/login");
    } catch (error) {
      alert("Something went wrong, please try again later.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle py-20 px-4">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-24 left-24 w-40 h-40 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-24 w-48 h-48 bg-primary rounded-full blur-3xl" />
      </div>

      <Card className="relative z-10 w-full max-w-2xl rounded-2xl shadow-2xl border-none bg-white/90 backdrop-blur-md animate-slide-up">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-bold text-primary">
            Become a Partner
          </CardTitle>
          <p className="text-muted-foreground">
            Join our network and reach more customers.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="contact@yourrestaurant.com" {...register("email", { required: "Email is required" })} />
                    {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                  {/* Personal Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="personal_phone">Personal Phone</Label>
                    <Input id="personal_phone" type="tel" placeholder="Your contact number" {...register("personal_phone", { required: "Personal phone is required" })} />
                    {errors.personal_phone && <p className="text-sm text-red-600">{errors.personal_phone.message}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Restaurant Name */}
                  <div className="space-y-2">
                    <Label htmlFor="restaurant_name">Restaurant Name</Label>
                    <Input id="restaurant_name" placeholder="Your restaurant's name" {...register("restaurant_name", { required: "Restaurant name is required" })} />
                    {errors.restaurant_name && <p className="text-sm text-red-600">{errors.restaurant_name.message}</p>}
                  </div>
                  {/* Restaurant Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="restaurant_phone">Restaurant Phone</Label>
                    <Input id="restaurant_phone" type="tel" placeholder="Business contact number" {...register("restaurant_phone", { required: "Restaurant phone is required" })} />
                    {errors.restaurant_phone && <p className="text-sm text-red-600">{errors.restaurant_phone.message}</p>}
                  </div>
                </div>
                {/* Restaurant Address */}
                <div className="space-y-2">
                  <Label>Restaurant Address</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Input placeholder="Town/Area" {...register("address_town", { required: "Town is required" })} />
                      {errors.address_town && <p className="text-xs text-red-600 mt-1">{errors.address_town.message}</p>}
                    </div>
                    <div>
                      <Input placeholder="City" {...register("address_city", { required: "City is required" })} />
                      {errors.address_city && <p className="text-xs text-red-600 mt-1">{errors.address_city.message}</p>}
                    </div>
                    <div>
                      <Input placeholder="State" {...register("address_state", { required: "State is required" })} />
                      {errors.address_state && <p className="text-xs text-red-600 mt-1">{errors.address_state.message}</p>}
                    </div>
                    <div>
                      <Input placeholder="Zipcode" {...register("address_zipcode", { required: "Zipcode is required" })} />
                      {errors.address_zipcode && <p className="text-xs text-red-600 mt-1">{errors.address_zipcode.message}</p>}
                    </div>
                  </div>
                </div>
                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website">Restaurant Website (Optional)</Label>
                  <Input id="website" placeholder="https://yourrestaurant.com" {...register("website")} />
                </div>
                <Button type="button" onClick={handleNext} className="w-full btn-hero">Next</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary border-b pb-2">Restaurant Docs</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* FSSAI License */}
                  <div className="space-y-2">
                    <Label htmlFor="fssai_license">FSSAI License</Label>
                    <Input id="fssai_license" type="file" {...register("fssai_license", { required: "FSSAI License is required" })} />
                    {errors.fssai_license && <p className="text-sm text-red-600">{errors.fssai_license.message}</p>}
                  </div>
                  {/* GST Certificate */}
                  <div className="space-y-2">
                    <Label htmlFor="gst_certificate">GST Registration</Label>
                    <Input id="gst_certificate" type="file" {...register("gst_certificate", { required: "GST Certificate is required" })} />
                    {errors.gst_certificate && <p className="text-sm text-red-600">{errors.gst_certificate.message}</p>}
                  </div>
                  {/* PAN Card */}
                  <div className="space-y-2">
                    <Label htmlFor="pan_card">PAN Card</Label>
                    <Input id="pan_card" type="file" {...register("pan_card", { required: "PAN Card is required" })} />
                    {errors.pan_card && <p className="text-sm text-red-600">{errors.pan_card.message}</p>}
                  </div>
                  {/* Shop License */}
                  <div className="space-y-2">
                    <Label htmlFor="shop_license">Shop & Establishment License</Label>
                    <Input id="shop_license" type="file" {...register("shop_license", { required: "Shop License is required" })} />
                    {errors.shop_license && <p className="text-sm text-red-600">{errors.shop_license.message}</p>}
                  </div>
                </div>
                {/* Business Proof */}
                <div className="space-y-2">
                  <Label htmlFor="business_proof">Business Registration Proof</Label>
                  <Input id="business_proof" type="file" {...register("business_proof", { required: "Business Proof is required" })} />
                  {errors.business_proof && <p className="text-sm text-red-600">{errors.business_proof.message}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
                  <Button type="submit" disabled={isSubmitting} className="w-full btn-hero">
                    {isSubmitting ? <LoadingSpinner size="sm" className="mr-2" /> : "Submit Application"}
                  </Button>
                </div>
              </div>
            )}

            <p className="text-sm text-center text-muted-foreground">
              Already a partner?{" "}
              <Link to="/restaurants/login" className="text-accent font-medium hover:underline">Log in</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default RestaurantRegister;