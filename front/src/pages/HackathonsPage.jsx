import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import HackathonCard from '../components/HackathonCard';

const filters = {
  prizePool: [
    { value: 'all', label: 'All Prize Pools' },
    { value: '10000+', label: '$10,000+' },
    { value: '50000+', label: '$50,000+' },
    { value: '100000+', label: '$100,000+' },
  ],
  ecosystem: [
    { value: 'all', label: 'All Ecosystems' },
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'solana', label: 'Solana' },
    { value: 'polygon', label: 'Polygon' },
    { value: 'binance', label: 'BNB Chain' },
  ],
  techStack: [
    { value: 'all', label: 'All Tech Stacks' },
    { value: 'web3', label: 'Web3' },
    { value: 'ai', label: 'AI/ML' },
    { value: 'defi', label: 'DeFi' },
    { value: 'nft', label: 'NFT' },
  ],
  status: [
    { value: 'all', label: 'All Status' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'active', label: 'Active' },
    { value: 'ended', label: 'Ended' },
  ],
  sortBy: [
    { value: 'latest', label: 'Latest' },
    { value: 'prizePool', label: 'Prize Pool' },
    { value: 'participants', label: 'Participants' },
    { value: 'endingSoon', label: 'Ending Soon' },
  ],
};



// 模拟数据
const mockHackathons = [
  {
    id: 1,
    name: "Web3 Innovation Challenge",
    description: "Build the next generation of decentralized applications with cutting-edge blockchain technology.",
    logo: "",  // 留空以使用占位图
    techStack: ["Solidity", "React", "Node.js"],
    registrationEnd: "Sep 30, 2025",
    prizePool: 50000,
    level: "Advanced",
    participants: 248,
    status: "Active",
    ecosystem: "ethereum"
  },
  {
    id: 2,
    name: "AI + Blockchain Hackathon",
    description: "Combine artificial intelligence with blockchain to create innovative solutions for real-world problems.",
    logo: "",  // 留空以使用占位图
    techStack: ["Python", "TensorFlow", "Ethereum"],
    registrationEnd: "Oct 15, 2025",
    prizePool: 75000,
    level: "Intermediate",
    participants: 186,
    status: "Upcoming",
    ecosystem: "solana"
  },
  {
    id: 3,
    name: "DeFi Protocol Challenge",
    description: "Create innovative DeFi solutions on Polygon network.",
    logo: "",  // 留空以使用占位图
    techStack: ["Solidity", "Web3.js", "React"],
    registrationEnd: "Nov 1, 2025",
    prizePool: 100000,
    level: "Advanced",
    participants: 312,
    status: "Active",
    ecosystem: "polygon"
  },
  {
    id: 4,
    name: "NFT Gaming Hackathon",
    description: "Build the next generation of blockchain games with NFT integration.",
    logo: "",  // 留空以使用占位图
    techStack: ["Unity", "Solidity", "NFT"],
    registrationEnd: "Sep 15, 2025",
    prizePool: 30000,
    level: "Intermediate",
    participants: 156,
    status: "Ended",
    ecosystem: "binance"
  },
];

