import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import HackathonsPage from './pages/HackathonsPage'
import CreateHackathonForm from './pages/CreateHackathonPage'
import { WalletProvider, useWallet } from './utils/WalletContext'
import HackathonLayout from './components/HackathonLayout'
import Test from './pages/test'
import JudgeDashboard from './pages/JudgeDashboard';
import HackathonDetailPage from './pages/HackathonDetailPage';
import CreateProjectPage from './pages/CreateProjectPage';


function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          {/* 公开路由 - 未连接钱包时显示首页 */}
          <Route path="/" element={<HomePage />} />
          <Route path='/test' element={<Test />} />
          <Route path="/judge-dashboard" element={<JudgeDashboard />} />
          {/* 创建活动页面 - 独立布局 */}
          <Route path="/create-event" element={<CreateHackathonForm />} />
          <Route path="/create-project/:activityId" element={<CreateProjectPage />} />
          {/* 认证后的路由 */}
          <Route element={<HackathonLayout />}>
            <Route path="/hackathons" element={<HackathonsPage />} />
            <Route path="/my-participations" element={<div>My Participations Page</div>} />
            <Route path="/my-projects" element={<div>My Projects Page</div>} />
            <Route path="/resources" element={<div>Resources Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
            <Route path="/hackathon/:id/:tab?" element={<HackathonDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </WalletProvider>
  )
}

export default App