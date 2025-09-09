import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    User,
    Mail,
    Shield,
    CreditCard,
    Bell,
    Settings,
    Download,
    Trash2,
    Camera,
    Save,
} from "lucide-react";

const Account = () => {
    const { user, updatePassword } = useAuth();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        try {
            // Here you would typically call an API to update user profile
            // For now, we'll just show a success message
            toast.success("Profile Updated", "Profile updated successfully!");
            setIsEditing(false);
        } catch (err) {
            toast.error(
                "Update Failed",
                "Failed to update profile. Please try again.",
            );
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Password Mismatch", "New passwords do not match");
            return;
        }

        if (passwordData.newPassword.length < 8) {
            toast.error(
                "Invalid Password",
                "Password must be at least 8 characters long",
            );
            return;
        }

        try {
            const { error } = await updatePassword(passwordData.newPassword);
            if (error) {
                toast.error("Password Update Failed", error.message);
            } else {
                toast.success(
                    "Password Updated",
                    "Password updated successfully!",
                );
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            }
        } catch (err) {
            toast.error(
                "Update Failed",
                "Failed to update password. Please try again.",
            );
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    Account Settings
                </h1>
                <p className="text-gray-600">
                    Manage your account information and preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Information */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="w-5 h-5 mr-2" />
                                Profile Information
                            </CardTitle>
                            <CardDescription>
                                Update your account details and profile
                                information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src={user?.avatar} />
                                    <AvatarFallback className="bg-blue-600 text-white text-lg">
                                        {user?.name
                                            ?.split(" ")
                                            .map((n) => n[0])
                                            .join("") || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <Button
                                        className="bg-blue-600 hover:bg-blue-700"
                                        size="sm"
                                    >
                                        <Camera className="w-4 h-4 mr-2" />
                                        Change Photo
                                    </Button>
                                    <p className="text-xs text-gray-500 mt-1">
                                        JPG, PNG or GIF. Max size 2MB.
                                    </p>
                                </div>
                            </div>

                            <form
                                onSubmit={handleProfileUpdate}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <Input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                            disabled={!isEditing}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value,
                                                })
                                            }
                                            disabled={!isEditing}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2">
                                    {isEditing ? (
                                        <>
                                            <Button
                                                className="bg-gray-800 text-white hover:bg-gray-700 hover:text-white"
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setIsEditing(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Changes
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            Edit Profile
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Security Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Shield className="w-5 h-5 mr-2" />
                                Security
                            </CardTitle>
                            <CardDescription>
                                Manage your password and security preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handlePasswordChange}
                                className="space-y-4"
                                autoComplete="off"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Password
                                    </label>
                                    <Input
                                        type="password"
                                        autoComplete="current-password" // Changed from "current-password"
                                        data-lpignore="true"
                                        name="current-password-field" // Unique name
                                        value={passwordData.currentPassword}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                currentPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Enter current password"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <Input
                                            type="password"
                                            autoComplete="new-password"
                                            data-lpignore="true"
                                            value={passwordData.newPassword}
                                            onChange={(e) =>
                                                setPasswordData({
                                                    ...passwordData,
                                                    newPassword: e.target.value,
                                                })
                                            }
                                            placeholder="Enter new password"
                                            minLength={8}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <Input
                                            type="password"
                                            autoComplete="new-password"
                                            data-lpignore="true"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) =>
                                                setPasswordData({
                                                    ...passwordData,
                                                    confirmPassword:
                                                        e.target.value,
                                                })
                                            }
                                            placeholder="Confirm new password"
                                            minLength={8}
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Update Password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Subscription Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CreditCard className="w-5 h-5 mr-2" />
                                Subscription
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <Badge variant="secondary" className="mb-2">
                                    Free Plan
                                </Badge>
                                <p className="text-sm text-gray-600">
                                    2 analyses remaining this month
                                </p>
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                Upgrade Plan
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                                View Billing
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Settings className="w-5 h-5 mr-2" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button className="bg-blue-600 hover:bg-blue-700 w-full justify-start">
                                <Bell className="w-4 h-4 mr-2" />
                                Notification Settings
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 w-full justify-start">
                                <Download className="w-4 h-4 mr-2" />
                                Export Data
                            </Button>
                            <Separator className="my-2" />
                            <Button
                                variant="outline"
                                className="w-full justify-start text-white bg-red-600 hover:bg-red-700 hover:text-white"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Account
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Account Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Contracts Analyzed
                                </span>
                                <span className="font-medium">23</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Member Since
                                </span>
                                <span className="font-medium">Jan 2025</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Last Login
                                </span>
                                <span className="font-medium">Today</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Account;
