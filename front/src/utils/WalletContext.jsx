import { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');

  useEffect(() => {
    async function checkIfWalletIsConnected() {
      if (window.ethereum) {
        setIsWalletInstalled(true);
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setIsWalletConnected(true);
            setCurrentAccount(accounts[0]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    checkIfWalletIsConnected();
  }, []);

  const connectToWallet = async () => {
    if (!isWalletInstalled) {
      alert("Please install a wallet extension like MetaMask to use this application.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setIsWalletConnected(true);
        setCurrentAccount(accounts[0]);
      } else {
        throw new Error("No accounts found");
      }
    } catch (error) {
      console.log(error);
      alert("Error connecting to wallet");
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setCurrentAccount('');
  };

  return (
    <WalletContext.Provider value={{
      isWalletInstalled,
      isWalletConnected,
      currentAccount,
      connectToWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};