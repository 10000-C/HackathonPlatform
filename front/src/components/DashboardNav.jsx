import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useWallet } from '../utils/WalletContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardNav() {
  const { currentAccount, disconnectWallet } = useWallet();

  // 截断钱包地址显示
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="h-16 bg-white shadow-sm flex items-center px-4 justify-end">
      {/* 右侧菜单 */}
      <div className="flex items-center space-x-6">
        {/* 通知铃铛 - 暂时注释掉，后续可以添加
        <button className="text-gray-500 hover:text-gray-700">
          <BellIcon className="h-6 w-6" />
        </button>
        */}

        {/* 钱包地址下拉菜单 */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center justify-center gap-x-1.5 rounded-lg bg-[#0066cc]/10 px-4 py-2.5 text-sm font-semibold text-[#0066cc] hover:bg-[#0066cc]/20">
              {truncateAddress(currentAccount)}
              <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/profile"
                      className={classNames(
                        active ? 'bg-gray-50 text-gray-900' : 'text-gray-700',
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
                        active ? 'bg-gray-50 text-gray-900' : 'text-gray-700',
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
                        active ? 'bg-gray-50 text-gray-900' : 'text-gray-700',
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
