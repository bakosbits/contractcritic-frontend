import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/toaster'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import ContractUpload from '@/components/ContractUpload'
import ContractList from '@/components/ContractList'
import ContractAnalysis from '@/components/ContractAnalysis'
import './App.css'

function App() {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(false)
  const [user] = useState({ id: 1, name: 'John Smith', email: 'john@example.com' })

  // API base URL - will work with both development and production
  const API_BASE = '/api'

  // Fetch contracts on component mount
  useEffect(() => {
    fetchContracts()
  }, [])

  const fetchContracts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/contracts?user_id=${user.id}`)
      if (response.ok) {
        const data = await response.json()
        setContracts(data.data.contracts || [])
      }
    } catch (error) {
      console.error('Error fetching contracts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleContractUploaded = (newContract) => {
    setContracts(prev => [newContract, ...prev])
  }

  const handleContractAnalyzed = (contractId, analysisData) => {
    setContracts(prev => 
      prev.map(contract => 
        contract.id === contractId 
          ? { ...contract, status: 'analyzed', ...analysisData }
          : contract
      )
    )
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar user={user} />
        
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  contracts={contracts}
                  loading={loading}
                  user={user}
                  apiBase={API_BASE}
                />
              } 
            />
            <Route 
              path="/upload" 
              element={
                <ContractUpload 
                  onContractUploaded={handleContractUploaded}
                  apiBase={API_BASE}
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
                  apiBase={API_BASE}
                />
              } 
            />
          </Routes>
        </main>
        
        <Toaster />
      </div>
    </Router>
  )
}

export default App

