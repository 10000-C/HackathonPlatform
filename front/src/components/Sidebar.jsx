import { Link, useLocation } from 'react-router-dom';
import {
  TrophyIcon,
  DocumentCheckIcon,
  BookOpenIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  ArchiveBoxIcon,
  CalendarIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const location = useLocation();

   // 图标映射表（路径 -> 图标组件）
  const iconMap = {
    quest: TrophyIcon,
    certifications: DocumentCheckIcon,
    course: BookOpenIcon,
    dashboard: ChartBarIcon,
    hackathons: RocketLaunchIcon,
    archive: ArchiveBoxIcon,
    events: CalendarIcon,
    camps: AcademicCapIcon,
    support: ChatBubbleLeftRightIcon,
    advocate: UserGroupIcon,
    more: EllipsisHorizontalIcon,
  };

  return (
    <div className="w-[216px] min-h-screen bg-[#1b1b1e] border-r border-[#2b3640] px-1 py-6">
      {/* Logo */}
      <div className="w-12 h-8 mb-8 ml-2">
        <div className="relative h-8">
          <img
            className="absolute w-[100%] h-[22px] top-[5px]"
            alt="Logo"
            src="/src/assets/logo.png"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-6 mt-[40px]">
        {/* Quest Section */}
        <div className="space-y-6">
          <Link 
            to="/quest"
            className={`flex items-center pl-3 gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/quest' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <iconMap.quest
              className={`w-4 h-4 ${location.pathname === '/quest' ? 'text-[#0092ff]' : 'text-[#949fa8]'}`}
            />
            <span className="text-sm">Quest</span>
          </Link>
        </div>
        
        <div className="h-px w-[184px] bg-[#2b3640]" />

        {/* Certifications & Course */}
        <div className="space-y-6">
          <Link 
            to="/certifications"
            className={`flex pl-2 items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/certifications' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <iconMap.certifications
              className={`w-4 h-4 ${location.pathname === '/certifications' ? 'text-[#0092ff]' : 'text-[#949fa8]'}`}
            />
            <span className="text-sm">My Certifications</span>
          </Link>
          <Link 
            to="/course"
            className={`flex pl-2 items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/course' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <iconMap.course
              className={`w-4 h-4 ${location.pathname === '/course' ? 'text-[#0092ff]' : 'text-[#949fa8]'}`}
            />
            <span className="text-sm">Explore Course</span>
          </Link>
        </div>

        <div className="h-px w-[184px] bg-[#2b3640]" />

        {/* Main Navigation */}
        <div className="space-y-5">
          <Link 
            to="/dashboard"
            className={`flex pl-2 items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/dashboard' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <iconMap.dashboard
              className={`w-4 h-4 ${location.pathname === '/dashboard' ? 'text-[#0092ff]' : 'text-[#949fa8]'}`}
            />
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link 
            to="/hackathons"
            className={`flex pl-2 items-center gap-2 text-[#949fa8] hover:text-white w-full h-12 ${
              location.pathname === '/hackathons' || location.pathname.startsWith('/hackathons/') ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <iconMap.hackathons
              className={`w-4 h-4 ${location.pathname === '/hackathons' || location.pathname.startsWith('/hackathons/') ? 'text-[#0092ff]' : 'text-[#949fa8]'}`}
            />
            <span className="text-sm">Explore Hackathons</span>
          </Link>
          <Link 
            to="/archive"
            className={`flex pl-2 items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/archive' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <iconMap.archive
              className={`w-4 h-4 ${location.pathname === '/archive' ? 'text-[#0092ff]' : 'text-[#949fa8]'}`}
            />
            <span className="text-sm">Project Archive</span>
          </Link>
        </div>

        <div className="h-px w-[184px] bg-[#2b3640]" />

        {/* Footer Links */}
        <div className="space-y-5">
          <Link 
            to="/events"
            className={`flex pl-2 items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/events' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <iconMap.events
              className={`w-4 h-4 ${location.pathname === '/events' ? 'text-[#0092ff]' : 'text-[#949fa8]'}`}
            />
            <span className="text-sm">Community Events</span>
          </Link>
          <Link 
            to="/camps"
            className={`flex pl-2 items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/camps' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <iconMap.camps
              className={`w-4 h-4 ${location.pathname === '/camps' ? 'text-[#0092ff]' : 'text-[#949fa8]'}`}
            />
            <span className="text-sm">Learning Camps</span>
          </Link>
          <Link 
            to="/support"
            className={`flex pl-2 items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/support' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <iconMap.support
              className={`w-4 h-4 ${location.pathname === '/support' ? 'text-[#0092ff]' : 'text-[#949fa8]'}`}
            />
            <span className="text-sm">Discussion & Support</span>
          </Link>
          <Link 
            to="/advocate"
            className={`flex pl-2 items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/advocate' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <iconMap.advocate
              className={`w-4 h-4 ${location.pathname === '/advocate' ? 'text-[#0092ff]' : 'text-[#949fa8]'}`}
            />
            <span className="text-sm">Advocate Program</span>
          </Link>
          <Link 
            to="/more"
            className={`flex pl-2 items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/more' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <iconMap.more
              className={`w-4 h-4 ${location.pathname === '/more' ? 'text-[#0092ff]' : 'text-[#949fa8]'}`}
            />
            <span className="text-sm">More</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
