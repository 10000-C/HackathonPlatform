import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import HackathonsPage from './pages/HackathonsPage'
import CreateHackathonForm from './pages/CreateHackathonForm'
import { WalletProvider, useWallet } from './utils/WalletContext'
import DashboardLayout from './components/DashboardLayout'
import Test from './pages/test'

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          {/* 公开路由 - 未连接钱包时显示首页 */}
          <Route path="/" element={<HomePage />} />
          <Route path='/test' element={<Test />} />
          {/* 认证后的路由 */}
          <Route element={<DashboardLayout />}>
            <Route path="/hackathons" element={<HackathonsPage />} />
            <Route path="/create-event" element={<CreateHackathonForm />} />
            <Route path="/my-participations" element={<div>My Participations Page</div>} />
            <Route path="/my-projects" element={<div>My Projects Page</div>} />
            <Route path="/resources" element={<div>Resources Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
            
          </Route>
        </Routes>
      </Router>
    </WalletProvider>
  )
}

export default App
