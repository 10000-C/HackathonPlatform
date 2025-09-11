import PropTypes from 'prop-types';

const HackathonCard = ({ hackathon }) => {
  // 计算活动状态
  const calculateStatus = () => {
    const now = new Date();
    const start = new Date(hackathon.startDate);
    const end = new Date(hackathon.endDate);
    
    if (isNaN(start) || isNaN(end)) {
      return 'Unknown';
    }

    if (now < start) {
      return 'upcoming';
    } else if (now >= start && now <= end) {
      return 'active';
    } else {
      return 'ended';
    }
  };

  // 格式化日期显示
  const formatDateDifference = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    
    if (isNaN(target)) return 'Unknown';
    
    const diffTime = target - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'Ended';
    } else if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return '1 day left';
    } else {
      return `${diffDays} days left`;
    }
  };

  const calculatedStatus = calculateStatus();
  
  // 状态标签配置
  const statusConfig = {
    active: { label: 'Live', color: 'bg-green-500/50' },
    upcoming: { label: 'Upcoming', color: 'bg-orange-500/50' },
    ended: { label: 'Ended', color: 'bg-red-500/50' },
    Unknown: { label: 'Unknown', color: 'bg-gray-500/50' }
  };

  const status = statusConfig[calculatedStatus] || statusConfig.Unknown;

  // 确定是否显示"days left"信息
  let daysLeftDisplay = '';
  if (calculatedStatus === 'active' || calculatedStatus === 'upcoming') {
    daysLeftDisplay = formatDateDifference(hackathon.registrationEnd);
  } else if (calculatedStatus === 'ended') {
    daysLeftDisplay = 'Ended';
  }

  return (
    <div 
      className="bg-[#1b1b1e] rounded-xl p-4 flex gap-6 hover:bg-[#3d4654] transition-all duration-200 border border-[#3d4654] shadow-sm hover:shadow-md cursor-pointer"
      onClick={() => hackathon.onViewDetails?.(hackathon.id)}
    >
      {/* Left Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-white text-lg font-medium">{hackathon.name}</h3>
          <span className={`px-3 py-1 ${status.color} text-white text-xs rounded-full`}>
            {status.label}
          </span>
        </div>
        <p className="text-[#949fa8] text-sm mb-6 line-clamp-2">{hackathon.description}</p>
        
        <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[#949fa8] w-24">Registration close</span>
            <span className="text-white">
              {daysLeftDisplay}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#949fa8] w-20">Tech stack</span>
            <span className="text-white">
              {hackathon.techStack && hackathon.techStack.length > 0 
                ? hackathon.techStack.join(', ') 
                : 'All tech stack'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#949fa8] w-20">Level</span>
            <span className="text-white">
              {hackathon.level || 'All levels accepted'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#949fa8] w-20">Total prize</span>
            <span className="text-white">
              {hackathon.prizePool ? `$${hackathon.prizePool.toLocaleString()} USD` : 'Not specified'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Location */}
          <span className="px-3 py-1 bg-[#3d4654] text-white text-xs rounded-2xl font-semibold">
            {hackathon.location || 'Online'}
          </span>
          {/* Participants */}
          <span className="px-3 py-1 bg-[#3d4654] text-white text-xs rounded-2xl font-semibold">
            {hackathon.participants} Participants
          </span>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-[362px] h-[196px] rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={hackathon.logo || `https://placehold.co/362x196/2b3640/3d4654/png?text=${encodeURIComponent(hackathon.name)}`}
          alt={hackathon.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

HackathonCard.propTypes = {
  hackathon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    logo: PropTypes.string,
    techStack: PropTypes.arrayOf(PropTypes.string),
    startDate: PropTypes.string,
    registrationEnd: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    prizePool: PropTypes.number,
    level: PropTypes.string,
    participants: PropTypes.number.isRequired,
    onViewDetails: PropTypes.func,
    location: PropTypes.string
  }).isRequired
};

export default HackathonCard;
