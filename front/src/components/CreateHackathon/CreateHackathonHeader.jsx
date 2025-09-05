import { Link } from 'react-router-dom';

export default function CreateHackathonHeader() {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-[#2b3640] bg-[#1b1b1e]">
      <Link to="/hackathons" className="text-[#949fa8] hover:text-white flex items-center">
        <span>←</span>
        <span className="ml-1">Save hackathon draft & quit</span>
      </Link>
      <div className="flex items-center gap-4">
        <button className="text-[#0092ff] hover:text-white px-4 py-2">
          Preview publication
        </button>
        <button className="bg-[#0092ff] text-white px-4 py-2 rounded-lg hover:bg-[#0092ff]/90 transition-colors">
          Publish Hackathon
        </button>
      </div>
    </div>
  );
}