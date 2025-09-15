import { Link } from 'react-router-dom';
import { CodeBracketIcon, CubeIcon, CommandLineIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const navItems = [
  { id: 'overview', icon: CommandLineIcon, label: 'Overview', active: true },
  { id: 'techstack', icon: CodeBracketIcon, label: 'Tech Stack', active: false },
  // { id: 'hackathon', icon: AcademicCapIcon, label: 'Hackathon', active: false }
];

export default function CreateProjectSidebar({currentStep, setCurrentStep}) {
  return (
    <div className="w-[216px] min-h-screen border-2 border-solid border-[#242425]">
      <div className="pt-8 px-1 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-colors ${
              currentStep === item.id
                ? 'text-[#0092ff] bg-[#0092ff1a]'
                : 'text-[#949fa8] hover:text-white hover:bg-[#2b364033]'
            }`}
            onClick={() => setCurrentStep(item.id)}
          >
            <item.icon className="w-5 h-5" />
            <span className={`text-sm ${currentStep === item.id ? 'font-semibold' : 'font-normal'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}