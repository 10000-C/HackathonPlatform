import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import { useWallet } from '../utils/WalletContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardNav({ onSearch }) {
  const { currentAccount, disconnectWallet } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');

  // 截断钱包地址显示
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="h-16 bg-[#1b1b1e] border-b border-[#2b3640] flex items-center px-6 justify-between">
      {/* 左侧搜索框 */}
      <div className="w-[360px] relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#949fa8]" />
        <input
          type="text"
          placeholder="Search for researchers and audits on HackM"
          className="w-full pl-9 pr-4 py-2 bg-[#2b3640] text-white rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-[#0092ff] placeholder-[#949fa8] text-sm"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* 右侧菜单 */}
      <div className="flex items-center space-x-6">
        {/* 通知铃铛 */}
        <button className="text-[#949fa8] hover:text-white">
          <BellIcon className="w-5 h-5" />
        </button>

        {/* 头像 */}
        <div className="w-8 h-8 rounded-full bg-[#2b3640] flex items-center justify-center">
          <img
            src="https://placehold.co/32x32/2b3640/949fa8"
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>

        {/* 钱包地址下拉菜单 */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center justify-center gap-x-2 px-3 py-2 text-sm text-[#949fa8] hover:text-white">
              {truncateAddress(currentAccount)}
              <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-[#2b3640] focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/profile"
                      className={classNames(
                        active ? 'bg-[#1b1a1d] text-white' : 'text-[#949fa8]',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      个人资料
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/settings"
                      className={classNames(
                        active ? 'bg-[#1b1a1d] text-white' : 'text-[#949fa8]',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      设置
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={disconnectWallet}
                      className={classNames(
                        active ? 'bg-[#1b1a1d] text-white' : 'text-[#949fa8]',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                    >
                      断开连接
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
