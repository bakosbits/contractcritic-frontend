import { Link, useLocation } from "react-router-dom";
import {
    Home,
    Upload,
    FileText,
    BarChart3,
    Settings,
    Shield,
    User,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = ({ user, onClose }) => {
    const isMobile = useIsMobile();
    const location = useLocation();

    const navigation = [
        { name: "Dashboard", href: "/", icon: Home },
        { name: "Upload Contract", href: "/upload", icon: Upload },
        { name: "Contracts", href: "/contracts", icon: FileText },
        { name: "Analytics", href: "/analytics", icon: BarChart3 },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    const isActive = (href) => {
        if (href === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(href);
    };

    const handleNavClick = () => {
        if (isMobile && onClose) {
            onClose();
        }
    };

    return (
        <div className="flex flex-col w-64 h-full bg-gray-900 text-white">
            {/* Logo and Brand */}
            <div className="flex items-center px-6 py-4 border-b border-gray-700">
                <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">
                            Contract Critic
                        </h1>
                        <p className="text-xs text-gray-400">
                            AI Contract Review
                        </p>
                    </div>
                </div>
                {/* Close button for mobile */}
                {isMobile && onClose && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={handleNavClick}
                            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive(item.href)
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="px-4 py-4 border-t border-gray-700">
                <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-blue-600 text-white text-sm">
                            {user?.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "U"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                            {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                            {user?.email || "user@example.com"}
                        </p>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-3 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
