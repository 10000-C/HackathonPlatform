import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
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
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

export default function JudgeSidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-[216px] h-screen bg-[#1b1a1d] border-r border-[#2b3640] fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6">
        <img src={logo} alt="Logo" className="h-8" />
      </div>

      <div className="flex flex-col px-4 gap-6">
        {/* Judge Dashboard - 新增的评委专属选项 */}
        <Link
          to="/judge-dashboard"
          className={`flex items-center gap-2 px-2 py-2 rounded-lg ${
            isActive('/judge-dashboard')
              ? 'bg-[#0092ff1a] text-[#0092ff]'
              : 'text-[#949fa8] hover:text-white'
          }`}
        >
          <ClipboardDocumentCheckIcon className="w-4 h-4" />
          <span>Judge Dashboard</span>
        </Link>

        {/* 其他导航项... */}
        {/* ...保持原有的导航项... */}
      </div>
    </div>
  );
}