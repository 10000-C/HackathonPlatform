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
            <a href="#" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Explore
            </a>
            <a href="#" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Hackthon
            </a>
            <a href="#" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Resource
            </a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-gray-700 hover:text-primary">
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
                <Menu.Items className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                          简体中文
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
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
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {isWalletConnected ? truncateAddress(currentAccount) : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
