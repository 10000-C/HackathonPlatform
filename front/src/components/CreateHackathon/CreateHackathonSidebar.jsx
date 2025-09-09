import { Link } from 'react-router-dom';
import { ClipboardIcon, TrophyIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline';

const navItems = [
  { id: 'overview', icon: ClipboardIcon, label: 'Overview' },
  { id: 'prizes', icon: TrophyIcon, label: 'Prizes' },
  { id: 'schedule', icon: CalendarIcon, label: 'Schedule' },
  { id: 'judges', icon: UserGroupIcon, label: 'Judges' }
];

export default function CreateHackathonSidebar({currentStep, setCurrentStep}) {
  return (
    <div className="w-[216px] bg-[#1b1b1e] border-r border-[#2b3640]">
      <div className="flex items-center h-16 px-6 border-b border-[#2b3640]">
        <h2 className="text-white font-medium">Add hackathon info</h2>
      </div>

      <div className="py-4">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`w-full px-6 py-2 flex items-center gap-2 ${currentStep === item.id
                ? 'text-[#0092ff] bg-[#0092ff1a]'
                : 'text-[#949fa8] hover:text-white'
              }`}
            onClick={() => setCurrentStep(item.id)}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}