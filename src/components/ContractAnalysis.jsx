import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileText,
  Loader2,
  Download,
  Share,
  RefreshCw,
  Shield,
  AlertCircle,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'

const ContractAnalysis = ({ onAnalysisComplete, apiBase }) => {
  const { contractId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [contract, setContract] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (contractId) {
      fetchContractAndAnalysis()
    }
  }, [contractId])

  const fetchContractAndAnalysis = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch contract details
      const contractResponse = await fetch(`${apiBase}/contracts/${contractId}`)
      if (!contractResponse.ok) {
        throw new Error('Contract not found')
      }
      const contractData = await contractResponse.json()
      setContract(contractData.data)

      // Try to fetch existing analysis
      const analysisResponse = await fetch(`${apiBase}/contracts/${contractId}/analysis`)
      if (analysisResponse.ok) {
        const analysisData = await analysisResponse.json()
        setAnalysis(analysisData.data)
      } else if (contractData.data.status === 'uploaded') {
        // If no analysis exists and contract is uploaded, start analysis
        await startAnalysis()
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const startAnalysis = async (analysisType = 'comprehensive') => {
    try {
      setAnalyzing(true)
      setError(null)

      const response = await fetch(`${apiBase}/contracts/${contractId}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ analysis_type: analysisType })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Analysis failed')
      }

      const data = await response.json()
      
      toast({
        title: "Analysis Started",
        description: "Your contract is being analyzed. This may take a few moments.",
      })

      // Poll for analysis completion
      await pollForAnalysis()

    } catch (error) {
      console.error('Analysis error:', error)
      setError(error.message)
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setAnalyzing(false)
    }
  }

  const pollForAnalysis = async () => {
    const maxAttempts = 30 // 30 seconds max
    let attempts = 0

    const poll = async () => {
      try {
        const response = await fetch(`${apiBase}/contracts/${contractId}/analysis`)
        if (response.ok) {
          const data = await response.json()
          if (data.data.status === 'completed') {
            setAnalysis(data.data)
            if (onAnalysisComplete) {
              onAnalysisComplete(contractId, data.data)
            }
            toast({
              title: "Analysis Complete",
              description: "Your contract analysis is ready!",
            })
            return
          }
        }

        attempts++
        if (attempts < maxAttempts) {
          setTimeout(poll, 1000) // Poll every second
        } else {
          throw new Error('Analysis timeout')
        }
      } catch (error) {
        console.error('Polling error:', error)
        setError('Analysis is taking longer than expected. Please refresh the page.')
      }
    }

    poll()
  }

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-orange-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getRiskBgColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'bg-red-50 border-red-200'
      case 'medium': return 'bg-orange-50 border-orange-200'
      case 'low': return 'bg-green-50 border-green-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'medium': return <AlertCircle className="w-4 h-4 text-orange-500" />
      case 'low': return <Info className="w-4 h-4 text-blue-500" />
      default: return <Info className="w-4 h-4 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate('/contracts')} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contracts
          </Button>
        </div>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/contracts')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contracts
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contract Analysis</h1>
            <p className="text-gray-600">{contract?.original_filename}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={fetchContractAndAnalysis}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          {!analysis && contract?.status === 'uploaded' && (
            <Button onClick={() => startAnalysis()} disabled={analyzing}>
              {analyzing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Shield className="w-4 h-4 mr-2" />
              )}
              {analyzing ? 'Analyzing...' : 'Start Analysis'}
            </Button>
          )}
        </div>
      </div>

      {/* Analysis Status */}
      {analyzing && (
        <Alert>
          <Loader2 className="h-4 w-4 animate-spin" />
          <AlertDescription>
            Analyzing your contract with AI. This may take a few moments...
          </AlertDescription>
        </Alert>
      )}

      {!analysis && !analyzing && contract?.status === 'uploaded' && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This contract hasn't been analyzed yet. Click "Start Analysis" to begin AI-powered review.
          </AlertDescription>
        </Alert>
      )}

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Risk Score Card */}
          <Card className={`lg:col-span-1 ${getRiskBgColor(analysis.risk_level)}`}>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Risk Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${analysis.risk_score || 0}, 100`}
                    className={getRiskColor(analysis.risk_level)}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getRiskColor(analysis.risk_level)}`}>
                      {Math.round(analysis.risk_score || 0)}
                    </div>
                    <div className="text-xs text-gray-600">out of 100</div>
                  </div>
                </div>
              </div>
              
              <div>
                <Badge className={`${getRiskColor(analysis.risk_level)} text-lg px-4 py-1`}>
                  {analysis.risk_level} Risk
                </Badge>
                <p className="text-sm text-gray-600 mt-2">
                  Based on AI analysis of contract terms and conditions
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Terms */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Key Contract Terms</CardTitle>
              <CardDescription>Important clauses and conditions identified</CardDescription>
            </CardHeader>
            <CardContent>
              {analysis.analysis_results?.key_terms ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(analysis.analysis_results.key_terms).map(([key, value]) => (
                    <div key={key} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 capitalize mb-1">
                        {key.replace(/_/g, ' ')}
                      </h4>
                      <p className="text-sm text-gray-600">{value || 'Not specified'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No key terms data available</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Factors */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Factors</CardTitle>
              <CardDescription>Identified risks and concerns</CardDescription>
            </CardHeader>
            <CardContent>
              {analysis.risk_factors && analysis.risk_factors.length > 0 ? (
                <div className="space-y-4">
                  {analysis.risk_factors.map((factor, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      {getSeverityIcon(factor.severity)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{factor.category}</h4>
                        <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                        {factor.recommendation && (
                          <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                            <strong>Recommendation:</strong> {factor.recommendation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No specific risk factors identified</p>
              )}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Suggested actions and improvements</CardDescription>
            </CardHeader>
            <CardContent>
              {analysis.analysis_results?.recommendations ? (
                <div className="space-y-4">
                  {analysis.analysis_results.recommendations.suggested_changes?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Suggested Changes</h4>
                      <ul className="space-y-2">
                        {analysis.analysis_results.recommendations.suggested_changes.map((change, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.analysis_results.recommendations.negotiation_points?.length > 0 && (
                    <div>
                      <Separator />
                      <h4 className="font-medium text-gray-900 mb-2 mt-4">Negotiation Points</h4>
                      <ul className="space-y-2">
                        {analysis.analysis_results.recommendations.negotiation_points.map((point, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.analysis_results.recommendations.priority_actions?.length > 0 && (
                    <div>
                      <Separator />
                      <h4 className="font-medium text-gray-900 mb-2 mt-4">Priority Actions</h4>
                      <ul className="space-y-2">
                        {analysis.analysis_results.recommendations.priority_actions.map((action, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Clock className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No recommendations available</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Plain English Summary */}
      {analysis?.analysis_results?.plain_english_summary && (
        <Card>
          <CardHeader>
            <CardTitle>Plain English Summary</CardTitle>
            <CardDescription>Easy-to-understand explanation of your contract</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {analysis.analysis_results.plain_english_summary}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Metadata */}
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Details</CardTitle>
            <CardDescription>Technical information about this analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">AI Model</p>
                <p className="font-medium">{analysis.ai_model_used}</p>
              </div>
              <div>
                <p className="text-gray-500">Analysis Type</p>
                <p className="font-medium capitalize">{analysis.analysis_type}</p>
              </div>
              <div>
                <p className="text-gray-500">Processing Time</p>
                <p className="font-medium">{analysis.processing_time_ms}ms</p>
              </div>
              <div>
                <p className="text-gray-500">Tokens Used</p>
                <p className="font-medium">{analysis.tokens_used?.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ContractAnalysis

