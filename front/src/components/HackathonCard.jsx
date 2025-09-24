import PropTypes from 'prop-types';
// 根据日期确定活动状态的辅助函数
const calculateStatus = (startDate, registrationEnd, endDate) => {
  const now = new Date();
  
  // 确保日期格式正确
  const start = new Date(startDate);
  const regEnd = new Date(registrationEnd);
  const end = new Date(endDate);
  
  if (isNaN(start) || isNaN(regEnd) || isNaN(end)) {
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

// 检查注册是否已结束
const isRegistrationEnded = (registrationEnd) => {
  const now = new Date();
  const regEnd = new Date(registrationEnd);
  
  if (isNaN(regEnd)) return true;
  
  return now > regEnd;
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

const HackathonCard = ({ hackathon }) => {
  // 计算活动状态
  const calculatedStatus = calculateStatus(
    hackathon.hackathonStart || hackathon.startDate,
    hackathon.registrationEnd,
    hackathon.hackathonEnd || hackathon.endDate
  );
  
  // 检查注册是否已结束
  const registrationEnded = isRegistrationEnded(hackathon.registrationEnd);

  // 状态标签配置
  const statusConfig = {
    active: { label: 'Live', color: 'bg-green-500/30' },
    upcoming: { label: 'Upcoming', color: 'bg-orange-500/30' },
    ended: { label: 'Ended', color: 'bg-red-500/30' },
    Unknown: { label: 'Unknown', color: 'bg-gray-500' }
  };

  const status = statusConfig[calculatedStatus] || statusConfig.Unknown;

  
  // 根据状态确定显示文本
  const statusDisplay = {
    'upcoming': 'Upcoming',
    'active': 'Live',
    'ended': 'Ended',
    'Unknown': 'Unknown'
  }[calculatedStatus] || 'Unknown';
  
  // 确定是否显示"days left"信息
  let daysLeftDisplay = '';
  if (calculatedStatus === 'active' || calculatedStatus === 'upcoming') {
    if (registrationEnded) {
      daysLeftDisplay = 'Registration ended';
    } else {
      daysLeftDisplay = formatDateDifference(hackathon.registrationEnd);
    }
  } else if (calculatedStatus === 'ended') {
    daysLeftDisplay = 'Ended';
  }

  

  return (
    <div className="group">
      <div 
      className="bg-[#1b1b1e] rounded-xl p-4 flex gap-6 hover:bg-[#3d4654] transition-all duration-200 border border-[#3d4654] shadow-sm hover:shadow-md cursor-pointer"
      onClick={() => hackathon.onViewDetails?.(hackathon.id)}
      >
        {/* Left Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white text-lg font-medium">{hackathon.name}</h3>
            <span className={`px-2 py-0.5 ${status.color} text-white text-xs rounded-full`}>
              {status.label}
            </span>
          </div>
          <p className="text-[#949fa8] text-sm mb-6 line-clamp-2">{hackathon.description}</p>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[#949fa8] w-20">Status</span>
              <span className="text-white">
                {statusDisplay}{daysLeftDisplay ? `, ${daysLeftDisplay}` : ''}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#949fa8] w-20">Tech stack</span>
              <span className="text-white">
                {hackathon.techStack && hackathon.techStack.length > 0 
                  ? hackathon.techStack.join(', ') 
                  : 'Not specified'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#949fa8] w-20">Level</span>
              <span className="text-white">{hackathon.experienceLevel || 'Not specified'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#949fa8] w-20">Total prize</span>
              <span className="text-white">${hackathon.prizePool.toLocaleString()} USD</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            {/* Location */}
            <span className="px-3 py-1 bg-[#ffffff4c] text-white text-xs rounded-2xl font-semibold">
              {hackathon.location || 'Online'}
            </span>
            {/* Participants */}
            <span className="px-3 py-1 bg-[#ffffff4c] text-white text-xs rounded-2xl font-semibold">
              {hackathon.participants} Participants
            </span>
            
          </div>

          
        </div>

        {/* Right Image */}
        <div className="w-[280px] h-[160px] rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={hackathon.logo || `https://placehold.co/280x160/2b3640/3d4654/png?text=${hackathon.name}`}
            alt={hackathon.name}
            className="w-full h-full object-cover"
          />
        </div>
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
    techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
    hackathonStart: PropTypes.string,
    startDate: PropTypes.string, // 保持向后兼容
    registrationEnd: PropTypes.string.isRequired,
    hackathonEnd: PropTypes.string,
    endDate: PropTypes.string, // 保持向后兼容
    prizePool: PropTypes.number.isRequired,
    experienceLevel: PropTypes.string,
    level: PropTypes.string, // 保持向后兼容
    participants: PropTypes.number.isRequired,
    ecosystem: PropTypes.string.isRequired,
    onViewDetails: PropTypes.func
  }).isRequired
};

export default HackathonCard;