export default function HackathonsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    prizePool: 'all',
    ecosystem: 'all',
    techStack: 'all',
    status: 'all',
    sortBy: 'latest',
  });

  // 过滤和排序逻辑
  const filteredHackathons = useMemo(() => {
    return mockHackathons
      .filter(hackathon => {
        // 搜索过滤
        if (searchQuery) {
          const searchLower = searchQuery.toLowerCase();
          const matchesSearch = 
            hackathon.name.toLowerCase().includes(searchLower) ||
            hackathon.description.toLowerCase().includes(searchLower) ||
            hackathon.techStack.some(tech => tech.toLowerCase().includes(searchLower));
          if (!matchesSearch) return false;
        }

        // 奖金池过滤
        if (activeFilters.prizePool !== 'all') {
          const minPrize = parseInt(activeFilters.prizePool);
          if (hackathon.prizePool < minPrize) return false;
        }

        // 生态系统过滤
        if (activeFilters.ecosystem !== 'all' && 
            hackathon.ecosystem !== activeFilters.ecosystem) return false;

        // 技术栈过滤
        if (activeFilters.techStack !== 'all' && 
            !hackathon.techStack.some(tech => tech.toLowerCase().includes(activeFilters.techStack))) return false;

        // 状态过滤
        if (activeFilters.status !== 'all' && 
            hackathon.status.toLowerCase() !== activeFilters.status) return false;

        return true;
      })
      .sort((a, b) => {
        switch (activeFilters.sortBy) {
          case 'prizePool':
            return b.prizePool - a.prizePool;
          case 'participants':
            return b.participants - a.participants;
          case 'endingSoon':
            return new Date(a.registrationEnd) - new Date(b.registrationEnd);
          default: // 'latest'
            return new Date(b.registrationEnd) - new Date(a.registrationEnd);
        }
      });
  }, [searchQuery, activeFilters]);



  const FilterButton = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
        >
          <span>
            {label}: {options.find(opt => opt.value === value)?.label || 'All'}
          </span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`${
                    value === option.value
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700'
                  } group flex w-full items-center px-4 py-2 text-sm hover:bg-gray-50`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleViewDetails = (hackathonId) => {
    navigate(`/hackathons/${hackathonId}`);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#1b1a1d] px-40">
      {/* Banner Section */}
      <div className="relative h-[400px] overflow-hidden mb-8">
        <img
          src="src/assets/Hero Image.jpg"
          alt="Open Source Frontier"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a1d] via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-5xl font-bold text-white mb-4">Open Source Frontier</h1>
            <p className="text-[#949fa8] text-lg mb-8">AI x WEB3 x Transparency</p>
            <div className="flex items-center justify-center gap-8 text-white">
              <div className="text-center">
                <div className="font-medium mb-1">Registration Close</div>
                <div className="text-[#949fa8]">12 days left</div>
              </div>
              <div className="text-center">
                <div className="font-medium mb-1">Tech Stack</div>
                <div className="text-[#949fa8]">All tech stacks</div>
              </div>
              <div className="text-center">
                <div className="font-medium mb-1">Level</div>
                <div className="text-[#949fa8]">All levels accepted</div>
              </div>
              <div className="text-center">
                <div className="font-medium mb-1">Total Prize</div>
                <div className="text-[#949fa8]">50,000.00 USD</div>
              </div>
            </div>
            <button className="mt-8 px-6 py-2 bg-[#0092ff] text-white rounded-lg hover:bg-[#0092ff]/90 transition-colors">
              Start Register
            </button>
          </div>
        </div>
      </div>

      <div className="px-8">
        {/* Welcome Text and Host Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white text-lg font-medium mb-2">Explore Hackathons</h2>
            <p className="text-[#949fa8] text-sm">
              Welcome to your hackathon dashboard! Manage projects, share innovations, and track your hackathon journey with ease — all in one place.
            </p>
          </div>
          <button
            onClick={() => navigate('/create-event')}
            className="px-4 py-2 bg-[#0092ff] text-white text-sm rounded-lg hover:bg-[#0092ff]/90 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <PlusCircleIcon className="w-5 h-5" />
            Host a Hackathon
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-4 mb-6 text-sm">
          <span className="text-[#0092ff] px-2">Total Prize All</span>
          <span className="text-[#949fa8] hover:text-white px-2">Ecosystem All</span>
          <span className="text-[#949fa8] hover:text-white px-2">Tech Stack All</span>
          <span className="text-[#949fa8] hover:text-white px-2">Status Live, Upcoming</span>
        </div>
        {/* 过滤器栏 */}
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-sm text-[#949fa8]">Filter:</span>
          <div className="flex items-center space-x-2">
            <FilterButton
              label="Total Prize"
              options={filters.prizePool}
              value={activeFilters.prizePool}
              onChange={(value) => setActiveFilters(prev => ({ ...prev, prizePool: value }))}
            />
            <FilterButton
              label="Ecosystem"
              options={filters.ecosystem}
              value={activeFilters.ecosystem}
              onChange={(value) => setActiveFilters(prev => ({ ...prev, ecosystem: value }))}
            />
            <FilterButton
              label="Tech Stack"
              options={filters.techStack}
              value={activeFilters.techStack}
              onChange={(value) => setActiveFilters(prev => ({ ...prev, techStack: value }))}
            />
            <FilterButton
              label="Status"
              options={filters.status}
              value={activeFilters.status}
              onChange={(value) => setActiveFilters(prev => ({ ...prev, status: value }))}
            />
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#949fa8]">Sort by:</span>
            <FilterButton
              label="Sort"
              options={filters.sortBy}
              value={activeFilters.sortBy}
              onChange={(value) => setActiveFilters(prev => ({ ...prev, sortBy: value }))}
            />
          </div>
        </div>

        {/* Hackathon Cards */}
        <div className="flex flex-col gap-4">
          {filteredHackathons.length > 0 ? (
            filteredHackathons.map(hackathon => (
              <HackathonCard
                key={hackathon.id}
                hackathon={{
                  ...hackathon,
                  onViewDetails: handleViewDetails
                }}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-[#949fa8] text-sm">
                No hackathons found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
