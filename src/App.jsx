import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import ContractUpload from "@/components/ContractUpload";
import ContractList from "@/components/ContractList";
import ContractAnalysis from "@/components/ContractAnalysis";
import Account from "@/components/Account";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Privacy from "@/components/Privacy";
import Terms from "@/components/Terms";
import Legal from "@/components/Legal";
import Footer from "@/components/Footer";
import { Login } from "@/components/Auth/Login";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { API_BASE } from "./lib/config";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Login />;
    }

    return children;
};

// Main App component
const AppContent = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, getAccessToken, signOut } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useIsMobile();

    // Close sidebar on mobile when navigating
    useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false);
        }
    }, [isMobile]);

    // Fetch contracts only on initial load when user is authenticated
    useEffect(() => {
        if (user && contracts.length === 0) {
            fetchContracts();
        }
    }, [user]);

    const fetchContracts = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const token = await getAccessToken();

            const response = await fetch(`${API_BASE}/contracts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setContracts(data.data.contracts || []);
            } else if (response.status === 401) {
                // Token expired or invalid, sign out
                await signOut();
            } else {
                console.error(
                    "Failed to fetch contracts:",
                    response.statusText,
                );
            }
        } catch (error) {
            console.error("Error fetching contracts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleContractUploaded = (newContract) => {
        fetchContracts();
    };

    const handleContractAnalyzed = (contractId, analysisData) => {
        setContracts((prev) =>
            prev.map((contract) =>
                contract.id === contractId
                    ? { ...contract, status: "analyzed", ...analysisData }
                    : contract,
            ),
        );
    };

    // Create user object for components that expect it
    const userForComponents = user
        ? {
              id: user.id,
              name:
                  user.user_metadata?.full_name ||
                  user.email?.split("@")[0] ||
                  "User",
              email: user.email,
          }
        : null;

    if (!user) {
        return <Login />;
    }

    return (
        <div className="min-h-screen bg-gray-200">
            {/* Desktop Sidebar */}
            {!isMobile && (
                <div className="fixed top-0 left-0 bottom-0 w-64 z-40">
                    <Sidebar user={userForComponents} />
                </div>
            )}

            {/* Mobile Sidebar Overlay */}
            {isMobile && sidebarOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setSidebarOpen(false)}
                    />
                    {/* Sidebar */}
                    <div className="fixed inset-y-0 left-0 z-50">
                        <Sidebar
                            user={userForComponents}
                            onClose={() => setSidebarOpen(false)}
                        />
                    </div>
                </>
            )}

            {/* Main Content Area */}
            <main
                className={`
                    min-h-screen
                    ${!isMobile ? "ml-64 pt-8" : "pt-0"}
                `}
            >
                {/* Mobile Header/Menu Button */}
                {isMobile && (
                    <div className="flex items-center align-middle justify-between bg-gray-800 px-4 pt-2 pb-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 text-gray-100 hover:text-gray-300"
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                        <h1 className="text-lg font-semibold text-gray-100">
                            Contract Critic
                        </h1>
                        <div className="w-9" /> {/* Spacer for centering */}
                    </div>
                )}

                <div className="flex flex-col min-h-full">
                    <div className="flex-1">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Dashboard
                                        contracts={contracts}
                                        loading={loading}
                                        user={userForComponents}
                                    />
                                }
                            />
                            <Route
                                path="/upload"
                                element={
                                    <ContractUpload
                                        onContractUploaded={
                                            handleContractUploaded
                                        }
                                    />
                                }
                            />
                            <Route
                                path="/contracts"
                                element={
                                    <ContractList
                                        contracts={contracts}
                                        loading={loading}
                                        onRefresh={fetchContracts}
                                    />
                                }
                            />
                            <Route
                                path="/contracts/:contractId/analysis"
                                element={
                                    <ContractAnalysis
                                        onAnalysisComplete={
                                            handleContractAnalyzed
                                        }
                                    />
                                }
                            />
                            <Route path="/account" element={<Account />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/legal" element={<Legal />} />
                            <Route
                                path="/auth/callback"
                                element={
                                    <div className="min-h-screen flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                                            <p className="mt-4 text-gray-600">
                                                Completing authentication...
                                            </p>
                                        </div>
                                    </div>
                                }
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </main>

            <Toaster />
        </div>
    );
};

// App wrapper with Router and Auth Provider
const App = () => {
    return (
        <AuthProvider>
            <ToastProvider>
                <Router>
                    <ProtectedRoute>
                        <AppContent />
                    </ProtectedRoute>
                </Router>
            </ToastProvider>
        </AuthProvider>
    );
};

export default App;
