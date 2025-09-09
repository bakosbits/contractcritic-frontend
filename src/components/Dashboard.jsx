import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FileText,
    AlertTriangle,
    CheckCircle,
    Clock,
    TrendingUp,
    Upload,
    Eye,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { API_BASE } from "@/lib/config";

const Dashboard = ({ contracts, loading, user }) => {
    const [dashboardStats, setDashboardStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const { getAccessToken } = useAuth();
    const { toast } = useToast();

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setStatsLoading(true);
            const token = await getAccessToken();
            const response = await fetch(`${API_BASE}/dashboard/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setDashboardStats(data.data);
            } else {
                toast.warning(
                    "Dashboard Stats",
                    "Unable to load dashboard statistics. Using default values.",
                );
            }
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
            toast.error(
                "Dashboard Error",
                "Failed to load dashboard statistics. Please refresh the page.",
            );
        } finally {
            setStatsLoading(false);
        }
    };

    const getRiskColor = (level) => {
        switch (level?.toLowerCase()) {
            case "high":
                return "text-red-600 bg-red-50";
            case "medium":
                return "text-orange-600 bg-orange-50";
            case "low":
                return "text-green-600 bg-green-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading || statsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="xl" text="Loading dashboard..." />
            </div>
        );
    }

    const stats = dashboardStats || {
        total_contracts: contracts.length,
        status_breakdown: { uploaded: 0, processing: 0, analyzed: 0, error: 0 },
        risk_distribution: { high_risk: 0, medium_risk: 0, low_risk: 0 },
        recent_activity: contracts.slice(0, 5),
    };

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Welcome back, {user.name}. Here's your contract
                        overview.
                    </p>
                </div>
                <Link to="/upload">
                    <Button className="bg-gray-200 text-gray-900 hover:bg-gray-50 w-full sm:w-auto">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Contract
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Contracts
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.total_contracts}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {stats.status_breakdown.analyzed} analyzed
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending Review
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.status_breakdown.uploaded +
                                stats.status_breakdown.processing}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Awaiting analysis
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Highest Risk
                        </CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {stats.risk_distribution.high_risk}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Require attention
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Lowest Risk
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.risk_distribution.low_risk}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Safe to proceed
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Risk Assessment Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Risk Assessment</CardTitle>
                        <CardDescription>
                            Distribution of contract risk levels
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-sm">
                                        Highest Risk
                                    </span>
                                </div>
                                <span className="text-sm font-medium">
                                    {stats.risk_distribution.high_risk}
                                </span>
                            </div>
                            <Progress
                                value={
                                    (stats.risk_distribution.high_risk /
                                        Math.max(stats.total_contracts, 1)) *
                                    100
                                }
                                className="h-2"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                    <span className="text-sm">
                                        Middle Of The Pack
                                    </span>
                                </div>
                                <span className="text-sm font-medium">
                                    {stats.risk_distribution.medium_risk}
                                </span>
                            </div>
                            <Progress
                                value={
                                    (stats.risk_distribution.medium_risk /
                                        Math.max(stats.total_contracts, 1)) *
                                    100
                                }
                                className="h-2"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm">Lowest Risk</span>
                                </div>
                                <span className="text-sm font-medium">
                                    {stats.risk_distribution.low_risk}
                                </span>
                            </div>
                            <Progress
                                value={
                                    (stats.risk_distribution.low_risk /
                                        Math.max(stats.total_contracts, 1)) *
                                    100
                                }
                                className="h-2"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Latest contract uploads and analyses
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stats.recent_activity.length === 0 ? (
                            <div className="text-center py-8">
                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 mb-4">
                                    No contracts uploaded yet
                                </p>
                                <Link to="/upload">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Your First Contract
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {stats.recent_activity.map((contract) => (
                                    <div
                                        key={contract.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <FileText className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium truncate max-w-32 sm:max-w-48">
                                                    {contract.original_filename}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {formatDate(
                                                        contract.created_at,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Badge
                                                variant="secondary"
                                                className={`text-xs ${
                                                    contract.status ===
                                                    "analyzed"
                                                        ? "bg-green-100 text-green-800"
                                                        : contract.status ===
                                                            "processing"
                                                          ? "bg-blue-100 text-blue-800"
                                                          : contract.status ===
                                                              "error"
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {contract.status}
                                            </Badge>
                                            {contract.status === "analyzed" && (
                                                <Link
                                                    to={`/contracts/${contract.id}/analysis`}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                        Common tasks and shortcuts
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link to="/upload">
                            <Button className="bg-blue-600 hover:bg-blue-700 w-full h-20 flex flex-col space-y-2">
                                <Upload className="w-6 h-6" />
                                <span>Upload Contract</span>
                            </Button>
                        </Link>

                        <Link to="/contracts">
                            <Button className="bg-blue-600 hover:bg-blue-700 w-full h-20 flex flex-col space-y-2">
                                <FileText className="w-6 h-6" />
                                <span>View All Contracts</span>
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            className="w-full h-20 flex flex-col space-y-2"
                            disabled
                        >
                            <TrendingUp className="w-6 h-6" />
                            <span>Analytics (Coming Soon)</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
