import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-[216px] min-h-screen bg-[#1b1a1d] border-r border-[#2b3640] px-4 py-6">
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
            className={`flex items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/quest' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <img 
              src={`https://placehold.co/16x16/${location.pathname === '/quest' ? '0092ff' : '949fa8'}/FFFFFF`} 
              alt="Quest" 
              className="w-4 h-4" 
            />
            <span className="text-sm">Quest</span>
          </Link>
        </div>
        
        <div className="h-px w-[184px] bg-[#2b3640]" />

        {/* Certifications & Course */}
        <div className="space-y-6">
          <Link 
            to="/certifications"
            className={`flex items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/certifications' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <img 
              src={`https://placehold.co/16x16/${location.pathname === '/certifications' ? '0092ff' : '949fa8'}/FFFFFF`}
              alt="Certifications" 
              className="w-4 h-4" 
            />
            <span className="text-sm">My Certifications</span>
          </Link>
          <Link 
            to="/course"
            className={`flex items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/course' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <img 
              src={`https://placehold.co/16x16/${location.pathname === '/course' ? '0092ff' : '949fa8'}/FFFFFF`}
              alt="Course" 
              className="w-4 h-4" 
            />
            <span className="text-sm">Explore Course</span>
          </Link>
        </div>

        <div className="h-px w-[184px] bg-[#2b3640]" />

        {/* Main Navigation */}
        <div className="space-y-5">
          <Link 
            to="/dashboard"
            className={`flex items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/dashboard' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <img 
              src={`https://placehold.co/16x16/${location.pathname === '/dashboard' ? '0092ff' : '949fa8'}/FFFFFF`}
              alt="Dashboard" 
              className="w-4 h-4" 
            />
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link 
            to="/hackathons"
            className={`flex items-center gap-2 text-[#949fa8] hover:text-white w-full h-12 ${
              location.pathname === '/hackathons' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <img 
              src={`https://placehold.co/16x16/${location.pathname === '/hackathons' ? '0092ff' : '949fa8'}/FFFFFF`}
              alt="Hackathons" 
              className="w-4 h-4"
            />
            <span className="text-sm">Explore Hackathons</span>
          </Link>
          <Link 
            to="/archive"
            className={`flex items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/archive' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <img 
              src={`https://placehold.co/16x16/${location.pathname === '/archive' ? '0092ff' : '949fa8'}/FFFFFF`}
              alt="Archive" 
              className="w-4 h-4" 
            />
            <span className="text-sm">Project Archive</span>
          </Link>
        </div>

        <div className="h-px w-[184px] bg-[#2b3640]" />

        {/* Footer Links */}
        <div className="space-y-5">
          <Link 
            to="/events"
            className={`flex items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/events' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <img 
              src={`https://placehold.co/16x16/${location.pathname === '/events' ? '0092ff' : '949fa8'}/FFFFFF`}
              alt="Events" 
              className="w-4 h-4" 
            />
            <span className="text-sm">Community Events</span>
          </Link>
          <Link 
            to="/camps"
            className={`flex items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/camps' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <img 
              src={`https://placehold.co/16x16/${location.pathname === '/camps' ? '0092ff' : '949fa8'}/FFFFFF`}
              alt="Camps" 
              className="w-4 h-4" 
            />
            <span className="text-sm">Learning Camps</span>
          </Link>
          <Link 
            to="/support"
            className={`flex items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/support' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <img 
              src={`https://placehold.co/16x16/${location.pathname === '/support' ? '0092ff' : '949fa8'}/FFFFFF`}
              alt="Support" 
              className="w-4 h-4" 
            />
            <span className="text-sm">Discussion & Support</span>
          </Link>
          <Link 
            to="/advocate"
            className={`flex items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/advocate' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <img 
              src={`https://placehold.co/16x16/${location.pathname === '/advocate' ? '0092ff' : '949fa8'}/FFFFFF`}
              alt="Advocate" 
              className="w-4 h-4" 
            />
            <span className="text-sm">Advocate Program</span>
          </Link>
          <Link 
            to="/more"
            className={`flex items-center gap-2 text-[#949fa8] hover:text-white w-full ${
              location.pathname === '/more' ? 'text-[#0092ff] bg-[#0092ff1a] rounded-md' : ''
            }`}
          >
            <img 
              src={`https://placehold.co/16x16/${location.pathname === '/more' ? '0092ff' : '949fa8'}/FFFFFF`}
              alt="More" 
              className="w-4 h-4" 
            />
            <span className="text-sm">More</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
