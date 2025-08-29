import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import HackathonCard from '../components/HackathonCard';
import callSearchService from '../utils/CallSearchService';

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
  // 添加状态来存储从云端获取的数据和加载状态
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 在组件加载时从云端获取数据
    useEffect(() => {
    const fetchHackathons = async () => {
      try {
        setLoading(true);
        
        // 从GraphQL服务获取活动列表
        const response = await callSearchService("", "all");
        const activities = response.activities || [];
        
        // 从IPFS获取每个活动的详细数据
        const hackathonPromises = activities.map(async (activity) => {
          try {
            // 构建IPFS URL
            console.log("activity_dataCID",activity.activity_dataCID);
            const url = `https://gold-rational-monkey-593.mypinata.cloud/ipfs/${activity.activity_dataCID}`
            const request = await fetch(url);
            const response = await request.json();
            console.log("pinata response",response);
            const hackathonData = response;
            
            //数据格式转换
            let techStack = [];
            if (Array.isArray(hackathonData.techStack)) {
              techStack = hackathonData.techStack;
            } else if (typeof hackathonData.techStack === 'string') {
              // 如果是逗号分隔的字符串，则转换为数组
              techStack = hackathonData.techStack.split(',').map(item => item.trim()).filter(item => item);
            }
            
            // 确保其他字段有正确的默认值
            const prizePool = parseFloat(hackathonData.prizePool) || 0;
            const maxParticipants = parseInt(hackathonData.maxParticipants) || 0;

            hackathonData.techStack = techStack;
            hackathonData.prizePool = prizePool;
            hackathonData.participants = maxParticipants;

            return {
              id: activity.activityId,
              dataCID: activity.activity_dataCID,
              ...hackathonData
            };
          } catch (ipfsError) {
            console.error(`Failed to fetch data from IPFS for activity ${activity.activityId}:`, ipfsError);
            return {
              id: activity.activityId,
              dataCID: activity.activity_dataCID,
              name: `Hackathon ${activity.activityId}`,
              description: "Failed to load details",
              logo: "https://placehold.co/400",
              techStack: [],
              registrationEnd: "Unknown",
              prizePool: 0,
              level: "Unknown",
              participants: 0,
              status: "Unknown",
              ecosystem: "Unknown"
            };
          }
        });
        
        // 等待所有数据获取完成
        const hackathonData = await Promise.all(hackathonPromises);
        setHackathons(hackathonData);
        setError(null);
      } catch (err) {
        console.error("获取黑客松数据失败:", err);
        setError("获取数据失败，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  // 过滤和排序逻辑
  const filteredHackathons = useMemo(() => {
    return hackathons
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
  }, [searchQuery, activeFilters, hackathons]);



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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题和创建按钮 */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Explore Hackathons</h1>
          <button
            onClick={() => navigate('/create-event')}
            className="inline-flex items-center px-4 py-2 bg-[#0066cc] text-white rounded-lg hover:bg-[#0066cc]/90 transition-colors"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Create Event
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search hackathons..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <FilterButton
              label="Prize Pool"
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
            <FilterButton
              label="Sort by"
              options={filters.sortBy}
              value={activeFilters.sortBy}
              onChange={(value) => setActiveFilters(prev => ({ ...prev, sortBy: value }))}
            />
            
            {/* 清除筛选器按钮 */}
            {(activeFilters.prizePool !== 'all' ||
              activeFilters.ecosystem !== 'all' ||
              activeFilters.techStack !== 'all' ||
              activeFilters.status !== 'all' ||
              searchQuery) && (
              <button
                onClick={() => {
                  setActiveFilters({
                    prizePool: 'all',
                    ecosystem: 'all',
                    techStack: 'all',
                    status: 'all',
                    sortBy: 'latest',
                  });
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Hackathon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No hackathons found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
