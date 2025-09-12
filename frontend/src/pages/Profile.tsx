import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Edit3, Save, X } from "lucide-react";
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
    phone: string;
    address: string;
    avatar_url?: string;
}

const Profile = () => {
    const { isAuthenticated, loading } = useAuth(); // ✅ include loading
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<ProfileData>({
        username: "",
        email: "",
        phone: "",
        address: "",
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

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem("access_token")?.trim();
            if (!token) throw new Error("Not authenticated");

            const res = await fetch("http://127.0.0.1:8000/api/users/profile/?format=json", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(profile),
            });

            if (!res.ok) throw new Error("Failed to update profile");

            const updatedProfile = await res.json();
            setProfile(updatedProfile);
            setIsEditing(false);
            alert("Profile updated successfully ✅");
        } catch (err) {
            console.error(err);
            alert("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (field: keyof ProfileData, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

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
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-foreground mb-4">My Profile</h1>
                        <p className="text-muted-foreground text-lg">
                            Manage your account information and preferences
                        </p>
                    </div>

                    {/* Profile Card */}
                    <Card className="card-elegant mb-8">
                        <CardHeader className="pb-8">
                            <div className="flex flex-col md:flex-row items-start md:space-x-8">
                                <div className="mb-6 md:mb-0 flex-shrink-0">
                                    <Avatar className="w-32 h-32">
                                        <AvatarImage src={profile.avatar_url} alt={profile.username} />
                                        <AvatarFallback className="text-2xl font-bold bg-gradient-accent text-accent-foreground">
                                            {profile.username ? getInitials(profile.username) : <User className="w-8 h-8" />}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="username">Username</Label>
                                            <div className="p-3 bg-muted rounded-md">{profile.username}</div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <div className="p-3 bg-muted rounded-md flex items-center">
                                                <Mail className="w-4 h-4 mr-2" />
                                                {profile.email}
                                            </div>
                                            <p className="text-xs text-muted-foreground ms-2">Email cannot be changed</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            {isEditing ? (
                                                <Input
                                                    id="phone"
                                                    value={profile.phone}
                                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                                />
                                            ) : (
                                                <div className="p-3 bg-muted rounded-md flex items-center">
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    {profile.phone}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            {isEditing ? (
                                                <Input
                                                    id="address"
                                                    value={profile.address}
                                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                                />
                                            ) : (
                                                <div className="p-3 bg-muted rounded-md flex items-center">
                                                    <MapPin className="w-4 h-4 mr-2" />
                                                    {profile.address}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-center mt-6">
                                        {!isEditing ? (
                                            <Button onClick={() => setIsEditing(true)} className="btn-hero">
                                                <Edit3 className="w-4 h-4 mr-2" />
                                                Edit Profile
                                            </Button>
                                        ) : (
                                            <div className="flex space-x-3">
                                                <Button onClick={() => setIsEditing(false)} variant="outline" className="btn-ghost">
                                                    <X className="w-4 h-4 mr-2" />
                                                    Cancel
                                                </Button>
                                                <Button onClick={handleSave} disabled={saving} className="btn-hero">
                                                    <Save className="w-4 h-4 mr-2" />
                                                    {saving ? "Saving..." : "Save Changes"}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
