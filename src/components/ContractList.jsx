import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FileText,
    Eye,
    Download,
    Trash2,
    RefreshCw,
    Search,
    Filter,
    MoreHorizontal,
    Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { API_BASE } from "@/lib/config";
import AnalysisTypeDialog from "./AnalysisTypeDialog";

const ContractList = ({ contracts, loading, onRefresh }) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("created_at");

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [analysisDialogOpen, setAnalysisDialogOpen] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null);

    // Add a fallback mechanism to ensure contracts are loaded
    useEffect(() => {
        console.log("=== MOBILE DEBUG: ContractList mounted ===");
        console.log("Contracts prop:", contracts);
        console.log("Contracts length:", contracts.length);
        console.log("Loading state:", loading);

        // If contracts array is empty and not currently loading, trigger a refresh
        if (contracts.length === 0 && !loading) {
            console.log("No contracts found, triggering refresh...");
            onRefresh();
        }
    }, []);

    // Log whenever contracts or loading state changes
    useEffect(() => {
        console.log("=== MOBILE DEBUG: ContractList props changed ===");
        console.log("Contracts:", contracts);
        console.log("Contracts length:", contracts.length);
        console.log("Loading:", loading);
    }, [contracts, loading]);

    const handleDownload = (contractId) => {
        const downloadUrl = `${API_BASE}/contracts/${contractId}/download`;
        window.open(downloadUrl, "_blank");
    };

    const handleAnalysisStarted = () => {
        // Refresh the contract list after a short delay to show updated status
        setTimeout(onRefresh, 1000);
    };

    const handleDelete = async () => {
        if (!selectedContract) return;

        try {
            const response = await fetch(
                `${API_BASE}/contracts/${selectedContract.id}`,
                {
                    method: "DELETE",
                },
            );

            if (!response.ok) {
                throw new Error("Failed to delete contract");
            }

            toast({
                title: "Success",
                description: "Contract deleted successfully.",
            });
            onRefresh(); // Refresh the contract list
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setDeleteDialogOpen(false);
            setSelectedContract(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "analyzed":
                return "bg-green-100 text-green-800";
            case "processing":
                return "bg-blue-100 text-blue-800";
            case "uploaded":
                return "bg-yellow-100 text-yellow-800";
            case "error":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    // Filter and sort contracts
    const filteredContracts = contracts
        .filter((contract) => {
            const matchesSearch = contract.original_filename
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesStatus =
                statusFilter === "all" || contract.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.original_filename.localeCompare(
                        b.original_filename,
                    );
                case "size":
                    return b.file_size - a.file_size;
                case "status":
                    return a.status.localeCompare(b.status);
                case "created_at":
                default:
                    return new Date(b.created_at) - new Date(a.created_at);
            }
        });

    // Enhanced loading state with debug info
    if (loading) {
        console.log("ContractList rendering loading state");
        return (
            <div className="p-4 sm:p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="h-16 bg-gray-200 rounded"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    console.log("ContractList rendering with", contracts.length, "contracts");

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Contracts
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Manage and review all your uploaded contracts.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <Button
                        variant="outline"
                        onClick={onRefresh}
                        disabled={loading}
                        className="w-full sm:w-auto"
                    >
                        <RefreshCw
                            className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
                        />
                        Refresh
                    </Button>
                    <Link to="/upload">
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                            <FileText className="w-4 h-4 mr-2" />
                            Upload Contract
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Filters and Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search contracts..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-full sm:w-48">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="uploaded">
                                    Uploaded
                                </SelectItem>
                                <SelectItem value="processing">
                                    Processing
                                </SelectItem>
                                <SelectItem value="analyzed">
                                    Analyzed
                                </SelectItem>
                                <SelectItem value="error">Error</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="created_at">
                                    Date Created
                                </SelectItem>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="size">File Size</SelectItem>
                                <SelectItem value="status">Status</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Contracts Table */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        {filteredContracts.length} Contract
                        {filteredContracts.length !== 1 ? "s" : ""}
                    </CardTitle>
                    <CardDescription>
                        {searchTerm || statusFilter !== "all"
                            ? `Filtered from ${contracts.length} total contracts`
                            : "All your uploaded contracts"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {filteredContracts.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {contracts.length === 0
                                    ? "No contracts uploaded"
                                    : "No contracts match your filters"}
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {contracts.length === 0
                                    ? "Upload your first contract to get started with AI-powered analysis."
                                    : "Try adjusting your search or filter criteria."}
                            </p>
                            {contracts.length === 0 && (
                                <Link to="/upload">
                                    <Button>
                                        <FileText className="w-4 h-4 mr-2" />
                                        Upload Contract
                                    </Button>
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="w-full rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Contract Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>File Size</TableHead>
                                        <TableHead>Upload Date</TableHead>
                                        <TableHead>Analyses</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredContracts.map((contract) => (
                                        <TableRow key={contract.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <FileText className="w-5 h-5 text-gray-400" />
                                                    <div>
                                                        <p className="font-medium text-gray-900 truncate max-w-32 sm:max-w-xs">
                                                            {
                                                                contract.original_filename
                                                            }
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {contract.contract_type ||
                                                                "Unknown type"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <Badge
                                                    className={getStatusColor(
                                                        contract.status,
                                                    )}
                                                >
                                                    {contract.status}
                                                </Badge>
                                            </TableCell>

                                            <TableCell className="text-gray-600">
                                                {formatFileSize(
                                                    contract.file_size,
                                                )}
                                            </TableCell>

                                            <TableCell className="text-gray-600">
                                                {formatDate(
                                                    contract.created_at,
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                <span className="text-sm text-gray-600">
                                                    {contract.analyses_count ||
                                                        0}
                                                </span>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    {contract.status ===
                                                        "analyzed" && (
                                                        <Link
                                                            to={`/contracts/${contract.id}/analysis`}
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="hover:bg-gray-200 dark:hover:bg-gray-700"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                    )}

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            {(contract.status ===
                                                                "uploaded" ||
                                                                contract.status ===
                                                                    "analyzed") && (
                                                                <DropdownMenuItem
                                                                    onSelect={() => {
                                                                        setSelectedContract(
                                                                            contract,
                                                                        );
                                                                        setAnalysisDialogOpen(
                                                                            true,
                                                                        );
                                                                    }}
                                                                >
                                                                    <Shield className="w-4 h-4 mr-2" />
                                                                    {contract.status ===
                                                                    "analyzed"
                                                                        ? "Re-analyze"
                                                                        : "Analyze"}
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuItem
                                                                onSelect={() =>
                                                                    handleDownload(
                                                                        contract.id,
                                                                    )
                                                                }
                                                            >
                                                                <Download className="w-4 h-4 mr-2" />
                                                                Download
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-red-600"
                                                                onSelect={() => {
                                                                    setSelectedContract(
                                                                        contract,
                                                                    );
                                                                    setDeleteDialogOpen(
                                                                        true,
                                                                    );
                                                                }}
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                <span>
                                                                    Delete
                                                                </span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the contract and all associated analysis
                            data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Analysis Type Dialog */}
            {selectedContract && (
                <AnalysisTypeDialog
                    contractId={selectedContract.id}
                    open={analysisDialogOpen}
                    onOpenChange={setAnalysisDialogOpen}
                    onAnalysisStarted={handleAnalysisStarted}
                />
            )}
        </div>
    );
};

export default ContractList;
