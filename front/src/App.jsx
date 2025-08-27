import './App.css'
import HomePage from './pages/HomePage'
import { WalletProvider } from './utils/WalletContext'

function App() {
  return (
    <WalletProvider>
      <HomePage />
    </WalletProvider>
  )
}

export default App
