const HackathonCard = ({ hackathon, className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex-1 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${hackathon.logo || 'https://placehold.co/600x400'})` }}></div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{hackathon.name}</h3>
        <p className="text-sm text-gray-400 mb-4">{hackathon.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-400">Voting ends:</span>
            <span className="font-medium ml-2">{hackathon.votingEnd}</span>
          </div>
          <div>
            <span className="text-sm text-gray-400">Participants:</span>
            <span className="font-medium ml-2">{hackathon.participants}</span>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-sm text-gray-400">Prize Pool:</span>
          <span className="font-medium ml-2">${hackathon.prizePool}</span>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;