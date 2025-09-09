import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Zap, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/contexts/ToastContext";
import { API_BASE } from "@/lib/config";

const AnalysisTypeDialog = ({
    contractId,
    open,
    onOpenChange,
    onAnalysisStarted,
    trigger,
}) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { getAccessToken } = useAuth();
    const [analysisType, setAnalysisType] = useState("small_business");
    const [analyzing, setAnalyzing] = useState(false);

    const startAnalysis = async () => {
        try {
            setAnalyzing(true);

            const token = await getAccessToken();
            const response = await fetch(
                `${API_BASE}/contracts/${contractId}/analyze`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ analysis_type: analysisType }),
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Analysis failed");
            }

            // Analysis completed successfully
            setAnalyzing(false);
            onOpenChange(false);

            // Show completion toast after dialog closes
            toast.success(
                "Analysis Completed",
                "Your contract analysis is ready to view!",
            );

            if (onAnalysisStarted) {
                onAnalysisStarted();
            }

            // Navigate to analysis page
            navigate(`/contracts/${contractId}/analysis`);
        } catch (error) {
            console.error("Analysis error:", error);
            setAnalyzing(false);
            toast.error("Analysis Failed", error.message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Choose An Analysis Type</DialogTitle>
                    <DialogDescription>
                        Select the type of analysis you want to perform on your
                        contract.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {analyzing ? (
                        <div className="flex flex-col items-center justify-center py-8 space-y-4">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-900">
                                    Analyzing your contract...
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    This may take a few moments
                                </p>
                            </div>
                        </div>
                    ) : (
                        <RadioGroup
                            value={analysisType}
                            onValueChange={setAnalysisType}
                            className="space-y-4"
                        >
                            <div className="flex items-start space-x-3 p-3 border rounded-lg">
                                <RadioGroupItem
                                    value="small_business"
                                    id="small_business"
                                />
                                <div className="flex-1">
                                    <Label
                                        htmlFor="small_business"
                                        className="font-medium flex items-center"
                                    >
                                        <Shield className="w-4 h-4 mr-2 text-blue-600" />
                                        Small Business, Frelancers
                                    </Label>
                                    <p className="text-sm text-gray-500 mt-1">
                                        A detailed review of all contract terms,
                                        clauses, and potential risks that would
                                        concern small business owners. Provides
                                        thorough recommendations.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3 p-3 border rounded-lg">
                                <RadioGroupItem
                                    value="individual"
                                    id="individual"
                                />
                                <div className="flex-1">
                                    <Label
                                        htmlFor="individual"
                                        className="font-medium flex items-center"
                                    >
                                        <Zap className="w-4 h-4 mr-2 text-amber-500" />
                                        Individuals
                                    </Label>
                                    <p className="text-sm text-gray-500 mt-1">
                                        A detailed review of all contract terms,
                                        clauses, and potential risks that an
                                        individual would be concerned with.
                                        Provides thorough recommendations.
                                    </p>
                                </div>
                            </div>
                        </RadioGroup>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        className="bg-gray-800 text-white hover:bg-gray-700 hover:text-white"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={analyzing}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={startAnalysis}
                        disabled={analyzing}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {analyzing ? "Analyzing..." : "Start Analysis"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AnalysisTypeDialog;
