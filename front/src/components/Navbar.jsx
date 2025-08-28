import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useWallet } from '../utils/WalletContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { isWalletConnected, currentAccount, connectToWallet, disconnectWallet } = useWallet();

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              HackQuest
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-[#0066cc] px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ease-in-out hover:scale-105">
              Explore
            </a>
            <a href="#" className="text-gray-700 hover:text-[#0066cc] px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ease-in-out hover:scale-105">
              Hackthon
            </a>
            <a href="#" className="text-gray-700 hover:text-[#0066cc] px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ease-in-out hover:scale-105">
              Resource
            </a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-gray-700 hover:text-[#0066cc] cursor-pointer transition-all duration-200 ease-in-out hover:scale-105">
                <GlobeAltIcon className="h-5 w-5" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={`${active ? 'bg-gray-50 text-[#0066cc]' : 'text-gray-700'} block px-4 py-2 text-sm cursor-pointer transition-all duration-200 ease-in-out`}>
                          简体中文
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={`${active ? 'bg-gray-50 text-[#0066cc]' : 'text-gray-700'} block px-4 py-2 text-sm cursor-pointer transition-all duration-200 ease-in-out`}>
                          English
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Wallet Connection */}
            <button
              onClick={isWalletConnected ? disconnectWallet : connectToWallet}
              className="inline-flex items-center px-6 py-2.5 text-sm font-medium rounded-lg 
              cursor-pointer transition-all duration-200 ease-in-out
              border-2 border-[#0066cc] 
              bg-gradient-to-r from-[#0066cc] to-[#5e5ce6] 
              text-white hover:shadow-lg hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-[#0066cc]/50"
            >
              {isWalletConnected ? truncateAddress(currentAccount) : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
