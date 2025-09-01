import PropTypes from 'prop-types';

const HackathonCard = ({ hackathon }) => {
  return (
    <div className="group">
      <div className="bg-[#2b3640] rounded-lg p-6 flex gap-6 hover:bg-[#3d4654] transition-all">
        {/* Left Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white text-lg font-medium">{hackathon.name}</h3>
            {hackathon.status === 'Active' && (
              <span className="px-2 py-0.5 bg-[#0092ff] text-white text-xs rounded">Live</span>
            )}
          </div>
          <p className="text-[#949fa8] text-sm mb-6 line-clamp-2">{hackathon.description}</p>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[#949fa8] w-20">Status</span>
              <span className="text-white">
                Voting {hackathon.status === 'Active' ? '12 days left' : 'Ended'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#949fa8] w-20">Tech stack</span>
              <span className="text-white">All tech stack</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#949fa8] w-20">Level</span>
              <span className="text-white">All levels accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#949fa8] w-20">Total prize</span>
              <span className="text-white">${hackathon.prizePool.toLocaleString()} USD</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => hackathon.onViewDetails?.(hackathon.id)}
              className="text-[#949fa8] hover:text-white"
            >
              Details
            </button>
            <button className="px-6 py-1.5 bg-[#0092ff] text-white rounded hover:bg-[#0092ff]/90 transition-colors">
              Get Involved
            </button>
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
    registrationEnd: PropTypes.string.isRequired,
    prizePool: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    participants: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['Active', 'Upcoming', 'Ended']).isRequired,
    ecosystem: PropTypes.string.isRequired,
    onViewDetails: PropTypes.func
  }).isRequired
};

export default HackathonCard;
