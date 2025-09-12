import { useState } from "react";
import { User, Mail, Phone, MapPin, Edit3, Save, X } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({
        username: "Charan Zinugu",
        email: "johndoe@email.com",
        phone: "9876543210",
        address: "123 Main Street, City",
        avatar_url: ""
    });

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setIsEditing(false);
            setLoading(false);
            alert("Profile updated successfully ✅");
        }, 1000);
    };

    const handleInputChange = (field: string, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

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
                            <div className="flex flex-col md:flex-row items-start md:items-start md:space-x-8">
                                {/* Avatar */}
                                <div className="mb-6 md:mb-0 flex-shrink-0">
                                    <Avatar className="w-32 h-32">
                                        <AvatarImage src={profile.avatar_url} alt={profile.username} />
                                        <AvatarFallback className="text-2xl font-bold bg-gradient-accent text-accent-foreground">
                                            {profile.username ? getInitials(profile.username) : <User className="w-8 h-8" />}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                {/* Form + Buttons */}
                                <div className="flex-1 flex flex-col">
                                    {/* Profile Form */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Username - uneditable */}
                                        <div className="space-y-2">
                                            <Label htmlFor="username">Username</Label>
                                            <div className="p-3 bg-muted rounded-md">{profile.username}</div>
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <div className="p-3 bg-muted rounded-md flex items-center">
                                                <Mail className="w-4 h-4 mr-2" />
                                                {profile.email}
                                            </div>
                                            <p className="text-xs text-muted-foreground ms-2">Email cannot be changed</p>
                                        </div>

                                        {/* Phone */}
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

                                        {/* Address */}
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

                                    {/* Action Buttons - aligned to form only */}
                                    <div className="flex justify-center mt-6">
                                        {!isEditing ? (
                                            <Button onClick={() => setIsEditing(true)} className="btn-hero">
                                                <Edit3 className="w-4 h-4 mr-2" />
                                                Edit Profile
                                            </Button>
                                        ) : (
                                            <div className="flex space-x-3">
                                                <Button
                                                    onClick={() => setIsEditing(false)}
                                                    variant="outline"
                                                    className="btn-ghost"
                                                >
                                                    <X className="w-4 h-4 mr-2" />
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={handleSave}
                                                    disabled={loading}
                                                    className="btn-hero"
                                                >
                                                    <Save className="w-4 h-4 mr-2" />
                                                    {loading ? "Saving..." : "Save Changes"}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Extra Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="card-feature">
                            <CardHeader>
                                <CardTitle>Order History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    View your past orders and reorder your favorites
                                </p>
                                <Button variant="outline" disabled>
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="card-feature">
                            <CardHeader>
                                <CardTitle>Preferences</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Manage your dietary preferences and delivery settings
                                </p>
                                <Button variant="outline" disabled>
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
