import { useState } from 'react';
import { 
  MapIcon, 
  PlusCircleIcon, 
  UserGroupIcon, 
  TrophyIcon,
  BookOpenIcon,
  Cog6ToothIcon as CogIcon
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { 
    name: 'Explore Hackathons', 
    path: '/hackathons', 
    icon: MapIcon,
    description: 'Discover ongoing and upcoming hackathons'
  },
  { 
    name: 'Create Event', 
    path: '/create-event', 
    icon: PlusCircleIcon,
    description: 'Organize your own hackathon'
  },
  { 
    name: 'My Participations', 
    path: '/my-participations', 
    icon: UserGroupIcon,
    description: 'View your registered hackathons'
  },
  { 
    name: 'My Projects', 
    path: '/my-projects', 
    icon: TrophyIcon,
    description: 'Manage your submitted projects'
  },
  { 
    name: 'Resources', 
    path: '/resources', 
    icon: BookOpenIcon,
    description: 'Helpful guides and documentation'
  },
  { 
    name: 'Settings', 
    path: '/settings', 
    icon: CogIcon,
    description: 'Account and profile settings'
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(null);

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo和名字 */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="ml-2 text-xl font-semibold text-gray-900">HackQuest</span>
        </div>
        
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              const isItemHovered = isHovered === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    group relative flex items-center px-4 py-3 text-sm font-medium rounded-lg
                    transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-[#0066cc]/10 text-[#0066cc]' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                  onMouseEnter={() => setIsHovered(item.path)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors
                      ${isActive ? 'text-[#0066cc]' : 'text-gray-400 group-hover:text-[#0066cc]'}
                    `}
                  />
                  <span>{item.name}</span>
                  
                  {/* Tooltip */}
                  {isItemHovered && !isActive && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg w-48">
                      {item.description}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
