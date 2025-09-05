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
import { useIsMobile } from "@/hooks/use-mobile";
import { API_BASE } from "./lib/config";
import "./App.css";

// Main App component
const AppContent = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useState({
        id: 1,
        name: "Rich Bakos",
        email: "rich@bakos.me",
    });
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useIsMobile();

    // Close sidebar on mobile when navigating
    useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false);
        }
    }, [isMobile]);

    const fetchContracts = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${API_BASE}/contracts?user_id=${user.id}`,
            );
            if (response.ok) {
                const data = await response.json();
                setContracts(data.data.contracts || []);
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

    return (
        <div className="h-screen bg-gray-50">
            {/* Fixed Desktop Sidebar - Extends to top */}
            {!isMobile && (
                <div className="fixed top-0 left-0 bottom-0 w-64 z-40">
                    <Sidebar user={user} />
                </div>
            )}

            {/* Fixed Header - Butts against sidebar */}
            <header className={`fixed top-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-50 ${!isMobile ? 'left-64' : 'left-0'}`}>
                {isMobile && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarOpen(true)}
                        className="p-2"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                )}
                <h1 className="text-lg font-semibold text-gray-900">
                    Contract Critic
                </h1>
                {isMobile && <div className="w-9" />} {/* Spacer for centering on mobile */}
            </header>

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
                            user={user}
                            onClose={() => setSidebarOpen(false)}
                        />
                    </div>
                </>
            )}

            {/* Main Content Area */}
            <main 
                className={`
                    fixed top-16 bottom-0 right-0 overflow-y-auto
                    ${!isMobile ? 'left-64' : 'left-0'}
                `}
            >
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Dashboard
                                contracts={contracts}
                                loading={loading}
                                user={user}
                            />
                        }
                    />
                    <Route
                        path="/upload"
                        element={
                            <ContractUpload
                                onContractUploaded={handleContractUploaded}
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
                                onAnalysisComplete={handleContractAnalyzed}
                            />
                        }
                    />
                </Routes>
            </main>

            <Toaster />
        </div>
    );
};

// App wrapper with Router
const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
