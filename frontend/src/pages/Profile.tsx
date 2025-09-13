import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/AuthContext";

interface ProfileData {
    username: string;
    email: string;
    avatar_url?: string;
}

const Profile = () => {
    const { isAuthenticated, loading } = useAuth(); // ✅ include loading
    const navigate = useNavigate();
    const [profile, setProfile] = useState<ProfileData>({
        username: "",
        email: "",
        avatar_url: "",
    });

    // ✅ Wait for auth to finish loading before redirect
    useEffect(() => {
        if (!loading && !isAuthenticated) navigate("/login");
    }, [loading, isAuthenticated, navigate]);

    // Fetch profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("access_token")?.trim();
                console.log("Token:", token);

                if (!token) throw new Error("Not authenticated");

                const res = await fetch("http://127.0.0.1:8000/api/users/profile/?format=json", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch profile");

                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.error(err);
                alert("Failed to load profile");
            }
        };

        if (!loading && isAuthenticated) fetchProfile();
    }, [loading, isAuthenticated]);

    const getInitials = (name: string) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

    if (loading) return null; // ✅ wait for auth to finish

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="swiss-container py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header with User Info */}
                    <div className="mb-12 flex justify-end lg:justify-between items-center">
                        <div className="hidden lg:block">
                            <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
                            <p className="text-muted-foreground text-lg">
                                Manage your account information and preferences
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="font-semibold text-lg text-foreground">{profile.username}</div>
                                <div className="text-sm text-muted-foreground flex items-center justify-end">
                                    <Mail className="w-4 h-4 mr-2" />
                                    {profile.email}
                                </div>
                            </div>
                            <Avatar className="w-16 h-16">
                                <AvatarImage src={profile.avatar_url} alt={profile.username} />
                                <AvatarFallback className="text-xl font-bold bg-gradient-accent text-accent-foreground">
                                    {profile.username ? getInitials(profile.username) : <User className="w-6 h-6" />}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    {/* Additional Cards for Future Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="card-feature">
                            <CardHeader>
                                <CardTitle className="text-foreground">Order History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    View your past orders and reorder your favorites
                                </p>
                                <Button variant="outline" className="btn-ghost" disabled>
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="card-feature">
                            <CardHeader>
                                <CardTitle className="text-foreground">Preferences</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Manage your dietary preferences and delivery settings
                                </p>
                                <Button variant="outline" className="btn-ghost" disabled>
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="card-feature">
                            <CardHeader>
                                <CardTitle className="text-foreground">Address Book</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Save and manage your delivery addresses for faster checkout.
                                </p>
                                <Button variant="outline" className="btn-ghost" disabled>
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
