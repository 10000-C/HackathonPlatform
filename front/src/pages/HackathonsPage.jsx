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
import BannerSection from '../components/BannerSection';

const filters = {
  prizePool: [
    { value: 'all', label: 'All' },
    { value: '10000+', label: '$10,000+' },
    { value: '50000+', label: '$50,000+' },
    { value: '100000+', label: '$100,000+' },
  ],
  ecosystem: [
    { value: 'all', label: 'All' },
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'solana', label: 'Solana' },
    { value: 'polygon', label: 'Polygon' },
    { value: 'binance', label: 'BNB Chain' },
  ],
  techStack: [
    { value: 'all', label: 'All' },
    { value: 'web3', label: 'Web3' },
    { value: 'ai', label: 'AI/ML' },
    { value: 'defi', label: 'DeFi' },
    { value: 'nft', label: 'NFT' },
  ],
  status: [
    { value: 'all', label: 'All' },
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
            hackathonData.maxParticipants = maxParticipants;
            hackathonData.participants = activity.activity_participants;

            // 将banner CID转换为完整的IPFS URL
            if (hackathonData.banner && typeof hackathonData.banner === 'string') {
              hackathonData.logo = `https://gold-rational-monkey-593.mypinata.cloud/ipfs/${hackathonData.banner}`;
            } else {
              hackathonData.logo = "https://placehold.co/400";
            }

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
          //   const now = new Date();
          // const aIsEnded = new Date(a.registrationEnd) < now;
          // const bIsEnded = new Date(b.registrationEnd) < now;

          // 1. 未结束的排在前面
          // if (aIsEnded && !bIsEnded) return 1;
          // if (!aIsEnded && bIsEnded) return -1;
            return new Date(b.endDate) - new Date(a.endDate);
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
          className="px-4 py-2 border border-[#3d4654] rounded-lg text-sm font-medium text-[#949fa8] hover:bg-[#3d4654] flex items-center space-x-2"
        >
          <span>
            {label}: 
          </span>
          <span className='text-white'>
            {options.find(opt => opt.value === value)?.label || 'All'}
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
    navigate(`/hackathon/${hackathonId}`);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#1B1B1E] px-40">
      {/* Banner Section */}
      <BannerSection />
      
      {/* Main content wrapper */}
      <div className="max-w-[1440px] mx-auto px-8 pt-8 pb-16">
        {/* Welcome Text and Host Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
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
        {/* <div className="flex items-center gap-4 mb-6 text-sm">
          <span className="text-[#0092ff] px-2">Total Prize All</span>
          <span className="text-[#949fa8] hover:text-white px-2">Ecosystem All</span>
          <span className="text-[#949fa8] hover:text-white px-2">Tech Stack All</span>
          <span className="text-[#949fa8] hover:text-white px-2">Status Live, Upcoming</span>
        </div> */}
        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          {/* <span className="text-sm text-[#949fa8]">Filter:</span> */}
          <div className="flex items-center space-x-2">
            <FilterButton
              label="Total Prize"
              options={filters.prizePool}
              value={activeFilters.prizePool}
              onChange={(value) => setActiveFilters(prev => ({ ...prev, prizePool: value }))}
              className="min-w-[140px]"
            />
            <FilterButton
              label="Ecosystem"
              options={filters.ecosystem}
              value={activeFilters.ecosystem}
              onChange={(value) => setActiveFilters(prev => ({ ...prev, ecosystem: value }))}
              className="min-w-[140px]"
            />
            <FilterButton
              label="Tech Stack"
              options={filters.techStack}
              value={activeFilters.techStack}
              onChange={(value) => setActiveFilters(prev => ({ ...prev, techStack: value }))}
              className="min-w-[140px]"
            />
            <FilterButton
              label="Status"
              options={filters.status}
              value={activeFilters.status}
              onChange={(value) => setActiveFilters(prev => ({ ...prev, status: value }))}
              className="min-w-[140px]"
            />
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <span className="text-sm text-[#949fa8]">Sort by:</span>
            <FilterButton
              label="Sort"
              options={filters.sortBy}
              value={activeFilters.sortBy}
              onChange={(value) => setActiveFilters(prev => ({ ...prev, sortBy: value }))}
              className="min-w-[140px]"
            />
          </div>
        </div>

        {/* Hackathon Cards */}
        <div className="grid grid-cols-1 gap-6">
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
