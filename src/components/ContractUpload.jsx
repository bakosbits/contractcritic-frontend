import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle,
  X,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'

const ContractUpload = ({ onContractUploaded, apiBase }) => {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { toast } = useToast()

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    setError(null)
    
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors.some(e => e.code === 'file-too-large')) {
        setError('File is too large. Maximum size is 10MB.')
      } else if (rejection.errors.some(e => e.code === 'file-invalid-type')) {
        setError('Invalid file type. Please upload PDF, DOCX, DOC, or TXT files.')
      } else {
        setError('File upload failed. Please try again.')
      }
      return
    }

    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    await uploadFile(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  })

  const uploadFile = async (file) => {
    setUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('user_id', '1') // In a real app, this would come from auth

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch(`${apiBase}/contracts/upload`, {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()
      setUploadedFile(data.data)
      
      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded successfully.`,
      })

      if (onContractUploaded) {
        onContractUploaded(data.data)
      }

    } catch (error) {
      console.error('Upload error:', error)
      setError(error.message || 'Upload failed. Please try again.')
      setUploadProgress(0)
      
      toast({
        title: "Upload Failed",
        description: error.message || 'Failed to upload contract. Please try again.',
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleAnalyze = () => {
    if (uploadedFile) {
      navigate(`/contracts/${uploadedFile.contract_id}/analysis`)
    }
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setError(null)
    setUploadProgress(0)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Upload Contract</h1>
        <p className="text-gray-600">Upload your contract for AI-powered analysis and risk assessment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Select Contract File</CardTitle>
            <CardDescription>
              Drag and drop your contract file or click to browse. Supports PDF, DOCX, DOC, and TXT files up to 10MB.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!uploadedFile ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
              >
                <input {...getInputProps()} />
                
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    {uploading ? (
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    ) : (
                      <Upload className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  
                  {uploading ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Uploading...</p>
                      <Progress value={uploadProgress} className="w-full" />
                      <p className="text-xs text-gray-500">{uploadProgress}% complete</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          {isDragActive ? 'Drop your contract here' : 'Drag & drop your contract'}
                        </p>
                        <p className="text-sm text-gray-500">or click to browse files</p>
                      </div>
                      
                      <Button variant="outline" disabled={uploading}>
                        <Upload className="w-4 h-4 mr-2" />
                        Browse Files
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">{uploadedFile.filename}</p>
                      <p className="text-sm text-green-700">
                        {formatFileSize(uploadedFile.file_size)} • Uploaded successfully
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetUpload}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex space-x-3">
                  <Button onClick={handleAnalyze} className="flex-1">
                    Analyze Contract
                  </Button>
                  <Button variant="outline" onClick={resetUpload}>
                    Upload Another
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <Alert className="mt-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Information Panel */}
        <Card>
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
            <CardDescription>
              Our AI will analyze your contract and provide detailed insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Document Processing</h4>
                  <p className="text-sm text-gray-600">We extract and analyze the text content from your contract.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium">AI Analysis</h4>
                  <p className="text-sm text-gray-600">Our AI identifies key terms, risks, and potential issues.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Risk Assessment</h4>
                  <p className="text-sm text-gray-600">Get a comprehensive risk score and detailed recommendations.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Plain English Summary</h4>
                  <p className="text-sm text-gray-600">Receive easy-to-understand explanations and action items.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Supported File Types</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">PDF</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">DOCX</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">DOC</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">TXT</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Maximum file size: 10MB</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ContractUpload

