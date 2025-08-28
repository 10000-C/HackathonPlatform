import PropTypes from 'prop-types';

const HackathonCard = ({ hackathon }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{hackathon.name}</h3>
          <p className="mt-2 text-gray-600 line-clamp-2">{hackathon.description}</p>
        </div>
        <div className="flex-shrink-0">
          <img 
            src={hackathon.logo || 'https://via.placeholder.com/64'} 
            alt={hackathon.name} 
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {hackathon.techStack.map(tech => (
          <span 
            key={tech}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Registration Ends</p>
          <p className="font-medium text-gray-900">{hackathon.registrationEnd}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Prize Pool</p>
          <p className="font-medium text-gray-900">${hackathon.prizePool.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Level</p>
          <p className="font-medium text-gray-900">{hackathon.level}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Participants</p>
          <p className="font-medium text-gray-900">{hackathon.participants}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`
          px-3 py-1 rounded-full text-sm font-medium
          ${hackathon.status === 'Active' ? 'bg-green-100 text-green-800' :
            hackathon.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'}
        `}>
          {hackathon.status}
        </span>
        <button 
          onClick={() => hackathon.onViewDetails?.(hackathon.id)}
          className="px-4 py-2 bg-[#0066cc] text-white rounded-lg hover:bg-[#0066cc]/90 transition-colors"
        >
          View Details
        </button>
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
